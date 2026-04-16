// //src/front/pages/CartPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import CartItem from "../components/cart/components/CartItem";
// import OrderSummary from "../components/cart/components/OrderSummary";
// import CartItemSkeleton from "../components/cart/components/CartItemSkeleton";
// import { Footer, Navbar } from "../components";
// import { useCart } from "../components/contexts/CartContext";
// import {useNavigate} from 'react-router-dom';
// const CartPage = () => {
//   const { cart, loading, error, totals } = useCart();
//   const navigate = useNavigate();

//   return (
//     <div className="dark:bg-main-dark-bg min-h-screen transition-colors duration-300">
//       <Navbar />
//       <div className="lg:mt-24 py-20 max-container padding-container pb-32 lg:py-12">
//         <h2 className="text-4xl font-serif font-bold mb-8 dark:text-brand-cream text-burgundy">
//           Your Selection
//         </h2>

//         <div className="grid lg:grid-cols-3 gap-10 items-start">
//           {/* Main Cart Section */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl shadow-sm border dark:border-gray-800 p-6">
//               {loading ? (
//                 Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
//               ) : cart?.items?.length === 0 ? (
//                 <div className="text-center py-10">
//                   <p className="text-gray-500 font-serif italic text-xl">"The tray is empty..."</p>
//                   <button onClick={() => navigate('/products')} className="mt-4 text-burgundy dark:text-brand-cream underline">Browse Pastries</button>
//                 </div>
//               ) : (
//                 cart.items.map((item) => <CartItem key={item.id} cartItem={item} />)
//               )}
//             </div>
//           </div>

//           {/* Sticky Summary Section */}
//           <div className="lg:sticky lg:top-24">
//             <OrderSummary cart={cart} totals={totals} />
//             {!!cart?.items?.length && (
//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="w-full mt-4 bg-brand-burgundy hover:bg-[#600018] text-white py-4 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-lg"
//               >
//                 Proceed to Checkout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CartPage;
import React from "react";
import { useNavigate } from 'react-router-dom';
import CartItem from "../components/cart/components/CartItem";
import OrderSummary from "../components/cart/components/OrderSummary";
import CartItemSkeleton from "../components/cart/components/CartItemSkeleton";
import { Footer, Navbar } from "../components";
import { useCart } from "../components/contexts/CartContext";
import StepperHeader from "../components/shared/StepperHeader";

const CartPage = () => {
  const { cart, loading, error, totals } = useCart();
  const navigate = useNavigate();

  return (
    <div className="dark:bg-main-dark-bg min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="mt-28 lg:mt-24 max-container padding-container py-12">
        
        {/* Unified Header with Breadcrumbs */}
        <StepperHeader key={"Shop/Cart/Checkout"} title={"Your Selection"} subtitle={"Review your tray before checkout."} path={"Shop/Collection/Cart"}/>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl shadow-sm border border-brand-cream/50 dark:border-gray-800 p-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
              ) : cart?.items?.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 font-serif italic text-xl">"The tray is currently empty."</p>
                  <button onClick={() => navigate('/products')} className="mt-4 text-brand-burgundy dark:text-brand-cream underline">Browse our pastries</button>
                </div>
              ) : (
                cart.items.map((item) => <CartItem key={item.id} cartItem={item} />)
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <OrderSummary cart={cart} totals={totals} />
            {!!cart?.items?.length && (
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-brand-burgundy hover:bg-[#600018] text-white py-4 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;