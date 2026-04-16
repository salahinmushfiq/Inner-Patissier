// import React, { useRef, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// import { TopFilter, Products, AddToCartFloatingIcon } from "../components/products";
// import { Footer, Navbar } from "../components";
// import { useSearchParams } from "react-router-dom";

// const ProductsPage = () => {
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   // FIXED: correct transform (your previous one had invalid mapping)
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
//   const [searchParams] = useSearchParams();
//   const [isTopFilterOpen, setIsTopFilterOpen] = useState(false);
//   const filters = {
//     category: searchParams.get("category"),
//     sort: searchParams.get("sort"),
//     search: searchParams.get("search"),
//   };
//   return (
//     <>
//       <Navbar />

//       <motion.div
//         ref={containerRef}
//         style={{ scale }}
//         className="mt-12 py-20 max-container padding-container pb-32 lg:py-12"
//       >
//         <div className="bg-white">
//           <AddToCartFloatingIcon />

//           <main className="-mt-52 py-20 pb-32 lg:py-12">
//             <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-8 pt-10 gap-4">
//               <div>
//                 <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                   Curated Collection
//                 </h2>
//                 <p className="mt-2 text-gray-500">
//                   Premium quality for your everyday needs.
//                 </p>
//                 <TopFilter/>
//               </div>

//               <TopFilter
//                 isOpen={isTopFilterOpen}
//                 setIsOpen={setIsTopFilterOpen}
//               />
//             </div>

//             <section className="pb-24 pt-6">
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
//                 <div className="lg:col-span-4">
//                   <Products filters={filters} />
//                 </div>
//               </div>
//             </section>
//           </main>
//         </div>
//       </motion.div>

//       <Footer />
//     </>
//   );
// };

// // export default ProductsPage;
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useSearchParams } from "react-router-dom";

// import { TopFilter, Products, AddToCartFloatingIcon } from "../components/products";
// import { Footer, Navbar } from "../components";

// const ProductsPage = () => {
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

//   const [searchParams] = useSearchParams();

//   const filters = {
//     category: searchParams.get("category"),
//     sort: searchParams.get("sort"),
//     search: searchParams.get("search"),
//   };

//   return (
//     <>
//       <Navbar />

//       <motion.div
//         ref={containerRef}
//         style={{ scale }}
//         className="mt-12 py-20 max-container padding-container pb-32 lg:py-12"
//       >
//         <div className="bg-white">
//           <AddToCartFloatingIcon />

//           <main className="-mt-52 py-20 pb-32 lg:py-12">
            
//             {/* Header */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-8 pt-10 gap-4">
//               <div>
//                 <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                   Curated Collection
//                 </h2>
//                 <p className="mt-2 text-gray-500">
//                   Premium quality for your everyday needs.
//                 </p>
//               </div>

//               <TopFilter />
//             </div>

//             {/* Products */}
//             <section className="pb-24 pt-6">
//               <Products filters={filters} />
//             </section>

//           </main>
//         </div>
//       </motion.div>

//       <Footer />
//     </>
//   );
// };

// export default ProductsPage;

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { TopFilter, Products, AddToCartFloatingIcon } from "../components/products";
import { Footer, Navbar } from "../components";

const ProductsPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const [searchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category"),
    sort: searchParams.get("sort"),
    search: searchParams.get("search"),
  };

  return (
    <div className="dark:bg-main-dark-bg min-h-screen transition-colors duration-300">
      <Navbar />

      <motion.div
        ref={containerRef}
        style={{ scale }}
        className="mt-12 py-20 max-container padding-container pb-32 lg:py-12"
      >
        <div className="bg-white dark:bg-secondary-dark-bg rounded-3xl shadow-sm border border-brand-cream/50 dark:border-gray-800 p-8 md:p-12 transition-colors">
          <AddToCartFloatingIcon />

          <main className="-mt-52 py-20 pb-32 lg:py-12">
            {/* Unified Header with Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-cream/30 dark:border-gray-700 pb-8 pt-10 gap-4">
              <div>
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
                  <span>Shop</span>
                  <span>/</span>
                  <span className="text-brand-burgundy dark:text-brand-cream font-bold">Collection</span>
                </nav>
                <h2 className="text-4xl font-serif font-bold text-brand-burgundy dark:text-brand-cream sm:text-5xl">
                  Curated Collection
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400 italic font-serif">
                  Premium quality for your everyday needs.
                </p>
              </div>
              <TopFilter />
            </div>

            <section className="pb-24 pt-6">
              <Products filters={filters} />
            </section>
          </main>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ProductsPage;