# order/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem, OrderStatusLog
from products.serializers import ProductSerializer
from cart.models import Cart, CartItem
from user.serializers import UserSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'title', 'price', 'quantity', 'total', 'discounted_total']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class OrderCreateSerializer(serializers.Serializer):
    # address_id = serializers.IntegerField(required=False, allow_null=True)
    # coupon_id = serializers.IntegerField(required=False, allow_null=True)

    def create(self, validated_data):
        request = self.context['request']
        cart = self.context['cart']
        user = request.user if request.user.is_authenticated else None
        guest_token = self.context.get('guest_token')

        order = Order.objects.create(
            user=user,
            guest_token=guest_token,
            # address_id=validated_data['address_id'],
            # coupon_id=validated_data.get('coupon_id'),
            total=cart.total,
            discounted_total=cart.discounted_total,
            total_quantity=cart.total_quantity,
            total_products=cart.total_products
        )

        for item in cart.cartitem_set.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                title=item.title,
                price=item.price,
                quantity=item.quantity,
                total=item.total,
                discounted_total=item.discounted_total
            )

        return order


class OrderDetailSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField(allow_null=True, required=False)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total', 'discounted_total', 'total_quantity', 'total_products', 'items',
                  'payment_method', 'user']

    def get_items(self, obj):
        return [
            {
                "product": item.product.title,
                "quantity": item.quantity,
                "price": item.price,
                "total": item.total,
            }
            for item in obj.items.all()
        ]

    def get_user(self, obj):
        if obj.user:
            return {
                "id": obj.user.id,
                "name": obj.user.firstName,
                "email": obj.user.email
            }


class OrderStatusLogSerializer(serializers.ModelSerializer):
    changed_by = serializers.SerializerMethodField()

    class Meta:
        model = OrderStatusLog
        fields = ['id', 'previous_status', 'new_status', 'timestamp', 'changed_by']

    def get_changed_by(self, obj):
        return obj.changed_by.email if obj.changed_by else "System"


class AdminOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    # user = serializers.StringRelatedField()  # Just to display username or email
    user = UserSerializer()
    status_logs = OrderStatusLogSerializer(many=True, read_only=True)  # ✅ add this line

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'guest_token', 'status', 'is_paid',
            'payment_method', 'total', 'discounted_total',
            'total_quantity', 'total_products', 'created_at', 'items',
            'status_logs'
        ]
        read_only_fields = ['total', 'discounted_total', 'total_quantity', 'total_products', 'created_at']
