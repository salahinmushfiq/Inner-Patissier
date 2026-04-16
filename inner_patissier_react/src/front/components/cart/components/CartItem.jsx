// //src/front/cart/components/CartItem.jsx
// import { motion } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import { RiAddLine, RiSubtractLine } from "react-icons/ri";
// import axios from 'axios';
// import { useCart } from '../../contexts/CartContext';

// const CartItem = ({ cartItem, positionY, scale, opacity }) => {
//     const { updateCartItem, removeFromCart ,cart,fetchCart,updateCartQuantity} = useCart(); // Use the context hook

//     const cartItemProductId = cartItem.product.id;
//     const imgSrc = cartItem.product.images?.[0];
//     const cartItemTitle = cartItem.product.title;
//     const price = cartItem.product.price;
//     const discountPercentage = cartItem.product.discountPercentage;
//     const [count, setCount] = useState(cartItem.quantity);
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(true);
    
//     const handleAddClick = () => {
//         const newQuantity = count + 1;
//         setCount(newQuantity);
//         updateCartQuantity(cartItemProductId, newQuantity, price, cartItemTitle, discountPercentage);
//     };

//     const handleSubClick = () => {
//         if (count > 1) {
//             const newQuantity = count - 1;
//             setCount(newQuantity);
//             updateCartQuantity(cartItemProductId, newQuantity, price, cartItemTitle, discountPercentage);
//         }
//     };

//     const handleRemoveClick = async () => {
//         setLoading(true);
//         removeFromCart(cartItemProductId);
//         setMessage('Product removed from cart.');
//         await fetchCart(); // Fetch latest data
//         setLoading(false);
//     };

//     return (
//     <motion.div 
//       layout
//       className="flex items-center gap-4 py-6 border-b last:border-0 border-gray-100 dark:border-gray-800"
//     >
//       <img 
//         className="h-24 w-24 rounded-2xl object-cover shadow-sm border dark:border-gray-700" 
//         src={imgSrc} 
//         alt={cartItem.product.title} 
//       />
      
//       <div className="flex-1">
//         <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white">
//           {cartItem.product.title}
//         </h4>
//         <p className="text-sm text-brand-burgundy dark:text-brand-cream font-semibold">
//           ${cartItem.product.price}
//         </p>
        
//         <button 
//           onClick={() => removeFromCart(cartItem.product.id)}
//           className="text-xs text-red-500 mt-2 hover:underline flex items-center gap-1"
//         >
//           <RiSubtractLine /> Remove Item
//         </button>
//       </div>

//       <div className="flex flex-col items-end gap-3">
//         <div className="flex items-center bg-gray-50 dark:bg-main-dark-bg border dark:border-gray-700 rounded-xl p-1">
//           <button 
//             onClick={() => handleSubClick} // existing logic
//             className="p-2 hover:text-brand-burgundy dark:text-white"
//           ><RiSubtractLine /></button>
//           <span className="w-8 text-center font-bold dark:text-white">{count}</span>
//           <button 
//             onClick={() => handleAddClick} // existing logic
//             className="p-2 hover:text-brand-burgundy dark:text-white"
//           ><RiAddLine /></button>
//         </div>
//         <p className="font-bold text-lg dark:text-white">
//           ${(cartItem.product.price * count).toFixed(2)}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default CartItem;
// // src/front/cart/components/CartItem.jsx
// import { motion } from 'framer-motion';
// import React, { useState } from 'react';
// import { RiAddLine, RiSubtractLine, RiDeleteBin6Line } from "react-icons/ri";
// import { useCart } from '../../contexts/CartContext';

// const CartItem = ({ cartItem }) => {
//     const { removeFromCart, updateCartQuantity } = useCart();
//     const [count, setCount] = useState(cartItem.quantity);

//     const product = cartItem.product;
//     const discountedPrice = (product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2);

//     const handleQuantityChange = (newQty) => {
//         if (newQty < 1) return;
//         setCount(newQty);
//         updateCartQuantity(product.id, newQty, product.price, product.title, product.discountPercentage);
//     };

//     return (
//         <motion.div 
//             layout
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-brand-cream/30 last:border-0"
//         >
//             {/* Image with brand-accent border */}
//             <div className="relative group">
//                 <img 
//                     className="h-28 w-28 rounded-2xl object-cover border-2 border-brand-accent dark:border-brand-burgundy/20 shadow-sm" 
//                     src={product.images?.[0]} 
//                     alt={product.title} 
//                 />
//             </div>
            
//             <div className="flex-1 text-center sm:text-left">
//                 <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white">
//                     {product.title}
//                 </h4>
//                 <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
//                     <span className="text-brand-burgundy dark:text-brand-cream font-bold">
//                         ${discountedPrice}
//                     </span>
//                     {product.discountPercentage > 0 && (
//                         <del className="text-xs text-gray-400">${product.price}</del>
//                     )}
//                 </div>
                
//                 <button 
//                     onClick={() => removeFromCart(product.id)}
//                     className="mt-3 text-xs font-medium text-red-400 hover:text-red-600 flex items-center gap-1 justify-center sm:justify-start transition-colors"
//                 >
//                     <RiDeleteBin6Line /> Remove from tray
//                 </button>
//             </div>

//             {/* Quantity Selector - Patisserie Style */}
//             <div className="flex items-center gap-6">
//                 <div className="flex items-center bg-brand-accent/50 dark:bg-main-dark-bg border border-brand-cream dark:border-gray-700 rounded-2xl p-1">
//                     <button 
//                         onClick={() => handleQuantityChange(count - 1)}
//                         className="p-2 text-brand-burgundy dark:text-brand-cream hover:bg-white dark:hover:bg-brand-burgundy/20 rounded-xl transition-all"
//                     >
//                         <RiSubtractLine size={18} />
//                     </button>
//                     <span className="w-10 text-center font-bold text-brand-burgundy dark:text-white">
//                         {count}
//                     </span>
//                     <button 
//                         onClick={() => handleQuantityChange(count + 1)}
//                         className="p-2 text-brand-burgundy dark:text-brand-cream hover:bg-white dark:hover:bg-brand-burgundy/20 rounded-xl transition-all"
//                     >
//                         <RiAddLine size={18} />
//                     </button>
//                 </div>
//                 <div className="text-right min-w-[80px]">
//                     <p className="text-lg font-bold text-brand-burgundy dark:text-white">
//                         ${(discountedPrice * count).toFixed(2)}
//                     </p>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default CartItem;

// src/front/cart/components/CartItem.jsx
import { motion } from "framer-motion";
import React, { useState, useCallback, useEffect } from "react";
import { RiAddLine, RiSubtractLine, RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "../../contexts/CartContext";

const CartItem = ({ cartItem }) => {
  const { updateCartQuantity, removeFromCart } = useCart();

  const product = cartItem.product;

  // ✅ Local UI state (synced with backend)
  const [count, setCount] = useState(cartItem.quantity);

  // ✅ CRITICAL FIX: keep UI in sync with React Query updates
  useEffect(() => {
    setCount(cartItem.quantity);
  }, [cartItem.quantity]);

  const discountedPrice = (
    product.price -
    (product.price * (product.discountPercentage || 0)) / 100
  ).toFixed(2);

  const handleQuantityChange = useCallback(
    (newQty) => {
      if (newQty < 1) return;

      // ✅ Optimistic UI update
      setCount(newQty);

      // ✅ Trigger backend update → React Query refetch → global sync
      updateCartQuantity(cartItem.product.id, newQty);
    },
    [cartItem.product.id,, updateCartQuantity]
  );

  const handleRemove = useCallback(() => {
    removeFromCart(cartItem.product.id);
  }, [cartItem.product.id,, removeFromCart]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b"
    >
      {/* 🖼 Product Image */}
      <img
        className="h-28 w-28 rounded-2xl object-cover"
        src={product.images?.[0]}
        alt={product.title}
      />

      {/* 📄 Product Info */}
      <div className="flex-1">
        <h4 className="font-serif font-bold text-xl text-brand-burgundy dark:text-brand-cream">
          {product.title}
        </h4>

        <div className="flex gap-2 mt-1">
          <span className="text-brand-burgundy/80 dark:text-brand-cream/80 font-bold">
            ${discountedPrice}
          </span>

          {product.discountPercentage > 0 && (
            <del className="text-xs text-gray-400 my-auto">
              ${product.price}
            </del>
          )}
        </div>

        {/* ❌ Remove */}
        <button
          onClick={handleRemove}
          className="mt-3 text-red-400 hover:text-red-600 flex items-center gap-1"
        >
          <RiDeleteBin6Line/> Remove
        </button>
      </div>

      {/* 🔢 Quantity + Total */}
      <div className="flex items-center gap-6">
        <div className="flex items-center border rounded-2xl p-1">
          <button className="dark:text-brand-cream" onClick={() => handleQuantityChange(count - 1)}>
            <RiSubtractLine  className="dark:text-brand-cream"/>
          </button>

          <span className="w-10 text-center dark:text-brand-cream">{count}</span>

          <button className="dark:text-brand-cream" onClick={() => handleQuantityChange(count + 1)}>
            <RiAddLine />
          </button>
        </div>

        {/* 💰 Item Total */}
        <div>
          <p className="text-lg font-bold dark:text-brand-cream w-20 text-start">
            ${(discountedPrice * count).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;