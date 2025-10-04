from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser, Group, \
    Permission
from django.db import models


# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        extra_fields.setdefault('role', 0)  # Default role set to 0 at signup
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 3)  # Superuser role, for example
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class Coordinates(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()


class Address(models.Model):
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    stateCode = models.CharField(max_length=10)
    postalCode = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    coordinates = models.OneToOneField(Coordinates, on_delete=models.CASCADE, null=True, blank=True)


class Hair(models.Model):
    color = models.CharField(max_length=50)
    type = models.CharField(max_length=50)


class Bank(models.Model):
    cardExpire = models.CharField(max_length=10)
    cardNumber = models.CharField(max_length=20)
    cardType = models.CharField(max_length=40)
    currency = models.CharField(max_length=10)
    iban = models.CharField(max_length=34)


class Company(models.Model):
    department = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)


class Crypto(models.Model):
    coin = models.CharField(max_length=50)
    wallet = models.CharField(max_length=100)
    network = models.CharField(max_length=50)


# User Model
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        (0, 'Guest'),
        (1, 'Customer'),
        (2, 'Employee'),
        (3, 'Admin'),
    )

    Gender_CHOICES = (
        (0, 'Male'),
        (1, 'Female'),
        (2, 'Others'),
    )

    email = models.CharField(max_length=100)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    role = models.IntegerField(choices=ROLE_CHOICES, default=0)  # Editable field
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    maidenName = models.CharField(max_length=50)
    age = models.IntegerField()
    gender = models.IntegerField(choices=Gender_CHOICES)
    phone = models.CharField(max_length=50)
    eyeColor = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    birthDate = models.CharField(max_length=50)
    image = models.CharField(max_length=800)
    bloodGroup = models.CharField(max_length=50)
    height = models.FloatField()
    weight = models.FloatField()
    macAddress = models.CharField(max_length=50)
    university = models.CharField(max_length=50)
    ssn = models.CharField(max_length=50)
    ein = models.CharField(max_length=50)
    ip = models.CharField(max_length=100)
    userAgent = models.CharField(max_length=150)
    # hair = models.OneToOneField(Hair, on_delete=models.CASCADE)
    # address = models.OneToOneField(Address, on_delete=models.CASCADE)
    # bank = models.OneToOneField(Bank, on_delete=models.CASCADE)
    # company = models.OneToOneField(Company, on_delete=models.CASCADE)
    # crypto = models.OneToOneField(Crypto, on_delete=models.CASCADE)
    hair = models.OneToOneField(Hair, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True, blank=True)
    bank = models.OneToOneField(Bank, on_delete=models.SET_NULL, null=True, blank=True)
    company = models.OneToOneField(Company, on_delete=models.SET_NULL, null=True, blank=True)
    crypto = models.OneToOneField(Crypto, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)



    # Add any custom fields here
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Use a unique related_name
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # Use a unique related_name
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['firstName', 'lastName']

    def __str__(self):
        return self.email
