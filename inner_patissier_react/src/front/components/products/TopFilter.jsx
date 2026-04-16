// import React,{useState} from 'react'

// const TopFilter = ({IsTopFilterOpen,setIsTopFilterOpen}) => {
//   const toggleTopFilter = () => {
//     // alert("Hellow");
//     console.log('TopFilterToggle enter');
//     // isOpen? console.log('openSidebar'):('closeSidebar');
//     setIsTopFilterOpen(!IsTopFilterOpen);
//     console.log(IsTopFilterOpen);
//     // isOpen?console.log('openSidebar'):('closeSidebar');
//   };
//   return (
//     <div className="flex items-center">
//       <div className="relative inline-block text-left">
//         <div>
//           <button type="button" onClick={toggleTopFilter} className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
//             Sort
//             <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//               <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>

      
//         <div className={`${IsTopFilterOpen? "absolute":"hidden"} right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={parseInt("-1")}>
//           <div className="py-1 flex flex-col" role="none">
          
//             <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-900" role="menuitem" tabIndex={parseInt("-1")} id="menu-item-0">Most Popular</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex={parseInt("-1")} id="menu-item-1">Best Rating</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex={parseInt("-1")} id="menu-item-2">Newest</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex={parseInt("-1")} id="menu-item-3">Price: Low to High</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-500" role="menuitem" tabIndex={parseInt("-1")} id="menu-item-4">Price: High to Low</a>
//           </div>
//         </div>
//       </div>

//       <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
//         <span className="sr-only">View grid</span>
//         <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
//         </svg>
//       </button>
//       <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
//         <span className="sr-only">Filters</span>
//         <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
//         </svg>
//       </button>
//     </div>
//   )
// }

// export default TopFilter
// import React from "react";
// import { useSearchParams } from "react-router-dom";

// const TopFilter = () => {
//   const [params, setParams] = useSearchParams();

//   const setSort = (value) => {
//     const newParams = new URLSearchParams(params);
//     newParams.set("sort", value);
//     setParams(newParams);
//   };
//   const sortOptions = [
//     { id: 'popular', label: 'Most Popular' },
//     { id: 'price_low', label: 'Low → High' },
//     { id: 'price_high', label: 'High → Low' },
//     { id: 'newest', label: 'Newest' },
//   ];
//   return (
//     <div className="flex gap-3 flex-wrap mt-4">
//       {sortOptions.map((opt) => (
//       <button
//         key={opt.id}
//         onClick={() => setSort(opt.id)}
//         className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
//         {opt.label}
//       </button>
//     ))}
//     </div>
//   );
// };

// export default TopFilter;
//src/front/components/products/TopFilter.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const TopFilter = () => {
  const [params, setParams] = useSearchParams();
  const currentSort = params.get("sort") || "popular";

  const setSort = (value) => {
    const newParams = new URLSearchParams(params);
    newParams.set("sort", value);
    setParams(newParams);
  };

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'price_low', label: 'Price: Low → High' },
    { id: 'price_high', label: 'Price: High → Low' },
    { id: 'newest', label: 'Newest Arrivals' },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap mt-6">
      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 ml-1">
        Sort By:
      </span>
      
      <div className="flex gap-2 flex-wrap">
        {sortOptions.map((opt) => {
          const isActive = currentSort === opt.id;
          
          return (
            <button
              key={opt.id}
              onClick={() => setSort(opt.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                isActive 
                  ? "border-brand-burgundy text-brand-burgundy dark:border-brand-cream dark:text-brand-cream" 
                  : "border-brand-cream dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-brand-burgundy/30"
              }`}
            >
              {/* Subtle background glow for active item */}
              {isActive && (
                <motion.span 
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-brand-burgundy/5 dark:bg-brand-cream/5"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopFilter;