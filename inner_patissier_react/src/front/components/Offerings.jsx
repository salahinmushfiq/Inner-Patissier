'use client';
import Header from "./Header";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OfferingBGSVGBasic } from "./OfferingBGSVGBasic";
import { OfferingBGSVGAlternativePotrait } from "./OfferingBGSVGAlternativePotrait";
import { OFFERINGS_DATA } from "../../dashboard/data/offerings";
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
const OfferingCard = ({ title, Icon, description }) => {
  return (
    <motion.div 
      variants={{
        offscreen: { y: 20, opacity: 0 },
        onscreen: { y: 0, opacity: 1, transition: { type: "spring", duration: 0.8 } }
      }}
      className="relative group bg-white dark:bg-surface-cardDark p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-brand-secondary dark:border-white/5 overflow-hidden"
    >
      {/* Decorative Background Hover */}
      <span className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-full bg-brand-secondary/30 text-brand-primary">
          <Icon />
        </div>
        <h3 className="text-2xl font-bold text-brand-primary dark:text-brand-secondary">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
};
// const OfferingCardAlt2 = ({ title, description, Icon, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className="group relative overflow-hidden bg-white p-10 rounded-3xl border border-brand-cream/30 hover:shadow-2xl transition-all duration-500"
//     >
//       {/* Interactive Background Fill */}
//       <span className="absolute inset-0 bg-brand-burgundy translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />

//       <div className="relative z-10">
//         <div className="mb-6 inline-block p-4 rounded-2xl bg-brand-cream/20 text-brand-burgundy group-hover:text-brand-cream group-hover:bg-white/10 transition-colors">
//           <Icon size={32} />
//         </div>
//         <h3 className="text-2xl font-serif font-bold text-brand-burgundy group-hover:text-brand-cream transition-colors mb-4">
//           {title}
//         </h3>
//         <p className="text-gray-600 group-hover:text-brand-cream/80 transition-colors leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

const OfferingCardAlt2 = ({ title, description, Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden bg-white dark:bg-secondary-dark-bg p-10 rounded-3xl border border-brand-cream/30 dark:border-gray-800 hover:shadow-2xl transition-all duration-500"
    >
      {/* Slide-up effect on hover */}
      <span className="absolute inset-0 bg-brand-burgundy translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />

      <div className="relative z-10">
        <div className="mb-6 inline-block p-4 rounded-2xl bg-brand-cream/20 text-brand-burgundy group-hover:text-brand-cream group-hover:bg-white/10 transition-colors">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-brand-burgundy group-hover:text-brand-cream dark:text-brand-cream transition-colors mb-4">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-brand-cream/80 dark:text-gray-400 transition-colors leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
const OfferingCardAlt=({ title, Icon, description, keys })=>{
  return (
    <motion.div
      className="relative z-20 flex w-full flex-col gap-8 drop-shadow-lg bg-white opacity-55 px-7 py-8 hover:bg-[#F8EAEC] hover:opacity-75 transition-all duration-1000 delay-150 ease-in-out"
      variants={cardVariants}
    >
      <span className="absolute -z-10 w-full h-full scale-y-0 bg-[#F8EAEC] top-0 left-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000 delay-100 ease-in" />
      <div className="flex flex-col items-center fill-white">
        <Icon />
        <p className="bold-20 text-black">{title}</p>
        <p className="semibold-20 text-black">Aguas Calientes</p>
      </div>
      <div className="flex flex-col">
        <p className="regular-16 block text-black-20 text-center">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
const Offerings = () => {
  const container = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.5]);
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
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        
          <div className="hidden lg:flex absolute w-full justify-center overflow-x-clip left-0" ref={container2}>
            <OfferingBGSVGBasic parallaxRef={container2} />
          </div>
          <div className="flex w-full absolute lg:w-0 lg:hidden justify-center overflow-x-clip left-0" ref={container3}>
            <OfferingBGSVGAlternativePotrait parallaxRef={container3} />
          </div>
        {
        OFFERINGS_DATA.map((item) => (
          <OfferingCardAlt2 title={item.title} Icon={item.Icon} description={item.description} keys={item.title}/>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Offerings;
