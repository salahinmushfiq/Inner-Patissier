from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment

@receiver(post_save, sender=Payment)
def update_order_payment_status(sender, instance, created, **kwargs):
    if created and instance.status == "success":
        order = instance.order
        if not order.is_paid:
            order.is_paid = True
            order.save()
