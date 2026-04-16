// import React from 'react'

// const PaymentMethods = () => {
//   return (
//     <div>
//           <p className="mt-8 text-lg font-medium">Payment Methods</p>
//           <form className="mt-5 grid gap-6">
//             {/* <div className="relative">
//               <input className="peer hidden" id="radio_1" type="radio" name="radio1"/>
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-200 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
//                 <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">Store Pickup</span>
//                 </div>
//               </label>
//             </div> */}
//             <div className="relative">
//               <input className="peer hidden" id="radio_2" type="radio" name="radio2" />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-200 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
//                 <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">Cash On Delivery</span>
//                   <p className="text-slate-500 text-sm leading-6">Delivery: 2-3 Days</p>
//                 </div>
//               </label>
//             </div>
//             <div className="relative">
//               <input className="peer hidden" id="radio_3" type="radio" name="radio3" />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-200 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_3">
//                 <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">Online Payment</span>
//                   <p className="text-slate-500 text-sm leading-6">Delivery: 2-3 Days</p>
//                 </div>
//               </label>
//             </div>
//           </form>
//           </div>
//   )
// }

// export default PaymentMethods


import React, { useState } from 'react'

const PaymentMethods = ({ onPaymentChange }) => {
  const [selectedMethod, setSelectedMethod] = useState(''); // initially none selected

  const handleChange = (event) => {
    
    const method = event.target.value;
    setSelectedMethod(method);
    onPaymentChange && onPaymentChange(method) ; // Notify parent
    console.log("You selected: ");
    console.log(selectedMethod);
  }

  return (
    <div className='p-8 rounded-3xl border border-brand-cream/50 dark:border-gray-100 shadow-sm'>
      <p className="text-lg font-medium font-bold text-brand-burgundy dark:text-brand-cream">Payment Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative text-gray-400 dark:text-brand-cream">
          <input
            className="peer hidden"
            id="radio_2"
            type="radio"
            name="paymentMethod"
            value="COD"  // 👈 backend expects this
            checked={selectedMethod === 'COD'}
            onChange={handleChange}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-200 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_2"
          >
            <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Cash On Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-3 Days</p>
            </div>
          </label>
        </div>

        <div className="relative text-gray-400 dark:text-brand-cream">
          <input
            className="peer hidden"
            id="radio_3"
            type="radio"
            name="paymentMethod"
            // value="Online_Payment"
            // checked={selectedMethod === 'Online_Payment'}
            // onChange={handleChange}
            value="SSLCOMMERZ"  // 👈 backend expects this
            checked={selectedMethod === 'SSLCOMMERZ'}
            onChange={handleChange}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-200 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_3"
          >
            <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Online Payment</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-3 Days</p>
            </div>
          </label>
        </div>


      </form>
    </div>
  )
}

export default PaymentMethods
