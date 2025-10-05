from django.db import models
from decimal import Decimal
from order.models import Order
from .constants import PAYMENT_METHOD_CHOICES, PAYMENT_STATUS_CHOICES


class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))

    gateway_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default="pending")
    message = models.TextField(blank=True, null=True)

    is_verified = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    gateway_transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)

    def __str__(self):
        return f"{self.method} payment for Order {self.order.id} - {self.status}"
