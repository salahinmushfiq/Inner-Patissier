import random
import string
from .models import Coupon


def generate_unique_coupon_code(length=8):
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if not Coupon.objects.filter(code=code).exists():
            return code
