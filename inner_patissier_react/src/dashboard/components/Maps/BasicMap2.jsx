
import React,{useRef} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map,{ FullscreenControl, GeolocateControl,NavigationControl, Popup ,Source,Marker} from 'react-map-gl';
import { useState} from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { useMapContext } from '../../contexts/MapContextProvider';

// import Map, { Marker, NavigationControl, GeolocateControl, FullscreenControl } from 'react-map-gl';

const BasicMap2 = () => {
    const mapRef = useRef();
    const {currentColor,currentMode}=useStateContext();
    const {selectedCoordinates,setSelectedCoordinates, setFormData}=useMapContext()
    
    
    const handleMapClick = (e) => {
        const { lng, lat } = e.lngLat;
        setSelectedCoordinates({ lat, lng });
        console.log("lat: "+lat+" lng: "+lng); 
        
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            coordinates: { lat, lng }
          }
        }));
      };
    
       
    
  return (
    <Map   
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        // style="mapbox://styles/mapbox/streets-v9"
        style={{
        width:"100%",
        height:"50vh",
        borderRadius:"4px"
        }}
        mapStyle={`${ currentMode==='Dark'?'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11'}`}

        className="rounded-xl hover:scale-105 ease-in duration-300 mx-auto my-24 box-shadow-xl"
        initialViewState={{
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng,
        zoom: 10
        }}
        onClick={handleMapClick}
        >
        <Marker longitude={selectedCoordinates.lng} latitude={selectedCoordinates.lat} draggable onDragEnd={handleMapClick} />
        <NavigationControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white", color:"white"}}/>
        <GeolocateControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white"}}/>
        <FullscreenControl style={{ backgroundColor: currentMode==='Dark' ? "#64748b" : "white"}}/>
  
    </Map> 
  )
}

export default BasicMap2