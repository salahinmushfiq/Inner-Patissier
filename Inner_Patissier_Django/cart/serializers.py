from rest_framework import serializers

from products.serializers import ProductSerializer
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # or simply product_id if you want just the ID

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'title', 'price', 'quantity', 'total', 'discount_percentage',
                  'discounted_total']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Use this for user ID

    class Meta:
        model = Cart
        fields = ['id', 'user', 'guest_token', 'total', 'discounted_total', 'total_products', 'total_quantity', 'items']
