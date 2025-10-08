import React,{useEffect,useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

import {MdLoop} from 'react-icons/md';

const Products = () => {
  const navigate = useNavigate();
  const{currentColor}=useStateContext();
   
  const [products,setProducts]= useState(5);
  const [selectedProduct, setSelectedProduct] = useState({});
  const[pageSize,setPageSize]= useState(5);
 
useEffect(()=>{
  axios.get('https://dummyjson.com/products/').then((response)=>{
      
      console.log("respose");
      console.log(response.data.products);
      setProducts(response.data.products);
  });
},[]);
let columns=[
  { field: 'id',cellClassName: 'super-app-theme--cell' ,headerName: "ID",flex:1,align: 'center', hide: true, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center'},
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
{ field: 'stock' ,flex:1,minWidth:60,headerName:"Stock",maxWidth:90, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',renderCell:(params) =><p className='px-2 inline-flex text-gray-800 dark:text-gray-200'>{ String(params.value) }</p>}, 
{ field: 'brand',flex:1,minWidth:90,headerName:"Brand", headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',renderCell: (params) =><p className='font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>},
{
  field: "update",
  flex:1,minWidth:120,
  className:"drop-shadow-md text-gray-200 dark:text-gray:400",
  headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  headerName: "Update",
  sortable: false,
 
  renderCell: (params) => {
    const onProfileClick = (e) => {
        e.stopPropagation();
        
        console.log("Button Clicked");
        let currentRow=params.row;
        let current_row_address_column=params.row.address;
        if(currentRow){
          // setSelectedUser(params.row.firstName);
          let currentProduct=products.filter(function(product){
            return product.address.coordinates.lat===current_row_address_column.coordinates.lat
          })[0];
          console.log("print filter: ",currentProduct);
          setSelectedProduct(currentProduct);
          console.log("selectedUser");
          console.log(selectedProduct);
         
          
          navigate(`/employees/product/${currentRow.id}`);
        }else{
          console.log("Empty Row");
        }

    };

    return <button onClick={onProfileClick} className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700  light:hover:bg-slate-600 py-1 px-2 rounded' style={{color:currentColor,borderColor:currentColor}}><MdLoop fontSize="18px" className="inline-flex my-auto mb-1 mx-1" color={currentColor}/><span>Update</span></button>;
  }
}, ];
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg border-white">
      <Header category="Page" title="Products" />
      <div style={{ height: 380}} className="min-w-fit ">
      {
      products.length> 0 ? 
      <DataGrid
          
          sx={{
            className:'dark:text-gray-200 dark:bg-secondary-dark-bg',
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
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-full">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                
                <span className="sr-only">Loading...</span>
                
                
            </div>
        }
      </div>
      
    </div>
  );
};
export default Products;