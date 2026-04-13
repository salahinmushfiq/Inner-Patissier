// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { useStateContext } from '../contexts/ContextProvider';

// const base_url = process.env.REACT_APP_API_URL;

// const AdminCouponsPage = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { currentMode } = useStateContext();

//   // Fetch coupons list
//   const fetchCoupons = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${base_url}/coupon/`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       // Expecting res.data to be an array of coupons
//       setCoupons(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       console.error('Failed to fetch coupons:', error);
//       setCoupons([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   // Define DataGrid styles
//   const sx = {
//     className: 'dark:text-gray-200 dark:bg-secondary-dark-bg',
//     boxShadow: 4,
//     border: 0,
//     borderColor: 'lightgray',
//     '& .MuiDataGrid-cell': {
//       color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//     },
//     '& .MuiDataGrid-columnHeaders': {
//       color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//     },
//     '& .MuiDataGrid-footerContainer': {
//       color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//     },
//     '& .MuiTablePagination-root': {
//       color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//     },
//     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//       color: currentMode === 'Light' ? '#4c4f55' : '#e5e7eb',
//     },
//     '& .MuiSvgIcon-root': {
//       color: currentMode === 'Light' ? '#434c5f' : '#e5e7eb',
//     },
//   };

//   // Columns to show coupon details
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'code', headerName: 'Code', width: 150 },
//     { field: 'discount_type', headerName: 'Discount Type', width: 130 },
//     {
//       field: 'discount_value',
//       headerName: 'Discount Value',
//       width: 130,
//       type: 'number',
//       valueFormatter: (params) => Number(params.value).toFixed(2),
//     },
//     {
//       field: 'active',
//       headerName: 'Active',
//       width: 100,
//       type: 'boolean',
//     },
//     {
//       field: 'usage_limit',
//       headerName: 'Usage Limit',
//       width: 130,
//       type: 'number',
//       valueFormatter: (params) => (params.value === null ? 'Unlimited' : params.value),
//     },
//     {
//       field: 'used_count',
//       headerName: 'Used Count',
//       width: 110,
//       type: 'number',
//     },
//     {
//       field: 'expires_at',
//       headerName: 'Expires At',
//       width: 180,
//       valueFormatter: (params) =>
//         params.value ? new Date(params.value).toLocaleDateString() : 'Never',
//     },
//   ];

//   // Prepare rows: DataGrid needs 'id' field, coupons should already have 'id'
//   const rows = coupons.map((coupon) => ({
//     ...coupon,
//     id: coupon.id,
//   }));

//   return (
//     <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-800 dark:text-gray-200">
//       <h2 className="text-2xl font-bold mb-4">🎟️ Coupon List</h2>

//       <div style={{ height: 500, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           loading={loading}
//           disableSelectionOnClick
//           sx={sx}
//           localeText={{
//             noRowsLabel: 'No coupons found',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminCouponsPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';

const base_url = process.env.REACT_APP_API_URL;

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentMode } = useStateContext();

  // Fetch coupons list
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/coupon/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // DataGrid styling
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
    '& .MuiSvgIcon-root': {
      color: currentMode === 'Light' ? '#434c5f' : '#e5e7eb',
    },
  };

  // Columns with skeletons when loading
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      renderCell: (params) =>
        loading ? <Skeleton width={40} /> : params.value,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      renderCell: (params) =>
        loading ? <Skeleton width={100} /> : params.value,
    },
    {
      field: 'discount_type',
      headerName: 'Discount Type',
      width: 130,
      renderCell: (params) =>
        loading ? <Skeleton width={90} /> : params.value,
    },
    {
      field: 'discount_value',
      headerName: 'Discount Value',
      width: 130,
      type: 'number',
      renderCell: (params) =>
        loading ? (
          <Skeleton width={60} />
        ) : (
          Number(params.value).toFixed(2)
        ),
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      type: 'boolean',
      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rectangular" width={40} height={24} />
        ) : params.value ? (
          '✅'
        ) : (
          '❌'
        ),
    },
    {
      field: 'usage_limit',
      headerName: 'Usage Limit',
      width: 130,
      renderCell: (params) =>
        loading ? (
          <Skeleton width={70} />
        ) : params.value === null ? (
          'Unlimited'
        ) : (
          params.value
        ),
    },
    {
      field: 'used_count',
      headerName: 'Used Count',
      width: 110,
      renderCell: (params) =>
        loading ? <Skeleton width={40} /> : params.value,
    },
    {
      field: 'expires_at',
      headerName: 'Expires At',
      width: 180,
      renderCell: (params) =>
        loading ? (
          <Skeleton width={120} />
        ) : params.value ? (
          new Date(params.value).toLocaleDateString()
        ) : (
          'Never'
        ),
    },
  ];

  // Prepare skeleton rows when loading
  const skeletonRows = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
  }));

  // Actual rows
  const rows = coupons.map((coupon) => ({
    ...coupon,
    id: coupon.id,
  }));

  return (
    <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-4">🎟️ Coupon List</h2>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={loading ? skeletonRows : rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={sx}
          loading={false} // disable built-in spinner
          localeText={{
            noRowsLabel: loading ? '' : 'No coupons found',
          }}
        />
      </div>
    </div>
  );
};

export default AdminCouponsPage;
