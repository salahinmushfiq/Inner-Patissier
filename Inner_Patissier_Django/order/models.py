# order/models.py

from django.db import models
from django.conf import settings
from decimal import Decimal
from user.models import Address
from coupon.models import Coupon
from products.models import Product
from .constants import ORDER_STATUS_CHOICES, PAYMENT_METHOD_CHOICES


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    guest_token = models.CharField(max_length=255, null=True, blank=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    coupon = models.ForeignKey(Coupon, null=True, blank=True, on_delete=models.SET_NULL)

    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discounted_total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total_quantity = models.PositiveIntegerField(default=0)
    total_products = models.PositiveIntegerField(default=0)

    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default="COD")
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.pk} by {self.user or self.guest_token}"

    def save(self, *args, **kwargs):
        if self.status:
            self.status = self.status.lower()
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discounted_total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    def __str__(self):
        return f"{self.quantity}x {self.title} in Order {self.order_id}"


class OrderStatusLog(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="status_logs")
    previous_status = models.CharField(max_length=20)
    new_status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["timestamp"]


