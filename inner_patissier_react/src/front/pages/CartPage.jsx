import React, { useEffect, useRef, useState } from "react";
import CartItem from "../components/cart/components/CartItem";
import OrderSummary from "../components/cart/components/OrderSummary";
import CartItemSkeleton from "../components/cart/components/CartItemSkeleton";
import { Footer, Navbar } from "../components";
import { useCart } from "../components/contexts/CartContext";
import {useNavigate} from 'react-router-dom';
const CartPage = () => {
  const navigate = useNavigate();
  const { fetchCart, cart, loading, setLoading, total } = useCart();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart().catch((err) => {
      setError("Error fetching cart. Please try again.");
      console.error("Error fetching cart:", err);
      setLoading(false);
    });
  }, [fetchCart, setLoading]);

  const handleCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) return;
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="2xl:px-0 -mt-12 py-20 max-container padding-container pb-32 lg:py-12">
        <h2 className="mt-12 text-xl font-semibold text-gray-900 sm:text-2xl border-b border-gray-200 pb-14">
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-0 lg:grid-cols-2 mt-8">
          <div className="space-y-2 bg-white shadow-md p-2 lg:max-w-xl xl:max-w-2xl z-10">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
            ) : error ? (
              <p className="text-lg font-medium text-red-700">{error}</p>
            ) : cart?.items?.length === 0 ? (
              <p className="text-lg font-medium text-gray-700">Your cart is empty.</p>
            ) : (
              cart?.items
                ?.filter(
                  (item) =>
                    typeof item === "object" &&
                    item !== null &&
                    typeof item.product === "object" &&
                    item.product !== null
                )
                .map((item) => <CartItem key={item.id} cartItem={item} />)
            )}

            {cart?.items?.length > 0 && (
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-[#800020] text-white py-2 px-4 rounded hover:bg-[#a0002f] transition"
              >
                Proceed to Checkout
              </button>
            )}
          </div>

          <OrderSummary cart={cart} total={total} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
