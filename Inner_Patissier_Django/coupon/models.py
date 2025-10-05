# from django.db import models
# from user.models import User
#
# class Coupon(models.Model):
#     code = models.CharField(max_length=20, unique=True)
#     discount_type = models.CharField(max_length=10, choices=[('fixed', 'Fixed'), ('percent', 'Percent')])
#     discount_value = models.DecimalField(max_digits=10, decimal_places=2)
#     active = models.BooleanField(default=True)
#     usage_limit = models.PositiveIntegerField(null=True, blank=True)
#     used_count = models.PositiveIntegerField(default=0)
#     expires_at = models.DateTimeField(null=True, blank=True)
#     assigned_to = models.ManyToManyField(User, blank=True)
#
#     def is_valid(self):
#         if not self.active:
#             return False
#         if self.usage_limit and self.used_count >= self.usage_limit:
#             return False
#         if self.expires_at and self.expires_at < timezone.now():
#             return False
#         return True


from django.db import models
from django.utils import timezone
from user.models import User


class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_type = models.CharField(max_length=10, choices=[('fixed', 'Fixed'), ('percent', 'Percent')])
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used_count = models.PositiveIntegerField(default=0)
    expires_at = models.DateTimeField(null=True, blank=True)
    assigned_to = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.code

    def is_valid(self, user=None):
        if not self.active:
            return False
        if self.usage_limit is not None and self.used_count >= self.usage_limit:
            return False
        if self.expires_at and timezone.now() > self.expires_at:
            return False
        if user and self.assigned_to.exists() and user not in self.assigned_to.all():
            return False
        return True


class CouponAssignment(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
