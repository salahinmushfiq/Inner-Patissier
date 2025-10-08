
import React from 'react'

const CheckoutItem = ({checkoutItem}) => {
    console.log("checkoutItem");
    console.log(checkoutItem);
    const imgSrc=checkoutItem.product.images[0];
    console.log(imgSrc);
    const cartTitle=checkoutItem.product.title;
    const quantity=checkoutItem.quantity;
    const price=checkoutItem.product.price;
    const totalPrice=checkoutItem.price*quantity;
    const discountedPrice=checkoutItem.product.price-(checkoutItem.product.discountPercentage/10);
    const totalDiscountedPrice=discountedPrice*quantity;
    
  return (
    
  <div className="flex flex-col rounded-lg bg-white sm:flex-row border border-gray-200 shadow hover:bg-gray-100">
  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={imgSrc} alt="" />
  <div className="flex w-full flex-col px-4 py-4">
    <span className="font-semibold">{cartTitle}</span>
    <p className="text-lg font-semibold text-red-400">$<span className='m-1 line-through'>{price} * {quantity}</span></p>
    <p className="text-lg font-semibold  text-red-400">$<span className='m-1 line-through'>{totalPrice.toFixed(2)}</span></p>
    <p className="text-lg font-semibold">$<span className='m-1'>{discountedPrice} * {quantity}</span></p>
    <p className="text-lg font-semibold">$<span className='m-1'>{totalDiscountedPrice.toFixed(2)}</span></p>
  </div>
</div>
  )
}

export default CheckoutItem