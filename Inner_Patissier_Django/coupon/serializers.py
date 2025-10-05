from rest_framework import serializers
from .models import Coupon


# class CouponSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Coupon
#         fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'code', 'discount_type', 'discount_value', 'active', 'expires_at']


class RFMCategorySerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    recency = serializers.IntegerField()
    frequency = serializers.IntegerField()
    monetary = serializers.FloatField()
    rfm_score = serializers.IntegerField()
    segment = serializers.CharField()
    category = serializers.CharField()
    city = serializers.CharField(allow_null=True, required=False)
    state = serializers.CharField(allow_null=True, required=False)
    postalCode = serializers.CharField(allow_null=True, required=False)

    # Add this field:
    coupon_codes = serializers.ListField(
        child=serializers.CharField(),
        read_only=True,
        required=False,
        default=[]
    )
