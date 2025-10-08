import React from 'react';
import CheckoutItem from './CheckoutItem';

const OrderSummary = ({ cart }) => {
  console.log('cart:', cart); // Updated logging to include the actual cart data

  // Check if cart is null or empty and render accordingly
  if (!cart || cart.length === 0) {
    return (
      <div className="space-y-3 rounded-lg border bg-white px-4 p-8 py-4 sm:px-6">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Your cart is empty. Add items to proceed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border bg-white px-4 p-8 py-4 sm:px-6">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
      {cart.items.map((checkoutItem) => (
        <CheckoutItem key={checkoutItem.id} checkoutItem={checkoutItem} />
      ))}
    </div>
  );
};

export default OrderSummary;
