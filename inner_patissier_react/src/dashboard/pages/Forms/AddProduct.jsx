import React,{useState} from 'react'
import Header from '../../components/Header'
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
const AddProduct = () => {
  const {
    currentColor,
    currentToken,
    setToken,
    themeSettings,
    setThemeSettings,
    setRefreshToken,
    refreshToken,
  } = useStateContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    sku: '',
    weight: '',
    // dimensions: {
    //   width: '',
    //   height: '',
    //   depth: '',
    // },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: '',
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
    thumbnail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions.')) {
      const dimension = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        dimensions: {
          ...prevState.dimensions,
          [dimension]: value,
        },
      }));
    } else if (name.includes('meta.')) {
      const metaField = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [metaField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, such as sending data to an API
    console.log('Form submitted:', formData);
  };

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-black dark:bg-secondary-dark-bg">
      <Header category="Page" title="Add Product"/>
      
      <form onSubmit={handleSubmit}>

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
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full p-2 border border-gray-300 rounded mb-2"
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
            onChange={handleChange}
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full p-2 border border-gray-300 rounded mb-2"
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
            onChange={handleChange}
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
        </div>
        </fieldset>

        {/* Weight and Dimensions Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
          Weight and Dimensions
          </legend>
          <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="dimensions.height"
            placeholder="Height"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="dimensions.depth"
            placeholder="Depth"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
        </div>
        
        </fieldset>
        {/* Additional Information Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
          Additional Information
          </legend>
          <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="warrantyInformation"
            placeholder="Warranty Information"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="shippingInformation"
            placeholder="Shipping Information"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="availabilityStatus"
            placeholder="Availability Status"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <textarea
            name="returnPolicy"
            placeholder="Return Policy"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minimumOrderQuantity"
            placeholder="Minimum Order Quantity"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
        </div>
        </fieldset>

        {/* Meta Information Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
          Meta Information
          </legend>
          <div className="grid grid-cols-2 gap-4">
        
          <input
            type="text"
            name="meta.createdAt"
            placeholder="Created At"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="meta.updatedAt"
            placeholder="Updated At"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="meta.barcode"
            placeholder="Barcode"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="meta.qrCode"
            placeholder="QR Code"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
        </div>
       </fieldset>
        {/* Images Section */}
        <fieldset className="mb-4 border p-4 rounded bg-gray-100 dark:bg-gray-800">
          <legend className="font-bold text-gray-900 dark:text-gray-200 p-2">
          Images Section
          </legend>
          <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="images"
            placeholder="Images (comma separated URLs)"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            onChange={handleChange}
          />
        </div>
        </fieldset>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="mt-4 p-2 bg-[currentColor] text-white rounded hover:bg-[currentColor] transition-colors"
          style={{ backgroundColor: currentColor }}
          >
            Submit
          </button>
          
        </div>
      </form>
    
    </div>
  );
};

export default AddProduct;