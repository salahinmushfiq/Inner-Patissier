
import React from 'react'
import { Link} from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
const AddToCartFloatingIcon = () => {
    const { addToCart, removeFromCart, cart } = useCart();

  return (
    <Link to="/cart" className="fixed bottom-10 right-10 z-[100] group">
      <div className="relative p-5 burgundy rounded-full shadow-2xl transform transition-all group-hover:scale-110 group-active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
        
        {cart?.items?.length > 0 && (
          <span className="absolute top-0 right-0 bg-brand-cream burgundy text-xs font-bold px-2 py-1 rounded-full border-2 border-burgundy shadow-sm">
            {cart.items.length}
          </span>
        )}
      </div>
    </Link>
  );
}

export default AddToCartFloatingIcon