// import React, { useMemo } from "react";
// import { motion } from "framer-motion";
// import { BsCartPlus, BsCartDash } from "react-icons/bs";
// import { useCart } from "../contexts/CartContext";

// const ProductItem = ({ product }) => {
//   const { addToCart, removeFromCart, cart } = useCart();

//   // FIX: memoized calculations
//   const { imgSrc, title, description, price, discountPrice } = useMemo(() => {
//     return {
//       imgSrc: product.images?.[0],
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       discountPrice: (
//         product.price -
//         (product.price * (product.discountPercentage || 0)) / 100
//       ).toFixed(2),
//     };
//   }, [product]);

//   const isInCart = useMemo(() => {
//     return cart?.items?.some((item) => item.product_id === product.id);
//   }, [cart, product.id]);

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       className="w-full max-w-[320px] bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
//     >
//       <div className="aspect-[4/5] overflow-hidden">
//         <img
//           src={imgSrc}
//           alt={title}
//           loading="lazy"
//           className="w-full h-full object-cover hover:scale-110 transition duration-500"
//         />
//       </div>

//       <div className="p-5">
//         <h3 className="font-bold text-lg truncate">{title}</h3>

//         <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
//           {description}
//         </p>

//         <div className="flex justify-between items-center mt-5">
//           <div>
//             <span className="text-xl font-bold">${discountPrice}</span>
//             {product.discountPercentage > 0 && (
//               <del className="text-sm text-gray-400 ml-2">${price}</del>
//             )}
//           </div>

//           {isInCart ? (
//             <button
//               onClick={() => removeFromCart(product.id)}
//               className="p-3 bg-red-100 text-red-600 rounded-xl"
//             >
//               <BsCartDash />
//             </button>
//           ) : (
//             <button
//               onClick={() => addToCart(product)}
//               className="p-3 bg-black text-white rounded-xl"
//             >
//               <BsCartPlus />
//             </button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductItem;
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();

  // Memoized product data
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

  // Actual cart item
  const cartItem = useMemo(() => {
    return cart?.items?.find(
      (item) => item.product.id === product.id
    );
  }, [cart, product.id]);

  const isInCart = !!cartItem;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="w-full max-w-[320px] bg-white dark:bg-secondary-dark-bg border border-brand-cream/50 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-brand-burgundy text-white text-[10px] font-bold px-3 py-1 rounded-full">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-brand-cream truncate">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 italic">
          {description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-2xl font-bold text-brand-burgundy dark:text-white">
              ${discountPrice}
            </span>
            {product.discountPercentage > 0 && (
              <del className="text-xs text-gray-400 ml-2">${price}</del>
            )}
          </div>

          {isInCart ? (
            <button
              onClick={() => removeFromCart(cartItem.product.id)} // ✅ FIXED
              className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100"
            >
              <BsCartDash size={20} />
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="p-4 bg-brand-burgundy text-white rounded-2xl hover:bg-[#600018]"
            >
              <BsCartPlus size={20} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;