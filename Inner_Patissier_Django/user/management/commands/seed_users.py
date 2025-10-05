from django.core.management.base import BaseCommand
from user.models import User, Hair, Address,Coordinates
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = 'Seed fake customer users'

    def add_arguments(self, parser):
        parser.add_argument('--total', type=int, default=10, help='Number of users to create')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        created = 0

        for _ in range(total):
            username = fake.user_name()
            email = fake.email()
            if User.objects.filter(username=username).exists():
                continue

            hair = Hair.objects.create(
                color=random.choice(['Brown', 'Blonde', 'Black', 'Red']),
                type=random.choice(['Curly', 'Straight', 'Wavy'])
            )

            coords = Coordinates.objects.create(
                lat=float(fake.latitude()),
                lng=float(fake.longitude())
            )

            address = Address.objects.create(
                address=fake.street_address(),
                city=fake.city(),
                state=fake.state(),
                stateCode=fake.state_abbr(),
                postalCode=fake.zipcode(),
                country=fake.country(),
                coordinates=coords  # assign the Coordinates instance here
            )

            user = User.objects.create_user(
                username=username,
                email=email,
                password="testpass123",
                firstName=fake.first_name(),
                lastName=fake.last_name(),
                maidenName=fake.last_name(),
                age=random.randint(18, 65),
                gender=random.randint(0, 2),
                phone=fake.phone_number(),
                eyeColor=random.choice(['Blue', 'Green', 'Brown', 'Hazel']),
                birthDate=str(fake.date_of_birth()),
                image=fake.image_url(),
                bloodGroup=random.choice(['A+', 'O-', 'B+', 'AB+']),
                height=random.uniform(150, 200),
                weight=random.uniform(50, 100),
                macAddress=fake.mac_address(),
                university=fake.company(),
                ssn=fake.ssn(),
                ein=fake.ein(),
                ip=fake.ipv4(),
                userAgent=fake.user_agent(),
                hair=hair,
                address=address,
                role=1  # Customer
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} fake customers.'))
