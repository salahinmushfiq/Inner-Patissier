# products/models.py

from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discountPercentage = models.FloatField(blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    stock = models.IntegerField()
    brand = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    thumbnail = models.URLField(blank=True,max_length=1200)
    images = models.JSONField(default=list, blank=True)  # For storing multiple images

    def __str__(self):
        return self.title

