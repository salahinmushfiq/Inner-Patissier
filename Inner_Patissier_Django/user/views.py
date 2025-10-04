from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, SignupSerializer, UserProfileSerializer, RoleSerializer
from .models import User, Coordinates, Address, Company, Hair, Bank, Crypto
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.db import transaction
from django.db import IntegrityError
from django.contrib.auth.hashers import check_password
import logging
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import PermissionDenied

logger = logging.getLogger(__name__)


class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new user
            user = serializer.save()

            # Generate tokens for the new user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Return response with tokens
            return Response({
                'detail': 'User created successfully',
                'Token': access_token,
                'refresh': refresh_token,
            }, status=status.HTTP_201_CREATED)

        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Fetch the user using email
            user = User.objects.get(email=email)

            # Check if the provided password matches the stored hashed password
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'Token': str(refresh.access_token)
                })
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklists the token
            return Response({'detail': 'Successfully logged out'}, status=status.HTTP_204_NO_CONTENT)
        except TokenError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info(f"User retrieving profile: {request.user}")
        user = request.user
        serializer = UserSerializer(user)  # Serialize the user data
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        logger.info(f"User trying to update profile: {request.user}")
        logger.debug(f"Request data: {request.data}")  # Log incoming request data
        user = request.user  # Get the current authenticated user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            logger.info("User profile updated successfully.")
            return Response(serializer.data, status=status.HTTP_200_OK)

        logger.error(f"Validation errors: {serializer.errors}")  # Log validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request):
    #     user = request.user  # Get the current authenticated user
    #     serializer = UserSerializer(user, data=request.data, partial=True)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'limit'
    max_page_size = 100


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserPagination

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'users': response.data,
            'total': self.get_queryset().count(),
            'skip': self.paginator.page.number - 1,
            'limit': self.paginator.page.paginator.per_page
        })


# User List View
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'users': response.data,
        })


class UserProfileDetailsView(generics.RetrieveAPIView):
    queryset = User.objects.all()  # Get all users
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    # def get_object(self):
    #     # You can override this method if you need to fetch the user differently
    #     return super().get_object()


class BulkUserCreateView(APIView):

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        users_data = request.data
        created_users = []

        try:
            for user_data in users_data:
                # Handle nested fields separately
                hair_data = user_data.pop('hair')
                address_data = user_data.pop('address')
                bank_data = user_data.pop('bank')
                company_data = user_data.pop('company')
                crypto_data = user_data.pop('crypto')

                # Create Coordinates instance for address
                coordinates_data = address_data.pop('coordinates')
                coordinates = Coordinates.objects.create(**coordinates_data)

                # Create Address instance
                address = Address.objects.create(coordinates=coordinates, **address_data)

                # Handle company address similarly
                company_address_data = company_data.pop('address')
                company_coordinates_data = company_address_data.pop('coordinates')
                company_coordinates = Coordinates.objects.create(**company_coordinates_data)
                company_address = Address.objects.create(coordinates=company_coordinates, **company_address_data)

                # Create other related objects
                hair = Hair.objects.create(**hair_data)
                bank = Bank.objects.create(**bank_data)
                company = Company.objects.create(address=company_address, **company_data)
                crypto = Crypto.objects.create(**crypto_data)

                # Create the user with the nested relations
                user = User.objects.create(
                    hair=hair,
                    address=address,
                    bank=bank,
                    company=company,
                    crypto=crypto,
                    **user_data
                )
                created_users.append(user)

            return Response({"detail": "Users created successfully"}, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            transaction.set_rollback(True)
            return Response({"detail": f"Error creating users: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


# Role Update View
class RoleUpdateView(APIView):
    queryset = User.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, user_id):
        try:
            user_to_update = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        new_role = request.data.get('role')

        if request.user.role == 3:  # Admin
            user_to_update.role = new_role
            user_to_update.save()
            return Response({'message': 'Role updated successfully'}, status=status.HTTP_200_OK)

        if request.user.role == 2:  # Moderator
            if user_to_update.role == 0 and new_role == 1:  # Guest to Customer
                user_to_update.role = new_role
                user_to_update.save()
                return Response({'message': 'Role updated successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Moderators can only change guest to customer'},
                                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
                # raise PermissionDenied('Moderators can only change guest to customer.')

        raise PermissionDenied('You do not have permission to change roles.')


# Custom Login View (prevents guest users from logging in)
class CustomLoginView(ObtainAuthToken):
    # def post(self, request, *args, **kwargs):
    #     response = super().post(request, *args, **kwargs)
    #     token = Token.objects.get(key=response.data['token'])
    #     user = token.user
    #
    #     if user.role == 0:  # Guest
    #         return Response({'error': 'Guests cannot login until their role is changed.'}, status=status.HTTP_403_FORBIDDEN)
    #
    #     return response

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Fetch the user using email
            user = User.objects.get(email=email)

            # Check if the provided password matches the stored hashed password
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                token = refresh.access_token
                # user = token.user
                if user.role == 0:  # Guest
                    return Response({'error': 'Guests cannot login until their role is changed.'},
                                    status=status.HTTP_403_FORBIDDEN)
                return Response({
                    'refresh': str(refresh),
                    'Token': str(refresh.access_token)
                })
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
