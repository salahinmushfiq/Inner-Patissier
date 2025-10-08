import { NAV_LINKS } from "../constants";
import {useLocation,Link} from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
const Sidebar = ({
  isOpen,
  toggle,sectionRefs
})=>{
    const sideVariants = {
        closed: {
        //   scaleX:"0%",  
        //   opacity:0,
        //   top:"0",
        //   originX: "100%",
          clipPath: "circle(0% at 90% 10% )",
          top:"0",
          
          
        },
        open: {
            
            // scaleX:"100%",  
            // opacity:1,
            // originX: "100%",
            clipPath: "circle(150% at 90% 0%)",
           
        },
        exit:{
            // scaleX:"0%",  
            // opacity:0,
            // top:"0",
            // originX: "100%",
            clipPath: "circle(0% at 90% 10%)",
            
        }
      };
      const humburger1 = {
        closed: {
          rotate: 0,
          translateY:0,
          translateX:0
          
          
        },
        open: {
            rotate: 45,
            translateY:3,
            translateX:1
        },
        exit:{
            rotate: 0,
            translateY:0,
            translateX:0
        }
      };
      const humburger2 = {
        closed: {
          opacity: 0,
          
          
        },
        open: {
            opacity: 0,
        },
        exit:{
            opacity: 0,
        }
      };
      const humburger3 = {
        closed: {
          rotate: 0,
          
        },
        open: {
            rotate: -45,
        },
        exit:{
            rotate: 0,
        }
      };
    const path = useLocation().pathname;

  const handleNavClick = (key) => {
    toggle(); // close sidebar
    if (sectionRefs && sectionRefs[key]?.current) {
      sectionRefs[key].current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
    <AnimatePresence>
      {isOpen && (<motion.div 
        
        initial="closed"
        animate="open"
        exit="exit"
        variants={sideVariants}
        className="sidebar-container fixed w-full h-full overflow-hidden justify-center  bg-[#E4D7D1] flex right-0 z-50"
        // style={{
        //   opacity: `${isOpen ? "1" : "0"}`,
        //   top: ` ${isOpen ? "0" : "-100%"}`,
        // }}
      >
        <button className="absolute right-0 py-10 px-6 fill-[#800020]" type="button" onClick={toggle}>
          {/* Close icon */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
          >
            <path
            //   fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg> */}
          <svg viewBox="0 0 12 12"  xmlns="http://www.w3.org/2000/svg" fill="#ac1414" width="32"
            height="32">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <motion.rect variants={humburger1} fill="#800020" height="1" width="11" x="0.5" y="5.5"></motion.rect> 
                    <motion.rect variants={humburger2} fill="#800020" height="1" width="11" x="0.5" y="2.5"></motion.rect> 
                    <motion.rect variants={humburger3} fill="#800020" height="1" width="11" x="0.5" y="8.5"></motion.rect> 
                </g> 
            </g>
          </svg>
        </button>

        
         <ul className="sidebar-nav w-full leading-relaxed text-xl flex flex-col justify-evenly items-center">
  {NAV_LINKS.map((link) => (
    <li className="group flex text-center w-16" key={link.key}>
      <button
        onClick={() => handleNavClick(link.key)}
        className={`opacity-70 text-[#800020] cursor-pointer pb-1.5 group-hover:opacity-90 group-hover:font-semibold transition-all ${
          path === link.href ? "text-[#800020]" : ""
        }`}
      >
        {link.label}
        <span className="mx-auto absolute h-0.5 bg-[#800020] top-8 w-0 transition-all group-hover:w-full group-hover:px-6 delay-150 duration-300 ease-in-out"></span>
      </button>
    </li>
  ))}

  <li>
    <Link
      onClick={toggle}
      to="/login"
      className="opacity-70 text-[#800020] cursor-pointer pb-1.5 group-hover:opacity-90 group-hover:font-semibold transition-all"
    >
      Login
      <span className="left-0 absolute h-0.5 bg-[#800020] top-8 w-0 transition-all group-hover:w-full group-hover:px-6 delay-150 duration-300 ease-in-out"></span>
    </Link>
  </li>
</ul>

      </motion.div>)}
      </AnimatePresence>
    </>
  );
};
const framerSidebarBackground = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } },
    transition: { duration: 0.3 },
  }
  
  const framerSidebarPanel = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3 },
  }
  

  
  const framerIcon = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 1.5,
    },
  }
export default Sidebar;