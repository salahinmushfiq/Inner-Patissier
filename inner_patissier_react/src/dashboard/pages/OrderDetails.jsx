import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header ,OrderStatusStepper,StatusTimeline} from '../components';

const base_url = process.env.REACT_APP_API_URL ; 

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${base_url}/order/admin/${id}/`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        console.error("Failed to fetch order:", err.message);
        console.error("Failed to fetch order:", err.status);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!order) return <div className="text-center mt-10 text-red-500">Order not found.</div>;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <Header category="Page" title={`Order Details - #${order.id}`} />
     <div className='flex gap-8 flex-col md:flex-row'>
        <div className='flex col-span-5 flex-wrap md:flex-wrap justify-between items-start gap-3 flex-col md:flex-row'>
          
          <div className='flex flex-wrap flex-row md:flex-col md:min-w-0.5 col-span-1 w-full'>
             {/* Customer Info */}
            {order.user?.email?
            <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Customer Info</h5>
              <div className='flex flex-row md:flex-col flex-wrap'>
                    <p className="text-ellipsis"><strong>Name </strong> {order.user?.firstName||"NAN"}</p>
                    <p className="text-ellipsis"><strong>Email </strong> {order.user.email}</p>
              </div>
            
              {/* <p><strong>Address:</strong> {order.shipping.address}</p> */}
            </div> :<div> </div>
            }
            

            {/* Order Items */}
            <div className="p-4 flex flex-col md:flex-row w-full bg-white rounded-lg border shadow-md  md:max-w-full  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-32">Items</h5>
              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="flex py-4">
                    <img src={item.product.thumbnail} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-grow">
                      <p className="font-medium min-w-24 text-end"  >{item?.title||"NAN"}</p>
                      <p className=" min-w-24 text-end">Qty {item.quantity} × ${item?.price || 0.00}</p>
                    </div>
                    <div className="font-semibold min-w-24 text-end">${(item?.quantity * item?.price).toFixed(2)|| 0.00}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
          <div className='flex flex-auto flex-col sm:flex-row md:flex-row md:min-w-0.5 gap-3 col-span-1 w-full'>
            {/* Payment Summary */}
            <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 w-">
              <h5 className="mb-2 text-lg lg:text-xl font-semibold md:font-semibold tracking-tight text-gray-900 dark:text-white w-32">Payment Summary</h5>
              <div className="space-y-1">
                <div className="flex justify-between"><span>Subtotal </span><span className=" min-w-24 text-end">${order?.total||'0.00'}</span></div>
                <div className="flex justify-between"><span>Shipping </span><span className=" min-w-24 text-end">${order?.shippingFee?.toFixed(2)||'0.00'}</span></div>
                <div className="flex justify-between"><span>Total </span><span className=" min-w-24 text-end">${order?.total||'0.00'}</span></div>
              </div>
            </div>

            {/* Order Status */}
            <div className="p-4 flex w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 col-span-1 w-">
                <h5 className="mb-2 text-lg lg:text-xl font-semibold md:font-semibold tracking-tight text-gray-900 dark:text-white w-32">Status</h5>
                <OrderStatusStepper
                  currentStatus={order.status}
                  statusLogs={order.status_logs}
                  paymentMethod={order.payment_method}
                />
            </div>
            
           </div>
           <div className="overflow-x-auto w-full">              
              <StatusTimeline statusLogs={order.status_logs} />
            </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
