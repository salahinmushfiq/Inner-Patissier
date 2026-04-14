# products/views.py
import csv

from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from user.permissions import IsAdminOrModerator
from .models import Product
from .permissions import IsCustomer, IsAdminOrModerator
from .serializers import ProductSerializer, ProductPartialUpdateSerializer, \
    BulkProductSerializer, BulkProductJSONSerializer, ProductStockUpdateSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import CursorPagination


class ProductCursorPagination(CursorPagination):
    page_size = 12
    ordering = "-id"


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductCursorPagination

    def get_queryset(self):
        queryset = Product.objects.all().only(
            "id", "title", "price", "discountPercentage",
            "description", "thumbnail", "images"
        ).order_by("-id")

        search = self.request.query_params.get("search")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if search:
            queryset = queryset.filter(title__icontains=search)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrModerator]  # Allow only admins and moderators to manage products


class BulkProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAdminOrModerator]  # Only allow bulk creation by admins or moderators


class BulkProductDelete(generics.DestroyAPIView):
    permission_classes = [IsAdminOrModerator]  # Only allow bulk delete by admins or moderators

    def delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        products = Product.objects.filter(id__in=ids)
        deleted_count, _ = products.delete()
        return Response({'deleted_count': deleted_count}, status=status.HTTP_204_NO_CONTENT)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['PATCH', 'PUT']:
            return ProductPartialUpdateSerializer
        return ProductSerializer

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = request.method == 'PATCH'  # Allow partial updates
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Bulk create

    def bulk_create(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Bulk delete

    def bulk_delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        products = Product.objects.filter(id__in=ids)
        deleted_count, _ = products.delete()
        return Response({'deleted_count': deleted_count}, status=status.HTTP_204_NO_CONTENT)

    # @csrf_exempt
    # class BulkAddProducts(APIView):
    #     def post(self, request, *args, **kwargs):
    #         # Deserialize the JSON data
    #         serializer = BulkProductJSONSerializer(data=request.data)
    #
    #         if serializer.is_valid():
    #             products_data = serializer.validated_data['products']
    #
    #             # Prepare product instances for bulk creation
    #             products = [Product(**product_data) for product_data in products_data]
    #
    #             # Bulk create products
    #             Product.objects.bulk_create(products)
    #
    #             return Response({'message': 'Products added successfully!'}, status=status.HTTP_201_CREATED)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['patch'], url_path='update-stock', permission_classes=[IsAdminOrModerator])
    def update_stock(self, request, pk=None):
        product = self.get_object()
        serializer = ProductStockUpdateSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
class BulkAddProducts(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BulkProductJSONSerializer(data=request.data)

        if serializer.is_valid():
            products_data = serializer.validated_data['products']
            products = [Product(**product_data) for product_data in products_data]
            Product.objects.bulk_create(products)

            return Response({'message': 'Products added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
