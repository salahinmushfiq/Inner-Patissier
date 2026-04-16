// //src/front/pages/CheckoutPage.jsx
// import React, { useState } from "react";
// import OrderSummary from "../../front/components/checkout/components/OrderSummary";
// import PaymentDetails from "../../front/components/checkout/components/PaymentDetails";
// import ShippingMethods from "../components/checkout/components/PaymentMethods";
// import { Footer, Navbar } from "../components";
// import { useCart } from "../components/contexts/CartContext";
// import { useCheckout } from "../components/contexts/CheckoutContext";
// import CheckoutItemSkeleton from "../components/checkout/components/CheckoutItemSkeleton";

// const CheckoutPage = () => {
//     const [error, setError] = useState(null);
//     const {
//     shippingInfo,
//     updateShippingInfo,
//     paymentMethod,
//     setPaymentMethod,
//     placeOrder,
//     status,
//     totals,
//     handleViewCheckout,
    
//   } = useCheckout();
//   const {cart,loading}=useCart();
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null)

//   const handlePaymentMethodChange = (method) => {
//     setSelectedPaymentMethod(method);
//     console.log('Payment method selected:', method);
//   }
//    return (
//         <div className="dark:bg-main-dark-bg min-h-screen transition-colors">
//             <Navbar />
//             <div className="lg:mt-12 max-container padding-container py-12">
//                 {/* Custom Stepper */}
//                 <div className="flex flex-col items-center justify-between border-b dark:border-gray-800 bg-white dark:bg-secondary-dark-bg p-8 rounded-3xl shadow-sm sm:flex-row mb-10">
//                     <h2 className="text-3xl font-serif font-bold text-brand-burgundy dark:text-brand-cream">Checkout</h2>
//                     <div className="mt-4 flex items-center gap-4 text-sm font-medium">
//                         <span className="flex items-center gap-2 text-emerald-600"><div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">✓</div> Shop</span>
//                         <div className="w-8 h-[1px] bg-gray-300" />
//                         <span className="flex items-center gap-2 text-brand-burgundy dark:text-brand-cream"><div className="w-6 h-6 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-xs">2</div> Details</span>
//                     </div>
//                 </div>

//                 {loading ? (
//                     <div className="grid md:grid-cols-2 gap-8">
//                          <div className="space-y-4">
//                             {[1, 2].map(i => <CheckoutItemSkeleton key={i} />)}
//                          </div>
//                          <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl" />
//                     </div>
//                 ) : (
//                     <div className="grid md:grid-cols-2 gap-10 items-start">
//                         <div className="space-y-6">
//                             <OrderSummary cart={cart} />
//                             <ShippingMethods onPaymentChange={setSelectedPaymentMethod} />
//                         </div>
                        
//                         <div className="lg:sticky lg:top-24 space-y-6">
//                             <PaymentDetails totals={totals} />
                            
//                             <button
//                                 onClick={() => placeOrder(selectedPaymentMethod)}
//                                 disabled={status.loading || !selectedPaymentMethod}
//                                 className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform shadow-lg
//                                     ${!selectedPaymentMethod || status.loading 
//                                         ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                                         : 'bg-brand-burgundy hover:bg-[#600018] text-white hover:scale-[1.02]'}`}
//                             >
//                                 {status.loading ? 'Processing Order...' : 'Place Secure Order'}
//                             </button>
                            
//                             {status.error && <p className="text-red-500 text-center font-medium">{status.error}</p>}
//                             {!selectedPaymentMethod && (
//                                 <p className="text-sm text-center text-brand-burgundy/60 italic">Please select a payment method to proceed.</p>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default CheckoutPage;

// src/front/pages/CheckoutPage.jsx
import React, { useState } from "react";
import OrderSummary from "../../front/components/cart/components/OrderSummary";
import PaymentDetails from "../../front/components/checkout/components/PaymentDetails";
import ShippingMethods from "../components/checkout/components/PaymentMethods";
import { Footer, Navbar } from "../components";
import { useCart } from "../components/contexts/CartContext";
import { useCheckout } from "../components/contexts/CheckoutContext";
import CheckoutItemSkeleton from "../components/checkout/components/CheckoutItemSkeleton";
import StepperHeader from "../components/shared/StepperHeader";
const CheckoutPage = () => {
  const { placeOrder, status, totals } = useCheckout();
  const { cart, loading } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  return (
    <div className="dark:bg-main-dark-bg min-h-screen transition-colors">
      <Navbar />
      <div className="mt-28 lg:mt-24 max-container padding-container py-12">
        
        {/* Unified Header with Stepper */}
        <StepperHeader key={"Shop/Cart/Checkout"} title={"Checkout"} subtitle={"Check if You Missed Anything."} path={"Shop/Cart/Checkout"}/>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4"><CheckoutItemSkeleton /></div>
            <div className="h-96 bg-brand-accent/20 rounded-3xl animate-pulse" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <OrderSummary cart={cart} />
              <ShippingMethods onPaymentChange={setSelectedPaymentMethod} />
            </div>
            
            <div className="lg:sticky lg:top-24 space-y-6">
              <PaymentDetails totals={totals} />
              <button
                onClick={() => placeOrder(selectedPaymentMethod)}
                disabled={status.loading || !selectedPaymentMethod}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                  !selectedPaymentMethod || status.loading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-brand-burgundy hover:bg-[#600018] text-white transform hover:scale-[1.02]'
                }`}
              >
                {status.loading ? 'Processing Order...' : 'Place Secure Order'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;