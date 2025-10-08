import React from 'react'
import Map,{ FullscreenControl, GeolocateControl, Layer, Marker, NavigationControl, Popup ,Source} from 'react-map-gl';
import { useStateContext } from '../../contexts/ContextProvider';
import { useMapContext } from '../../contexts/MapContextProvider';
import { ImLocation } from 'react-icons/im';
const MapMarker = ({props}) => {
  // user,showPopUp,setShowPopUp,selectedAddress,setSelectedAddress,ImLocation,currentColor
  const {currentColor}=useStateContext();
  const {showPopUp, setShowPopUp}=useMapContext();
  // console.log("Map Marker: ",props);
  
  
  return (
    props.user.address.coordinates ? 
          <Marker
                
              style={{backgroundColor:"transparent", boxShadow:"none",border:"none"}}
              latitude={props.user.address.coordinates.lat}
              longitude={props.user.address.coordinates.lng}
              offsetLeft={-20}
              offsetBottom={-10}
            >
              <p style={{shadowColor:currentColor}} className='cursor-pointer h-8 w-8 shadow-md my-auto rounded-full' aria-label="push-pin" role="img" 
              onClick={(e)=>{

                
                console.log(showPopUp);
                setShowPopUp(true);
                console.log(showPopUp);
                console.log(e.currentTarget.dataset);
                const cust_obj=JSON.parse(e.currentTarget.getAttribute('data-test-id'));
                props.setSelectedAddress(cust_obj);
                
                console.log("selectedAddress in pieces start: ");
                console.log(cust_obj["lat"]+","+cust_obj["lng"]);
                // <CustomPopUp props={{lat:cust_obj["lat"],lng:cust_obj["lng"]}}/>
                console.log(props.selectedAddress);
                if(cust_obj["lat"]===props.user.address.coordinates.lat){
                  setShowPopUp(true);
                }
                else{
                  setShowPopUp(false);
                }

            }} data-test-id={JSON.stringify(props.user.address.coordinates)}
              >
                  <span style={{fontSize:"18px", color:currentColor}} data-test-id-2={JSON.stringify(props.user.address.coordinates)}><ImLocation className='marker-element text-2xl animate-bounce'/></span> 
                
                </p>
          </Marker> 
          : props.user.hasOwnProperty("address") ? <Marker style={{backgroundColor:"transparent", boxShadow:"none",border:"none"}}
          latitude={props.user.address.coordinates.lat}
          longitude={props.user.address.coordinates.lng}
          offsetLeft={-20}
          offsetBottom={-10}>
          <p>
            <span style={{fontSize:"18px", color:"red",zIndex:"1000"}}><ImLocation className='text-2xl animate-bounce'/></span> 
          </p>
    </Marker> : <h>Not Happening</h>
  )
}

export default MapMarker