import React from 'react'
import {Routes,Route,BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import {HomePage,ProductsPage,CartPage, CurrentOrderDetailsPage,CheckoutPage} from './front/pages';
import { DashHome, UserLogin, UserSignUp } from './dashboard/pages';
import { ContextProvider, useStateContext } from './dashboard/contexts/ContextProvider';
import { MapContextProvider } from './dashboard/contexts/MapContextProvider';
import { CartProvider } from './front/components/contexts/CartContext';
import { CheckoutProvider } from './front/components/contexts/CheckoutContext.jsx';
const AppRoutes = () => {
  return(
    
  <BrowserRouter>
        
    <Routes>
      <Route path="/" element={<HomePage/>}/>
               
      <Route path="/products" element={<CartProvider><ContextProvider><ProductsPage/></ContextProvider></CartProvider>}/> 
      <Route path="/cart" element={<CartProvider><CartPage/></CartProvider>}/> 
      <Route path="/checkout">
        <Route index element={<CartProvider><CheckoutProvider><CheckoutPage/></CheckoutProvider></CartProvider>}></Route>
        <Route path="details/:id" element={<CartProvider><CheckoutProvider><CurrentOrderDetailsPage/></CheckoutProvider></CartProvider>}></Route>
      </Route> 

      <Route>
        <Route path="/login" element={ 
          <ContextProvider>
            <MapContextProvider>
              <UserLogin/> 
            </MapContextProvider>
          </ContextProvider>
          }/>
            <Route path="/signup" element={ 
          <ContextProvider>
            <MapContextProvider>
              <UserSignUp/> 
            </MapContextProvider>
          </ContextProvider>
          }
          />
        <Route path="/dash/*" element={
          <ContextProvider>
            <MapContextProvider>
                <DashHome/>  
            </MapContextProvider>
          </ContextProvider>
          }/>
      </Route>
              
    </Routes>
  
  </BrowserRouter>
    
  )
}

export default AppRoutes