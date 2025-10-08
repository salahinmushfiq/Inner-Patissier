from rest_framework.permissions import BasePermission

# Define role constants for better readability and maintainability
ROLE_GUEST = 0
ROLE_CUSTOMER = 1
ROLE_MODERATOR = 2
ROLE_ADMIN = 3

class IsAdmin(BasePermission):
    """
    Allows access only to admin users (role == 3).
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated and has the admin role
        return request.user.is_authenticated and request.user.role == ROLE_ADMIN


class IsModerator(BasePermission):
    """
    Allows access only to moderator users (role == 2).
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated and has the moderator role
        return request.user.is_authenticated and request.user.role == ROLE_MODERATOR


class IsAdminOrModerator(BasePermission):
    """
    Allows access to both admin (role == 3) and moderator (role == 2) users.
    """
    # def has_permission(self, request, view):
    #     # Ensure the user is authenticated and has either admin or moderator role
    #
    #     return request.user.is_authenticated and request.user.role in [ROLE_MODERATOR, ROLE_ADMIN]

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            print("User is not authenticated.")
            return False
        if request.user.role == ROLE_ADMIN or request.user.role == ROLE_MODERATOR:
            return True
        print("User does not have the required permissions.")
        return False


class IsAuthenticatedOrGuestToken(BasePermission):
    """
    Allows access if the user is authenticated OR if the guest_token in cookies matches the order.
    """

    def has_permission(self, request, view):
        # Logged-in users can proceed
        if request.user.is_authenticated:
            return True

        # Guests: check for guest_token in cookies
        token = request.COOKIES.get("guest_token")
        return bool(token)

    def has_object_permission(self, request, view, obj):
        # Logged-in users must own the order
        if request.user.is_authenticated:
            return obj.user == request.user

        # Guests must have a matching guest_token
        token = request.COOKIES.get("guest_token")
        return token and getattr(obj, "guest_token", None) == token