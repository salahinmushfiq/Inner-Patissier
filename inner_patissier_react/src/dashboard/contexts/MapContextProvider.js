import React, { createContext, useContext, useState } from 'react';

const MapContext= createContext();

export const MapContextProvider = ({ children }) => {
    
    
    const [employees,setEmployees]=useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [selectedMarkerAddress, setSelectedMarkerAddress] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState({
      lat: 37.7749, // Default starting coordinates
      lng: -122.4194
    });
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      maidenName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      username: '',
      birthDate: '',
      image: '',
      bloodGroup: '',
      height: '',
      weight: '',
      eyeColor: '',
      hair: {
        color: '',
        type: ''
      },
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        coordinates: {
          lat: '',
          lng: ''
        },
        country: ''
      },
    });
    return (
       <MapContext.Provider value={{ 
         employees,
         setEmployees,
         selectedEmployee,
         setSelectedEmployee,
         showPopUp, 
         setShowPopUp,
         selectedMarkerAddress,
         setSelectedMarkerAddress,
         selectedCoordinates,
         setSelectedCoordinates,
         setFormData,
         formData,
         currentUser,
         currentUser
        }}>
        {children}
       </MapContext.Provider>
    );
  }

  export const useMapContext = () => useContext(MapContext);