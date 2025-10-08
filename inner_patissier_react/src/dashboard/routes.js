import React from 'react'
import { Navbar,Footer,Sidebar,ThemeSettings,UserProfile } from './components'
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import {DashHome,Products,Employees,Customers,AddProduct, EditProduct,AddEmployee,UserSignUp,EditEmployee,Calendar,Stacked,Pyramid,Kanban,CustomArea,CustomBar,Pie,CustomLineChart,Financial,ColorPicker,ColorMapping,Editor, CustomSeriesLinePage,EmployeeProfile,CustomerProfile,EmployeesAPITestWithAuth,PatternAPI,ProductsAPITest, AddBulkProducts, UserLogin, OrderList} from './pages';

import { ContextProvider } from './contexts/ContextProvider';
import { MapContextProvider } from './contexts/MapContextProvider';
import {useStateContext} from './contexts/ContextProvider';
import { OrderDetails } from '../dashboard/pages';
import AdminRFM from './pages/AdminRFM';
import AdminCouponsPage from './pages/AdminCouponsPage';
const DashRoutes = () => {
  // const {currentMode} = useStateContext();
  return (
    
          <Routes>
                {/*Dashboard*/}
              {/* <Route path="/" element={<UserLogin/>}/>  */}
              <Route path="/profile" element={<UserProfile/>}/>

              {/*Custom Pages*/}
              <Route path="/addproduct" element={<AddProduct/>}/>
              <Route path="/editproduct" element={<EditProduct/>}/>
              <Route path="/addemployee" element={<AddEmployee/>}/>
              <Route path="/editemployee" element={<EditEmployee/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/productsapitest" element={<ProductsAPITest/>}/>
              <Route path="/AddBulkProducts" element={<AddBulkProducts/>}/>
              <Route path="/orders">
                <Route index element={<OrderList/>}></Route>
                <Route path="order/:id" element={<OrderDetails/>}></Route>
              </Route>  
              <Route path="/employees">
                <Route index element={<Employees/>}></Route>
                <Route path="employee/:id" element={<EmployeeProfile/>}></Route>
                
              </Route>  
              
              <Route path="/EmployeesAPITestWithAuth">
                <Route index element={<EmployeesAPITestWithAuth/>}></Route>
                <Route path="EmployeeAPITestWithAuth/:id" element={<EmployeeProfile/>}></Route>
              </Route>
              
              {/* <Route path="/patternAPI" element={<PatternAPI/>}/> */}
              
              <Route path="/customers">
                <Route index element={<Customers/>}></Route>
                <Route path="customer/:id" element={<CustomerProfile/>}></Route>
              </Route>  
              <Route path="/rfm" element={<AdminRFM/>}/>
              <Route path="/coupons" element={<AdminCouponsPage/>}/>
          </Routes>
        
  )
}

export default DashRoutes