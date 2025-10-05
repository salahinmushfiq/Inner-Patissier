# payment/constants.py


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
