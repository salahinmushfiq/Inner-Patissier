from django.core.management.base import BaseCommand
from order.models import Order
from user.models import User
from user.models import Address
from decimal import Decimal
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Seed test paid orders for RFM analysis'

    def handle(self, *args, **kwargs):
        users = User.objects.filter(role=1)[:10]  # customer role
        address = Address.objects.first()

        if not address:
            self.stdout.write(self.style.ERROR("❌ No address found."))
            return

        for user in users:
            for _ in range(random.randint(1, 5)):
                days_ago = random.randint(1, 100)
                Order.objects.create(
                    user=user,
                    address=address,
                    total=Decimal('100.00'),
                    discounted_total=Decimal(str(random.randint(50, 200))),
                    total_quantity=random.randint(1, 5),
                    total_products=random.randint(1, 3),
                    is_paid=True,
                    status='delivered',
                    created_at=timezone.now() - timezone.timedelta(days=days_ago),
                    updated_at=timezone.now() - timezone.timedelta(days=days_ago)
                )

        self.stdout.write(self.style.SUCCESS('✅ Sample paid orders created.'))
