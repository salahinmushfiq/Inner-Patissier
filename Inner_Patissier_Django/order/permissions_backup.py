from rest_framework.permissions import BasePermission

# Role constants for clarity
ROLE_GUEST = 0
ROLE_CUSTOMER = 1
ROLE_MODERATOR = 2
ROLE_ADMIN = 3

# Utility function to check roles (optional, useful if reused)
def has_role(user, roles):
    return user and user.is_authenticated and user.role in roles


class IsGuest(BasePermission):
    """Allows access only to guest users (role == 0)."""
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_GUEST])


class IsCustomer(BasePermission):
    """Allows access only to customer users (role == 1)."""
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_CUSTOMER])


class IsModerator(BasePermission):
    """Allows access only to moderator users (role == 2)."""
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_MODERATOR])


class IsAdmin(BasePermission):
    """Allows access only to admin users (role == 3)."""
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_ADMIN])


class IsAdminOrModerator(BasePermission):
    """
    Allows access to both admins and moderators (dashboard-level access).
    """
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_ADMIN, ROLE_MODERATOR])


class IsEmployee(BasePermission):
    """
    Treat employees as moderators and admins.
    Useful for dashboards, order management, etc.
    """
    def has_permission(self, request, view):
        return has_role(request.user, [ROLE_MODERATOR, ROLE_ADMIN])
