import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import { getHeaders } from "../utils";
import { useParams } from "react-router-dom";
const base_url = process.env.REACT_APP_API_URL ; 

const CurrentOrderDetailsPage = () => {
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("CurrentOrderDetailsPage");
    console.log("id "+id);
      useEffect(() => {
        axios.get(`${base_url}/order/${id}/`,{
                  headers: getHeaders(),
                  withCredentials: true,
                },{
                          headers: getHeaders(),
                          withCredentials: true,
                        },)
          .then((res) => {
            setOrder(res.data);
            setLoading(false);
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Failed to fetch order:", err);
            setLoading(false);
          });
      }, [id]);
    
      if (loading) return <div className="text-center mt-10">Loading...</div>;
      if (!order) return <div className="text-center mt-10 text-red-500">Order not found.</div>;
    return (
        <>
        <Navbar/>    
        <div className="max-container padding-container flex flex-col flex-wrap gap-10 pb-20 lg:py-12">
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 ">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl pb-6">Current Order</h2>
              
            </div>
               <div className='flex flex-wrap flex-row md:flex-col md:min-w-0.5 col-span-1 w-full'>
             {/* Customer Info */}
            {order.user?.email?
            <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Customer Info</h5>
              <div className='flex flex-row md:flex-col py-2'>
                    <p><strong className="text-ellipsis">Name:</strong> {order.user?.firstName||"NAN"}</p>
                    <p><strong className="text-ellipsis">Email:</strong> {order.user.email}</p>
              </div>
            
              {/* <p><strong>Address:</strong> {order.shipping.address}</p> */}
            </div> :<div> </div>
            }
            

            {/* Order Items */}
            <div className="p-4 flex flex-col md:flex-row w-full bg-white rounded-lg border shadow-md  md:max-w-full  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <h5 className="mb-2  text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Items</h5>
              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="flex  py-4">
                    <img src={item.product.thumbnail} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-grow">
                      <p className="font-medium  min-w-24 text-end">{item?.title||"NAN"}</p>
                      <p className=" min-w-24 text-end">{item.quantity} × ${item?.price || 0.00}</p>
                    </div>
                    <div className="font-bold min-w-24 text-end">${(item?.quantity * item?.price).toFixed(2)|| 0.00}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
          <div className='flex flex-auto flex-col sm:flex-row md:flex-row md:min-w-0.5 gap-3 col-span-1 w-full'>
            {/* Payment Summary */}
            <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 w-">
              <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Payment Summary</h5>
              <div className="space-y-1">
                <div className="flex justify-between"><span>Subtotal </span><span className=" min-w-24 text-end">${order?.total||'0.00'}</span></div>
                <div className="flex justify-between"><span>Shipping </span><span className=" min-w-24 text-end">${order?.shippingFee?.toFixed(2)||'2.00'}</span></div>
                <div className="flex justify-between font-medium text-lg"><span>Total </span><span className="line-through min-w-24 text-end">${Number(order?.total).toFixed(2) +2.00||'0.00'}</span></div>
                <div className="flex justify-between font-medium text-lg"><span>Discounted Total </span><span className=" min-w-24 text-end">${Number(order?.discounted_total).toFixed(2)+2.00||'0.00'}</span></div>
                <div className="flex justify-between font-medium text-lg"><span>Save </span><span className="text-green-600 min-w-24 text-end">${String(((Number(order?.total)-Number(order?.discounted_total))+2.00).toFixed(2))||'2.00'}</span></div>
              </div>
            </div>

            {/* Order Status */}
            <div className="p-4 flex flex-row w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 ">
              <h5 className="mb-2  md:text-xl sm:text-lg font-bold md:font-semibold tracking-tight text-gray-900 dark:text-white w-32">Order Status</h5>
              <p><span className="font-medium">{order?.status}</span></p>
            </div>
          </div>
      
        </div>
            <Footer/>
        </>
    );
};

export default CurrentOrderDetailsPage;
