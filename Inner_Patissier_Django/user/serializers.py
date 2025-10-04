from django.db import transaction
from rest_framework import serializers
from .models import User, Hair, Coordinates, Address, Company, Bank, Crypto
from django.contrib.auth.models import Group, Permission


class HairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hair
        fields = ['color', 'type']


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ['lat', 'lng']


class AddressSerializer(serializers.ModelSerializer):
    coordinates = CoordinatesSerializer(required=False, allow_null=True)

    class Meta:
        model = Address
        fields = ['address', 'city', 'state', 'stateCode', 'postalCode', 'country', 'coordinates']

    def create(self, validated_data):
        coordinates_data = validated_data.pop('coordinates', None)
        coordinates = Coordinates.objects.create(**coordinates_data) if coordinates_data else None
        address = Address.objects.create(coordinates=coordinates, **validated_data)
        return address

    def update(self, instance, validated_data):
        coordinates_data = validated_data.pop('coordinates', None)
        if coordinates_data:
            if instance.coordinates:
                for attr, value in coordinates_data.items():
                    setattr(instance.coordinates, attr, value)
                instance.coordinates.save()
            else:
                instance.coordinates = Coordinates.objects.create(**coordinates_data)
                instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class CompanySerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Company
        fields = ['name', 'department', 'title', 'address']

    def create(self, validated_data):
        address_data = validated_data.pop('address', None)
        address = Address.objects.create(**address_data) if address_data else None
        company = Company.objects.create(address=address, **validated_data)
        return company

    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        if address_data:
            if instance.address:
                for attr, value in address_data.items():
                    setattr(instance.address, attr, value)
                instance.address.save()
            else:
                instance.address = Address.objects.create(**address_data)
                instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['cardExpire', 'cardNumber', 'cardType', 'currency', 'iban']


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ['coin', 'wallet', 'network']


class UserSerializer(serializers.ModelSerializer):
    hair = HairSerializer(required=False)
    address = AddressSerializer(required=False)
    company = CompanySerializer(required=False)
    bank = BankSerializer(required=False)
    crypto = CryptoSerializer(required=False)

    class Meta:
        model = User
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        nested_fields = ['hair', 'address', 'company', 'bank', 'crypto']
        nested_instances = {}

        for field in nested_fields:
            nested_data = validated_data.pop(field, None)
            if nested_data:
                model_class = self.fields[field].Meta.model
                nested_instances[field] = model_class.objects.create(**nested_data)

        user = User.objects.create(**validated_data, **nested_instances)
        return user

    @transaction.atomic
    def update(self, instance, validated_data):
        nested_fields = ['hair', 'address', 'company', 'bank', 'crypto']

        for field in nested_fields:
            nested_data = validated_data.pop(field, None)
            if nested_data:
                related_instance = getattr(instance, field, None)
                if related_instance:
                    if field == 'address' and 'coordinates' in nested_data:
                        coordinates_data = nested_data.pop('coordinates', None)
                        if coordinates_data:
                            if related_instance.coordinates:
                                for attr, value in coordinates_data.items():
                                    setattr(related_instance.coordinates, attr, value)
                                related_instance.coordinates.save()
                            else:
                                related_instance.coordinates = Coordinates.objects.create(**coordinates_data)
                                related_instance.save()
                    for attr, value in nested_data.items():
                        setattr(related_instance, attr, value)
                    related_instance.save()
                else:
                    model_class = self.fields[field].Meta.model
                    nested_instance = model_class.objects.create(**nested_data)
                    setattr(instance, field, nested_instance)
                    instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# serializers.py
class SignupSerializer(serializers.ModelSerializer):
    # maidenName = serializers.CharField(required=False, allow_blank=True)
    age = serializers.IntegerField(required=False, default=0)
    gender = serializers.IntegerField(required=False, default=0)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    birthDate = serializers.CharField(required=False, allow_blank=True)
    image = serializers.CharField(required=False, allow_blank=True)
    bloodGroup = serializers.CharField(required=False, allow_blank=True)
    height = serializers.FloatField(required=False, default=0)
    weight = serializers.FloatField(required=False, default=0)
    eyeColor = serializers.CharField(required=False, allow_blank=True)
    ip = serializers.CharField(required=False, allow_blank=True)
    macAddress = serializers.CharField(required=False, allow_blank=True)
    university = serializers.CharField(required=False, allow_blank=True)
    ein = serializers.CharField(required=False, allow_blank=True)
    ssn = serializers.CharField(required=False, allow_blank=True)
    userAgent = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User  # Assuming your model is `User`
        fields = ['email', 'firstName', 'lastName', 'password', 'username', 'age', 'gender', 'phone', 'birthDate',
                  'height',
                  'weight', 'image', 'bloodGroup', 'eyeColor', 'ip', 'macAddress', 'university', 'ein', 'ssn',
                  'userAgent', ]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# class UserSerializer(serializers.ModelSerializer):
#     groups = serializers.PrimaryKeyRelatedField(
#         many=True, queryset=Group.objects.all(), required=False
#     )
#     user_permissions = serializers.PrimaryKeyRelatedField(
#         many=True, queryset=Permission.objects.all(), required=False
#     )
#     hair = HairSerializer(required=False)
#     address = AddressSerializer(required=False)
#     company = CompanySerializer(allow_null=True, required=False)
#     bank = BankSerializer(allow_null=True, required=False)
#     crypto = CryptoSerializer(allow_null=True, required=False)
#
#     class Meta:
#         model = User
#         fields = [
#             'id', 'email', 'firstName', 'lastName', 'maidenName', 'age', 'gender',
#             'phone', 'eyeColor', 'username', 'birthDate', 'image', 'bloodGroup',
#             'height', 'weight', 'macAddress', 'university', 'ssn', 'ein', 'ip',
#             'userAgent', 'hair', 'address', 'company', 'bank', 'crypto',
#             'role', 'is_active', 'is_staff', 'date_joined', 'groups', 'user_permissions'
#         ]
#         read_only_fields = ['id', 'date_joined']
#         extra_kwargs = {
#             'macAddress': {'required': False},
#             'university': {'required': False},
#             'ein': {'required': False},
#             'ip': {'required': False},
#             'userAgent': {'required': False},
#             'bank': {'required': False},
#             'crypto': {'required': False},
#         }
#
#     def create(self, validated_data):
#         # Extract nested fields
#         hair_data = validated_data.pop('hair', None)
#         address_data = validated_data.pop('address', None)
#         company_data = validated_data.pop('company', None)
#         bank_data = validated_data.pop('bank', None)
#         crypto_data = validated_data.pop('crypto', None)
#
#         # Create the main user instance
#         user = User.objects.create(**validated_data)
#
#         # Create related objects using the nested serializers
#         if hair_data:
#             HairSerializer.create(HairSerializer(), validated_data={**hair_data, 'user': user})
#         if address_data:
#             address = AddressSerializer.create(AddressSerializer(), validated_data=address_data)
#             user.address = address
#             user.save()
#         if company_data:
#             company = CompanySerializer.create(CompanySerializer(), validated_data=company_data)
#             user.company = company
#             user.save()
#         if bank_data:
#             BankSerializer.create(BankSerializer(), validated_data={**bank_data, 'user': user})
#         if crypto_data:
#             CryptoSerializer.create(CryptoSerializer(), validated_data={**crypto_data, 'user': user})
#
#         return user
#
#     def update(self, instance, validated_data):
#         # Extract nested fields
#         hair_data = validated_data.pop('hair', None)
#         address_data = validated_data.pop('address', None)
#         company_data = validated_data.pop('company', None)
#         bank_data = validated_data.pop('bank', None)
#         crypto_data = validated_data.pop('crypto', None)
#         groups_data = validated_data.pop('groups', None)
#         user_permissions_data = validated_data.pop('user_permissions', None)
#
#         # Update simple fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#
#         instance.save()
#
#         # Update groups
#         if groups_data is not None:
#             instance.groups.set(groups_data)
#
#         # Update user_permissions
#         if user_permissions_data is not None:
#             instance.user_permissions.set(user_permissions_data)
#
#         # Update nested objects
#         self._update_nested(instance, hair_data, HairSerializer, 'hair', 'hair')
#         self._update_nested(instance, address_data, AddressSerializer, 'address', 'address')
#         self._update_nested(instance, company_data, CompanySerializer, 'company', 'company')
#         self._update_nested(instance, bank_data, BankSerializer, 'bank', 'bank')
#         self._update_nested(instance, crypto_data, CryptoSerializer, 'crypto', 'crypto')
#
#         return instance
#
#     def _update_nested(self, instance, data, serializer_class, related_field, nested_field):
#         if data:
#             if getattr(instance, related_field):
#                 serializer_class().update(getattr(instance, related_field), data)
#             else:
#                 nested_instance = serializer_class.create(serializer_class(), validated_data=data)
#                 setattr(instance, related_field, nested_instance)
#                 instance.save()


class UserProfileSerializer(serializers.ModelSerializer):
    hair = HairSerializer(required=False)
    address = AddressSerializer(required=False)
    company = CompanySerializer(allow_null=True, required=False)
    bank = BankSerializer(allow_null=True, required=False)
    crypto = CryptoSerializer(allow_null=True, required=False)

    class Meta:
        model = User
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['role']  # Add other fields as needed
