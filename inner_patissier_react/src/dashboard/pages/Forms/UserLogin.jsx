// import React,{useState,useEffect} from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
// import {FiSettings } from 'react-icons/fi';
// import { ThemeSettings } from '../../components';
// import { useStateContext } from '../../contexts/ContextProvider';
// const UserLogin = () => {
//     const { currentMode } = useStateContext();
//     useEffect(() => {
//         const storedToken = localStorage.getItem('refresh_token');
        
//       }, []); 
//     const navigate = useNavigate();
//     const {currentColor,currentToken,setCurrentToken,setToken,themeSettings,setThemeSettings,setRefreshToken,refreshToken,setCurrentUser}=useStateContext();
//     const [message, setMessage] = useState(null);
//     const [isPopupVisible, setIsPopupVisible] = useState(false);
//     const base_url = process.env.REACT_APP_API_URL;
//     const Modal = ({ message, onClose }) => {
//         if (!message) return null;

//         // Split the text by newline and create an array of JSX elements
//         const messageLines = message.text.split('\n').map((line, index) => (
//             <span key={index}>
//             {line}
//             {index < message.text.split('\n').length - 1 && <br />} {/* Add a line break except for the last line */}
//             </span>
//         ));
        
    
//         return (
//             <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
//               <h2 className="text-lg font-semibold mb-2">
//                 {message.type === 'error' ? 'Error' : 'Success'}
//               </h2>
//               <p>{messageLines}</p>
//               <button
//                 onClick={onClose}
//                 className={`mt-4 px-4 py-2 ${message.type === 'error' ? "bg-red-600" : "bg-green-600"} text-white rounded hover:bg-red-700 transition-colors`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         );
//       };
//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         let email = e.target.elements.email?.value;
//         let password = e.target.elements.password?.value;

//         console.log(email, password);
//         const data = {
//         "email": email,
//         "password": password
//     };
    
//     axios.post(`${base_url}/user/login/`, data).then((response)=>{
                
        
//         console.log("Token set: "+ response.data.Token);
//         setCurrentToken(response.data.Token);
//         setToken(response.data.Token);
//         // setRefreshToken(response.data.refresh);
//         console.log("Token set: ");
//         console.log(currentToken);
//         localStorage.setItem('access_token',response.data.Token);  // Optionally clear the access token
//         localStorage.setItem('refresh_token',response.data.refresh);  // Optionally clear the access token
//         console.log(localStorage.getItem('access_token'));
//         console.log(localStorage.getItem('refresh_token'));
        
        

//                // Fetch the user's public IP address
//                let ip = "127.0.0.1";
               
//             axios.get(`${base_url}/user/profile/`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             }).then(response=> {
                
//                 const userData = response.data;
//                 localStorage.setItem('UserId',userData.id);
//                 setTimeout(() => {setCurrentUser(userData);}, 1000);
//                 console.log("UserData: ");
//                 console.log(userData);
//                 console.log("UserId: "+userData.id);
//                 console.log("UserId: "+localStorage.getItem('UserId'));
//                 // setMessage({ type: 'success', text: 'Login Successful!' });
//                 setTimeout(() => {
            
//                     setMessage({ type: 'success', text: 'Login Successful!' });
//                     setIsPopupVisible(true);
//                   }, 5000); // Delay before modal appears (1 second)setIsPopupVisible(true);
//                 navigate('/dash/home');
                
                
//             });
              
            
          
      
          
                
//     }).catch(err => {
        
        
        
//         console.log(err);
//         console.log(err.statusCode);
//         console.log(err.response.data.detail);
        
//         setMessage({ type: 'error', text: `Error logging in!\n${err.response.data.detail}`, });
//         setIsPopupVisible(true);
//     });
// };

//     return (
//         <div className={`${currentMode === 'Dark' ? 'dark' : ''} relative flex flex-col justify-center min-h-screen overflow-hidden mx-2`}>
//             <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl dark:bg-secondary-dark-bg">
//             <div className="fixed right-2 bottom-8" style={{ zIndex: '1000' }}>
            
//             <button
//               type="button"
//               onClick={() => setThemeSettings(true)}
//               style={{ background: currentColor, borderRadius: '50%' }}
//               className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
//             >
//               <FiSettings />
//             </button>

          
//         </div>
//                 <Modal message={message} onClose={() => setMessage(null)} />
//                 <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase" style={{color:currentColor}}>
//                     Sign in
//                 </h1>
//                 <form className="mt-6" onSubmit={handleFormSubmit}>
//                     <div className="mb-2">
//                         <label
//                             className="block text-sm font-semibold text-gray-800 dark:text-white"
//                         >
//                             Email
//                         </label>
//                         <input
//                             id='email'
//                             type="email"
//                             className="block w-full px-4 py-2 mt-2 text-gray-600 bg-gray-200 dark:bg-secondary-dark-bg dark:text-white border rounded-md focus:border-white-400 focus:ring-white-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         />
//                     </div>
//                     <div className="mb-2">
//                         <label
//                             className="block text-sm font-semibold text-gray-800 dark:text-white"
//                         >
//                             Password
//                         </label>
//                         <input
//                             id='password'
//                             type="password"
//                             className="block w-full px-4 py-2 mt-2 text-gray-600 bg-gray-200 dark:bg-secondary-dark-bg bg-white-100 border rounded-md focus:border-white-400 focus:ring-white-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         />
//                     </div>
//                     <a
//                         href="#"
//                         className="text-xs hover:underline"
//                         style={{color:currentColor}}
//                     >
//                         Forget Password?
//                     </a>
//                     <div className="mt-6">
//                         <button style={{backgroundColor:currentColor}} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-white-600 focus:outline-none focus:bg-white-600">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                 <div className="relative flex items-center justify-center w-full mt-6 border border-t">
//                     <div className="absolute px-5 text-gray-400 bg-white dark:bg-secondary-dark-bg dark:text-dark">Or</div>
//                 </div>
//                 <div className="flex mt-4 gap-x-2">
//                     <button
//                         type="button"
//                         className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-white-600  dark:text-white"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 32 32"
//                             className="w-5 h-5 fill-current"
//                         >
//                             <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
//                         </svg>
//                     </button>
//                     <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-white-600  dark:text-white">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 32 32"
//                             className="w-5 h-5 fill-current"
//                         >
//                             <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
//                         </svg>
//                     </button>
//                     <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-white-600 dark:text-white">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 32 32"
//                             className="w-5 h-5 fill-current"
//                         >
//                             <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
//                         </svg>
//                     </button>
//                 </div>
                
//                 <p className="mt-8 text-xs text-center text-gray-700 dark:text-gray-100">
//                     {" "}
//                     Don't have an account?{" "}
//                     <a
//                         // href="#"
//                         href="/signup"
//                         className="font-medium hover:underline "
//                         style={{color:currentColor}}
//                     >
//                         Sign up
//                     </a>
//                 </p>
//             </div>
//             {themeSettings && <ThemeSettings/>}
//         </div>
//     );
// }
// export default UserLogin;
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiSettings, FiMail, FiLock, FiChevronRight } from 'react-icons/fi';
import { ThemeSettings } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';

const UserLogin = () => {
  const navigate = useNavigate();
  const { currentColor, setCurrentToken, setToken, themeSettings, setThemeSettings, setCurrentUser } = useStateContext();
  const [message, setMessage] = useState(null);
  const base_url = process.env.REACT_APP_API_URL;

  // Modern Modal Component
  const Modal = ({ message, onClose }) => {
    if (!message) return null;
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#800020]/20 backdrop-blur-sm flex items-center justify-center z-[100] px-4"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
          className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full border border-[#E4D7D1]"
        >
          <h2 className={`text-2xl font-serif mb-4 ${message.type === 'error' ? 'text-red-600' : 'text-[#800020]'}`}>
            {message.type === 'error' ? 'Opps!' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 leading-relaxed">{message.text}</p>
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-[#800020] text-white rounded-xl font-bold hover:bg-[#600018] transition-all"
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;
    const data = { "email": email, "password": password };

    axios.post(`${base_url}/user/login/`, data).then((response) => {
      setCurrentToken(response.data.Token);
      setToken(response.data.Token);
      localStorage.setItem('access_token', response.data.Token);
      localStorage.setItem('refresh_token', response.data.refresh);

      axios.get(`${base_url}/user/profile/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      }).then(res => {
        const userData = res.data;
        localStorage.setItem('UserId', userData.id);
        setCurrentUser(userData);
        setMessage({ type: 'success', text: 'Authentication successful. Redirecting to your dashboard...' });
        setTimeout(() => navigate('/dash/home'), 2000);
      });
    }).catch(err => {
      setMessage({ type: 'error', text: err.response?.data?.detail || "Login failed" });
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#FAFBFB] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E4D7D1]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#800020]/5 rounded-full blur-[120px]" />

      <AnimatePresence>
        {message && <Modal message={message} onClose={() => setMessage(null)} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[450px] p-8 md:p-12 mx-4 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(128,0,32,0.05)] border border-white"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-[#800020] mb-2">Sign In</h1>
          <p className="text-[#800020]/50 uppercase tracking-widest text-[10px] font-bold">Owner Dashboard Access</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold text-[#800020]/60 uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/30 group-focus-within:text-[#800020] transition-colors" />
              <input
                id="email" type="email" required
                className="w-full pl-12 pr-4 py-4 bg-[#FAFBFB] border border-[#E4D7D1]/50 rounded-2xl focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/5 transition-all text-[#800020]"
                placeholder="chef@innerpatissier.com"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-[#800020]/60 uppercase tracking-wider mb-2 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/30 group-focus-within:text-[#800020] transition-colors" />
              <input
                id="password" type="password" required
                className="w-full pl-12 pr-4 py-4 bg-[#FAFBFB] border border-[#E4D7D1]/50 rounded-2xl focus:outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/5 transition-all text-[#800020]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs font-serif italic text-[#800020]/60 hover:text-[#800020] transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#800020] text-white rounded-2xl font-bold shadow-lg shadow-[#800020]/20 hover:shadow-xl hover:bg-[#600018] transition-all flex items-center justify-center gap-2 group"
          >
            Enter Dashboard
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-[#800020]/60 font-serif italic">
            Don't have an account? 
            <Link to="/signup" className="ml-2 text-[#800020] font-bold not-italic hover:underline">Request Access</Link>
          </p>
        </div>
      </motion.div>

      {/* Theme Toggle Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor }}
          className="p-4 rounded-full text-white shadow-xl hover:scale-110 transition-transform"
        >
          <FiSettings className="animate-spin-slow" />
        </button>
      </div>
      {themeSettings && <ThemeSettings />}
    </div>
  );
};

export default UserLogin;