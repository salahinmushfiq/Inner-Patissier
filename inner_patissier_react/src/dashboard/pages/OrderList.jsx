// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   DataGrid,
//   GridActionsCellItem,
// } from '@mui/x-data-grid';
// import {
//   Chip,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem,
//   FormControl,
// } from '@mui/material';
// import { useStateContext } from '../contexts/ContextProvider';
// import { maxHeight, minWidth } from '@mui/system';
// import { Header } from '../components';

// const base_url = process.env.REACT_APP_API_URL ; 

// const statusColors = {
//   pending: 'warning',
//   confirmed: 'info',
//   shipped: 'primary',
//   delivered: 'success',
//   cancelled: 'error',
//   failed: 'secondary',
//   processing: 'primary',
// };

// const statusFlow = {
//   pending: ['confirmed', 'cancelled'],
//   confirmed: ['processing', 'cancelled'],
//   processing: ['shipped', 'failed'],
//   shipped: ['delivered'],
//   delivered: [],
//   cancelled: [],
//   failed: [],
// };
// const OrderList = () => {
//   const { currentColor, userRole, currentMode } = useStateContext();

//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();
//   const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
//   const [undoData, setUndoData] = useState(null);
//   const[pageSize,setPageSize]= useState(10);
//   const canUpdate = userRole >= 0;
//   const handleViewOrder =  (orderId) => {
//     navigate(`/dash/orders/order/${orderId}`);
//   };
//   const fetchOrders = async () => {
//     try {
//       // const url = userRole === 2 ? `${base_url}/order/admin/` : `${base_url}/order/`;
//       const url = `${base_url}/order/admin/`;
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       setOrders(res.data);
      
//     } catch (err) {
//       console.error(err);
//     }
//   };
   
//   const showToast = (message, severity = 'success') => {
//     setToast({ open: true, message, severity });
//   };
  
//   const handleMarkAsPaid = async (orderId) => {
//     try {
//       await axios.patch(`${base_url}/order/admin/${orderId}/update/`, {
//         is_paid: true,status: 'processing'
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });

//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? { ...o, is_paid: true } : o))
//       );
//       showToast(`Marked order #${orderId} as paid`);
//     } catch (err) {
//       console.error(err);
//       showToast('Failed to mark as paid', 'error');
//     }
//   };

//   const handleStatusUpdate = async (order, newStatus) => {
//     const allowed = statusFlow[order.status] || [];
//     const valid = allowed.includes(newStatus);
//     const isPaid = order.is_paid || order.payment_method.toLowerCase() === 'cod';
    
//     if (!valid) {
//       showToast(`Invalid status transition`, 'error');
//       return;
//     }
//     if (newStatus === 'delivered' && !isPaid) {
//       showToast(`Cannot mark as delivered unless paid.`, 'error');
//       return;
//     }

//     try {
//       await axios.patch(`${base_url}/order/admin/${order.id}/update/`, { status: newStatus }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });

//       setUndoData({ orderId: order.id, previousStatus: order.status });
//       setOrders((prev) =>
//         prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
//       );
//       showToast(`Order #${order.id} updated to '${newStatus}'`);
//     } catch (err) {
//       console.error(err);
//       showToast(`Failed to update`, 'error');
//     }
//   };

//   const handleUndo = async () => {
//     if (!undoData) return;
//     try {
//       await axios.patch(`${base_url}/order/admin/${undoData.orderId}/update/`, {
//         status: undoData.previousStatus,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });

//       setOrders((prev) =>
//         prev.map((o) => (o.id === undoData.orderId ? { ...o, status: undoData.previousStatus } : o))
//       );
//       showToast(`Reverted to '${undoData.previousStatus}'`);
//     } catch (err) {
//       showToast('Undo failed', 'error');
//     } finally {
//       setUndoData(null);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     console.log(orders);
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 90 , 
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       renderCell:(params) =>
//       <div className='drop-shadow-md pt-2 '>
//         <p className='px-2 inline-flex font-normal text-gray-800 dark:text-gray-100'>{params.row.id}</p>
//       </div> 
//     },
//     {
//       field: 'user',
//       minWidth: 150,
//       headerName: 'Customer',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       className:"drop-shadow-md text-gray-200 dark:text-gray:400",
//       flex: 1,
//       renderCell:(params) =>
//       <div className='drop-shadow-md pt-2 '>
//         <p className='px-2 inline-flex font-normal text-gray-800 dark:text-gray-100'>{params.row.user}</p>
//       </div> 
//     },
//     {
//       field: 'total',
//       headerName: 'Total ($)',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       className:"drop-shadow-md text-gray-200 dark:text-gray:400",
//       minWidth: 120,
//       type: 'number',
//       renderCell:(params) =>
//       <div className='drop-shadow-md pt-2 '>
//         <p className='px-2 inline-flex font-normal text-gray-800 dark:text-gray-200'>{params.row.total}</p>
//       </div> 
//     },
//     {
//       field: 'payment_method',
//       headerName: 'Payment',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       className:"drop-shadow-md text-gray-200 dark:text-gray:400",
//       minWidth: 160,
//       renderCell:(params) =>
//      <div className='drop-shadow-md pt-2 '>
    
//         <p className='px-2 inline-flex font-normal text-gray-800 dark:text-gray-200'>{params.row.payment_method}</p>
//       </div> 
//       // valueGetter: (params) =>
//       //   `${params.row.payment_method} `,
//     },
//     {
//       field: 'is_paid',
//       headerName: 'Paid',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       // width: 130,
//       minWidth:110,
//       className:"drop-shadow-md text-gray-200 dark:text-gray:400 rounded-sm",
//       sortable:true,
//       filterable:true,
//       renderCell: (params) => {
//         const paid = params.row.is_paid === true || params.row.is_paid === 1 || params.row.is_paid === "True";
//         console.log("params.row.is_paid: ", params.row.is_paid);
//         console.log("paid: ", paid);

//         return (
//           <Chip
//             label={paid ? 'Paid' : 'Due'}
//             color={paid ? 'success' : 'error'}
//             variant="outlined"
//             sx={{ fontWeight: 'bold' }}
//           />
//         );
//       }
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       className:"drop-shadow-md text-gray-200 dark:text-gray:400",
//       minWidth: 130,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={statusColors[params.value] || 'default'}
//           variant="outlined"
//           className='rounded-sm'
//         />
//       ),
//     },
//   ];
//   //   const rows = orders.map(order => ({
//   //   id: order.id,
//   //   user: order.user?.email || "NAN",
//   //   //  || `${order.firstName} ${order.lastName}|| ${order.user?.id}`,
//   //   status: order.status,
//   //   is_paid: order.is_paid,
//   //   payment_method: order.payment_method,
//   //   total: order.total,
//   //   created_at: new Date(order.created_at).toLocaleString(),
//   // }));
//   const rows = orders.map(order => {
//   console.log('ORDER:', order);  
//   return {
//     id: order.id,
//     user: order.user?.email || "Guest",
//     status: order.status,
//     is_paid: order.is_paid,
//     payment_method: order.payment_method,
//     total: order.total,
//     created_at: new Date(order.created_at).toLocaleString(),}
//   });

//   // if (canUpdate) {
//     // columns.push({
//     //   field: 'updateStatus',
//     //   headerName: 'Update Status',
//     //   className: "drop-shadow-md text-gray-200 dark:text-gray-400 m-2",
//     //   width: 200,
//     //   renderCell: (params) => {
//     //     const allowed = statusFlow[params.row.status] || [];
//     //     return (
//     //       <FormControl  size="small " className='m-2 py-1 px-2'>
//     //         <Select
//     //           value=""
//     //           displayEmpty
//     //           onChange={(e) => handleStatusUpdate(params.row, e.target.value)}
//     //           className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700 py-1 px-2 rounded'
//     //             style={{ color: currentColor, borderColor: currentColor }}
//     //           renderValue={() => 'Change...'}
//     //         >
//     //           {allowed.map((status) => (
//     //             <MenuItem key={status} value={status}>
//     //               {status}
//     //             </MenuItem>
//     //           ))}
//     //         </Select>
//     //       </FormControl>
//     //     );
//     //   },
//     // });
//   columns.push({
//   field: 'updateStatus',
//   flex: 1,
//   minWidth: 150,
//   className: 'drop-shadow-md text-gray-200 dark:text-gray-400',
//   // headerClassName: 'text-gray-400 dark:text-gray-200 font-semibold text-center',
//   headerName: 'Update Status',
//   // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//   renderCell: (params) => {
//     const allowed = statusFlow[params.row.status] || [];
//     const rowId = params.row.id;

//     return (
//       <select
//         value=""
//         onChange={(e) => handleStatusUpdate(params.row, e.target.value)}
//         className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700 py-1 px-2 rounded'
//         style={{ color: currentColor, borderColor: currentColor }}
//       >
//         <option value="" disabled hidden>Change...</option>
//         {allowed.map((status) => (
//           <option key={status} value={status}>
//             {status}
//           </option>
//         ))}
//       </select>
//     );
//     },
//   });

//   // }
//   columns.push({
    
//       field: 'details',
//       // headerClassName:'text-gray-400 dark:text-gray-200 font-semibold text-center',
//       headerName: 'Details',
//       width: 130,
//       sortable: false,
//       renderCell: (params) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleViewOrder(params.row.id)}
//             className='bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700  light:hover:bg-slate-600 py-1 px-2 rounded' 
//             style={{color:currentColor,borderColor:currentColor}}
//           >
//             Details
//           </button>
        
//         </div>
//       ),

    
//   });
//       const sx={
//       className:'dark:text-gray-200 dark:bg-secondary-dark-bg',
//       boxShadow: 4,
//       border: 0,
//       borderColor: 'lightgray',
//       // '& .MuiDataGrid-cell:hover': {
//       //   color: 'darkcyan',
//       // },'& .MuiDataGrid-cell:active': {
//       //   accentColor: 'darkcyan',
//       // },
//       borderColor: 'lightgray',
//       '& .MuiDataGrid-columnHeaders': {
//         // backgroundColor: currentColor + '20',
//         color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//       },
//       '& .MuiDataGrid-footerContainer': {
//         // backgroundColor: currentColor + '20',
//         color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//       },
//       '& .MuiTablePagination-root': {
//         color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//       },
//       '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//         color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//       },
//       '& .MuiSvgIcon-root': {
//         color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//       },
//   }
// //   columns.push(
// //     {
// //   field: 'markPaid',
// //   headerName: 'Mark Paid',
// //   width: 160,
// //   sortable: false,
// //   renderCell: (params) => {
// //     const unpaid = !params.row.is_paid;
// //     const notCOD = params.row.payment_method.toLowerCase() !== 'cod';

// //     if (unpaid && notCOD) {
// //       return (
// //         <button
// //           onClick={() => handleMarkAsPaid(params.row.id)}
// //           className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600'
// //         >
// //           Mark as Paid
// //         </button>
// //       );
// //     }
// //     return null;
// //   },
// // },
// //   );
//   return (
//     <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-200 dark:text-gray:400">
//       <Header category="Page" title="Orders"/>
//       <div style={{ height: 600, width: '100%', }} className='text-black dark:text-white '>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           rowsPerPageOptions={[10,15,20]}
//           pageSize={pageSize}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           getRowId={(row) => row.id}
//           sx={sx}
//         />
//       </div>

//       <Snackbar
//         open={toast.open}
//         autoHideDuration={4000}
//         onClose={() => setToast({ ...toast, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={() => setToast({ ...toast, open: false })}
//           severity={toast.severity}
//           variant="filled"
//           sx={{
//             backgroundColor:
//               toast.severity === 'success'
//                 ? currentColor
//                 : toast.severity === 'error'
//                 ? '#f44336'
//                 : undefined,
//             color: '#fff',
//           }}
//           action={
//             undoData && (
//               <button
//                 onClick={handleUndo}
//                 style={{ color: '#fff', fontWeight: 'bold', marginLeft: 8 }}
//               >
//                 UNDO
//               </button>
//             )
//           }
//         >
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default OrderList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
} from '@mui/x-data-grid';
import {
  Chip,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';

const base_url = process.env.REACT_APP_API_URL;

const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
  failed: 'secondary',
  processing: 'primary',
};

const statusFlow = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'failed'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
  failed: [],
};

const OrderList = () => {
  const { currentColor, userRole, currentMode } = useStateContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Track loading state
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [undoData, setUndoData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const canUpdate = userRole >= 0;

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = `${base_url}/order/admin/`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/dash/orders/order/${orderId}`);
  };

  const handleStatusUpdate = async (order, newStatus) => {
    const allowed = statusFlow[order.status] || [];
    const valid = allowed.includes(newStatus);
    const isPaid = order.is_paid || order.payment_method.toLowerCase() === 'cod';

    if (!valid) {
      showToast('Invalid status transition', 'error');
      return;
    }
    if (newStatus === 'delivered' && !isPaid) {
      showToast('Cannot mark as delivered unless paid.', 'error');
      return;
    }

    try {
      await axios.patch(`${base_url}/order/admin/${order.id}/update/`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      setUndoData({ orderId: order.id, previousStatus: order.status });
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
      showToast(`Order #${order.id} updated to '${newStatus}'`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update', 'error');
    }
  };

  const handleUndo = async () => {
    if (!undoData) return;
    try {
      await axios.patch(`${base_url}/order/admin/${undoData.orderId}/update/`, {
        status: undoData.previousStatus,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === undoData.orderId ? { ...o, status: undoData.previousStatus } : o))
      );
      showToast(`Reverted to '${undoData.previousStatus}'`);
    } catch (err) {
      showToast('Undo failed', 'error');
    } finally {
      setUndoData(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Define columns
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      renderCell: (params) =>
        <p className="px-2 inline-flex font-normal text-gray-800 dark:text-gray-100">{params.row.id}</p>
    },
    {
      field: 'user',
      headerName: 'Customer',
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        <p className="px-2 inline-flex font-normal text-gray-800 dark:text-gray-100">{params.row.user}</p>
    },
    {
      field: 'total',
      headerName: 'Total ($)',
      minWidth: 120,
      type: 'number',
      renderCell: (params) =>
        <p className="px-2 inline-flex font-normal text-gray-800 dark:text-gray-200">{params.row.total}</p>
    },
    {
      field: 'payment_method',
      headerName: 'Payment',
      minWidth: 160,
      renderCell: (params) =>
        <p className="px-2 inline-flex font-normal text-gray-800 dark:text-gray-200">{params.row.payment_method}</p>
    },
    {
      field: 'is_paid',
      headerName: 'Paid',
      minWidth: 110,
      renderCell: (params) => {
        const paid = params.row.is_paid === true || params.row.is_paid === 1 || params.row.is_paid === 'True';
        return (
          <Chip
            label={paid ? 'Paid' : 'Due'}
            color={paid ? 'success' : 'error'}
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || 'default'}
          variant="outlined"
          className="rounded-sm"
        />
      ),
    },
    {
      field: 'updateStatus',
      headerName: 'Update Status',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const allowed = statusFlow[params.row.status] || [];
        return (
          <select
            value=""
            onChange={(e) => handleStatusUpdate(params.row, e.target.value)}
            className="bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700 py-1 px-2 rounded"
            style={{ color: currentColor, borderColor: currentColor }}
          >
            <option value="" disabled hidden>Change...</option>
            {allowed.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleViewOrder(params.row.id)}
          className="bg-transparent border shadow-sm hover:shadow-xl dark:hover:bg-slate-700 py-1 px-2 rounded"
          style={{ color: currentColor, borderColor: currentColor }}
        >
          Details
        </button>
      ),
    },
  ];

  const rows = orders.map(order => ({
    id: order.id,
    user: order.user?.email || 'Guest',
    status: order.status,
    is_paid: order.is_paid,
    payment_method: order.payment_method,
    total: order.total,
    created_at: new Date(order.created_at).toLocaleString(),
  }));

  // 🔹 Skeleton Rows (when loading)
  const skeletonRows = Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    user: <Skeleton width={100} height={20} />,
    total: <Skeleton width={50} height={20} />,
    payment_method: <Skeleton width={80} height={20} />,
    is_paid: <Skeleton width={40} height={20} />,
    status: <Skeleton width={60} height={20} />,
    updateStatus: <Skeleton width={100} height={20} />,
    details: <Skeleton width={70} height={20} />,
  }));
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
  return (
    <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-200 dark:text-gray:400">
      <Header category="Page" title="Orders" />
      <div style={{ height: 600, width: '100%' }} className="text-black dark:text-white">
        <DataGrid
          rows={loading ? skeletonRows : rows}
          columns={columns}
          rowsPerPageOptions={[10, 15, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          sx={sx}
        />
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant="filled"
          sx={{
            backgroundColor:
              toast.severity === 'success'
                ? currentColor
                : toast.severity === 'error'
                  ? '#f44336'
                  : undefined,
            color: '#fff',
          }}
          action={
            undoData && (
              <button
                onClick={handleUndo}
                style={{ color: '#fff', fontWeight: 'bold', marginLeft: 8 }}
              >
                UNDO
              </button>
            )
          }
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderList;
