import React,{useEffect,useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import {MdLoop} from 'react-icons/md';

const ProductsAPITest = () => {
  const navigate = useNavigate();
  const{currentColor,currentToken}=useStateContext();
  const [products,setProducts]= useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const[pageSize,setPageSize]= useState(5);
  const base_url = process.env.REACT_APP_API_URL ; 
  const [error, setError] = useState(null);
  const [stockValues, setStockValues] = useState({}); // To store stock values for each product
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${base_url}/products/`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      console.log(response);
      setProducts(response.data); // Adjust based on your API response structure
    } catch (error) {
      setError(error.response?.data || "An error occurred while fetching products");
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log("products");
    console.log(products);
  }, [currentToken]);

   // Update stock functionality
   const handleStockUpdate = async (id) => {
    const updatedStock = stockValues[id]; // Get updated stock value for the product
    if (updatedStock !== undefined) {
      try {
        await axios.patch(`${base_url}/products/${id}/`, { stock: updatedStock },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Corrected syntax
            'Content-Type': 'application/json', // Set the content type
          },
        }); // Replace with your API
        fetchProducts(); // Refresh product list after updating stock
      } catch (error) {
        console.error("Error updating stock:", error);
      }
    }
  };

  // Handle stock input change
  const handleStockChange = (id, value) => {
    setStockValues({ ...stockValues, [id]: value });
  };

  // Remove product functionality
  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`${base_url}/products/${id}/`,{headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Corrected syntax
        'Content-Type': 'application/json', // Set the content type
      }
    }); // Replace with your API
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
let columns=[
  { field: 'productId',cellClassName: 'super-app-theme--cell' ,headerName: "ID",flex:1,align: 'center', hide: true, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center'},
  { field: 'thumbnail' ,headerName: "Product",flex:1,minWidth:110,maxWidth:140,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:false, filterable:false,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',renderCell:(params) =>
<div className='drop-shadow-md pt-2 '>
  {<img className='h-20 w-20 md:ml-3 w-stretch hover:scale-95 duration-300 inline-flex cursor-pointer  hover:p-5 p-6 drop-shadow-xl' src={params.value} alt="thumbnail"/> }
</div> },
{ field: 'title' ,headerName: "Title",flex:1,minWidth:110,maxWidth:170,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
renderCell:(params) =>
<div className='drop-shadow-md pt-2 '>
  <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
</div> 
},

{ field: 'description' ,headerName: "Description",flexGrow: 1,minWidth:180,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center flex-grow',renderCell:(params) =><p className='px-2 inline-flex  text-gray-800 dark:text-gray-200'>{params.value}</p>}, 
{ field: 'category'  ,headerName: "Category",flex:1,minWidth:120,maxWidth:150, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center', renderCell: (params) => <div className=""><p className='font-semibold inline-flex mx-1 text-gray-800 dark:text-gray-200'>{params.value}</p></div>}, 
// { field: 'stock' ,flex:1,minWidth:60,headerName:"Stock",maxWidth:90, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',renderCell:(params) =><p className='px-2 inline-flex text-gray-800 dark:text-gray-200'>{ String(params.value) }</p>}, 
{ field: 'brand',flex:1,minWidth:90,headerName:"Brand", headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',renderCell: (params) =><p className='font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>},
{
  field: "stock",
  headerName: "Stock",
  headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  flex:1,
  renderCell: (params) => (
    <div className="flex items-center gap-2 justify-center">
      <input
        type="number"
        value={stockValues[params.id] || params.row.stock}
        onChange={(e) => handleStockChange(params.id, e.target.value)}
        className="border px-2 py-1 rounded bg-gray-200 text-gray-800 dark:bg-secondary-dark-bg dark:text-white text-center w-auto"
      />
     
    </div>
  ),
},
{
  field: "remove",
  headerName: "Remove",
  headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell: (params) => (
    <button
      onClick={() => handleRemoveProduct(params.id)}
      className="border-red-400 border-2 px-2 py-1 rounded-md text-red-400"
    >
      Remove
    </button>
  ),
},
{ field: "update",
  headerName: "update",
  headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell: (params) => (
  <button
  onClick={() => handleStockUpdate(params.id)}
  className=" text-white px-2 py-1 rounded-md border-2 border-solid"
  style={{borderColor: currentColor, color: currentColor}}  
  >
  
  Update
</button>
  )
}

];
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg border-white">
      <Header category="Page" title="Products" />
      <div style={{ height: 380}} className="min-w-fit ">
      {
      products.length> 0 ? 
      <DataGrid
          
          sx={{
            className:'dark:text-gray-200 dark:bg-secondary-dark-bg z-1',
            boxShadow: 4,
            border: 0,
            borderColor: 'lightgray',
            '& .MuiDataGrid-cell:hover': {
              color: 'darkcyan',
            },'& .MuiDataGrid-cell:active': {
              accentColor: 'darkcyan',
            },
            
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'desc' }],
            },
          }}
        columns={columns}
        rows={products}
        rowsPerPageOptions={[5,10,20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />:
        <div role="status" className="space-y-4 animate-pulse max-w-full">
          {
          Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center w-full space-x-2 max-w-full">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
            ))
            }
          <span className="sr-only">Loading...</span>
            
        </div>
        }
      </div>
      
    </div>
  );
};
export default ProductsAPITest;