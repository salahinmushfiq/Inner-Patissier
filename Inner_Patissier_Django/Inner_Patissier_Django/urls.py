"""
URL configuration for inner_patissier project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('products/', include('products.urls')),
    path('cart/', include('cart.urls')),
    path('order/', include('order.urls')),  # 🚀 New order module included
    path('deliveries/', include('delivery.urls')),
    path('payment/', include('payment.urls')),
    path('coupon/', include('coupon.urls')),

    # re_path(r'^.*$', index),  # Catch-all pattern for serving React
    # re_path(r'^.*$', ReactAppView.as_view(), name='react-app'),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='home'),

]
