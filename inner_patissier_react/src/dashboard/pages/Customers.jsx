import React, { useState }  from 'react';
import {useNavigate} from 'react-router-dom';
// import { GridComponent, ColumnDirective, ColumnsDirective ,Resize,Sort, ContextMenu,Filter,Page,ExcelExport,pdfExport,Edit,Inject } from '@syncfusion/ej2-react-grids';
import { customersData } from '../data/dummy';
import { Header } from '../components';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import {BsPersonBadge} from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { height } from '@mui/system';
// import { GoPrimitiveDot} from 'react-icons/go';
import { GoDot } from 'react-icons/go'; // An alternative that may fit your needs

import { useStateContext } from '../contexts/ContextProvider';
const CustomersCopy = () => {
  const{currentColor,currentMode}=useStateContext();
  const[pageSize,setPageSize]= useState(5);
  const navigate = useNavigate();
    
    const [users,setUsers]=useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedMarkerAddress, setSelectedMarkerAddress] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
  let customers=[];
  customersData.forEach( (customer,index)=>{
    
      
      customers.push({
      id: customer.CustomerID,
      image:customer.CustomerImage,
      // name: employee.EmployeeName,
      projectName: customer.ProjectName,
      customer: customer,
      budget: customer.Budget,
      weeks: customer.Weeks,
      location:customer.Location,
      status:customer
    });
   
  });

  let columns=[
    { field: 'id' ,headerName: "ID",flex:1,align: 'center', hide: true},
  { field: 'customer' ,headerName: "Customer",flex:1,minWidth:250,className:"drop-shadow-md justify-between", headerClassName:'text-gray-800 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    <img className='rounded-sm h-20 md:ml-3 w-stretch hover:scale-95 duration-300 inline-flex cursor-pointer  hover:p-5 p-6 drop-shadow-xl' src={params.value.CustomerImage}/>
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value.CustomerEmail}</p>
  </div> 
  }, 
  { field: 'projectName' ,headerName: "Project Name",flex:1,minWidth:150, headerClassName:'text-gray-800 dark:text-gray-200', renderCell: (params) =>  <p className='flex items-center gap-2 hover:drop-shadow-xl justify-center text-gray-800 dark:text-gray-200'>{params.value}</p>}, 
  { field: 'status'  ,headerName: "Status",flex:1,minWidth:80, headerClassName:'text-gray-800 dark:text-gray-200', renderCell: (params) =>  <p className='flex items-center gap-2 hover:drop-shadow-xl justify-center text-gray-800 dark:text-gray-200'>
  <span style={{color:`${params.value.StatusBg}`}}><GoDot /></span>
      <span className='font-semibold'>{params.value.Status}</span>
    </p>},
  { field: 'weeks' ,flex:1,minWidth:60,headerName:"Weeks", headerClassName:'text-gray-800 dark:text-gray-200',renderCell: (params) =><p className='font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>},
  { field: 'budget',flex:1,minWidth:70,headerName:"Budget", headerClassName:'text-gray-800 dark:text-gray-200',renderCell: (params) =><p className='font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>},
  { field: 'location'  ,headerName: "Location",flex:1,minWidth:90, headerClassName:'text-gray-800 mr-2 dark:text-gray-200 ', renderCell: (params) => <><HiOutlineLocationMarker className="inline-flex mx-1" color={currentColor}/><p className='font-semibold  text-gray-800 dark:text-gray-200'>{params.value}</p></>}, 
  {
    field: "locate",
    flex:1,minWidth:120,
    className:"drop-shadow-md text-gray-200 dark:text-gray:400",
    headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
    headerName: "Location",
    sortable: false,
   
    renderCell: (params) => {
      const locateOnClick = (e) => {
          e.stopPropagation();
          let currentRow=params.row;
          let current_row_address_column=params.row.address;
          console.log("Button Clicked");
          if(currentRow){
            // setSelectedUser(params.row.firstName);
            let currentUser=users.filter(function(user){
              return user.address.coordinates.lat===current_row_address_column.coordinates.lat
            })[0];
            console.log("print filter: ",currentUser);
            setSelectedUser(currentUser);
            console.log("selectedUser");
            console.log(selectedUser);
           
          }else{
            console.log("Empty Row");
          }
         
          
      };
      return <button className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700  light:hover:bg-slate-600 py-1 px-2 rounded' onClick={locateOnClick} style={{color:currentColor,borderColor:currentColor}}><HiOutlineLocationMarker fontSize="18px" className="inline-flex my-auto mb-1 mx-1"/><span>Locate</span></button>
    }
  }, 
  {
    field: "checkprofile",
    flex:1,minWidth:120,
    className:"drop-shadow-md text-gray-200 dark:text-gray:400",
    headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
    headerName: "Details",
    sortable: false,
   
    renderCell: (params) => {
      const onProfileClick = (e) => {
          e.stopPropagation();
          
          console.log("Button Clicked");
          let currentRow=params.row;
          let current_row_address_column=params.row.address;
          if(currentRow){
            // setSelectedUser(params.row.firstName);
            let currentUser=users.filter(function(user){
              return user.address.coordinates.lat===current_row_address_column.coordinates.lat
            })[0];
            console.log("print filter: ",currentUser);
            setSelectedUser(currentUser);
            console.log("selectedUser");
            console.log(selectedUser);
           
            
            navigate(`customer/${currentRow.id}`);
          }else{
            console.log("Empty Row");
          }

      };

      return <button onClick={onProfileClick} className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700  light:hover:bg-slate-600 py-1 px-2 rounded' style={{color:currentColor,borderColor:currentColor}}><BsPersonBadge fontSize="18px" className="inline-flex my-auto mb-1 mx-1"/><span>Profile</span></button>;
    }
  }

];
  
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg border-white">
      <Header category="Page" title="Customers" />
      <div style={{ height: 380}} className="min-w-fit">
      <DataGrid
          
          sx={{
            className:'dark:text-gray-200 dark:bg-secondary-dark-bg ',
            boxShadow: 6,
            border: 0,
            borderColor: `${currentMode==='dark'}` ? '#475569' : 'white',
            '& .MuiDataGrid-cell:hover': {
              borderColor:'red-200'
            },'& .MuiDataGrid-cell:selected': {
              accentColor: 'darkcyan',
            },
            
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'desc' }],
            },
          }}
        columns={columns}
        rows={customers}
        checkboxSelection={true}
        rowsPerPageOptions={[5,10,20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        
      />
      </div>
      
    </div>
  );
};
export default CustomersCopy;