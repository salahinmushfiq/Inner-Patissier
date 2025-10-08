"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BsCartPlus, BsCartCheck, BsCartDash } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart, cart, fetchCart } = useCart();

  const imgSrc = product.images[0];
  const productTitle = product.title;
  const productDescription = product.description;
  const price = product.price;
  const discountPrice = (
    price -
    (price * (product.discountPercentage || 0)) / 100
  ).toFixed(2);

  const isInCart = cart?.items?.some((item) => item.product_id === product.id);

  const handleAddToCart = () => addToCart(product);
  const handleRemoveFromCart = () => removeFromCart(product.id);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <motion.div
      className="w-72 bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300"
    >
      <img
        src={imgSrc}
        alt={productTitle}
        className="h-80 w-full object-cover"
      />
      <div className="px-4 py-3">
        <p className="text-lg font-bold text-black truncate capitalize">
          {productTitle}
        </p>
        <p className="text-md font-semibold text-gray-700 truncate">
          {productDescription}
        </p>
        <div className="flex items-center mt-2">
          <p className="text-lg font-semibold text-black">${discountPrice}</p>
          {product.discountPercentage > 0 && (
            <del className="text-red-500 ml-2">${price}</del>
          )}
          <div className="ml-auto flex gap-2">
            {isInCart ? (
              <>
                <BsCartCheck
                  className="text-[#8000207e] cursor-pointer hover:text-red-600"
                  onClick={handleRemoveFromCart}
                />
                <BsCartDash
                  className="text-[#8000207e] cursor-pointer hover:text-red-600"
                  onClick={handleRemoveFromCart}
                />
              </>
            ) : (
              <BsCartPlus
                className="text-[#8000207e] cursor-pointer hover:text-red-600"
                onClick={handleAddToCart}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
