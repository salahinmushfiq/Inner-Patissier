"use client";
import Header from "./Header";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TESTIMONIALS_DATA = [
  {
    name: "Sarah Rahman",
    role: "Food Critic",
    quote: "The Raspberry Mousse wasn't just a dessert; it was a symphony of textures. Truly a masterpiece of Dhaka.",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    productImg: "/cake-1.png" // Replace with one of your 4 hero images
  },
  {
    name: "Mushfiq",
    role: "Connoisseur",
    quote: "Every bite tells a story. The attention to detail in the layering is something you usually only find in Paris.",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    productImg: "/cake-2.png" // Replace with one of your 4 hero images
  },
  {
    name: "Elena Gomez",
    role: "Pastry Enthusiast",
    quote: "Inner Pâtissier has redefined what I expect from a local bakery. The ‘WOW’ factor is real.",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    productImg: "/cake-3.png" // Replace with one of your 4 hero images
  }
];

const FloatingImage = ({ src, scrollYProgress, offset }) => {
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset * 2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  
  return (
    <motion.img
      src={src}
      style={{ y, rotate }}
      className="absolute w-32 lg:w-48 h-auto opacity-10 pointer-events-none blur-[1px]"
    />
  );
};

const TestimonialCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="perspective-1000"
    >
      <div className="relative p-10 rounded-tr-[4rem] rounded-bl-[4rem] bg-white/70 backdrop-blur-md border border-[#800020]/10 shadow-2xl overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E4D7D1]/30 rounded-full blur-3xl group-hover:bg-[#800020]/10 transition-colors duration-700" />
        
        <div className="relative z-10">
          <span className="text-5xl font-serif text-[#800020] opacity-20 block mb-4">“</span>
          <p className="text-[#800020] text-xl md:text-2xl leading-relaxed font-serif italic mb-8">
            {item.quote}
          </p>
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={item.img}
                className="w-14 h-14 rounded-full border-2 border-[#800020] object-cover"
                alt={item.name}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#800020] rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="text-[#800020] font-black text-lg uppercase tracking-tighter">{item.name}</h3>
              <p className="text-[#800020]/60 text-xs font-bold uppercase tracking-widest">{item.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section 
      id="reviews" 
      ref={sectionRef} 
      className="relative py-32 bg-[#FAFBFB] overflow-hidden dark:bg-main-dark-bg/80"
    >
      {/* FLOATING HERO IMAGES (THE 4 IMAGES) */}
      <FloatingImage src="/hero-img-1.png" scrollYProgress={smoothProgress} offset={100} className="top-10 left-[10%]" />
      <FloatingImage src="/hero-img-2.png" scrollYProgress={smoothProgress} offset={300} className="top-40 right-[15%]" />
      <FloatingImage src="/hero-img-3.png" scrollYProgress={smoothProgress} offset={200} className="bottom-20 left-[20%]" />
      <FloatingImage src="/hero-img-4.png" scrollYProgress={smoothProgress} offset={400} className="bottom-40 right-[5%]" />

      <div className="max-container padding-container relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
             <Header primary="Connoisseurs" secondary="The Inner Circle" />
          </div>
          <p className="text-[#800020]/60 dark:text-brand-cream/60 font-serif italic text-lg max-w-xs text-right">
            Crafting moments that linger long after the last bite.
          </p>
        </div>

        {/* STACKED LISTING (Different from Grid) */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {TESTIMONIALS_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`flex w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className="w-full lg:w-2/3">
                <TestimonialCard item={item} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Testimonials;