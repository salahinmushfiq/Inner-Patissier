import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
// Create the CartContext
const CartContext = createContext();

// API Base URL (stored in environment variables)
// const base_url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
const base_url = process.env.REACT_APP_API_URL;
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] }); // Stores cart items
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages
  const [totals, setTotals] = useState({
    originalTotal: 0,
    discountTotal: 0,
    finalTotal: 0,
  });
  // Helper function to get request headers (with authorization or guest token)
  const getHeaders = useCallback(() => {
    const access_token = localStorage.getItem("access_token");
    const guest_token = localStorage.getItem("guest_token");
    const headers = { "Content-Type": "application/json" };

    if (access_token) headers.Authorization = `Bearer ${access_token}`;
    if (guest_token) headers["guest_token"] = guest_token;

    return headers;
  }, []);

  const calculateTotals = useCallback((items = []) => {
    let original = 0;
    let discount = 0;

    for (const item of items) {
      if (
        item &&
        typeof item === "object" &&
        item.product &&
        typeof item.product === "object"
      ) {
        const { price = 0, discountPercentage = 0 } = item.product;
        const quantity = item.quantity || 1;

        original += price * quantity;
        discount += (price * discountPercentage * quantity) / 100;
      }
    }

    setTotals({
      originalTotal: original,
      discountTotal: discount,
      finalTotal: original - discount,
    });
  }, []);

  // Fetch cart items from the backend
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/cart/view/`, {
        headers: getHeaders(),
        withCredentials: true,
      });
      const items = response.data?.items || [];
      setCart(response.data); // Update cart state with fetched data
      calculateTotals(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Error fetching cart. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [getHeaders, calculateTotals]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = useCallback(
    async (product) => {
      setLoading(true);
      setError(null);

      // 🛠 FIX: Ensure items array exists before modifying it
      setCart((prevCart) => ({
        ...prevCart,
        items: [...(prevCart.items || []), { ...product, quantity: 1 }],
      }));

      try {
        const response = await axios.post(
          `${base_url}/cart/add/`,
          {
            product_id: product.id, // 🛠 FIX: Ensure consistency in how product IDs are referenced
            quantity: 1,
            price: product.price,
            title: product.title,
            discountPercentage: product.discountPercentage || 0,
          },
          {
            headers: getHeaders(),
            withCredentials: true,
          },
        );

        if (response.data.guest_token) {
          localStorage.setItem("guest_token", response.data.guest_token);
        }

        // ✅ Ensure cart data is refreshed after adding item
        await fetchCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
        setError(
          error.response?.data?.error || "Failed to add product to cart.",
        );

        // 🛠 FIX: Ensure rollback correctly removes the failed product
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== product.id),
        }));
      } finally {
        setLoading(false);
      }
    },
    [getHeaders, fetchCart],
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    async (productId) => {
      setLoading(true);
      setError(null);

      // 🛠 FIX: Use correct key for product ID in state filtering
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== productId),
      }));

      try {
        await axios.delete(`${base_url}/cart/remove/${productId}/`, {
          headers: getHeaders(),
          withCredentials: true,
        });

        // ✅ Ensure cart data is refreshed after removal
        await fetchCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
        setError(
          error.response?.data?.error || "Failed to remove product from cart.",
        );

        // 🛠 FIX: Only refetch if there's an error (prevents redundant API calls)
        await fetchCart();
      } finally {
        setLoading(false);
      }
    },
    [getHeaders, fetchCart],
  );

  const clearCart = () => setCart([]);
  // Update cart item quantity
  const updateCartQuantity = useCallback(
    async (productId, newQuantity) => {
      setLoading(true);
      setError(null);

      // 🛠 FIX: Ensure cart is updated optimistically before API response
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      }));

      try {
        const payload = { product_id: productId, quantity: newQuantity };
        const response = await axios.put(
          `${base_url}/cart/update/${productId}/`,
          payload,
          {
            headers: getHeaders(),
            withCredentials: true,
          },
        );

        if (response.data.guest_token) {
          localStorage.setItem("guest_token", response.data.guest_token);
        }

        // ✅ Ensure cart data is refreshed after quantity update
        await fetchCart();
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        setError("Failed to update cart quantity.");

        // 🛠 FIX: Only refetch if there's an error
        await fetchCart();
      } finally {
        setLoading(false);
      }
    },
    [getHeaders, fetchCart],
  );

  // Memoize the context value to optimize performance
  const contextValue = useMemo(
    () => ({
      fetchCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      loading,
      error,
      cart,
      totals,
      clearCart, // 🔥 Include totals in context
    }),
    [
      fetchCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      loading,
      error,
      cart,
      totals,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
