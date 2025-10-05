from django.db import models
from django.conf import settings
from products.models import Product
from decimal import Decimal

class Cart(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='carts',
        null=True,  # Allow null for guest users
        blank=True  # Allow blank for guest users
    )  # Removed the comma here
    guest_token = models.CharField(max_length=255, null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discounted_total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total_quantity = models.IntegerField(default=0)
    total_products = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.pk} - User: {self.user}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Ensure this exists
    title = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discounted_total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))

    def __str__(self):
        return f"{self.quantity}x {self.title} in cart"
