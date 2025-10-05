# delivery/models.py
from django.db import models
from django.conf import settings
from order.models import Order
from order.constants import DELIVERY_STATUS_CHOICES


class Delivery(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="delivery")
    deliveryman = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL,
                                    related_name="deliveries")
    tracking_code = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=DELIVERY_STATUS_CHOICES, default="assigned")
    delivery_started_at = models.DateTimeField(null=True, blank=True)
    delivery_completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
