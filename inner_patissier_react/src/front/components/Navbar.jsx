"use client";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaInstagram, FaRegUser } from "react-icons/fa"; // Simplified imports
import { LuFacebook } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { NAV_LINKS } from "../constants";
import Sidebar from "./Sidebar";
import { FiPhone } from "react-icons/fi";
import { ReactComponent as CakeIcon } from "../../assets/inner-patissier-logo-basic.svg";

const Navbar = ({ sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Check if we are on the homepage or a page that needs a transparent start
    const isHome = window.location.pathname === "/";
    
    const handleScroll = () => {
      setScrolled(!isHome || window.scrollY > 50);
    };

    handleScroll(); // Run on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (key) => {
    if (sectionRefs && sectionRefs[key]?.current) {
      sectionRefs[key].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-4"
      }`}>
        <div className="max-container padding-container">
          
          <div className="flex justify-between items-center w-full">
            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 flex-1">
              <FiPhone className="text-[#800020] h-5 w-5 hover:scale-110 transition-transform cursor-pointer"/>
              <FaInstagram className="text-[#800020] h-5 w-5 hover:scale-110 transition-transform cursor-pointer"/>
              <LuFacebook className="text-[#800020] h-5 w-5 hover:scale-110 transition-transform cursor-pointer"/>
              <MdOutlineMailOutline className="text-[#800020] h-5 w-5 hover:scale-110 transition-transform cursor-pointer"/>
            </div>

            {/* Central Logo */}
            <Link to="/" className="flex justify-center flex-1">
              {/* <img 
                src="/inner-patissier-logo-basic.svg" 
                alt="logo" 
                className={`transition-all duration-500 ${scrolled ? "w-40" : "w-60"}`} 
              /> */}
             <div className={`transition-all duration-500 overflow-hidden ${scrolled ? "w-24 h-24" : "w-40 h-40"}`}>
    <CakeIcon 
      className="w-full h-full object-contain transition-colors duration-300 fill-current text-[#800020] dark:text-white" 
    />
  </div>
            </Link>

            {/* Desktop Actions / Mobile Menu */}
            <div className="flex justify-end flex-1">
              <Link to="/login" className="hidden lg:block">
                <div className="group flex items-center gap-2 px-6 py-2 rounded-full border border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all">
                  <FaRegUser className="text-sm" />
                  <span className="text-sm font-bold uppercase tracking-tighter">Login</span>
                </div>
              </Link>
              
              {/* Responsive Menu Trigger */}
              <button onClick={toggle} className="lg:hidden p-2">
                 <div className="space-y-1.5">
                    <span className={`block w-8 h-0.5 bg-[#800020] transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#800020] ${isOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#800020] transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                 </div>
              </button>
            </div>
          </div>

          {/* Secondary Sub-Nav (Desktop Only) */}
          {!scrolled && (
            <div className="hidden lg:flex flex-col items-center mt-6">
              <ul className="flex gap-12">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => handleNavClick(link.key)}
                      className="text-[#800020] text-xs font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Synchronized Sidebar Component */}
      <Sidebar isOpen={isOpen} toggle={toggle} sectionRefs={sectionRefs}/>
    </>
  );
};

export default Navbar;