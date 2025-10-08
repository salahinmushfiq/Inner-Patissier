"use client";
import { NAV_LINKS } from "../constants"
import { useLocation,Link } from 'react-router-dom';
import { useState } from "react";
import Sidebar from "./Sidebar";
import scrollLock from "scroll-lock";
import React from "react";
import { FaPhoneAlt,FaInstagram,FaFacebookF,FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";

const Navbar = ({ sectionRefs }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const handleNavClick = (key) => {
    if (sectionRefs && sectionRefs[key]?.current) {
      sectionRefs[key].current.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  
  return (
   
    <nav className="h-24 flex flex-col gap-10 max-container padding-container relative z-30 py-5 lg:h-auto ">
      
      <div className="hidden lg:flex flexBetween w-full content-center items-center ">
        <div className="flex flex-row w-full flex-1 lg:flex">
            <FiPhone className="stroke-[#800020] h-8 w-8 p-1"/>
            <FaInstagram  className="fill-[#800020] h-8 w-8 p-1"/>
            <LuFacebook  className="stroke-[#800020] h-8 w-8 p-1"/>
            <MdOutlineMailOutline  className="fill-[#800020] h-8 w-8 p-1"/>
        </div>
        <Link to="/" className="flex justify-center flex-1"> 
          <img src="/inner-patissier-logo-basic.svg" alt="logo" width={320} height={320} className="w-28 justify-start lg:w-64 top-6" />
        </Link>
        <div className="flex justify-end flex-1">
        <Link to="/login"> 
          <span className="h-10 w-28  bg-none rounded-3xl p-5 flex flex-flexBetween justify-between items-center outline outline-offset-2 outline-2 outline-[#800020] *:opacity-75 font-normal transition-all duration-900 ease-in-out *:hover:font-semibold *:hover:opacity-95 *:font-bold">
            <FaRegUser className="fill-[#800020] h-8 w-8 p-1 font-semibold"/>
            <p className="text-[#800020] h-8 text-lg content-center ">Login</p>
          </span>
        </Link>
        </div>
       </div>
        <div className="lg:hidden">
          <img 
            src="menu.svg"
            alt="menu"
            width={32}
            height={32}
            className="inline-block cursor-pointer lg:hidden fill-[#800020] stroke-[#800020] text-color-[#800020] absolute right-8 top-10"
            onClick={toggle}
          />
        </div>

    {/* <nav className="flex flexBetween max-container padding-container relative z-30 py-5 w-full"> */}
      <div  className="sticky top-0 min-h-0 w-full lg:flex flex-col lg:min-h-16 h-20 "> 
       <ul className="hidden h-8 gap-12 lg:flex lg:h-16 z-30 py-5 justify-center ">
        {NAV_LINKS.map((link) => (
          <li className="w-16 group" key={link.key}>
            <button
              onClick={() => handleNavClick(link.key)}
              className="absolute text-xl opacity-70 text-[#800020] flexCenter cursor-pointer pb-1.5 group-hover:opacity-90 group-hover:font-semibold transition-all"
            >
              {link.label}
              <span className="left-0 absolute h-0.5 bg-[#800020] top-6 w-0 transition-all group-hover:w-full delay-150 duration-300 ease-in-out"></span>
            </button>
          </li>
        ))}
      </ul>
      <span className="hidden lg:flex w-full h-0.5 bg-[#800020] opacity-50" ></span>
      <Sidebar isOpen={isOpen} toggle={toggle} sectionRefs={sectionRefs}/>
      </div> 
    {/* </nav> */}
    </nav>
    
  )
}

export default Navbar