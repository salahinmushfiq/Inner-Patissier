# products/serializers.py

from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'title', 'description', 'price',
            'discountPercentage', 'rating',
            'stock', 'brand', 'category',
            'thumbnail', 'images'
        ]


class BulkProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'stock']


# class BulkProductUploadSerializer(serializers.Serializer):
#     file = serializers.FileField()
#
#     def validate_file(self, value):
#         if not value.name.endswith('.csv'):
#             raise serializers.ValidationError("File must be a CSV format.")
#         return value


class BulkProductJSONSerializer(serializers.Serializer):
    products = BulkProductSerializer(many=True)


class ProductStockUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['stock']  # Only include stock field for updates

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative.")
        return value