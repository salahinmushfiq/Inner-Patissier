"use client";
import { circOut, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import CoverSvgComponent from './coverSVG';

const Hero = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });


  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"], { ease: circOut });
  
  const svgY = useTransform(scrollYProgress, [0, .5], ["0%", "-80%"]);
  const svgX = useTransform(scrollYProgress, [0, .5], ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .5]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, .5], [0, 90]);
  const scaleUp = useTransform(scrollYProgress, [0, .3, .8], [1.1, .5, .8]);

  // Define plate transforms outside of the callback
  const plateTransforms = [
    {
      svgY: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
      svgX: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
    },
    {
      svgY: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
      svgX: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
    },
    {
      svgY: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
      svgX: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
    },
    {
      svgY: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
      svgX: useTransform(scrollYProgress, [0, .8], ["0%", "0%"]),
    },
  ];

  return (
    <section ref={ref} id="home" className="relative max-container padding-container flex flex-col flex-wrap gap-10 py-4 pb-6 md:pb-12 md:gap-28 lg:pb-18 lg:py-8">
      
      <CoverSvgComponent 
        positionY={backgroundY} 
        scale={scale} 
        opacity={opacity} 
        svgY={svgY} 
        svgX={svgX} 
        rotateX={rotateX} 
        scaleUp={scaleUp} 
        svgYPlate1={plateTransforms[0].svgY} 
        svgXPlate1={plateTransforms[0].svgX}  
        svgYPlate2={plateTransforms[1].svgY} 
        svgXPlate2={plateTransforms[1].svgX}  
        svgYPlate3={plateTransforms[2].svgY} 
        svgXPlate3={plateTransforms[2].svgX}  
        svgYPlate4={plateTransforms[3].svgY} 
        svgXPlate4={plateTransforms[3].svgX} 
      />
    </section>
  );
};

export default Hero;
