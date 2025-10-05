# order/urls.py
from django.urls import path
from .views import OrderCreateView, OrderListView, OrderDetailView, OrderUpdateView, OrderDeleteView, \
    AdminOrderListView, AdminOrderDetailView, UpdateOrderStatusView

urlpatterns = [
    path('create/', OrderCreateView.as_view(), name='order-create'),
    path('', OrderListView.as_view(), name='order-list'),  # for customers
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    # path('admin/<int:pk>/update/', OrderUpdateView.as_view(), name='order-update'),
    path('<int:pk>/delete/', OrderDeleteView.as_view(), name='order-delete'),
    # Admin-only endpoints
    path('admin/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('admin/<int:pk>/update/', OrderUpdateView.as_view(), name='order-update'),
    # path('admin/orders/<int:order_id>/', OrderDetailAdminView.as_view(), name='order-detail-admin'),
    path('admin/<int:pk>/', AdminOrderDetailView.as_view(), name='admin-order-detail'),
    # path('order/<int:order_id>/status-update/', UpdateOrderStatusView.as_view(), name='order-status-update'),

]
