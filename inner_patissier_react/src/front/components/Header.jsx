import React from "react";
import {motion} from "framer-motion";
const Header = ({ primary, secondary }) => (
  <div className="mb-16 mx-auto text-center relative">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-sm uppercase tracking-[0.3em] text-brand-burgundy/60 dark:text-brand-cream/60 font-medium mb-3 block"
    >
      {primary}
    </motion.span>
    
    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-brand-burgundy dark:text-brand-cream relative inline-block">
      {secondary}
      <motion.svg 
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full h-4 absolute -bottom-4 left-0" 
        viewBox="0 0 148 20"
      >
        <path d="M0.2 11.3C4.2 7.4 12 4.4 22.7 2.5C33.5 0.7 46.9 0 61.7 0.7C76.4 1.3 92.1 3.2 107.1 6.2C122.1 9.1 136 13.1 147.5 17.6" 
              stroke="#800020" className="dark:stroke-brand-cream" strokeWidth="2" fill="none" strokeOpacity="0.4" />
      </motion.svg>
    </h2>
  </div>
);

export default Header;
