"use client";
import React, { useState } from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform} from "framer-motion"
import {TopFilter,Products,AddToCartFloatingIcon } from "../components/products";
import { Footer,Navbar } from "../components";

const ProductsPage = () => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({

        target: container,

        offset: ["start end", 'end start']

    });
    const scale = useTransform(scrollYProgress, [0, 1,0], [1, .8,1]);
    const [isOpen, setIsOpen] = useState(false);
    const [IsTopFilterOpen, setIsTopFilterOpen] = useState(false);
    
   

    
  return (
    
    <>
    <Navbar/>
    <motion.div
     style={{
        scale:scale
      }}
    ref ={container}
    className="-mt-64 py-20 max-container padding-container pb-32 lg:py-12"
     >
      {/* <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl pt-28 pb-6">Shop</h2> */}
      
      
      <div className="bg-white">
        <AddToCartFloatingIcon/>
        <div>
       
          

          <main className="-mt-52 py-20 pb-32 lg:py-12">
            
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1> */}
              <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl pt-28 pb-6">Shop</h2>
                 <TopFilter IsTopFilterOpen={IsTopFilterOpen} setIsTopFilterOpen={setIsTopFilterOpen}/> 
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                <FaBars className="cursor-pointer flex lg:hidden fill-[#800020] stroke-[#800020] text-color-[#800020] shadow-xl z-10" onClick={()=> {
                  setIsOpen(!isOpen)
                }}/> */}

                {/* <InitialFilter/> */}
                <div className="col-span-3 lg:col-span-4">
                    <Products/>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

     
    </motion.div>
    <Footer/>
    </>
    
  )
}

export default ProductsPage