import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();

  // FIX: memoized calculations
  const { imgSrc, title, description, price, discountPrice } = useMemo(() => {
    return {
      imgSrc: product.images?.[0],
      title: product.title,
      description: product.description,
      price: product.price,
      discountPrice: (
        product.price -
        (product.price * (product.discountPercentage || 0)) / 100
      ).toFixed(2),
    };
  }, [product]);

  const isInCart = useMemo(() => {
    return cart?.items?.some((item) => item.product_id === product.id);
  }, [cart, product.id]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="w-full max-w-[320px] bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg truncate">{title}</h3>

        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <div>
            <span className="text-xl font-bold">${discountPrice}</span>
            {product.discountPercentage > 0 && (
              <del className="text-sm text-gray-400 ml-2">${price}</del>
            )}
          </div>

          {isInCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="p-3 bg-red-100 text-red-600 rounded-xl"
            >
              <BsCartDash />
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="p-3 bg-black text-white rounded-xl"
            >
              <BsCartPlus />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;