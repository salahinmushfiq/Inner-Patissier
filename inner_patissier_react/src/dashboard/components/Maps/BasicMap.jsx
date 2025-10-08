import React,{useRef} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map,{ FullscreenControl, GeolocateControl,NavigationControl, Popup ,Source} from 'react-map-gl';
import { useState} from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { useMapContext } from '../../contexts/MapContextProvider';
import MapMarker from './MapMarker';
import CustomPopUp from './CustomPopUp';

const BasicMap = () => {

    
    const mapRef = useRef();
    const {currentColor,currentMode}=useStateContext();
    const {employees,selectedEmployee,showPopUp, setShowPopUp}=useMapContext();
    const [selectedAddress, setSelectedAddress] = useState({});
    console.log("props 2: ",selectedEmployee);
    console.log(currentMode);
    if(selectedAddress){
      console.log("selectedAddress: ");
      console.log(selectedAddress);      
      console.log(selectedAddress.lat,", ",selectedAddress.lng);     
    }
         
    const handleClick = event => {
  
      // setShowPopUp(false);
      console.log(event.currentTarget.dataset);
      const cust_obj=JSON.parse(event.currentTarget.getAttribute('data-test-id'));
      setSelectedAddress(cust_obj);
      
      console.log("selectedAddress in pieces start: ");
      console.log(cust_obj["lat"]+","+cust_obj["lng"]);
      console.log(selectedAddress["lat"]+","+selectedAddress["lng"]);
      console.log(showPopUp);
      console.log("selectedAddress in pieces end: ");
    };          

    const initialViewState={
      longitude:-77.01170259999999,
      latitude:38.9149499,
      zoom:5
    };

    
    document.querySelectorAll(".marker-element").forEach((element)=>{
          let address=JSON.parse(element.parentElement.getAttribute('data-test-id-2'));
          if(selectedEmployee.hasOwnProperty("address")){
            console.log("check: ",selectedEmployee.address.coordinates.lat," ",address.lat);
            if(address.lat===selectedEmployee.address.coordinates.lat)
            {
                element.classList.replace("text-2xl","text-4xl");
                element.style.color="orange";
                element.style.fill="orange";
                setTimeout(function() {
                  element.classList.replace("text-4xl","text-2xl");
                  element.style.color=currentColor;
                  element.style.fill=currentColor;
                }, 2000);
            }
            else{
              element.classList.replace("text-4xl","text-2xl");
              element.style.color=currentColor;
              element.style.fill=currentColor;
              
            }
          }
          
    });
    
    document.querySelectorAll(".mapboxgl-popup .mapboxgl-popup-content .rounded-md").forEach((element)=>{
      console.log("popup",element.getAttribute('data-lat'), element.getAttribute('data-lng'));
      console.log("popup",element.getAttribute('data-lat'), element.getAttribute('data-lng'));
    });
    
    
    return (
      

          <div>

          
          <div className='w-full mx-auto flex flex-wrap box-shadow-xl drop-shadow-xl mb-2 mt-2 px-4 min-w-fit' >
              <Map
                
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                style={{
                  width:"100%",
                  height:"70vh",
                  borderRadius:"4px"
                }}
                mapStyle={`${ currentMode==='Dark'?'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11'}`}
                initialViewState={initialViewState}
                className="rounded-xl hover:scale-105 ease-in duration-300 mx-auto my-24 box-shadow-xl z-20"
              >
                  {
                    employees.length > 0 && employees.map((user)=>{
                      return (
                        <div id={user.id} key={user.id}>
                           {
                              user.address && user.address.coordinates && <MapMarker props={{user,selectedAddress,setSelectedAddress}}/>
                            
                            }
                        </div>
                        
                      );
                      })
                  }
                  {
                      selectedAddress.hasOwnProperty("lat") &&  
                
                      <CustomPopUp props={{lat:selectedAddress.lat,lng:selectedAddress.lng}}/>
                  }
                  <NavigationControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white", color:"white"}}/>
                  <GeolocateControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white"}}/>
                  <FullscreenControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white"}}/>
                  
              </Map> 
          </div>
         
        
          </div>
    );
}

export default BasicMap;