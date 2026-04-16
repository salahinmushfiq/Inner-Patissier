import React, { useState, useEffect } from "react";
import OrderSummary from "../../front/components/checkout/components/OrderSummary";
import PaymentDetails from "../../front/components/checkout/components/PaymentDetails";
import ShippingMethods from "../components/checkout/components/PaymentMethods";
import axios from "axios";
import { Navbar,Footer } from "../components";
import { useCart } from "../components/contexts/CartContext";
import { getHeaders } from "../utils";
import { useCheckout } from "../components/contexts/CheckoutContext";
import {useNavigate} from 'react-router-dom';
const base_url = process.env.REACT_APP_API_URL ; 

const CheckoutPage = () => {
    // const [cart, setCart] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {
    shippingInfo,
    updateShippingInfo,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
    status,
    totals,
    handleViewCheckout,
    
  } = useCheckout();
  const {cart,loading}=useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null)

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    console.log('Payment method selected:', method);
  }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     updateShippingInfo(name, value);
//   };

    return (
        <>
        <Navbar/>
        <div className="max-container padding-container flex flex-col flex-wrap gap-10 pb-20 lg:py-12">
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 ">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl pb-6">Checkout</h2>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </a>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                                <span className="font-semibold text-gray-900">Cart</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                                <span className="font-semibold text-gray-500">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {loading ? (
                <p className="text-lg font-medium text-gray-700">Loading...</p>
            ) : error ? (
                <p className="text-lg font-medium text-red-700">{error}</p>
            ) : (
                <div>
                <div className="grid sm:px-10 md:px-4 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <OrderSummary cart={cart} totals={totals}/>
                    <PaymentDetails totals={totals}/>
                    <ShippingMethods onPaymentChange={handlePaymentMethodChange}/>
                    
                </div>
                {/* <button onClick={placeOrder} disabled={status.loading} className="mt-6 bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition"> {status.loading ? 'Placing Order...' : 'Place Order'}</button> */}
                {/* <button onClick={() => placeOrder(selectedPaymentMethod)} disabled={status.loading} className="mt-6 bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition"> {status.loading ? 'Placing Order...' : 'Place Order'}</button>

                 {status.error && <p className="text-red-500 mt-3">{status.error}</p>}
                 {status.success && <p className="text-green-600 mt-3">✅ Order placed!</p>} */}
                 <button
                    onClick={() => placeOrder(selectedPaymentMethod)}
                    disabled={status.loading || !selectedPaymentMethod}
                    className={`mt-6 text-white py-2 px-6 rounded transition 
                                ${!selectedPaymentMethod || status.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
                    >
                    {status.loading ? 'Placing Order...' : 'Place Order'}
                 </button>

                    {status.error && <p className="text-red-500 mt-3">{status.error}</p>}
                    {status.success && <p className="text-green-600 mt-3">✅ Order placed!</p>}
                    {!selectedPaymentMethod && (
                    <p className="text-sm text-red-500 mt-2">Please select a payment method before proceeding.</p>
                    )}
                </div>
            )}
        </div>
            <Footer/>
        </>
    );
};

export default CheckoutPage;
