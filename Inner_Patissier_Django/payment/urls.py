# payment/urls.py

from django.urls import path
from .views import PaymentListCreateView, PaymentDetailView, SSLCommerzInitView, SSLPaymentSuccessView, \
    SSLPaymentFailView, SSLPaymentCancelView

urlpatterns = [
    path('', PaymentListCreateView.as_view(), name='payment-list-create'),
    path('<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),

    # ✅ SSLCOMMERZ sandbox payment integration
    path('initiate/', SSLCommerzInitView.as_view(), name='sslcommerz-initiate'),
    path('success/', SSLPaymentSuccessView.as_view(), name='sslcommerz-success'),
    path('fail/', SSLPaymentFailView.as_view(), name='sslcommerz-fail'),
    path('cancel/', SSLPaymentCancelView.as_view(), name='sslcommerz-cancel'),
]
