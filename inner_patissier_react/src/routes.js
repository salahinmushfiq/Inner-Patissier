import React from 'react'
import {Routes,Route,BrowserRouter } from 'react-router-dom';
import {HomePage,ProductsPage,CartPage, CurrentOrderDetailsPage,CheckoutPage} from './front/pages';
import { CartProvider } from './front/components/contexts/CartContext';
import { CheckoutProvider } from './front/components/contexts/CheckoutContext.jsx';
const AppRoutes = () => {
  return(
    
      <BrowserRouter>
        
    <Routes>
      <Route path="/" element={<HomePage/>}/>
               
      <Route path="/products" element={<CartProvider><ProductsPage/></CartProvider>}/> 
      <Route path="/cart" element={<CartProvider><CartPage/></CartProvider>}/> 
      <Route path="/checkout">
        <Route index element={<CartProvider><CheckoutProvider><CheckoutPage/></CheckoutProvider></CartProvider>}></Route>
        <Route path="details/:id" element={<CartProvider><CheckoutProvider><CurrentOrderDetailsPage/></CheckoutProvider></CartProvider>}></Route>
      </Route>          
    </Routes>
  
    </BrowserRouter>
    
  )
}

export default AppRoutes