import React from 'react'
import Map,{ Popup } from 'react-map-gl';
const CustomPopUp = ({props}) => {
  console.log("custom popup called");
  console.log("with props",props.lat,props.lng);
  return (
    // <Popup
    //   closeButton={false}
    //   captureDrag={false}
    //   latitude={props.lat}
    //   longitude={props.lng}
    //   className='text-center text-current leading-none font-sans'
    //   tipSize={8}
    // >
    //   <div className='p-2'>
    //     <p>Hellow</p>
    //   </div>
    // </Popup>

<Popup
  latitude={props.lat}
  longitude={props.lng}
  // onClose={() => {
  //   setShowPopUp(false);
  // }}
>
  <h3>{props.lat}</h3>
 
</Popup> 
  )
}

export default CustomPopUp