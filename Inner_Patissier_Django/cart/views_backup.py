from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.cache import cache
import uuid
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
import logging
import decimal

# Set up logging
logger = logging.getLogger(__name__)


def get_or_create_cart(request):
    """Get or create a cart for the authenticated user or a guest user."""
    if request.user.is_authenticated:
        # If the user is authenticated, get or create a cart for that user
        cart, created = Cart.objects.get_or_create(user=request.user)
        guest_token = None  # No guest token for authenticated users
    else:
        # For guest users, check if there's a guest token in the cookies
        guest_token = request.COOKIES.get('guest_token')
        if not guest_token:
            # If no guest token exists, create a new one and an associated cart
            guest_token = str(uuid.uuid4())
            cart = Cart.objects.create(guest_token=guest_token)
        else:
            # Retrieve the cart associated with the guest token
            cart, created = Cart.objects.get_or_create(guest_token=guest_token)

    return cart, guest_token


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    response = JsonResponse({})
    try:
        cart, guest_token = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        price = request.data.get('price')
        title = request.data.get('title')
        discount_percentage = request.data.get('discountPercentage', 0)

        if not all([product_id, price, title]):
            return JsonResponse({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)
        price = float(price) if price else 0

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={
                'quantity': quantity,
                'price': price,
                'title': title,
                'discount_percentage': discount_percentage,
                'total': price * quantity,
                'discounted_total': price * quantity * (1 - discount_percentage / 100)
            }
        )

        if not item_created:
            cart_item.quantity += quantity
            cart_item.total = cart_item.price * cart_item.quantity
            cart_item.discounted_total = cart_item.total * (1 - (cart_item.discount_percentage / 100))
            cart_item.save()

        # Update cart totals
        cart.total += cart_item.total
        cart.discounted_total += cart_item.discounted_total
        cart.total_quantity += cart_item.quantity
        cart.total_products = CartItem.objects.filter(cart=cart).count()

        cart.save()

        # Return cart data with a response object
        response_data = {
            'cart_id': cart.id,
            'guest_token': guest_token,
            'items': CartItemSerializer(cart.cartitem_set.all(), many=True).data
        }

        logger.info(
            f'Added product '
            f'{product_id} to cart for user: {request.user.id if request.user.is_authenticated else "guest"}')
        return JsonResponse(response_data, status=status.HTTP_200_OK)

    except IntegrityError as e:
        return JsonResponse({'error': f'Integrity error: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def view_cart(request):
    cart, guest_token = get_or_create_cart(request)
    # 'items': CartItemSerializer(cart.cartitem_set.all(), many=True).data
    cart_serialized = CartSerializer(cart)

    print("cart_serialized")
    items = CartItemSerializer(cart.cartitem_set.all(), many=True)
    cart_serialized.items = items
    return Response({"items": items.data})


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_from_cart(request, product_id):
    cart, _ = get_or_create_cart(request)

    try:
        cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
    except CartItem.DoesNotExist:
        return Response({'error': 'Product not found in cart'}, status=status.HTTP_404_NOT_FOUND)

    # Update cart totals before deleting the item
    cart.total -= cart_item.total
    cart.discounted_total -= cart_item.discounted_total
    cart.total_quantity -= cart_item.quantity
    cart_item.delete()

    # Update the total products count in the cart
    cart.total_products = CartItem.objects.filter(cart=cart).count()
    cart.save()

    return Response({'message': 'Product removed from cart', 'cart': CartSerializer(cart).data})


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cart_item(request, product_id):
    quantity = request.data.get('quantity')

    if not quantity or int(quantity) <= 0:
        return Response({'error': 'Quantity must be a positive integer'}, status=status.HTTP_400_BAD_REQUEST)

    cart, _ = get_or_create_cart(request)

    try:
        cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
    except CartItem.DoesNotExist:
        return Response({'error': 'Product not found in cart'}, status=status.HTTP_404_NOT_FOUND)

    # Update cart totals before modifying the item
    print("Check Type")
    print(type(cart_item.total))
    print(type(cart.total))
    cart.total = decimal.Decimal(cart.total)
    cart.total -= cart_item.total

    cart.discounted_total -= cart_item.discounted_total
    cart.total_quantity -= cart_item.quantity

    # Update the cart item details
    cart_item.quantity = int(quantity)
    cart_item.total = cart_item.price * cart_item.quantity
    cart_item.discounted_total = cart_item.total * (1 - float(cart_item.discount_percentage) / 100)
    cart_item.save()

    # Update the cart totals after the item has been updated
    print("Check Type")
    print(type(cart_item.total))
    print(type(cart.total))
    cart_item.total = (cart_item.total)
    cart.total = (cart.total)
    print(type(cart.total))
    cart.total += decimal.Decimal(cart_item.total)
    cart.discounted_total += decimal.Decimal(cart_item.discounted_total)
    cart.total_quantity += cart_item.quantity
    cart.save()

    return Response({'message': 'Cart item updated', 'cart': CartSerializer(cart).data})
