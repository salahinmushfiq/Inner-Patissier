from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Cart, CartItem


class CartSerializerTestCase(TestCase):
    def setUp(self):
        # Set up your Cart instance here
        self.cart = Cart.objects.create(
            user=None,  # or a valid user instance if applicable
            guest_token="guest_123",
            total=0,
            discounted_total=0,
            total_quantity=0,
            total_products=0
        )

    def test_cart_creation(self):
        self.assertEqual(self.cart.guest_token, "guest_123")
        self.assertEqual(self.cart.total, 0)
        self.assertEqual(self.cart.total_products, 0)
