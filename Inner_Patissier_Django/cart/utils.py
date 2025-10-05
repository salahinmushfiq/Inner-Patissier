# cart/utils.py
import uuid
from .models import Cart


def get_or_create_cart(request, response=None):
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
        guest_token = None
    else:
        guest_token = request.COOKIES.get('guest_token')
        if not guest_token and response:
            guest_token = str(uuid.uuid4())
            response.set_cookie('guest_token', guest_token, httponly=True)
        cart, created = Cart.objects.get_or_create(guest_token=guest_token)

    return cart, created, guest_token
