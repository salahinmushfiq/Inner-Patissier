import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useStateContext } from '../../contexts/ContextProvider';
import BasicMap2 from '../../components/Maps/BasicMap2';
import axios from 'axios';
import { useMapContext } from '../../contexts/MapContextProvider';

const EditEmployee = () => {
  let storedToken = localStorage.getItem('access_token');
  useEffect(() => {
    storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 
  // const userAgent = navigator.userAgent;
  // Modal Component for displaying messages
  const Modal = ({ message, onClose }) => {
    if (!message) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-2">
            {message.type === 'error' ? 'Error' : 'Success'}
          </h2>
          <p>{message.text}</p>
          <button
            onClick={onClose}
            className={`"mt-4 px-4 py-2 ${message.type === 'error' ? "bg-red-600" :"bg-green-600"} text-white rounded hover:bg-red-700 transition-colors"`}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Contexts
  const {
    currentColor,
    currentToken,
    setToken,
    themeSettings,
    setThemeSettings,
    setRefreshToken,
    refreshToken,
  } = useStateContext();

  const {
    selectedCoordinates,
    setFormData,
    formData,
    setSelectedCoordinates,
  } = useMapContext();

  // State for messages
  const [message, setMessage] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Log token (for debugging purposes)
  console.log('Token check EditEmployee from context:', currentToken);
  localStorage.setItem('token', currentToken);
  console.log(
    'Token check EditEmployee2 from local storage:',
    localStorage.getItem('token')
  );

  // Recursive handleChange function to support multiple levels of nesting
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData((prevData) => {
      let updatedData = { ...prevData };
      let currentLevel = updatedData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      }

      currentLevel[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
       // Include userAgent, macAddress, and ip in the formData
       
      
      const ipResponse = await axios.get('https://api.ipify.org?format=json').then(async (ipResponse) =>{
        console.log("Ip: Response "+ipResponse.data.ip) 
        const ip = ipResponse.data.ip;
        
        const userAgent=navigator.userAgent
        const dataToSend = {
          ...formData,
          userAgent, // `navigator.userAgent` is already stored in `userAgent` variable
          macAddress: "mac",
          ip 
        };
        console.log("Data to send: ");
        console.log(dataToSend);
        const response = await axios.patch(
          'http://127.0.0.1:8000/user/profile/',
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
          },
          }
        );
        const userData = response.data;
        console.log("userData: ");
        console.log(userData);
        setFormData(userData);
        console.log("formData: ");
        console.log(formData);
        setSelectedCoordinates(userData.address.coordinates);

        // Show success message
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsPopupVisible(true);
       });
      

      
    } catch (error) {
      let errorDetails = '';

      if (error.response) {
        // Server-side errors (4xx, 5xx)
        errorDetails = `Error: ${error.response.status} - ${
          error.response.data.detail || 'Something went wrong'
        }`;
      } else if (error.request) {
        // No response received
        errorDetails = 'Error: No response from server';
      } else {
        // Other errors
        errorDetails = `Error: ${error.message}`;
      }

      setMessage({ type: 'error', text: errorDetails });
      setIsPopupVisible(true);
      console.error('Error details:', errorDetails);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
         // Fetch the user's public IP address
         let ip = "127.0.0.1";
         
        const response = await axios.get('http://127.0.0.1:8000/user/profile/', {
          headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
          },
      });
        const userData = response.data;
        
        setFormData(userData);
        // const userData = response.data;
            setFormData({
                ...userData,
                ip: ip, // Set the fetched IP address
            });
        setSelectedCoordinates(userData.address.coordinates);
      } catch (error) {
        let errorDetails = '';

        if (error.response) {
          // Server-side errors (4xx, 5xx)
          errorDetails = `Error: ${error.response.status} - ${
            error.response.data.detail || 'Something went wrong'
          }`;
        } else if (error.request) {
          // Request made but no response received
          errorDetails = 'Error: No response from server';
        } else {
          // Any other errors
          errorDetails = `Error: ${error.message}`;
        }

        setMessage({ type: 'error', text: errorDetails });
        setIsPopupVisible(true);
        console.log('Current Token:', currentToken);
        console.error('Error fetching user data:', errorDetails);
      }
    };

    fetchUserData();
  }, [currentToken, setFormData, setSelectedCoordinates]);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-black dark:bg-secondary-dark-bg">
      <Header category="Page" title="Edit Employee" />
      <Modal message={message} onClose={() => setMessage(null)} />
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Personal Information
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="maidenName"
              value={formData.maidenName || ''}
              onChange={handleChange}
              placeholder="Maiden Name"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="number"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              placeholder="Age"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
              min="0"
            />
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Others</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              placeholder="Username"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate || ''}
              onChange={handleChange}
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="university"
              value={formData.university || ''}
              onChange={handleChange}
              placeholder="University Name"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              maxLength="30"
            />
            <input
              type="text"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup || ''}
              onChange={handleChange}
              placeholder="Blood Group"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="number"
              name="height"
              value={formData.height || ''}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              min="0"
            />
            <input
              type="number"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              min="0"
            />
            <input
              type="text"
              name="eyeColor"
              value={formData.eyeColor || ''}
              onChange={handleChange}
              placeholder="Eye Color"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="hair.color"
              value={formData?.hair?.color || ''}
              onChange={handleChange}
              placeholder="Hair Color"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="hair.type"
              value={formData?.hair?.type || ''}
              onChange={handleChange}
              placeholder="Hair Type"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="ssn"
              value={formData.ssn || ''}
              onChange={handleChange}
              placeholder="SSN"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              maxLength="11"
            />
            <input
              type="text"
              name="ein"
              value={formData.ein || ''}
              onChange={handleChange}
              placeholder="EIN"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              maxLength="11"
            />
          </div>
        </fieldset>

        {/* Address Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Address
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="address.address"
              value={formData?.address?.address || ''}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.city"
              value={formData?.address?.city || ''}
              onChange={handleChange}
              placeholder="City"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.state"
              value={formData?.address?.state || ''}
              onChange={handleChange}
              placeholder="State"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.stateCode"
              value={formData?.address?.stateCode || ''}
              onChange={handleChange}
              placeholder="State Code"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.postalCode"
              value={formData?.address?.postalCode || ''}
              onChange={handleChange}
              placeholder="Postal Code"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.country"
              value={formData?.address?.country || ''}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="address.coordinates.lat"
              value={formData?.address?.coordinates?.lat || ''}
              onChange={handleChange}
              placeholder="Latitude"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="address.coordinates.lng"
              value={formData?.address?.coordinates?.lng || ''}
              onChange={handleChange}
              placeholder="Longitude"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mt-10 p-2 border rounded z-20">
            <BasicMap2 />
          </div>
        </fieldset>

        {/* Company Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Company
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="company.name"
              value={formData?.company?.name || ''}
              onChange={handleChange}
              placeholder="Company Name"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.title"
              value={formData?.company?.title || ''}
              onChange={handleChange}
              placeholder="Company Title"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.department"
              value={formData?.company?.department || ''}
              onChange={handleChange}
              placeholder="Company Department"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="company.address.address"
              value={formData?.company?.address?.address || ''}
              onChange={handleChange}
              placeholder="Company Address"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.address.city"
              value={formData?.company?.address?.city || ''}
              onChange={handleChange}
              placeholder="Company City"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.address.state"
              value={formData?.company?.address?.state || ''}
              onChange={handleChange}
              placeholder="Company State"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.address.stateCode"
              value={formData?.company?.address?.stateCode || ''}
              onChange={handleChange}
              placeholder="Company State Code"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.address.postalCode"
              value={formData?.company?.address?.postalCode || ''}
              onChange={handleChange}
              placeholder="Company Postal Code"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="company.address.country"
              value={formData?.company?.address?.country || ''}
              onChange={handleChange}
              placeholder="Company Country"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
          </div>
        </fieldset>

        {/* Bank Details Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Bank Details
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="bank.cardNumber"
              value={formData?.bank?.cardNumber || ''}
              onChange={handleChange}
              placeholder="Card Number"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
              maxLength="20"
            />
            <input
              type="text"
              name="bank.cardExpire"
              value={formData?.bank?.cardExpire || ''}
              onChange={handleChange}
              placeholder="Card Expire (MM/YY)"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              title="Format: MM/YY"
            />
            <input
              type="text"
              name="bank.cardType"
              value={formData?.bank?.cardType || ''}
              onChange={handleChange}
              placeholder="Card Type"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="bank.currency"
              value={formData?.bank?.currency || ''}
              onChange={handleChange}
              placeholder="Currency"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
            />
            <input
              type="text"
              name="bank.iban"
              value={formData?.bank?.iban || ''}
              onChange={handleChange}
              placeholder="IBAN"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              
              maxLength="34"
            />
          </div>
        </fieldset>

        {/* Crypto Information Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Crypto Information
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="crypto.coin"
              value={formData?.crypto?.coin || ''}
              onChange={handleChange}
              placeholder="Crypto Coin"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="crypto.wallet"
              value={formData?.crypto?.wallet || ''}
              onChange={handleChange}
              placeholder="Crypto Wallet"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="crypto.network"
              value={formData?.crypto?.network || ''}
              onChange={handleChange}
              placeholder="Crypto Network"
              className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-2 bg-[currentColor] text-white rounded hover:bg-[currentColor] transition-colors"
          style={{ backgroundColor: currentColor }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
