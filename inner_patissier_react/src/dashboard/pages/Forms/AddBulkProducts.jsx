// src/components/AddBulkProducts.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { useStateContext } from '../../contexts/ContextProvider';
const AddBulkProducts = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const base_url = process.env.REACT_APP_API_URL ; 
  const {currentColor}=useStateContext();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!file) {
      setError('Please upload a file.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        console.log('Sending data:', json);

        // Optionally, add validation here
        // if (!isValidJSON(json)) {
        //   setError('Invalid JSON format.');
        //   return;
        // }
  
        const response = await axios.post(`${base_url}/products/bulk-add/`,
          json,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Corrected syntax
              'Content-Type': 'application/json', // Set the content type
            },
          }
        );
  
        setSuccess('Products added successfully!');
        console.log(response.data); // Log response data for debugging
      } catch (error) {
        setError('Failed to add products. Please try again: ' + error.message);
        console.error(error); // Log the full error for debugging
      } finally {
        // Optional: clear the file input
        setFile(null);
      }
    };
    reader.readAsText(file);
  };
  

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-black dark:bg-secondary-dark-bg">
      <Header category="Page" title="Add Bulk Products" />
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="file" onChange={handleFileChange} accept=".json" required />
        <button type="submit" className="mt-2 text-white p-2 rounded" style={{backgroundColor: currentColor }}>
          Upload
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default AddBulkProducts;
