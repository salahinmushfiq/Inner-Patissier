"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {useNavigate} from 'react-router-dom';
import cake1 from "../../assets/cake1.png";
import cake2 from "../../assets/cake2.png";
import cake3 from "../../assets/cake3.png";
import cake4 from "../../assets/cake4.png";

const Hero = () => {
  const ref = useRef(null);
  const navigate= useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax for different cakes to create depth
  const y1 = useTransform(scroll, [0, 1], [0, -150]);
  const y2 = useTransform(scroll, [0, 1], [0, -300]);
  const y3 = useTransform(scroll, [0, 1], [0, -100]);
  const y4 = useTransform(scroll, [0, 1], [0, -250]);
  
  const opacity = useTransform(scroll, [0, 0.5], [1, 0]);
  const scale = useTransform(scroll, [0, 0.5], [1, 0.8]);

  // return (
  //   <section ref={ref} className="relative h-[110vh] w-full flex items-center justify-center bg-[#FAFBFB] overflow-hidden">
      
  //     {/* 1. DECORATIVE SVG BACKGROUND (The "Facelift" Frame) */}
  //     <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
  //       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
  //         <circle cx="10" cy="10" r="40" fill="#E4D7D1" />
  //         <circle cx="90" cy="90" r="30" fill="#800020" />
  //       </svg>
  //     </div>

  //     {/* 2. TRANSPARENT CAKE GALLERY (The "WOW" Factor) */}
  //     <div className="absolute inset-0 z-10 container mx-auto px-6">
  //       {/* Top Left Cake */}
  //       <motion.img 
  //         style={{ y: y1 }}
  //          src={cake1} 
  //         className="absolute top-[19%] lg:left-[5%] w-40 md:w-64 drop-shadow-2xl" 
  //         alt="Artisanal Cake"
  //       />
  //       {/* Bottom Left Cake */}
  //       <motion.img 
  //         style={{ y: y2 }}
  //         src={cake2} 
  //         className="absolute bottom-[10%] lg:left-[15%] w-32 md:w-48 drop-shadow-2xl" 
  //         alt="Artisanal Cake"
  //       />
  //       {/* Top Right Cake */}
  //       <motion.img 
  //         style={{ y: y3 }}
  //         src={cake3}  
  //         className="absolute top-[15%] right-[2%] lg:right-[5%] w-48 md:w-72 drop-shadow-2xl" 
  //         alt="Artisanal Cake"
  //       />
  //       {/* Center Right Cake */}
  //       <motion.img 
  //         style={{ y: y4 }}
  //         src={cake4} 
  //         className="absolute bottom-[5%] right-[6%] lg:right-[10%] w-36 md:w-56 drop-shadow-2xl" 
  //         alt="Artisanal Cake"
  //       />
  //     </div>

  //     {/* 3. CORE CONTENT (HTML/JSX) */}
  //     <motion.div 
  //       style={{ opacity, scale }}
  //       className="relative z-20 text-center px-4"
  //     >
  //       <motion.h1 
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="text-6xl md:text-9xl font-bold text-[#800020] mb-4 font-serif"
  //       >
  //         Inner Pâtissier
  //       </motion.h1>
        
  //       <motion.p 
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{ delay: 0.3 }}
  //         className="text-xl md:text-2xl text-[#800020]/70 font-medium tracking-widest uppercase mb-12"
  //       >
  //         Cakes that make u say <span className="italic font-serif underline decoration-[#E4D7D1]">WOW!</span>
  //       </motion.p>

  //       <motion.button 
  //         onClick={()=>{navigate("\products")}}
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //         className="bg-[#800020] text-[#E4D7D1] px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:bg-[#600018] transition-colors"
  //       >
  //         Explore the Collection
  //       </motion.button>
  //     </motion.div>

  //   </section>
  // );
  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center bg-[#FAFBFB] dark:bg-main-dark-bg overflow-hidden transition-colors">
      
      {/* Parallax Cakes */}
      <div className="absolute inset-0 z-10 container mx-auto px-6 pointer-events-none">
        <motion.img style={{ y: y1 }} src={cake1} className="absolute top-[19%] lg:left-[5%] w-40 md:w-64 drop-shadow-2xl" />
        <motion.img style={{ y: y2 }} src={cake2} className="absolute bottom-[10%] lg:left-[15%] w-32 md:w-48 drop-shadow-2xl" />
        <motion.img style={{ y: y3 }} src={cake3} className="absolute top-[15%] right-[5%] w-48 md:w-72 drop-shadow-2xl" />
        <motion.img style={{ y: y4 }} src={cake4} className="absolute bottom-[5%] right-[10%] w-36 md:w-56 drop-shadow-2xl" />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-20 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-bold text-brand-burgundy dark:text-brand-cream mb-4 font-serif">
          Inner Pâtissier
        </h1>
        <p className="text-xl md:text-2xl text-brand-burgundy/70 dark:text-brand-cream/60 font-medium tracking-widest uppercase mb-12">
          Cakes that make you say <span className="italic font-serif underline decoration-brand-cream">WOW!</span>
        </p>
        <button 
          onClick={() => navigate("/products")}
          className="bg-brand-burgundy text-brand-cream px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:bg-[#600018] hover:scale-105 transition-all"
        >
          Explore the Collection
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;