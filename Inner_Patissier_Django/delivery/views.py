from django.shortcuts import render

# delivery/views.py

from rest_framework import generics, permissions
from .models import Delivery
from .serializers import DeliverySerializer

class DeliveryListCreateView(generics.ListCreateAPIView):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
    permission_classes = [permissions.IsAuthenticated]

class DeliveryDetailView(generics.RetrieveUpdateAPIView):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
    permission_classes = [permissions.IsAuthenticated]

