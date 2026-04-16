// //src/front/components/cart/OrderSummary.jsx
// import React from 'react';
// import CheckoutItem from '../../checkout/components/CheckoutItem';

// const OrderSummary = ({ cart }) => {
//   console.log('cart:', cart); // Updated logging to include the actual cart data

//   // Check if cart is null or empty and render accordingly
//   if (!cart || cart.length === 0) {
//     return (
//       <div className="space-y-3 rounded-lg border bg-white px-4 p-8 py-4 sm:px-6">
//         <p className="text-xl font-medium">Order Summary</p>
//         <p className="text-gray-400">Your cart is empty. Add items to proceed.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3 rounded-lg border bg-white px-4 p-8 py-4 sm:px-6">
//       <p className="text-xl font-medium">Order Summary</p>
//       <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
//       {cart.items.map((checkoutItem) => (
//         <CheckoutItem key={checkoutItem.id} checkoutItem={checkoutItem} />
//       ))}
//     </div>
//   );
// };

// export default OrderSummary;
import React from "react";
import CheckoutItem from "../../checkout/components/CheckoutItem";
import { useCart } from "../../contexts/CartContext";

const OrderSummary = () => {
  const { cart, totals } = useCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="rounded-3xl border p-8 text-center">
        <p className="italic text-gray-400">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border p-8 shadow-sm space-y-6">
      <h3 className="text-2xl font-bold text-brand-burgundy dark:text-brand-cream">Order Summary</h3>

      {/* 🧾 Items */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto">
        {cart.items.map((item) => (
          <CheckoutItem key={item.id} checkoutItem={item} />
        ))}
      </div>

      {/* 💰 Totals (Single Source of Truth) */}
      <div className="pt-4 border-t space-y-3">
        <div className="flex justify-between text-gray-500 dark:text-brand-cream/80">
          <span>Subtotal</span>
          <span>${totals.originalTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500 dark:text-brand-cream/80">
          <span>Discount</span>
          <span>-${totals.discountTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold text-gray-500 dark:text-brand-cream/80">
          <span>Total</span>
          <span>${totals.finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;