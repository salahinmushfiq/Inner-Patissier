from django.urls import path
from .views import (
    SignupView,
    LogoutView,
    UserProfileUpdateView,
    UserProfileDetailsView,
    BulkUserCreateView,
    RoleUpdateView,
    CustomLoginView,
    UserViewSet, UserListView,
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', CustomLoginView.as_view(), name='login'),  # Updated to use CustomLoginView
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('profile/<int:pk>/', UserProfileDetailsView.as_view(), name='profile-details'),
    path('users/bulk-create/', BulkUserCreateView.as_view(), name='bulk-user-create'),
    path('users/<int:user_id>/role/', RoleUpdateView.as_view(), name='role-update'),  # Added URL for RoleUpdateView
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('view/', UserListView.as_view(), name='userList'),
    # Add other UserViewSet actions as needed
]
