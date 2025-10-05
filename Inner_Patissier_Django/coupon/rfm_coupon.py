import pandas as pd
from django.utils import timezone
from datetime import timedelta
from django.utils.crypto import get_random_string
from user.models import User
from order.models import Order
from .models import Coupon, CouponAssignment
from .utils import generate_unique_coupon_code


def calculate_rfm_only():
    orders = Order.objects.filter(is_paid=True).exclude(status='cancelled')
    df = pd.DataFrame(list(orders.values('user_id', 'created_at', 'discounted_total')))
    df = df.dropna(subset=['user_id'])

    if df.empty:
        return []

    df['created_at'] = pd.to_datetime(df['created_at'])
    now = timezone.now()
    df['user_id'] = df['user_id'].astype(int)

    rfm = df.groupby('user_id').agg(
        recency=('created_at', lambda x: (now - x.max()).days),
        frequency=('created_at', 'count'),
        monetary=('discounted_total', 'sum'),
    )

    # Convert to float to avoid Decimal issues with qcut
    rfm['recency'] = rfm['recency'].astype(float)
    rfm['frequency'] = rfm['frequency'].astype(float)
    rfm['monetary'] = rfm['monetary'].astype(float)


    def safe_qcut(series, q=5, reverse_labels=False):
        try:
            unique_values = series.nunique()
            bins = min(q, unique_values)
            if bins < 2:
                return pd.Series([1] * len(series), index=series.index)
            labels = list(range(bins, 0, -1)) if reverse_labels else list(range(1, bins + 1))
            return pd.qcut(series, bins, labels=labels, duplicates='drop')
        except Exception as e:
            print(f"Warning: qcut failed: {e}")
            return pd.Series([1] * len(series), index=series.index)

    rfm['r_score'] = safe_qcut(rfm['recency'], q=5, reverse_labels=True)
    rfm['f_score'] = safe_qcut(rfm['frequency'].rank(method='first'), q=5)
    rfm['m_score'] = safe_qcut(rfm['monetary'], q=5)

    rfm['rfm_score'] = rfm[['r_score', 'f_score', 'm_score']].astype(int).sum(axis=1)
    rfm['segment'] = (
        rfm['r_score'].astype(str) +
        rfm['f_score'].astype(str) +
        rfm['m_score'].astype(str)
    )

    return rfm.reset_index().to_dict(orient='records')


def run_rfm_analysis_and_assign_coupons():
    data = calculate_rfm_only()
    top_users = [row for row in data if row['rfm_score'] >= 13]
    created = []

    for row in top_users:
        try:
            user = User.objects.get(id=row['user_id'])
            code = generate_unique_coupon_code()
            coupon = Coupon.objects.create(
                code=code,
                discount_type='percent',
                discount_value=20,
                usage_limit=1,
                active=True,
                expires_at=timezone.now() + timedelta(days=7)
            )
            coupon.assigned_to.add(user)
            created.append((user.email, code))
        except User.DoesNotExist:
            continue

    return created


def run_rfm_segmentation():
    raw_rfm = calculate_rfm_only()
    enriched_data = []

    for row in raw_rfm:
        try:
            user = User.objects.get(id=row['user_id'])
            # Define categories consistent with your business logic
            if row['recency'] > 90 and row['monetary'] > 500:
                category = 'Churned High Spender'
            elif row['recency'] > 90:
                category = 'Churned'
            elif row['monetary'] > 500:
                category = 'High Spender'
            elif row['frequency'] == 1:
                category = 'One-time Buyer'
            elif row['frequency'] == 0:
                category = 'Non-Spender'
            else:
                category = 'Potential Customer'

            # Region info (if available)
            address = user.address
            city = address.city if address else None
            state = address.state if address else None
            postal_code = address.postalCode if address else None

            enriched_data.append({
                **row,
                'category': category,
                'city': city,
                'state': state,
                'postalCode': postal_code,
            })

        except User.DoesNotExist:
            continue

    return enriched_data


def assign_coupons_by_category(categories=None, custom_discounts=None):
    data = run_rfm_segmentation()
    assigned = []

    if categories:
        data = [user for user in data if user['category'] in categories]

    for user_data in data:
        user_id = user_data['user_id']
        user = User.objects.filter(id=user_id).first()
        if not user:
            continue

        category = user_data['category']
        discount_type, discount_value = ('percent', 10)

        if custom_discounts and category in custom_discounts:
            d = custom_discounts[category]
            discount_type, discount_value = d.get('type', 'percent'), d.get('value', 10)

        # Check if a coupon is already assigned
        if Coupon.objects.filter(assigned_to=user, active=True).exists():
            continue

        # Create and assign coupon
        code = f"C{get_random_string(5).upper()}"
        coupon = Coupon.objects.create(
            code=code,
            discount_type=discount_type,
            discount_value=discount_value,
            usage_limit=1,
            expires_at=timezone.now() + timedelta(days=30),
        )
        coupon.assigned_to.add(user)
        coupon.save()
        CouponAssignment.objects.create(coupon=coupon, user=user)
        assigned.append((user.email, code))

    return assigned


