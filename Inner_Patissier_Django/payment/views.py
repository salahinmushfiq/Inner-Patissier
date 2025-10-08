# payment/views.py

import requests
from django.utils.decorators import method_decorator
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from .models import Payment
from .serializers import PaymentSerializer
from order.models import Order
from user.models import Address, Coordinates


class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]


class PaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]


# ✅ SSLCOMMERZ sandbox initiation
# @method_decorator(csrf_exempt, name='dispatch')
# class SSLCommerzInitView(APIView):
#     permission_classes = [AllowAny]
#
#     @csrf_exempt
#     def get(self, request):
#         return Response({"detail": "This is GET"})
#
#     @csrf_exempt
#     def post(self, request):  # ✅ must be lowercase `post`
#         order_id = request.data.get("order_id")
#         print("order id")
#         print(order_id)
#         order = get_object_or_404(Order, pk=order_id)
#         print("order")
#         print(order)
#         print(order.is_paid)
#         if order.is_paid:
#             return Response({"detail": "Order already paid."}, status=status.HTTP_400_BAD_REQUEST)
#
#         payload = {
#             "store_id": settings.SSLCOMMERZ_STORE_ID,
#             "store_passwd": settings.SSLCOMMERZ_STORE_PASSWORD,
#             "total_amount": str(order.discounted_total),
#             "currency": "BDT",
#             "tran_id": f"order_{order.id}",
#             "success_url": settings.SSL_SUCCESS_URL,
#             "fail_url": settings.SSL_FAIL_URL,
#             "cancel_url": settings.SSL_CANCEL_URL,
#             "cus_name": f"{order.user.first_name if order.user else 'Guest'}",
#             "cus_email": order.user.email if order.user else "guest@example.com",
#             # "cus_add1": order.address.address,
#             # "cus_city": order.address.city,
#             # "cus_country": order.address.country,
#             # ✅ REQUIRED
#             "shipping_method": "Courier",
#             "cus_add1": order.address.address if order.address else "N/A",
#             "cus_city": order.address.city if order.address else "N/A",
#             "cus_country": order.address.country if order.address else "Bangladesh",
#             "cus_phone": order.user.phone if order.user else "0000000000",
#         }
#
#         response = requests.post(
#             "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
#             data=payload
#         )
#
#         result = response.json()
#         print("SSLCOMMERZ response:", result)
#
#         if result.get("status") == "SUCCESS":
#             Payment.objects.create(
#                 order=order,
#                 method="SSLCOMMERZ",
#                 amount=order.discounted_total,
#                 gateway_transaction_id=payload["tran_id"],
#                 success=False
#             )
#             return Response({"payment_url": result["GatewayPageURL"]})
#         return Response({"error": result}, status=status.HTTP_400_BAD_REQUEST)


# ✅ Callbacks for SSLCOMMERZ Sandbox
@method_decorator(csrf_exempt, name='dispatch')
class SSLCommerzInitView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt
    def get(self, request):
        return Response({"detail": "This is GET"})

    @csrf_exempt
    def post(self, request):

        order_id = request.data.get("order_id")
        if not order_id:
            return Response({"error": "Order ID not provided."}, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, pk=order_id)

        if order.is_paid:
            return Response({"detail": "Order already paid."}, status=status.HTTP_400_BAD_REQUEST)

        # if not order.address:
        #     return Response({"error": "Order address is missing."}, status=status.HTTP_400_BAD_REQUEST)
        #     # ✅ Create dummy address if none
        # ✅ Ensure address exists
        if not order.address:
            coords = Coordinates.objects.create(lat=23.8103, lng=90.4125)
            dummy_address = Address.objects.create(
                address="123 Dummy Street",
                city="Dhaka",
                state="Dhaka",
                stateCode="13",
                postalCode="1207",
                coordinates=coords,
                country="Bangladesh"
            )
            order.address = dummy_address
            order.payment_method = "SSLCOMMERZ"
            order.save()

        # ✅ Extract safe user info (for both logged in and guest users)
        user = order.user
        user_name = getattr(user, "first_name", None) or getattr(user, "username", "Guest")
        user_email = getattr(user, "email", "guest@example.com")
        user_phone = getattr(user, "phone", "0000000000")
        # if not order.user:
        #     print(order.user)
        #     return Response({"error": "Order user is missing."}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        payload = {
            "store_id": settings.SSLCOMMERZ_STORE_ID,
            "store_passwd": settings.SSLCOMMERZ_STORE_PASSWORD,
            "total_amount": f"{order.discounted_total:.2f}",
            "currency": "BDT",
            "tran_id": f"order_{order.id}",
            "success_url": settings.SSL_SUCCESS_URL,
            "fail_url": settings.SSL_FAIL_URL,
            "cancel_url": settings.SSL_CANCEL_URL,

            # Customer Info
            "cus_name": user_name,
            "cus_email": user_email,
            "cus_add1": order.address.address,
            "cus_city": order.address.city,
            "cus_country": order.address.country,
            "cus_phone": user_phone,

            # Required Shipping Info
            "shipping_method": "Courier",
            "ship_name": user_name,
            "ship_add1": order.address.address,
            "ship_city": order.address.city,
            "ship_postcode": order.address.postalCode,  # ✅ Add this line
            "ship_country": order.address.country,
            "product_name": ", ".join(item.title for item in order.items.all()),
            "product_category": "food",
            "product_profile": "physical-goods"

        }

        # ✅ Call SSLCOMMERZ API
        response = requests.post(
            "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data=payload
        )

        result = response.json()
        print("SSLCOMMERZ response:", result)
        print(result.get("status"))

        if result.get("status") == "SUCCESS":
            Payment.objects.create(
                order=order,
                method="SSLCOMMERZ",
                amount=order.discounted_total,
                gateway_transaction_id=payload["tran_id"],
                status="pending"
            )
            return Response({"payment_url": result["GatewayPageURL"]})

        return Response({
            "error": "Failed to initiate payment.",
            "reason": result.get("failedreason", "Unknown reason."),
            "details": result
        }, status=status.HTTP_400_BAD_REQUEST)

    # except Exception as e:
    #     print("Exception during payment initiation:", str(e))
    #     return Response({
    #         "error": "An unexpected error occurred.",
    #         "details": str(e)
    #     }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SSLPaymentSuccessView(APIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [AllowAny]

    def post(self, request):
        tran_id = request.data.get("tran_id")
        order = get_object_or_404(Order, id=tran_id.replace("order_", ""))
        payment = Payment.objects.filter(order=order).first()
        print("successful")
        print(order)
        print(payment)
        if payment:
            payment.status = "success"
            payment.save()

        order.is_paid = True
        order.status = "confirmed"
        order.save()
        return redirect(f"/checkout/details/{order.id}/")
        # return Response({"message": "Payment successful"})


class SSLPaymentFailView(APIView):
    def post(self, request):
        return Response({"message": "Payment failed"}, status=status.HTTP_400_BAD_REQUEST)


class SSLPaymentCancelView(APIView):
    def post(self, request):
        return Response({"message": "Payment cancelled"}, status=status.HTTP_200_OK)
