"use client";
import Header from "./Header"
import { useRef } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
const Testimonials = () => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
      });
      const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
      const scale = useTransform(scrollYProgress, [0, 1], [1, .5]);
      const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  return (
    
    <motion.section
    id="reviews"
    style={{
        scale:scale,
        y:backgroundY,
        opacity:opacity
      }}
        ref ={ref} className="py-20 max-container padding-container flex flex-col flex-wrap gap-10  pb-32 md:gap-28 lg:py-12 ">
        <Header primary="Testimonials" secondary="Let’s hear it from them"/>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 px-4 pb-16">
 

            <ul className="space-y-8">
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                        <p className="text-black-500 text-md">Rapper &amp; Entrepreneur</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Find God.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p className="text-black-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/kanyewest" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                                        <p className="text-black-500 text-md">Rapper &amp; Entrepreneur</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Find God.</p>
                            </div>
                        </a>
                    </div>
                </li>
               
            </ul>


            <ul className="hidden space-y-8 sm:block">
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                        <p className="text-black-500 text-md">CEO of Twitter</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Enim neque volutpat ac tincidunt vitae
                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/tim_cook" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                                        <p className="text-black-500 text-md">CEO of Apple</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Diam quis enim lobortis scelerisque
                                    fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis
                                    aliquam malesuada bibendum.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/paraga" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                                        <p className="text-black-500 text-md">CEO of Twitter</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Enim neque volutpat ac tincidunt vitae
                                    semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam
                                    pellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                            </div>
                        </a>
                    </div>
                </li>
               
            </ul>


            <ul className="hidden space-y-8 lg:block">
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                        <p className="text-black-500 text-md">CEO of Microsoft</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Tortor dignissim convallis aenean et
                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/dan_schulman" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                                        <p className="text-black-500 text-md">CEO of PayPal</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Quam pellentesque nec nam aliquam sem
                                    et tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li className="text-sm leading-6 duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="relative group">
                        <div
                            className="absolute transition rounded-lg opacity-25 -inset-1  group-hover:opacity-100 group-hover:duration-200">
                        </div><a href="https://twitter.com/satyanadella" className="cursor-pointer">
                            <div
                                className="relative p-6 space-y-6 leading-none drop-shadow-lg bg-white">
                                <div className="flex items-center space-x-4"><img
                                        src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella"/>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                                        <p className="text-black-500 text-md">CEO of Microsoft</p>
                                    </div>
                                </div>
                                <p className="leading-normal text-black-300 text-md">Tortor dignissim convallis aenean et
                                    tortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                            </div>
                        </a>
                    </div>
                </li>
                
            </ul>


        </div>
    </motion.section>

  )
}

export default Testimonials