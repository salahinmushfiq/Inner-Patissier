// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Footer, Navbar } from "../components";
// import { getHeaders } from "../utils";
// import { useParams } from "react-router-dom";
// const base_url = process.env.REACT_APP_API_URL ; 

// const CurrentOrderDetailsPage = () => {
//     const [error, setError] = useState(null);
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//     console.log("CurrentOrderDetailsPage");
//     console.log("id "+id);
//       useEffect(() => {
//         axios.get(`${base_url}/order/${id}/`,{
//                   headers: getHeaders(),
//                   withCredentials: true,
//                 },{
//                           headers: getHeaders(),
//                           withCredentials: true,
//                         },)
//           .then((res) => {
//             setOrder(res.data);
//             setLoading(false);
//             console.log(res.data);
//           })
//           .catch((err) => {
//             console.error("Failed to fetch order:", err);
//             setLoading(false);
//           });
//       }, [id]);
    
//       if (loading) return <div className="text-center mt-10">Loading...</div>;
//       if (!order) return <div className="text-center mt-10 text-red-500">Order not found.</div>;
//     return (
//         <>
//         <Navbar/>    
//         <div className="max-container padding-container flex flex-col flex-wrap gap-10 pb-20 lg:py-12">
//             <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 ">
//                 <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl pb-6">Current Order</h2>
              
//             </div>
//                <div className='flex flex-wrap flex-row md:flex-col md:min-w-0.5 col-span-1 w-full'>
//              {/* Customer Info */}
//             {order.user?.email?
//             <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//               <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Customer Info</h5>
//               <div className='flex flex-row md:flex-col py-2'>
//                     <p><strong className="text-ellipsis">Name:</strong> {order.user?.firstName||"NAN"}</p>
//                     <p><strong className="text-ellipsis">Email:</strong> {order.user.email}</p>
//               </div>
            
//               {/* <p><strong>Address:</strong> {order.shipping.address}</p> */}
//             </div> :<div> </div>
//             }
            

//             {/* Order Items */}
//             <div className="p-4 flex flex-col md:flex-row w-full bg-white rounded-lg border shadow-md  md:max-w-full  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//               <h5 className="mb-2  text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Items</h5>
//               <div className="divide-y">
//                 {order.items.map((item, i) => (
//                   <div key={i} className="flex  py-4">
//                     <img src={item.product.thumbnail} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
//                     <div className="ml-4 flex-grow">
//                       <p className="font-medium  min-w-24 text-end">{item?.title||"NAN"}</p>
//                       <p className=" min-w-24 text-end">{item.quantity} × ${item?.price || 0.00}</p>
//                     </div>
//                     <div className="font-bold min-w-24 text-end">${(item?.quantity * item?.price).toFixed(2)|| 0.00}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
        
//           <div className='flex flex-auto flex-col sm:flex-row md:flex-row md:min-w-0.5 gap-3 col-span-1 w-full'>
//             {/* Payment Summary */}
//             <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 w-">
//               <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Payment Summary</h5>
//               <div className="space-y-1">
//                 <div className="flex justify-between"><span>Subtotal </span><span className=" min-w-24 text-end">${order?.total||'0.00'}</span></div>
//                 <div className="flex justify-between"><span>Shipping </span><span className=" min-w-24 text-end">${order?.shippingFee?.toFixed(2)||'2.00'}</span></div>
//                 <div className="flex justify-between font-medium text-lg"><span>Total </span><span className="line-through min-w-24 text-end">${Number(order?.total).toFixed(2) +2.00||'0.00'}</span></div>
//                 <div className="flex justify-between font-medium text-lg"><span>Discounted Total </span><span className=" min-w-24 text-end">${Number(order?.discounted_total).toFixed(2)+2.00||'0.00'}</span></div>
//                 <div className="flex justify-between font-medium text-lg"><span>Save </span><span className="text-green-600 min-w-24 text-end">${String(((Number(order?.total)-Number(order?.discounted_total))+2.00).toFixed(2))||'2.00'}</span></div>
//               </div>
//             </div>

//             {/* Order Status */}
//             <div className="p-4 flex flex-row w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 ">
//               <h5 className="mb-2  md:text-xl sm:text-lg font-bold md:font-semibold tracking-tight text-gray-900 dark:text-white w-32">Order Status</h5>
//               <p><span className="font-medium">{order?.status}</span></p>
//             </div>
//           </div>
      
//         </div>
//             <Footer/>
//         </>
//     );
// };

// export default CurrentOrderDetailsPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Navbar } from "../components";
import { getHeaders } from "../utils";
import { useParams, Link } from "react-router-dom";
import StepperHeader from "../components/shared/StepperHeader";
import { RiTimeLine,RiCheckboxCircleFill} from "react-icons/ri";
const base_url = process.env.REACT_APP_API_URL;

// const StepperHeader = ({title,subtitle,extraParameter1, extraParameter2,path}) => {
//   return (
//     <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl shadow-sm border border-brand-cream/50 dark:border-gray-800 p-8 mb-10 transition-colors">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//         <div>
//           <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
//             {path.split("/").map((segment, index, arr) => (
//               <span key={index} className="flex items-center gap-2">
//                 <span
//                   className={
//                     index === arr.length - 1
//                       ? "text-brand-burgundy dark:text-brand-cream font-bold"
//                       : ""
//                   }
//                 >
//                   {segment}
//                 </span>
//                 {index !== arr.length - 1 && <span>/</span>}
//               </span>
//             ))}
//           </nav>
//           <h2 className="text-4xl font-serif font-bold text-brand-burgundy dark:text-brand-cream">
//             {title}
//           </h2>
//           <p className="mt-2 text-gray-500 italic font-serif">{subtitle}</p>
//         </div>
        
//         <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-800">
//           <RiCheckboxCircleFill className="text-emerald-600 text-2xl" />
//           <div>
//             <p className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold">Order ID</p>
//             <p className="font-mono text-emerald-900 dark:text-emerald-200">#{extraParameter1.slice(-8).toUpperCase()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
const CurrentOrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${base_url}/order/${id}/`, {
        headers: getHeaders(),
        withCredentials: true,
      })
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-main-dark-bg">
        <div className="animate-pulse font-serif text-brand-burgundy text-2xl italic">Preparing your receipt...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-main-dark-bg">
        <p className="text-red-500 font-serif text-xl mb-4">Order not found.</p>
        <Link to="/products" className="text-brand-burgundy underline">Return to Shop</Link>
      </div>
    );
  }

  const subtotal = Number(order?.total || 0);
  const shipping = Number(order?.shippingFee || 2.00);
  const discountTotal = Number(order?.discounted_total || subtotal);
  const finalTotal = discountTotal + shipping;
  const savings = subtotal - discountTotal;
  
  return (
    <div className="dark:bg-main-dark-bg min-h-screen transition-colors duration-300">
      <Navbar />
      
      <div className="mt-28 lg:mt-24 max-container padding-container py-12">
        
        {/* Unified Header with Breadcrumbs & Success State */}
        <StepperHeader key={"Shop/Checkout/Success"} title={"Order Confirmed"} subtitle={"Thank you for choosing Inner-Patissier."} extraParameter1={"Order ID"} extraParameter2={`#${id.slice(-8).toUpperCase()}`} path={"Shop/Checkout/Success"}/>
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Main Details Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Items Card */}
            <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl border border-brand-cream/50 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-brand-cream/20 bg-brand-accent/10">
                <h5 className="font-serif text-xl font-bold text-brand-burgundy dark:text-brand-cream">Ordered Delicacies</h5>
              </div>
              <div className="p-6 divide-y divide-brand-cream/20">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center py-4 gap-4">
                    <img 
                      src={item.product.thumbnail} 
                      alt={item.product.title} 
                      className="w-20 h-20 object-cover rounded-xl border border-brand-cream/50 shadow-sm" 
                    />
                    <div className="flex-grow">
                      <p className="font-serif font-bold text-lg text-gray-900 dark:text-white">{item?.title || "Signature Item"}</p>
                      <p className="text-sm text-gray-500 italic">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-burgundy dark:text-brand-cream">
                        ${(item?.quantity * item?.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info Card */}
            {order.user?.email && (
              <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl border border-brand-cream/50 dark:border-gray-800 shadow-sm p-8">
                <h5 className="font-serif text-xl font-bold text-brand-burgundy dark:text-brand-cream mb-4">Delivery Information</h5>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Recipient</p>
                    <p className="font-medium dark:text-white">{order.user?.firstName || "Guest Patron"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Email Address</p>
                    <p className="font-medium dark:text-white">{order.user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            
            {/* Status Card */}
            <div className="bg-brand-burgundy text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                  <h5 className="font-serif text-xl text-brand-cream mb-4">Order Status</h5>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <RiTimeLine className="text-brand-cream text-xl" />
                    <span className="font-bold uppercase tracking-widest text-sm">{order?.status}</span>
                  </div>
               </div>
               {/* Decorative Background Element */}
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full" />
            </div>

            {/* Payment Summary Card */}
            <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl border border-brand-cream/50 dark:border-gray-800 shadow-sm p-8 space-y-4">
              <h5 className="font-serif text-xl font-bold text-brand-burgundy dark:text-brand-cream mb-4">Receipt Summary</h5>
              
              <div className="space-y-3 border-b border-brand-cream/20 pb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Packaging & Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Loyalty Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Paid</p>
                  <p className="text-3xl font-serif font-bold text-brand-burgundy dark:text-brand-cream">
                    ${finalTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.print()}
              className="w-full py-4 rounded-2xl border border-brand-cream text-brand-burgundy dark:text-brand-cream font-bold hover:bg-brand-accent/20 transition-all"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CurrentOrderDetailsPage;