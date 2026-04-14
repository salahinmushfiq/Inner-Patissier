import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
const EditProduct = () => {
  const {
    currentColor,
    currentToken,
    setToken,
    themeSettings,
    setThemeSettings,
    setRefreshToken,
    refreshToken,
  } = useStateContext();
  
  const base_url = process.env.REACT_APP_API_URL ; 

  const [productId, setProductId] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    discountPercentage: 0,
    stock: 0,
    tags: '',
    sku: '',
  });

  useEffect(() => {
    const fetchProductData = async (id) => {
      if (id) {
        const response =  await axios.get(`${base_url}/products/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              'Content-Type': 'application/json',
          }
      }).then(response=>{
        setFormData(response.data);
      }).catch(response=>{
        console.log(response);
      });
        // const product = await response.json();
        // if (response.ok) {
        //   setFormData(product);
        // } else {
        //   console.error('Error fetching product data:', product);
        // }
      }
    };

    fetchProductData(productId);
  }, [productId]);

  const handleIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdate function or perform the update logic here
    console.log('Updated Product Data:', formData);
  };

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-black dark:bg-secondary-dark-bg">
      {/* <h2 className="text-xl font-semibold mb-4">Edit Product</h2> */}
      <Header category="Page" title="Edit Product"/>
      <form onSubmit={handleSubmit}>
        {/* Product ID Field */}
        {/* <div className="mb-4"> */}

        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
          Product ID
          </legend>
          {/* <label className="block mb-1">Product ID</label> */}
          <input
            type="text"
            value={productId}
            onChange={handleIdChange}
            placeholder="Enter Product ID"
            className="w-full p-2 border border-gray-300 rounded"
          />
          </fieldset>
        {/* </div> */}

        {/* Basic Information Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Basic Information
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Pricing and Stock Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Pricing and Stock
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount Percentage"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Tags and SKU Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
            Tags and SKU
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.tags}
              onChange={handleChange}
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="mt-4 px-4 py-2 text-white rounded  transition-colors" style={{backgroundColor: currentColor }}>
          Update 
        </button>
      </form>
    </div>
  );
};

export default EditProduct