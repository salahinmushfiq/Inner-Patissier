from django.urls import path
from .views import (
    CouponListCreateView, CouponDetailView,
    ApplyCouponView, MyCouponsView,
    RFMAnalysisSegmentView, RFMGenerateCouponView, AssignCouponToUserView, RFMCategoryAnalysisView,
    AssignCouponsByCategoryView, rfm_hot_zones,
)

# urlpatterns = [
#     path('', CouponListCreateView.as_view(), name='coupon-list'),
#     path('apply/', ApplyCouponView.as_view(), name='coupon-apply'),
#     path('my-coupons/', MyCouponsView.as_view(), name='my-coupons'),
#     path('rfm-analysis', RFMAnalysisSegmentView.as_view(), name='rfm-segment'),
#     path('rfm/generate-coupons/', RFMGenerateCouponView.as_view(), name='generate-rfm-coupons'),
#     path('assign-to-user/', AssignCouponToUserView.as_view(), name='assign-coupon-to-user'),
#     path('<int:pk>/', CouponDetailView.as_view(), name='coupon-detail'),  # Keep last!
# ]
urlpatterns = [
    path('', CouponListCreateView.as_view(), name='coupon-list'),
    path('apply/', ApplyCouponView.as_view(), name='coupon-apply'),
    path('my-coupons/', MyCouponsView.as_view(), name='my-coupons'),
    path('rfm-analysis', RFMAnalysisSegmentView.as_view(), name='rfm-segment'),
    path('rfm/generate-coupons/', RFMGenerateCouponView.as_view(), name='generate-rfm-coupons'),
    path('assign-to-user/', AssignCouponToUserView.as_view(), name='assign-coupon-to-user'),  # ✅ Before <int:pk>
    path('rfm/category-analysis/', RFMCategoryAnalysisView.as_view(), name='rfm-category-analysis'),
    path('rfm/assign-by-category/', AssignCouponsByCategoryView.as_view(), name='assign-by-category'),
    path('rfm/hotzones/', rfm_hot_zones, name='rfm-hotzones'),
    path('<int:pk>/', CouponDetailView.as_view(), name='coupon-detail'),  # ✅ LAST

]
