// src/contexts/CheckoutContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { getHeaders } from "../../utils";
import { useNavigate } from "react-router-dom";

const CheckoutContext = createContext();
const base_url = process.env.REACT_APP_API_URL;

export const CheckoutProvider = ({ children }) => {
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const navigate = useNavigate();

  const placeOrder = useCallback(async (paymentMethod) => {
    setStatus({ loading: true, error: null, success: false });

    try {
      console.log("Method: ");
      console.log(paymentMethod);
      // STEP 1: Create order
      const response = await axios.post(
        `${base_url}/order/create/`,
        {
          payment_method: paymentMethod,
        },
        {
          headers: getHeaders(),
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        const orderId = response.data.id;

        if (paymentMethod === "SSLCOMMERZ") {
          // STEP 2: Redirect to payment gateway
          const paymentRes = await axios.post(
            `${base_url}/payment/initiate/`,
            {
              order_id: orderId,
            },
            {
              headers: getHeaders(),
              withCredentials: true,
            },
          );

          if (paymentRes.status === 200 && paymentRes.data.payment_url) {
            window.location.href = paymentRes.data.payment_url;
          } else {
            throw new Error("Payment initiation failed.");
          }
        } else {
          // STEP 3: COD or others
          setStatus({ loading: false, error: null, success: true });
          navigate(`/checkout/details/${orderId}`);
        }
      }
    } catch (error) {
      console.error("Order or Payment error:", error);
      setStatus({
        loading: false,
        error:
          error.response?.data?.error ||
          "Failed to place order or initiate payment.",
        success: false,
      });
    }
  }, []);
  return (
    <CheckoutContext.Provider value={{ status, placeOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
