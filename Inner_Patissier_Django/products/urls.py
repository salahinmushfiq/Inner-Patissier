# products/urls.py

from django.urls import path
from .views import ProductList, ProductDetail, BulkProductCreate, BulkProductDelete, ProductViewSet, BulkAddProducts
from rest_framework.routers import DefaultRouter

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', ProductList.as_view(), name='product-list'),  # List and create products
    path('<int:pk>/', ProductDetail.as_view(), name='product-detail'),  # Retrieve, update, and delete a product
    # path('bulk-create/', BulkProductCreate.as_view(), name='bulk-product-create'),  # Bulk add products
    # path('bulk-add/', BulkAddProducts, name='bulk-product-create'),  # Bulk add products
    path('bulk-delete/', BulkProductDelete.as_view(), name='bulk-product-delete'),  # Bulk delete products
    path('bulk-add/', ProductViewSet.as_view({'post': 'bulk_create'}), name='product-bulk-create'),

]

urlpatterns += router.urls  # Include router URLs for viewset
