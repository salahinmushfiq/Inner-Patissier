import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";


const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { user_id, frequency, monetary, recency, segment } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-md border dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">User ID: {user_id}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300">Frequency: {frequency}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300">Monetary: ${monetary.toFixed(2)}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300">Recency: {recency} days ago</p>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Segment: {segment}</p>
      </div>
    );
  }
  return null;
};
const RFMClusterChart = () => {
  const [data, setData] = useState([]);
  const [clusterGroups, setClusterGroups] = useState({});
  const base_url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
  const url = `${base_url}/coupon/rfm-analysis`;
  const { currentColor, userRole, currentMode } = useStateContext();
  const COLORS = [currentColor, '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c', '#888'];
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        const grouped = {};
        res.data.forEach((entry) => {
          const cluster = entry.kmeans_cluster;
          if (!grouped[cluster]) grouped[cluster] = [];
          grouped[cluster].push(entry);
        });
        setClusterGroups(grouped);
      })
      .catch((err) => {
        console.error("Error fetching RFM data:", err);
      });
  }, []);
  
//   useEffect(() => {
    
//     axios.get(url)
//       .then((res) => {
//         const raw = res.data || [];

//         // Group by cluster
//         const groups = {};
//         raw.forEach((entry) => {
//           const cluster = entry.kmeans_cluster;
//           if (!groups[cluster]) groups[cluster] = [];
//           groups[cluster].push({
//             user_id: entry.user_id,
//             frequency: entry.frequency,
//             monetary: entry.monetary,
//             recency: entry.recency,
//             segment: entry.segment,
//           });
//         });

//         setClusterGroups(groups);
//         setData(raw);
//       })
//       .catch((err) => {
//         console.error("RFM fetch error:", err);
//       });
//   }, []);

//   return (
//     <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 md:p-10 mt-10 shadow-md p-2">
//       <h2 className="text-xl font-bold mb-4">RFM KMeans Clustering</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <ScatterChart>
//           <CartesianGrid />
//           <XAxis
//             type="number"
//             dataKey="frequency"
//             name="Frequency"
//             label={{ value: "Frequency", position: "insideBottomRight", offset: -10 }}
//           />
//           <YAxis
//             type="number"
//             dataKey="monetary"
//             name="Monetary"
//             label={{ value: "Monetary", angle: -90, position: "insideLeft" }}
//           />
//           <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//           <Legend />
//           {Object.entries(clusterGroups).map(([cluster, points], index) => (
//             <Scatter
//               key={cluster}
//               name={`Cluster ${cluster}`}
//               data={points}
//               fill={COLORS[index % COLORS.length]}
//             />
//           ))}
//         </ScatterChart>
//       </ResponsiveContainer>
//     </div>
//   );
  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 md:p-10 mt-10 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        🧠 Customer Clusters (KMeans - RFM)
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Visualizing clusters based on Frequency and Monetary value. Hover over a user to view their RFM behavior.
      </p>

      <ResponsiveContainer width="100%" height={450}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            type="number"
            dataKey="frequency"
            name="Frequency"
            label={{ value: "Frequency", position: "insideBottomRight", offset: -5 }}
            tick={{ fill: "#6B7280" }}
          />
          <YAxis
            type="number"
            dataKey="monetary"
            name="Monetary"
            label={{ value: "Monetary ($)", angle: -90, position: "insideLeft" }}
            tick={{ fill: "#6B7280" }}
          />
          <Tooltip content={<CustomTooltip />} />
          

          {/* {Object.entries(clusterGroups).map(([cluster, data], index) => (
            <Scatter
              key={cluster}
              name={`Cluster ${cluster}`}
              data={data}
              fill={COLORS[index % COLORS.length]}
              shape="circle"
            >
              <LabelList
                dataKey="user_id"
                position="top"
                style={{ fill: "#888", fontSize: 10, fontFamily: "monospace" }}
              />
            </Scatter>
          ))} */}
          {Object.entries(clusterGroups).map(([cluster, data], index) => {
            const clusterName = cluster === '-1' ? 'Noise/Outliers' : `Cluster ${cluster}`;
            return (
                <Scatter
                key={cluster}
                name={clusterName}
                data={data}
                fill={COLORS[index % COLORS.length]}
                shape="circle"
                >
                <LabelList
                    dataKey="user_id"
                    position="top"
                    style={{ fill: "#888", fontSize: 10, fontFamily: "monospace" }}
                />
                {/* <Legend verticalAlign="bottom" wrapperStyle={{ marginTop: '5rem' }} /> */}
                </Scatter>
                
            );
            })}

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RFMClusterChart;
