//src/front/checkout/components/CheckoutItem.jsx
import React from 'react'

const CheckoutItem = ({checkoutItem}) => {
    const product=checkoutItem;
    console.log("checkoutItem");
    console.log(checkoutItem);
    const imgSrc = checkoutItem.product.images?.[0];
    // console.log(`img Src: ${imgSrc}`);
    const cartTitle=checkoutItem.product.title;
    const quantity=checkoutItem.quantity;
    const price=checkoutItem.product.price;
    const totalPrice=checkoutItem.price*quantity;
    const discountedPrice = price - (price * checkoutItem.product.discountPercentage) / 100;
    const totalDiscountedPrice=discountedPrice*quantity;
    
  return (
        <div className="flex gap-4 p-4 bg-white dark:bg-main-dark-bg border dark:border-gray-800 rounded-2xl shadow-sm transition-hover hover:shadow-md">
            <img className="h-20 w-20 rounded-xl object-cover border dark:border-gray-700" src={imgSrc} alt={product.title} />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{product.title}</h4>
                    <p className="text-xs text-gray-500">Qty: {quantity}</p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        {product.discountPercentage > 0 && (
                            <span className="text-xs text-gray-400 line-through">${(price * quantity).toFixed(2)}</span>
                        )}
                        <span className="font-bold text-brand-burgundy dark:text-brand-cream">
                            ${(discountedPrice * quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutItem