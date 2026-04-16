//src/api/cart.js
import apiClient from "./client";

export const fetchCart = async () => {
  const res = await apiClient.get("/cart/view/");
  return res.data;
};

export const addToCartAPI = async (product) => {
  const res = await apiClient.post("/cart/add/", {
    product_id: product.id,
    quantity: 1,
    price: product.price,
    title: product.title,
    discountPercentage: product.discountPercentage || 0,
  });
  return res.data;
};

export const removeFromCartAPI = async (productId) => {
  await apiClient.delete(`/cart/remove/${productId}/`);
};

export const updateCartAPI = async ({ productId, quantity }) => {
  await apiClient.put(`/cart/update/${productId}/`, { quantity });
};