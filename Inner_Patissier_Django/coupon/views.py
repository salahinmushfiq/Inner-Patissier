# from rest_framework import generics
# from .models import Coupon
# from .serializers import CouponSerializer
# from rest_framework.permissions import IsAdminUser
#
# class CouponListCreateView(generics.ListCreateAPIView):
#     queryset = Coupon.objects.all()
#     serializer_class = CouponSerializer
#     permission_classes = [IsAdminUser]
#
# class CouponDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Coupon.objects.all()
#     serializer_class = CouponSerializer
#     permission_classes = [IsAdminUser]
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import Coupon, CouponAssignment
from .serializers import CouponSerializer, RFMCategorySerializer
from .rfm_coupon import run_rfm_analysis_and_assign_coupons, calculate_rfm_only, assign_coupons_by_category
from .rfm_coupon import run_rfm_segmentation
from collections import defaultdict
from random import uniform, choice,randint





User = get_user_model()





class CouponListCreateView(ListCreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [AllowAny]

class CouponDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [IsAdminUser]

class ApplyCouponView(APIView):
    def post(self, request):
        code = request.data.get('code')
        user = request.user
        try:
            coupon = Coupon.objects.get(code=code)
        except Coupon.DoesNotExist:
            return Response({'error': 'Invalid coupon'}, status=400)
        if not coupon.is_valid(user):
            return Response({'error': 'Coupon is not valid'}, status=400)
        return Response({'message': 'Coupon applied', 'discount': str(coupon.discount_value)})

class MyCouponsView(ListAPIView):
    serializer_class = CouponSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Coupon.objects.filter(assigned_to=self.request.user, active=True)

class RFMAnalysisSegmentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print("RFMAnalysisSegmentView")
        min_score = int(request.query_params.get('min_score', 0))
        max_score = int(request.query_params.get('max_score', 15))
        segment = request.query_params.get('segment')

        data = calculate_rfm_only()
        filtered = [
            r for r in data
            if min_score <= r['rfm_score'] <= max_score and
               (segment is None or r['segment'] == segment)
        ]
        # print("filtered")
        # print("filtered")
        # print(filtered)
        return Response(filtered)

class RFMGenerateCouponView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        result = run_rfm_analysis_and_assign_coupons()
        return Response({"assigned_coupons": result})


def get_discount_by_rfm(rfm_score):
    if rfm_score >= 12:
        return ('percent', 20)
    elif rfm_score >= 8:
        return ('percent', 10)
    else:
        return ('fixed', 5)


class AssignCouponToUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_id')
        rfm_score = int(request.data.get('rfm_score', 0))  # Expect frontend to send this too

        if not user_id:
            return Response({"detail": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        coupon = Coupon.objects.filter(active=True).exclude(assigned_to=user).first()

        if not coupon:
            code = f"AUTO{get_random_string(6).upper()}"
            discount_type, discount_value = get_discount_by_rfm(rfm_score)
            expires_in_days = 30
            coupon = Coupon.objects.create(
                code=code,
                discount_type=discount_type,
                discount_value=discount_value,
                active=True,
                usage_limit=1,
                used_count=0,
                expires_at=timezone.now() + timedelta(days=expires_in_days),
            )

        if coupon.assigned_to.filter(pk=user.pk).exists():
            return Response({"detail": "Coupon already assigned to this user"}, status=status.HTTP_400_BAD_REQUEST)

        coupon.assigned_to.add(user)
        coupon.used_count += 1
        coupon.save()

        CouponAssignment.objects.create(coupon=coupon, user=user)

        return Response({"coupon_code": coupon.code}, status=status.HTTP_200_OK)


class RFMCategoryAnalysisView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data = run_rfm_segmentation()
        for item in data:
            user_id = item['user_id']
            coupons = Coupon.objects.filter(assigned_to__id=user_id, active=True)
            coupon_codes = list(coupons.values_list('code', flat=True))
            item['coupon_codes'] = coupon_codes
        serializer = RFMCategorySerializer(data, many=True)
        return Response(serializer.data)

class AssignCouponsByCategoryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        result = assign_coupons_by_category()
        return Response({"assigned": result})

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def rfm_hot_zones(request):
#     hotzones = defaultdict(lambda: {"total": 0, "category_breakdown": defaultdict(int)})
#
#     users = User.objects.exclude(address__coordinates__isnull=True).exclude(category__isnull=True)
#
#     for user in users:
#         coords = user.address.coordinates
#         key = (round(coords.lat, 1), round(coords.lng, 1))  # group by nearby zones
#
#         hotzones[key]["total"] += 1
#         hotzones[key]["category_breakdown"][user.category] += 1
#
#     result = []
#     for (lat, lng), data in hotzones.items():
#         result.append({
#             "lat": lat,
#             "lng": lng,
#             "total": data["total"],
#             "category_breakdown": dict(data["category_breakdown"])
#         })
#
#     return Response(result)
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def rfm_hot_zones(request):
#     from collections import defaultdict
#
#     hotzones = defaultdict(lambda: {"total": 0, "category_breakdown": defaultdict(int)})
#
#     # ⛔ This line will break unless 'category' is defined as a property or field on User
#     # Fix by using user.rfm_segment or user.segment if you store it there
#     users = User.objects.exclude(address__coordinates__isnull=True)
#
#     for user in users:
#         coords = user.address.coordinates
#         key = (round(coords.lat, 1), round(coords.lng, 1))
#
#         hotzones[key]["total"] += 1
#
#         # 🛠️ Replace with your actual category source
#         category = getattr(user, "category", None) or getattr(user, "segment", None) or "Unknown"
#         hotzones[key]["category_breakdown"][category] += 1
#
#     result = []
#     for (lat, lng), data in hotzones.items():
#         result.append({
#             "lat": lat,
#             "lng": lng,
#             "total": data["total"],
#             "category_breakdown": dict(data["category_breakdown"])  # ✅ always present now
#         })
#
#     return Response(result)

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def rfm_hot_zones(request):
#     categories = ["Champions", "Loyal Customers", "Potential Loyalist", "New Customers", "At Risk", "Hibernating", "Lost"]
#     result = []
#
#     for _ in range(150):  # Generate 150 fake hotzones
#         lat = round(uniform(22.0, 25.0), 2)    # Example: Bangladesh-like region
#         lng = round(uniform(88.0, 92.0), 2)
#         total = choice([1, 2, 3, 5, 8])
#
#         category_breakdown = {}
#         for _ in range(choice([1, 2, 3])):
#             cat = choice(categories)
#             category_breakdown[cat] = category_breakdown.get(cat, 0) + choice([1, 2])
#
#         result.append({
#             "lat": lat,
#             "lng": lng,
#             "total": total,
#             "category_breakdown": category_breakdown
#         })
#
#     return Response(result)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def rfm_hot_zones(request):
#     categories = ["Champions", "Loyal Customers", "Potential Loyalist", "New Customers", "At Risk", "Hibernating", "Lost"]
#     result = []
#
#     for _ in range(500):
#         lat = round(uniform(20.5, 26.5), 3)    # BD/India
#         lng = round(uniform(86.5, 92.5), 3)
#         total = randint(1, 10)
#
#         category_breakdown = {}
#         for _ in range(randint(1, 4)):
#             cat = choice(categories)
#             category_breakdown[cat] = category_breakdown.get(cat, 0) + randint(1, 4)
#
#         result.append({
#             "lat": lat,
#             "lng": lng,
#             "total": total,
#             "category_breakdown": category_breakdown
#         })
#
#     return Response(result)


@api_view(['GET'])
@permission_classes([AllowAny])
def rfm_hot_zones(request):
    categories = ["Champions", "Loyal Customers", "Potential Loyalist", "New Customers", "At Risk", "Hibernating", "Lost"]
    result = []

    for _ in range(500):
        lat = round(uniform(20.5, 26.5), 3)    # Bangladesh/India range
        lng = round(uniform(86.5, 92.5), 3)
        total = randint(1, 10)

        category_breakdown = {}
        for _ in range(randint(1, 4)):
            cat = choice(categories)
            category_breakdown[cat] = category_breakdown.get(cat, 0) + randint(1, 4)

        result.append({
            "lat": lat,
            "lng": lng,
            "total": total,
            "category_breakdown": category_breakdown
        })

    return Response(result)
