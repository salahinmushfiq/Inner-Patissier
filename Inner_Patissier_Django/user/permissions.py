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