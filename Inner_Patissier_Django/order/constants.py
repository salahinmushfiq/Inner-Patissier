# order/constants.py

ORDER_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('confirmed', 'Confirmed'),
    ('processing', 'Processing'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered'),
    ('cancelled', 'Cancelled'),
    ('failed', 'Failed'),
]

PAYMENT_METHOD_CHOICES = [
    ("SSLCOMMERZ", "SSLCOMMERZ"),
    ("COD", "Cash on Delivery"),
]
PAYMENT_STATUS_CHOICES = [
    ("pending", "Pending"),
    ("success", "Success"),
    ("failed", "Failed"),
]

DELIVERY_STATUS_CHOICES = [
    ("assigned", "Assigned"),
    ("in_transit", "In Transit"),
    ("delivered", "Delivered"),
    ("failed", "Failed"),
]
