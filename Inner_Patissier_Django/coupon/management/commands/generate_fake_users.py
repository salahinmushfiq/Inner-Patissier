import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
from user.models import User, Address, Coordinates, Hair, Bank, Company, Crypto

fake = Faker()

CATEGORY_CHOICES = [
    "Champions",
    "Loyal Customers",
    "Potential Loyalist",
    "New Customers",
    "At Risk",
    "Hibernating",
    "Lost",
]

US_CITIES = [
    {"city": "New York", "state": "NY", "lat": 40.7128, "lng": -74.0060},
    {"city": "Los Angeles", "state": "CA", "lat": 34.0522, "lng": -118.2437},
    {"city": "Chicago", "state": "IL", "lat": 41.8781, "lng": -87.6298},
    {"city": "Houston", "state": "TX", "lat": 29.7604, "lng": -95.3698},
    {"city": "Phoenix", "state": "AZ", "lat": 33.4484, "lng": -112.0740},
    {"city": "Philadelphia", "state": "PA", "lat": 39.9526, "lng": -75.1652},
    {"city": "San Antonio", "state": "TX", "lat": 29.4241, "lng": -98.4936},
    {"city": "San Diego", "state": "CA", "lat": 32.7157, "lng": -117.1611},
    {"city": "Dallas", "state": "TX", "lat": 32.7767, "lng": -96.7970},
    {"city": "San Jose", "state": "CA", "lat": 37.3382, "lng": -121.8863},
]

def random_coordinates_near(lat, lng, radius_km=50):
    # Approximate degree radius (roughly 111km per degree)
    radius_deg = radius_km / 111.0
    return lat + random.uniform(-radius_deg, radius_deg), lng + random.uniform(-radius_deg, radius_deg)


class Command(BaseCommand):
    help = "Generate 500 fake users with nested data for testing heatmap and RFM"

    def handle(self, *args, **options):
        created_count = 0
        for _ in range(500):
            city_info = random.choice(US_CITIES)
            lat, lng = random_coordinates_near(city_info["lat"], city_info["lng"])

            # Create Coordinates
            coords = Coordinates.objects.create(lat=lat, lng=lng)

            # Create Address
            address = Address.objects.create(
                address=fake.street_address(),
                city=city_info["city"],
                state=city_info["state"],
                stateCode=city_info["state"],
                postalCode=fake.zipcode(),
                country="United States",
                coordinates=coords
            )

            # Create Hair (optional details)
            hair = Hair.objects.create(
                color=random.choice(["Black", "Brown", "Blonde", "Red", "Gray"]),
                type=random.choice(["Curly", "Straight", "Wavy", "Bald"])
            )

            # Bank (simple fake)
            bank = Bank.objects.create(
                cardExpire=fake.credit_card_expire(),
                cardNumber=fake.credit_card_number(card_type=None),
                cardType=random.choice(["Visa", "MasterCard", "Amex", "Discover"]),
                currency=random.choice(["USD", "EUR", "GBP"]),
                iban=fake.iban()
            )

            # Company Address
            comp_coords = Coordinates.objects.create(
                lat=lat + random.uniform(-0.01, 0.01),
                lng=lng + random.uniform(-0.01, 0.01)
            )
            comp_address = Address.objects.create(
                address=fake.street_address(),
                city=city_info["city"],
                state=city_info["state"],
                stateCode=city_info["state"],
                postalCode=fake.zipcode(),
                country="United States",
                coordinates=comp_coords
            )

            # Company
            company = Company.objects.create(
                department=random.choice(["Sales", "Engineering", "HR", "Marketing"]),
                name=fake.company(),
                title=random.choice(["Manager", "Developer", "Analyst", "Executive"]),
                address=comp_address
            )

            # Crypto Wallet
            crypto = Crypto.objects.create(
                coin=random.choice(["Bitcoin", "Ethereum", "Litecoin"]),
                wallet=fake.sha256(),
                network=random.choice(["Ethereum (ERC20)", "Bitcoin", "Litecoin"])
            )

            # Generate user fields
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.unique.email()
            username = fake.unique.user_name()
            birth_date = fake.date_of_birth(minimum_age=18, maximum_age=80).strftime("%Y-%m-%d")

            user = User.objects.create(
                email=email,
                firstName=first_name,
                lastName=last_name,
                role=random.choice([1, 2, 3]),
                is_active=True,
                is_staff=False,
                maidenName=fake.last_name(),
                age=random.randint(18, 70),
                gender=random.choice([0, 1, 2]),
                phone=fake.phone_number(),
                eyeColor=random.choice(["Blue", "Green", "Brown", "Hazel"]),
                username=username,
                birthDate=birth_date,
                image=fake.image_url(),
                bloodGroup=random.choice(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
                height=round(random.uniform(150, 200), 2),
                weight=round(random.uniform(50, 100), 2),
                macAddress=fake.mac_address(),
                university=fake.company(),
                ssn=fake.ssn(),
                ein=fake.bothify(text='???-##-####'),
                ip=fake.ipv4(),
                userAgent=fake.user_agent(),
                hair=hair,
                address=address,
                bank=bank,
                company=company,
                crypto=crypto,
                category=random.choice(CATEGORY_CHOICES),
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully created {created_count} fake users.'))
