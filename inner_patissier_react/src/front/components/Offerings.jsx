'use client';

import Header from "./Header";
import CupcakeSVG from "./CupcakeSVG";
import JarcakeSVG from "./JarcakeSVG";
import TraditionalCakeSVG from "./TraditionalCakeSVG";
import DessertShots from "./DessertShots";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import { OfferingBGSVG } from "./OfferingBGSVG";
// import { OfferingBGSVGAlternative } from "./OfferingBGSVGAlternative";
import { OfferingBGSVGAlternative2 } from "./OfferingBGSVGAlternative2";
import { OfferingBGSVGAlternativePotrait } from "./OfferingBGSVGAlternativePotrait";

const Offerings = () => {
  const container = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.5]);

  const cardVariants = {
    offscreen: {
      y: 5,
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      id="offerings"
      ref={container}
      style={{
        scale: scale,
      }}
      className="max-container padding-container flex flex-col flex-wrap py-4 pb-4 md:gap-28 lg:py-24"
    >
      <Header primary="Offerings" secondary="Meeting your daily needs" />
      <motion.div className="flex flex-row items-center justify-center gap-10 w-full flex-wrap min-w-90 px-0 py-2">
        <motion.div
          className="flex flex-1 min-w-80 px-4 py-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 1 }}
        >
          <div className="hidden lg:flex absolute w-full justify-center overflow-x-clip left-0" ref={container2}>
            {/* <OfferingBGSVG parallaxRef={container2}/> */}
            {/* <OfferingBGSVGAlternative parallaxRef={container2}/> */}
            <OfferingBGSVGAlternative2 parallaxRef={container2} />
          </div>
          <div className="flex w-full absolute lg:w-0 lg:hidden justify-center overflow-x-clip left-0" ref={container3}>
            <OfferingBGSVGAlternativePotrait parallaxRef={container3} />
          </div>

          <motion.div
            className="relative z-20 flex w-full flex-col gap-8 drop-shadow-lg bg-white opacity-55 px-7 py-8 hover:bg-[#F8EAEC] hover:opacity-75 transition-all duration-1000 delay-150 ease-in-out"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center fill-white 800020">
              <CupcakeSVG />
              <p className="bold-20 text-black">Cupcake</p>
              <p className="semibold-20 text-black">Aguas Calientes</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-black-20 text-center">
                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw,
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 min-w-80 px-4 py-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 1 }}
        >
          <motion.div
            className="relative z-20 flex w-full flex-col gap-8 drop-shadow-lg bg-white opacity-55 px-7 py-8 hover:bg-[#F8EAEC] hover:opacity-75 transition-all duration-1000 delay-150 ease-in-out"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center fill-white">
              <JarcakeSVG />
              <p className="bold-20 text-black">Jarcake</p>
              <p className="semibold-20 text-black">Aguas Calientes</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-black-20 text-center">
                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw,
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 min-w-80 px-4 py-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 1 }}
        >
          <motion.div
            className="relative z-20 flex w-full flex-col gap-8 drop-shadow-lg bg-white opacity-55 px-7 py-8 hover:bg-[#F8EAEC] hover:opacity-75 transition-all duration-1000 delay-150 ease-in-out"
            variants={cardVariants}
          >
            <div className="flex flex-col items-center fill-white">
              <TraditionalCakeSVG />
              <p className="bold-20 text-black">Traditional Cake</p>
              <p className="semibold-20 text-black">Aguas Calientes</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-black-20 text-center">
                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw,
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 min-w-80 px-4 py-4 z-20"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 1 }}
        >
          <motion.div
            className="relative z-20 flex w-full flex-col gap-8 drop-shadow-lg bg-white opacity-55 px-7 py-8 hover:bg-[#F8EAEC] hover:opacity-75 transition-all duration-1000 delay-150 ease-in-out"
            variants={cardVariants}
          >
            <span className="absolute -z-10 w-full h-full scale-y-0 bg-[#F8EAEC] top-0 left-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000 delay-100 ease-in" />
            <div className="flex flex-col items-center fill-white">
              <DessertShots />
              <p className="bold-20 text-black">Dessert Shots</p>
              <p className="semibold-20 text-black">Aguas Calientes</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-black-20 text-center">
                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw,
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Offerings;
