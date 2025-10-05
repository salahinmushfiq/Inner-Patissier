# order/views.py
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

import user
from user.permissions import IsModerator,IsAdminOrModerator
# from .permissions import IsModerator,IsAdminOrModerator
from .models import Order, OrderStatusLog
from .serializers import OrderCreateSerializer, OrderSerializer, OrderDetailSerializer, AdminOrderSerializer
from cart.utils import get_or_create_cart
from user.serializers import UserSerializer
import uuid

VALID_TRANSITIONS = {
    "pending": ["confirmed", "cancelled"],
    "confirmed": ["processing", "cancelled"],
    "processing": ["shipped", "failed"],
    "shipped": ["delivered"],
    "delivered": [],
    "cancelled": [],
    "failed": [],
}
class OrderCreateView(APIView):
    # serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response()
        cart, created, guest_token = get_or_create_cart(request, response)
        print(guest_token)
        if not cart.cartitem_set.exists():
            return Response({"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderCreateSerializer(data=request.data, context={
            'request': request,
            'cart': cart,
            'guest_token': guest_token,
        })

        if serializer.is_valid():
            order = serializer.save()
            response.data = OrderSerializer(order).data
            response.status_code = status.HTTP_201_CREATED
            if guest_token:
                response.set_cookie("guest_token", guest_token, httponly=True)
            return Response(OrderDetailSerializer(order).data, status=201)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List all orders for the authenticated user
class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsModerator]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


# Retrieve a specific order
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     print("Queryset::::")
    #     print(self.request)
    #     return Order.objects.filter(id=self.request.order)

# class OrderDetailAdminView(APIView):
#     permission_classes = [IsAuthenticated]  # Add IsAdminUser if needed
#
#     def get(self, request, order_id):
#         try:
#             order = Order.objects.get(id=order_id)
#         except Order.DoesNotExist:
#             return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = OrderDetailSerializer(order)
#         return Response(serializer.data)

class AdminOrderDetailView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = AdminOrderSerializer
    permission_classes = [AllowAny]



# Update a specific order
# def can_transition(current_status, next_status, is_paid, payment_type):
#     if payment_type == "sslcommerz" and not is_paid and next_status not in ["Cancelled"]:
#         return False  # Prepaid orders must be paid first
#     return next_status in VALID_TRANSITIONS.get(current_status, [])

def can_transition(current_status, next_status, is_paid, payment_type):
    current_status = current_status.lower()
    next_status = next_status.lower()
    payment_type = payment_type.lower()

    # Prevent skipping payment before processing or shipping
    if payment_type == "sslcommerz":
        if not is_paid and next_status in ["processing", "shipped", "delivered"]:
            return False

    return next_status in VALID_TRANSITIONS.get(current_status, [])


class OrderUpdateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminOrModerator]

    def update(self, request, *args, **kwargs):
        order = self.get_object()
        old_status = order.status
        new_status = request.data.get("status", "").lower()

        print("FROM:", old_status)
        print("TO:", new_status)
        print("IS_PAID:", order.is_paid)
        print("PAYMENT_TYPE:", order.payment_method)

        if not new_status:
            return Response({"error": "New status is required."}, status=400)

        if not can_transition(old_status, new_status, order.is_paid, order.payment_method):
            return Response(
                {"error": f"Invalid transition from '{old_status}' to '{new_status}'."},
                status=400,
            )

        # ✅ Log the status change BEFORE updating
        if old_status != new_status:
            OrderStatusLog.objects.create(
                order=order,
                previous_status=old_status,
                new_status=new_status,
                changed_by=request.user if request.user.is_authenticated else None,
            )

        request.data["status"] = new_status
        return super().update(request, *args, **kwargs)

    # def get_queryset(self):
    #     return Order.objects.filter(user=self.request.user)


# Delete a specific order
class OrderDeleteView(generics.DestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class AdminOrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = AdminOrderSerializer
    # permission_classes = [IsAdminOrModerator]  # ✅ Only staff can view/manage all orders

    # def get_queryset(self):
    #     curr_user = self.request.user
    #     # if curr_user.role in [user.ROLE_ADMIN, user.permissions.ROLE_ADMIN]:
    #     if curr_user.role==1 or curr_user.role==2 or curr_user.role==3:
    #         return Order.objects.all()
    #     return Order.objects.filter(user=curr_user)
    permission_classes = [AllowAny]

class UpdateOrderStatusView(APIView):
    def post(self, request, order_id):
        order = Order.objects.get(pk=order_id)
        new_status = request.data.get("new_status")

        if not new_status or new_status == order.status:
            return Response({"error": "Invalid status"}, status=400)

        # Log the change
        OrderStatusLog.objects.create(
            order=order,
            previous_status=order.status,
            new_status=new_status,
            changed_by=request.user if request.user.is_authenticated else None
        )

        # Update the order
        order.status = new_status
        order.save()

        return Response({"message": "Status updated."})