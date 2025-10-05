from rest_framework.permissions import BasePermission

# Define role constants for better readability and maintainability
ROLE_GUEST = 0
ROLE_CUSTOMER = 1
ROLE_MODERATOR = 2
ROLE_ADMIN = 3


class IsCustomer(BasePermission):
    """
    Allows access only to customer users (role == 1).
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == ROLE_CUSTOMER


class IsEmployee(BasePermission):
    """
    Allows access only to employee users (role == 0).
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == ROLE_GUEST


class IsAdminOrModerator(BasePermission):
    """
    Custom permission to only allow admins or moderators to edit products.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (request.user.role == ROLE_ADMIN or request.user.role
                                                                   == ROLE_MODERATOR)
