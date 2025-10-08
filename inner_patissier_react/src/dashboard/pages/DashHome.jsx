// import './App.css';

import {React,useEffect} from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import {FiSettings } from 'react-icons/fi';
import {Navbar,Footer,Sidebar,ThemeSettings,UserProfile,Button} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
// import AppRoutes from '../routes';
// import { GoDot } from 'react-icons/go';
import DashRoutes from '../routes';

const DashHome = () => {
  const {activeMenu,themeSettings,setThemeSettings,currentColor,currentMode} = useStateContext();
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "robots";
    metaTag.content = "noindex, nofollow"; 
    document.head.appendChild(metaTag);

    return () => {
        document.head.removeChild(metaTag);
    };
}, []);
  return(
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-2 bottom-8" style={{ zIndex: '1000' }}>
            
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings/>
              </button>

            
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full shadow-xl">
              <Navbar />
            </div>
            <div>
          {themeSettings && <ThemeSettings/>}
          {/* <AppRoutes/> */}
          <DashRoutes/>
        
        </div>
        </div>
      </div>
    
    </div>
  )
}

export default DashHome