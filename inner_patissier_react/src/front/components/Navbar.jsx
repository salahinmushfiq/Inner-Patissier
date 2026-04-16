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
        scrolled 
        ? "bg-white/80 dark:bg-main-dark-bg/80 backdrop-blur-md py-2 shadow-sm border-b border-brand-cream/10" 
        : "bg-transparent py-6"
      }`}>
        <div className="max-container padding-container">
          
          <div className="flex justify-between items-center w-full">
            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-6 flex-1">
              <FiPhone className="text-brand-burgundy dark:text-brand-cream h-4 w-4 hover:scale-110 transition-transform cursor-pointer"/>
              <FaInstagram className="text-brand-burgundy dark:text-brand-cream h-4 w-4 hover:scale-110 transition-transform cursor-pointer"/>
              <MdOutlineMailOutline className="text-brand-burgundy dark:text-brand-cream h-5 w-5 hover:scale-110 transition-transform cursor-pointer"/>
            </div>

            {/* Central Logo */}
            <Link to="/" className="flex justify-center flex-1">
              <div className={`transition-all duration-500 ${scrolled ? "w-20 h-20" : "w-32 h-32"}`}>
                <CakeIcon className="w-full h-full object-contain fill-current text-brand-burgundy dark:text-brand-cream" />
              </div>
            </Link>

            {/* Desktop Actions / Mobile Menu */}
            <div className="flex justify-end flex-1">
             <Link to="/login" className="hidden lg:block">
              <div className="group flex items-center gap-2 px-6 py-2 rounded-full border border-brand-burgundy text-brand-burgundy dark:border-brand-cream dark:text-brand-cream hover:bg-brand-burgundy hover:text-white transition-all">
                <FaRegUser className="text-xs" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Atelier Login</span>
              </div>
            </Link>
              
              {/* Responsive Menu Trigger */}
              <button onClick={toggle} className="lg:hidden p-2">
                 <div className="space-y-1.5">
                    <span className={`block w-8 h-0.5 bg-[#800020] dark:bg-brand-cream transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#800020] dark:bg-brand-cream ${isOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#800020] dark:bg-brand-cream transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
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
                      className="text-[#800020] dark:text-brand-cream text-xs font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
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