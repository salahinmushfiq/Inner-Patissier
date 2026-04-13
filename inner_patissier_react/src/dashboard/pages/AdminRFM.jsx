// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Header, RFMClusterChart } from '../components';
// import { useStateContext } from '../contexts/ContextProvider';
// import Map, { Marker, Popup, NavigationControl,Source, Layer  } from 'react-map-gl';
// import { Tab, Tabs } from '@mui/material';
// import RoomIcon from '@mui/icons-material/Room';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const base_url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
// const categoryOptions = [
//   "Champions",
//   "Loyal Customers",
//   "Potential Loyalist",
//   "New Customers",
//   "At Risk",
//   "Hibernating",
//   "Lost",
// ];

// const AdminRFM = () => {
//   const [rfmData, setRfmData] = useState([]);
//   const [result, setResult] = useState(null);
//   const [minScore, setMinScore] = useState('');
//   const [maxScore, setMaxScore] = useState('');
//   const [segment, setSegment] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [hotZones, setHotZones] = useState([]);
//   const [tab, setTab] = useState(0);
//   const { currentColor, userRole, currentMode } = useStateContext();
//   const [hoveredZone, setHoveredZone] = useState(null);
//   const [useHeatmap, setUseHeatmap] = useState(true);


//   const fetchRFM = async () => {
//     try {
//       const url = `${base_url}/coupon/rfm/category-analysis/`;
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       setRfmData(res.data);
//     } catch (err) {
//       console.error('Failed to fetch categorized RFM data:', err);
//     }
//   };

//   const fetchHotZones = async () => {
//     try {
//       const url = `${base_url}/coupon/rfm/hotzones/`;
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       const data = res.data.map(zone => ({
//         ...zone,
//         category_breakdown: zone.category_breakdown || {},
//       }));
//       console.log("setHotZones");
//       console.log(data);
//       setHotZones(data);
//       console.log(data);
//       console.log(hotZones);
//     } catch (err) {
//       console.error('Failed to fetch hot zones:', err);
//     }
//   };

//   const assignCouponToUser = async (userId, rfmScore) => {
//     try {
//       const url = `${base_url}/coupon/assign-to-user/`;
//       const payload = { user_id: userId, rfm_score: rfmScore };

//       const res = await axios.post(url, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });

//       alert(`Coupon assigned to user ${userId}: ${res.data.coupon_code}`);
//     } catch (err) {
//       console.error('Failed to assign coupon to user:', err);
//       alert(`Failed to assign coupon to user ${userId}`);
//     }
//   };

//   const assignTopRFMUsers = async () => {
//     try {
//       const url = `${base_url}/coupon/rfm/generate-coupons/`;
//       const res = await axios.post(url, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error('Failed to assign coupons to top RFM users:', err);
//     }
//   };

//   const assignByCategory = async () => {
//     try {
//       const url = `${base_url}/coupon/rfm/assign-by-category/`;
//       const res = await axios.post(url, {
//         categories: selectedCategories
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error('Failed to assign category-based coupons:', err);
//     }
//   };

//   useEffect(() => {
//     fetchRFM();
//     fetchHotZones();
//   }, []);

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

//   const columns = [
//     { field: 'user_id', headerName: 'User ID', width: 100 },
//     { field: 'recency', headerName: 'Recency', width: 100, type: 'number' },
//     { field: 'frequency', headerName: 'Frequency', width: 110, type: 'number' },
//     {
//       field: 'monetary',
//       headerName: 'Monetary',
//       width: 120,
//       type: 'number',
//       valueFormatter: (params) => Number(params.value).toFixed(2),
//     },
//     { field: 'rfm_score', headerName: 'RFM Score', width: 110, type: 'number' },
//     { field: 'segment', headerName: 'Segment', width: 110 },
//     { field: 'category', headerName: 'Customer Category', width: 160 },
//     { field: 'city', headerName: 'City', width: 120 },
//     { field: 'state', headerName: 'State', width: 120 },
//     { field: 'postalCode', headerName: 'Postal Code', width: 120 },
//     {
//       field: 'assignCoupon',
//       headerName: 'Assign Coupon',
//       width: 150,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => {
//         const hasCoupons = (params.row.coupon_codes?.length || 0) > 0;
//         return (
//           <button
//             disabled={hasCoupons}
//             className={`px-3 py-1 rounded ${hasCoupons ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
//             onClick={() => assignCouponToUser(params.row.user_id, params.row.rfm_score)}
//           >
//             {hasCoupons ? 'Coupon Assigned' : 'Assign Coupon'}
//           </button>
//         );
//       },
//     },
//     {
//       field: 'coupon_codes',
//       headerName: 'Coupons Assigned',
//       width: 200,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => {
//         const codes = params.value || [];
//         return codes.length ? codes.join(', ') : 'None';
//       }
//     }
//   ];

//   const rows = rfmData.map((item) => ({ id: item.user_id, ...item }));

//   return (
//     <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-200 dark:text-gray-400">
//       {/* <h2 className="text-2xl font-bold mb-4">📊 RFM Analysis & Coupon Assignment</h2> */}
//       <Header category="Page" title="RFM Analysis & Coupon Assignment"/>
//       {/* Filter Controls */}
//       <div className="mb-4 flex flex-wrap gap-3">
//         <input
//           type="number"
//           placeholder="Min RFM Score"
//           value={minScore}
//           onChange={(e) => setMinScore(e.target.value)}
//           className="p-2 border rounded w-36"
//         />
//         <input
//           type="number"
//           placeholder="Max RFM Score"
//           value={maxScore}
//           onChange={(e) => setMaxScore(e.target.value)}
//           className="p-2 border rounded w-36"
//         />
//         <input
//           type="text"
//           placeholder="Segment (e.g. 555)"
//           value={segment}
//           onChange={(e) => setSegment(e.target.value)}
//           className="p-2 border rounded w-36"
//         />
//         <button
//           onClick={fetchRFM}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Apply Filters
//         </button>
//       </div>

//       {/* Category Selector */}
//       <div className="mb-4">
//         <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
//           Select Categories:
//         </label>
//         <div className="flex flex-wrap gap-3">
//           {categoryOptions.map((cat) => (
//             <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200 ">
//               <input
//                 type="checkbox"
//                 value={cat}
//                 checked={selectedCategories.includes(cat)}
//                 onChange={(e) => {
//                   if (e.target.checked) {
//                     setSelectedCategories([...selectedCategories, cat]);
//                   } else {
//                     setSelectedCategories(selectedCategories.filter((c) => c !== cat));
//                   }
//                 }}
//               />
//               <span>{cat}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Assign Buttons */}
//       <div className="mb-4 flex flex-wrap gap-4">
//         <button
//           onClick={assignTopRFMUsers}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           🎁 Assign Coupons to Top RFM Users
//         </button>

//         <button
//           onClick={assignByCategory}
//           className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//         >
//           🎯 Assign Category-Based Coupons
//         </button>
//       </div>

//       {/* Result Display */}
//       {result && (
//         <div className="mb-4 p-3 bg-gray-100 rounded dark:bg-gray-700">
//           <strong>✅ Coupons Assigned:</strong>
//           {Array.isArray(result.assigned_coupons) && result.assigned_coupons.length > 0 ? (
//             <ul className="list-disc list-inside">
//               {result.assigned_coupons.map(([email, code]) => (
//                 <li key={code}>
//                   {email} → <code>{code}</code>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No coupons assigned.</p>
//           )}
//         </div>
//       )}

//       {/* Tabs */}
//       <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} className="mb-6 text-gray-700 dark:text-gray-200 font-medium text-lg">
//         <Tab label="📈 Chart View" fontSize="18px" className='text-gray-700 dark:text-gray-200 font-medium text-lg'/>
//         <Tab label="🗺️ Map View"  fontSize="18px" className='text-gray-700 dark:text-gray-200 font-medium text-lg'/>
//       </Tabs>

//       {/* Tab Content */}
//       {tab === 0 && <RFMClusterChart />}

     
//      {tab === 1 && (
//   <div className="w-full mb-6">
//     <div className="flex items-center mb-2 gap-4">
//       <label className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-200">
//         <input
//           type="checkbox"
//           checked={useHeatmap}
//           onChange={(e) => setUseHeatmap(e.target.checked)}
//         />
//         <span>Heatmap View</span>
//       </label>

//       <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
//         <div className="w-4 h-4 bg-blue-500 mr-1 rounded-sm" /> Low
//         <div className="w-4 h-4 bg-yellow-400 mx-1 rounded-sm" /> Medium
//         <div className="w-4 h-4 bg-red-500 mx-1 rounded-sm" /> High
//       </div>
//     </div>

//     <div className="h-[70vh] w-full">
//       <Map
//         mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
//         initialViewState={{ longitude: 90.4, latitude: 23.8, zoom: 5 }}
//         mapStyle={`mapbox://styles/mapbox/${currentMode === 'Dark' ? 'dark-v10' : 'light-v10'}`}
//         style={{ width: '100%', height: '100%', borderRadius: '8px' }}
//       >
//         <NavigationControl position="top-left" />

//         {useHeatmap ? (
//           <Source
//             key="heatmap-data"
//             id="hotzones"
//             type="geojson"
//             data={{
//               type: "FeatureCollection",
//               features: hotZones.map((zone) => ({
//                 type: "Feature",
//                 properties: {
//                   weight: zone.total,
//                 },
//                 geometry: {
//                   type: "Point",
//                   coordinates: [zone.lng, zone.lat],
//                 },
//               })),
//             }}
//           >
//             <Layer
//               id="heatmap-layer"
//               type="heatmap"
//               paint={{
//                 'heatmap-color': [
//                   'interpolate',
//                   ['linear'],
//                   ['heatmap-density'],
//                   0, 'rgba(0, 0, 255, 0)',
//                   0.1, 'royalblue',
//                   0.3, 'cyan',
//                   0.5, 'lime',
//                   0.7, 'yellow',
//                   1, 'red',
//                 ],
//                 'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
//                 'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
//                 'heatmap-opacity': 0.85,
//               }}
//             />
//           </Source>
//         ) : (
//           hotZones.map((zone, index) => (
//             <Marker
//               key={`marker-${index}`}
//               latitude={zone.lat}
//               longitude={zone.lng}
//               anchor="bottom"
//               onClick={() => setHoveredZone(index)}
//             >
//               <RoomIcon
//                 onMouseEnter={() => setHoveredZone(index)}
//                 style={{
//                   fontSize: `${Math.min(40, 20 + zone.total * 3)}px`,
//                   color: zone.total >= 5 ? '#ef4444' : zone.total >= 3 ? '#f59e0b' : '#10b981',
//                   cursor: 'pointer',
//                 }}
//               />
//               {hoveredZone === index && (
//                 <Popup
//                   latitude={zone.lat}
//                   longitude={zone.lng}
//                   closeButton={true}
//                   onClose={() => setHoveredZone(null)}
//                   closeOnClick={false}
//                   anchor="top"
//                   offset={15}
//                 >
//                   <div className="text-sm text-gray-700 dark:text-gray-300">
//                     <strong>Total Customers:</strong> {zone.total}<br />
//                     {zone.category_breakdown &&
//                       Object.entries(zone.category_breakdown).map(([cat, count]) => (
//                         <div key={cat}>{cat}: {count}</div>
//                       ))}
//                   </div>
//                 </Popup>
//               )}
//             </Marker>
//           ))
//         )}
//       </Map>
//     </div>
//   </div>
// )}

//       {/* DataGrid */}
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           disableSelectionOnClick
//           sx={sx}
//           localeText={{
//             noRowsLabel: 'No data found or data format invalid',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminRFM;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Skeleton, Tab, Tabs } from '@mui/material';
import { Header, RFMClusterChart } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Map, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import 'mapbox-gl/dist/mapbox-gl.css';

const base_url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
const categoryOptions = [
  "Champions",
  "Loyal Customers",
  "Potential Loyalist",
  "New Customers",
  "At Risk",
  "Hibernating",
  "Lost",
];

const AdminRFM = () => {
  const [rfmData, setRfmData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [segment, setSegment] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hotZones, setHotZones] = useState([]);
  const [tab, setTab] = useState(0);
  const { currentColor, userRole, currentMode } = useStateContext();
  const [hoveredZone, setHoveredZone] = useState(null);
  const [useHeatmap, setUseHeatmap] = useState(true);

  const fetchRFM = async () => {
    setLoading(true);
    try {
      const url = `${base_url}/coupon/rfm/category-analysis/`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setRfmData(res.data);
    } catch (err) {
      console.error('Failed to fetch categorized RFM data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotZones = async () => {
    try {
      const url = `${base_url}/coupon/rfm/hotzones/`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      const data = res.data.map(zone => ({
        ...zone,
        category_breakdown: zone.category_breakdown || {},
      }));
      setHotZones(data);
    } catch (err) {
      console.error('Failed to fetch hot zones:', err);
    }
  };

  const assignCouponToUser = async (userId, rfmScore) => {
    try {
      const url = `${base_url}/coupon/assign-to-user/`;
      const payload = { user_id: userId, rfm_score: rfmScore };

      const res = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });

      alert(`Coupon assigned to user ${userId}: ${res.data.coupon_code}`);
    } catch (err) {
      console.error('Failed to assign coupon to user:', err);
      alert(`Failed to assign coupon to user ${userId}`);
    }
  };

  const assignTopRFMUsers = async () => {
    try {
      const url = `${base_url}/coupon/rfm/generate-coupons/`;
      const res = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setResult(res.data);
    } catch (err) {
      console.error('Failed to assign coupons to top RFM users:', err);
    }
  };

  const assignByCategory = async () => {
    try {
      const url = `${base_url}/coupon/rfm/assign-by-category/`;
      const res = await axios.post(url, {
        categories: selectedCategories
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setResult(res.data);
    } catch (err) {
      console.error('Failed to assign category-based coupons:', err);
    }
  };

  useEffect(() => {
    fetchRFM();
    fetchHotZones();
  }, []);

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
    '& .MuiSvgIcon-root': {
      color: currentMode === 'Light' ? '#434c5f' : '#e5e7eb',
    },
  };

  // Columns with skeletons in renderCell
  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 100, renderCell: (params) => loading ? <Skeleton width={40} /> : params.value },
    { field: 'recency', headerName: 'Recency', width: 100, renderCell: (params) => loading ? <Skeleton width={40} /> : params.value },
    { field: 'frequency', headerName: 'Frequency', width: 110, renderCell: (params) => loading ? <Skeleton width={50} /> : params.value },
    {
      field: 'monetary',
      headerName: 'Monetary',
      width: 120,
      renderCell: (params) =>
        loading ? <Skeleton width={60} /> : Number(params.value).toFixed(2),
    },
    { field: 'rfm_score', headerName: 'RFM Score', width: 110, renderCell: (params) => loading ? <Skeleton width={40} /> : params.value },
    { field: 'segment', headerName: 'Segment', width: 110, renderCell: (params) => loading ? <Skeleton width={80} /> : params.value },
    { field: 'category', headerName: 'Customer Category', width: 160, renderCell: (params) => loading ? <Skeleton width={100} /> : params.value },
    { field: 'city', headerName: 'City', width: 120, renderCell: (params) => loading ? <Skeleton width={60} /> : params.value },
    { field: 'state', headerName: 'State', width: 120, renderCell: (params) => loading ? <Skeleton width={60} /> : params.value },
    { field: 'postalCode', headerName: 'Postal Code', width: 120, renderCell: (params) => loading ? <Skeleton width={80} /> : params.value },
    {
      field: 'assignCoupon',
      headerName: 'Assign Coupon',
      width: 150,
      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rectangular" width={100} height={30} />
        ) : (
          (() => {
            const hasCoupons = (params.row.coupon_codes?.length || 0) > 0;
            return (
              <button
                disabled={hasCoupons}
                className={`px-3 py-1 rounded ${hasCoupons ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                onClick={() => assignCouponToUser(params.row.user_id, params.row.rfm_score)}
              >
                {hasCoupons ? 'Coupon Assigned' : 'Assign Coupon'}
              </button>
            );
          })()
        ),
    },
    {
      field: 'coupon_codes',
      headerName: 'Coupons Assigned',
      width: 200,
      renderCell: (params) =>
        loading ? (
          <Skeleton width={120} />
        ) : (
          (params.value?.length ? params.value.join(', ') : 'None')
        ),
    },
  ];

  const skeletonRows = Array.from({ length: 8 }).map((_, i) => ({ id: i + 1 }));
  const rows = rfmData.map((item) => ({ id: item.user_id, ...item }));

  return (
    <div className="m-4 md:m-10 mt-24 p-4 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-xl text-gray-200 dark:text-gray-400">
      <Header category="Page" title="RFM Analysis & Coupon Assignment" />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input type="number" placeholder="Min RFM Score" value={minScore} onChange={(e) => setMinScore(e.target.value)} className="p-2 border rounded w-36" />
        <input type="number" placeholder="Max RFM Score" value={maxScore} onChange={(e) => setMaxScore(e.target.value)} className="p-2 border rounded w-36" />
        <input type="text" placeholder="Segment (e.g. 555)" value={segment} onChange={(e) => setSegment(e.target.value)} className="p-2 border rounded w-36" />
        <button onClick={fetchRFM} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Apply Filters
        </button>
      </div>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Select Categories:</label>
        <div className="flex flex-wrap gap-3">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedCategories([...selectedCategories, cat])
                    : setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                }
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Assign Buttons */}
      <div className="mb-4 flex flex-wrap gap-4">
        <button onClick={assignTopRFMUsers} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          🎁 Assign Coupons to Top RFM Users
        </button>
        <button onClick={assignByCategory} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          🎯 Assign Category-Based Coupons
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} className="mb-6 text-gray-700 dark:text-gray-200 font-medium text-lg">
        <Tab label="📈 Chart View" />
        <Tab label="🗺️ Map View" />
      </Tabs>

      {tab === 0 && <RFMClusterChart />}
      {tab === 1 && (
        <div className="h-[70vh] w-full mb-6">
          <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            initialViewState={{ longitude: 90.4, latitude: 23.8, zoom: 5 }}
            mapStyle={`mapbox://styles/mapbox/${currentMode === 'Dark' ? 'dark-v10' : 'light-v10'}`}
            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
          >
            <NavigationControl position="top-left" />
            {useHeatmap ? (
              <Source
                id="hotzones"
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: hotZones.map((z) => ({
                    type: "Feature",
                    properties: { weight: z.total },
                    geometry: { type: "Point", coordinates: [z.lng, z.lat] },
                  })),
                }}
              >
                <Layer
                  id="heatmap-layer"
                  type="heatmap"
                  paint={{
                    'heatmap-color': [
                      'interpolate',
                      ['linear'],
                      ['heatmap-density'],
                      0, 'rgba(0, 0, 255, 0)',
                      0.1, 'royalblue',
                      0.3, 'cyan',
                      0.5, 'lime',
                      0.7, 'yellow',
                      1, 'red',
                    ],
                    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
                    'heatmap-opacity': 0.85,
                  }}
                />
              </Source>
            ) : (
              hotZones.map((zone, i) => (
                <Marker key={i} latitude={zone.lat} longitude={zone.lng} anchor="bottom">
                  <RoomIcon
                    style={{
                      fontSize: `${Math.min(40, 20 + zone.total * 3)}px`,
                      color: zone.total >= 5 ? '#ef4444' : zone.total >= 3 ? '#f59e0b' : '#10b981',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredZone(i)}
                  />
                  {hoveredZone === i && (
                    <Popup latitude={zone.lat} longitude={zone.lng} closeButton closeOnClick={false} anchor="top" offset={15}>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Total Customers:</strong> {zone.total}<br />
                        {Object.entries(zone.category_breakdown || {}).map(([cat, count]) => (
                          <div key={cat}>{cat}: {count}</div>
                        ))}
                      </div>
                    </Popup>
                  )}
                </Marker>
              ))
            )}
          </Map>
        </div>
      )}

      {/* DataGrid */}
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={loading ? skeletonRows : rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={sx}
          loading={false}
          localeText={{
            noRowsLabel: loading ? '' : 'No data found',
          }}
        />
      </div>
    </div>
  );
};

export default AdminRFM;
