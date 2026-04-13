import React,{ useState ,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {BsPersonBadge} from 'react-icons/bs';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Header,BasicMap } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useMapContext } from '../contexts/MapContextProvider';
const EmployeesAPITestWithAuth = () => {
    const navigate = useNavigate();
    const {currentColor,currentToken,setToken,currentUser,setCurrentUser,currentMode}=useStateContext();
    const {employees,setEmployees,selectedEmployee,setSelectedEmployee}=useMapContext();
    const[pageSize,setPageSize]= useState(5);
    const [userRoles, setUserRoles] = useState({}); // Map roles to employee IDs
    const base_url = process.env.REACT_APP_API_URL ; 
    
    let storedToken = localStorage.getItem('access_token');
    useEffect(() => {
      storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []); 
    console.log("Check user");
    if(currentUser==undefined) {
      console.log("user not found");
    }
    console.log(currentUser?.id);
    console.log(currentUser?.role);
    
    useEffect(() => {
      axios.get(`${base_url}/user/view/`, {
        headers: {
        Authorization: `Bearer ${currentToken}`,
        },
      })
          .then((response) => {
              console.log("response");
              console.log(response.data.users);
              setEmployees(response.data.users);
              const roles = {};
              response.data.users.forEach(user => {
                  roles[user.id] = user.role;
              });
              setUserRoles(roles);
          }).catch((error) => {
            console.error("Error fetching users:", error);
            // Optionally set an error state to display to the user
        });
  }, []);
    
  const handleRoleChange = (id, newRole) => {
    setUserRoles(prevRoles => ({
        ...prevRoles,
        [id]: newRole
    }));

    // Update role on the server
    axios.patch(`${base_url}/user/users/${id}/role/`, { role: newRole }, {
        headers: {
            Authorization: `Bearer ${currentToken}`,
        },
    }).then((response) => {
        console.log('Role updated:', response.data);

    }).catch((error) => {
        console.error("There was an error updating the role!", error);
    });
};
    const sx = {
    className: 'dark:text-gray-200 dark:bg-secondary-dark-bg',
    boxShadow: 4,
    border: 0,
    borderColor: 'lightgray',
    '& .MuiDataGrid-cell': {
      color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
    },
    '& .MuiDataGrid-columnHeaders': {
      color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
    },
    '& .MuiDataGrid-footerContainer': {
      color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
    },
    '& .MuiTablePagination-root': {
      color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
    },
    '& .MuiSvgIcon-root': {
      color: currentMode === 'Light' ? '#434c5f' : '#e5e7eb',
    },
  };
      const initialState={
        sorting: {
          sortModel: [{ field: 'name', sort: 'desc' }],
        },
      }

  let columns=[
    { field: 'id',cellClassName: 'super-app-theme--cell' ,headerName: "ID",flex:1,align: 'center', hide: true, headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',},
   { field: 'image' ,headerName: "Avatar",flex:1,minWidth:110,className:"mx-2 my-2 drop-shadow-md text-gray-200 dark:text-gray:400 object-contain	 ",sortable:false,nullable: true, filterable:false,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
    renderCell:(params) =>
    <div className='drop-shadow-md lg:p-6 m-2 md:p-4 sm:p-2'>
      <img src={params.value} className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200' alt={params.value} />
    </div> 
    },  
  { field: 'firstName' ,headerName: "Employee",flex:1,minWidth:110,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'email' ,headerName: "Email",flex:1,minWidth:220,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params.value}</p>
  </div> 
  }, 
  { field: 'phone' ,headerName: "Phone",flex:1,minWidth:180,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true,nullable: true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 '>
    
    <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params?.value|| 'N/A'}</p>
  </div> 
  }, 

  { field: 'company' ,headerName: "Department",flex:1,minWidth:90,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true,nullable: true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2'>
     <p className='px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>{params?.value?.department || "N/A"}</p>
  </div> 
  }, 

  { field: 'address' ,headerName: "City",flex:1,minWidth:150,className:"drop-shadow-md text-gray-200 dark:text-gray:400",sortable:true,nullable: true, filterable:true,headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
  renderCell:(params) =>
  <div className='drop-shadow-md pt-2 px-2 inline-flex font-semibold text-gray-800 dark:text-gray-200'>
    <HiOutlineLocationMarker fontSize="18px" color={currentColor} className="inline-flex my-auto mr-1"/><span color={currentColor}>{params?.value?.city|| 'N/A'}</span>
    
  </div> 
  }, 
 
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
            let currentUser=employees.filter(function(user){
              return  user.address && user.address.coordinates && user.address.coordinates.lat && user.address.coordinates.lat===current_row_address_column.coordinates.lat 
            })[0];
            console.log("print filter: ",currentUser);
            setSelectedEmployee(currentUser);
            console.log("selectedUser");
            console.log(selectedEmployee);
           
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
          let current_row_email_column=params.row.email;
          if(currentRow){
            // setSelectedUser(params.row.firstName);

            let currentEmployee=employees.filter(function(user){
              return user.address ? user.address.coordinates.lat===current_row_address_column.coordinates.lat : user.email===current_row_email_column
            })[0];
           
            console.log("print filter: ",currentEmployee);
            setSelectedEmployee(currentEmployee);
            console.log("selectedUser");
            console.log(selectedEmployee);
           
            
            navigate(`EmployeeAPITestWithAuth/${currentRow.id}`);
          }else{
            console.log("Empty Row");
          }

      };

      return <button onClick={onProfileClick} className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700  light:hover:bg-slate-600 py-1 px-2 rounded' style={{color:currentColor,borderColor:currentColor}}><BsPersonBadge fontSize="18px" className="inline-flex my-auto mb-1 mx-1"/><span>Profile</span></button>;
    }
  },
  {
    field: "role",
    flex: 1,
    minWidth: 120,
    className: "drop-shadow-md text-gray-200 dark:text-gray-400",
    headerClassName: 'text-gray-400 dark:text-gray-200 font-semibold text-center',
    headerName: "Role",
    renderCell: (params) => {
        const employeeId = params.row.id;
        const currentRole = userRoles[employeeId] || 0; // Default to 0 if undefined

        return (
            <select
                value={currentRole}
                onChange={(e) => handleRoleChange(employeeId, e.target.value)}
                className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700 py-1 px-2 rounded'
                style={{ color: currentColor, borderColor: currentColor }}
            >
                <option value="0">Guest</option>
                <option value="1">Customer</option>
                <option value="2">Moderator</option>
                <option value="3">Admin</option>
            </select>
        );
    }
}
];

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl text-black dark:text-gray-200 dark:bg-secondary-dark-bg border-white">
      <Header category="Page" title="Employees"/>
      {selectedEmployee && <BasicMap/>}
      <div style={{ height: 380}} className="mt-8 min-w-fit px-4" >
            {employees.length > 0 ? 
            <DataGrid
                
                sx={sx}
                initialState={initialState}
                columns={columns}
                rows={employees}
                rowsPerPageOptions={[5,10,20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          /> : 
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
  )
}

export default EmployeesAPITestWithAuth