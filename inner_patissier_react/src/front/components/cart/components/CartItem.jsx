import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ cartItem, positionY, scale, opacity }) => {
    const { updateCartItem, removeFromCart ,cart,fetchCart,updateCartQuantity} = useCart(); // Use the context hook
    
    const cartItemProductId = cartItem.product.id;
    const imgSrc = cartItem.product.images;
    const cartItemTitle = cartItem.product.title;
    const price = cartItem.product.price;
    const discountPercentage = cartItem.product.discountPercentage;
    const [count, setCount] = useState(cartItem.quantity);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    
    const handleAddClick = () => {
        const newQuantity = count + 1;
        setCount(newQuantity);
        updateCartQuantity(cartItemProductId, newQuantity, price, cartItemTitle, discountPercentage);
    };

    const handleSubClick = () => {
        if (count > 1) {
            const newQuantity = count - 1;
            setCount(newQuantity);
            updateCartQuantity(cartItemProductId, newQuantity, price, cartItemTitle, discountPercentage);
        }
    };

    const handleRemoveClick = async () => {
        setLoading(true);
        removeFromCart(cartItemProductId);
        setMessage('Product removed from cart.');
        await fetchCart(); // Fetch latest data
        setLoading(false);
    };

    return (
        <motion.div className="z-10 border border-gray-200 p-4 shadow-sm md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <img className="object-cover h-20 w-20 rounded-md" src={imgSrc} alt="Product image" />
                <div className="w-full min-w-32 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p className="text-base font-medium text-gray-900">{cartItemTitle}</p>
                    <div className="flex items-center gap-4 h-12 bg-gray-100 justify-center rounded-lg hover:bg-gray-200">
                        <button type="button" onClick={handleRemoveClick} className="inline-flex items-center text-sm font-medium text-red-600">
                            <RiSubtractLine className="mr-1.5" /> Remove
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between md:order-3 md:justify-end min-w-28">
                    <div className="flex items-center">
                        <button onClick={handleSubClick} className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                            <RiSubtractLine />
                        </button>
                        <p className="w-10 text-center text-sm font-medium text-gray-900">{count}</p>
                        <button onClick={handleAddClick} className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                            <RiAddLine />
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-24">
                        <p className="text-base font-bold text-gray-900">${price}</p>
                    </div>
                </div>
            </div>
            {message && <p className="text-sm text-center text-green-600 mt-2">{message}</p>}
        </motion.div>
    );
};

export default CartItem;
