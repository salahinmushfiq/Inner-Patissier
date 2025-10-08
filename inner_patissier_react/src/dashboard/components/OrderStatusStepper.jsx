// import React from 'react';
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   Tooltip
// } from '@mui/material';
// import { CheckCircle, LocalShipping, Payment, ErrorOutline, DoneAll, AccessTime } from '@mui/icons-material';
// import CustomStepConnector from './CustomStepConnector'; // adjust path if needed

// const statusIcons = {
//   pending: <AccessTime />,
//   confirmed: <Payment />,
//   processing: <Payment />,
//   shipped: <LocalShipping />,
//   delivered: <DoneAll />,
//   cancelled: <ErrorOutline />,
//   failed: <ErrorOutline />,
// };

// const statusLabels = {
//   pending: "Pending",
//   confirmed: "Confirmed",
//   processing: "Processing",
//   shipped: "Shipped",
//   delivered: "Delivered",
//   cancelled: "Cancelled",
//   failed: "Failed"
// };
// // ✅ Add the two flows here
// const COD_FLOW = [
//   'pending',
//   'confirmed',
//   'shipped',
//   'delivered'
// ];

// const ONLINE_FLOW = [
//   'pending',
//   'confirmed',
//   'processing',
//   'shipped',
//   'delivered'
// ];
// const OrderStatusStepper = ({ currentStatus, statusLogs, paymentMethod }) => {
//   const flow = paymentMethod?.toLowerCase() === 'cod' ? COD_FLOW : ONLINE_FLOW;

//   const currentStepIndex = flow.findIndex(step => step === currentStatus);
//   // const logMap = new Map(statusLogs.map(log => [log.new_status, log]));
//   const logMap = new Map(statusLogs.map(log => [log.new_status?.toLowerCase(), log]));

//   return (
//     <Stepper alternativeLabel activeStep={currentStepIndex} connector={<CustomStepConnector />}>
//       {flow.map((step, index) => {
//         const log = logMap.get(step);
//         const isCompleted = index <= currentStepIndex;
//         console.log("log");
//         console.log(log);
//         return (
//           <div>
//           <Step key={step} completed={isCompleted}>
//            <Tooltip
//               title={
//                 log
//                   ? `By: ${log.changed_by || 'System'}\nAt: ${new Date(log.timestamp).toLocaleString()}`
//                   : index < currentStepIndex
//                     ? 'Completed (no log found)'
//                     : 'Not reached yet'
//               }
//             >
//              <StepLabel
//                 StepIconComponent={() => (
//                   <div
//                     className={`
//                       w-10 h-10 flex items-center justify-center rounded-full border-4
//                       ${isCompleted ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-400'}
//                       ${currentStepIndex === index ? 'border-blue-500 text-blue-600 ring-2 ring-blue-300' : ''}
//                       bg-white dark:bg-gray-800
//                       mb-8
//                     `}
//                   >
//                     {statusIcons[step]}
//                   </div>
//                 )}
//               >
//                 <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                   {statusLabels[step]}
//                 </span>
//               </StepLabel>

//             </Tooltip>
//           </Step>
//           <StepConnector style={{color:"#81c784",height:'8px', position:'absolute',top:'16px',display: 'block',
//               borderColor: '#bdbdbd',
//               /* border-top-style: solid; */
//               borderWidth: '3px',
//               borderStyle: 'solid',
//               }}/>
//           </div>
//         );
//       })}
//     </Stepper>
//   );
// };

// export default OrderStatusStepper;


// import React from 'react';
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Tooltip
// } from '@mui/material';
// import {
//   CheckCircle, LocalShipping, Payment,
//   ErrorOutline, DoneAll, AccessTime
// } from '@mui/icons-material';
// import CustomStepConnector from './CustomStepConnector'; // adjust path if needed

// const statusIcons = {
//   pending: <AccessTime />,
//   confirmed: <Payment />,
//   processing: <Payment />,
//   shipped: <LocalShipping />,
//   delivered: <DoneAll />,
//   cancelled: <ErrorOutline />,
//   failed: <ErrorOutline />,
// };

// const statusLabels = {
//   pending: "Pending",
//   confirmed: "Confirmed",
//   processing: "Processing",
//   shipped: "Shipped",
//   delivered: "Delivered",
//   cancelled: "Cancelled",
//   failed: "Failed"
// };

// const COD_FLOW = ['pending', 'confirmed', 'shipped', 'delivered'];
// const ONLINE_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

// const StatusIcon = ({ icon, active, completed }) => (
//   <div
//     className={`
//       w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300
//       ${completed ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-400'}
//       ${active ? 'border-blue-500 text-blue-600 ring-2 ring-blue-300' : ''}
//       bg-white dark:bg-gray-800
//     `}
//   >
//     {icon}
//   </div>
// );

// const OrderStatusStepper = ({ currentStatus, statusLogs, paymentMethod }) => {
//   const flow = paymentMethod?.toLowerCase() === 'cod' ? COD_FLOW : ONLINE_FLOW;
//   const currentStepIndex = flow.findIndex(step => step === currentStatus?.toLowerCase());
//   const logMap = new Map(statusLogs.map(log => [log.new_status?.toLowerCase(), log]));

//   return (
//     <Stepper alternativeLabel activeStep={currentStepIndex} connector={<CustomStepConnector />}>
//       {flow.map((step, index) => {
//         const log = logMap.get(step);
//         const isCompleted = index <= currentStepIndex;
//         const active = index === currentStepIndex;

//         return (
//           <Step key={step} completed={isCompleted}>
//             <Tooltip
//               title={
//                 log
//                   ? `By: ${log.changed_by || 'System'}\nAt: ${new Date(log.timestamp).toLocaleString()}`
//                   : index < currentStepIndex
//                     ? 'Completed (no log found)'
//                     : 'Not reached yet'
//               }
//               componentsProps={{
//                 tooltip: {
//                   sx: { whiteSpace: 'pre-line', fontSize: 12, p: 1 },
//                 }
//               }}
//             >
//               <StepLabel
//                 StepIconComponent={() => (
//                   <StatusIcon icon={statusIcons[step]} active={active} completed={isCompleted} />
//                 )}
//               >
//                 <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                   {statusLabels[step]}
//                 </span>
//               </StepLabel>
//             </Tooltip>
//           </Step>
//         );
//       })}
//     </Stepper>
//   );
// };

// export default OrderStatusStepper;


import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle, LocalShipping, Payment,
  ErrorOutline, DoneAll, AccessTime
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import CustomStepConnector from './CustomStepConnector'; // adjust path if needed
import { motion } from 'framer-motion'; // ✅ Ensure this is installed

const statusIcons = {
  pending: <AccessTime />,
  confirmed: <Payment />,
  processing: <Payment />,
  shipped: <LocalShipping />,
  delivered: <DoneAll />,
  cancelled: <ErrorOutline />,
  failed: <ErrorOutline />,
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  failed: "Failed"
};

const COD_FLOW = ['pending', 'confirmed', 'shipped', 'delivered'];
const ONLINE_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const StatusIcon = ({ icon, active, completed }) => (
  <div
    // className={`
    //   w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300
    //   ${completed ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-400'}
    //   ${active ? 'border-blue-500 text-blue-600 ring-2 ring-blue-300' : ''}
    //   bg-white dark:bg-gray-800
    // `}
  >
    {icon}
  </div>
);

const OrderStatusStepper = ({ currentStatus, statusLogs, paymentMethod }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 👈 Detect screen size

  const flow = paymentMethod?.toLowerCase() === 'cod' ? COD_FLOW : ONLINE_FLOW;
  const currentStepIndex = flow.findIndex(step => step === currentStatus?.toLowerCase());
  const logMap = new Map(statusLogs.map(log => [log.new_status?.toLowerCase(), log]));

  return (
    <div className="w-full py-4">
      <Stepper
        activeStep={currentStepIndex}
        orientation={isMobile ? 'vertical' : 'horizontal'} // 👈 Responsive
        connector={<CustomStepConnector />}
        alternativeLabel={!isMobile}
      >
        {flow.map((step, index) => {
          const log = logMap.get(step);
          const isCompleted = index <= currentStepIndex;
          const active = index === currentStepIndex;

          return (
            <Step key={step} completed={isCompleted}>
              <Tooltip
                title={
                  log
                    ? `By: ${log.changed_by || 'System'}\nAt: ${new Date(log.timestamp).toLocaleString()}`
                    : index < currentStepIndex
                      ? 'Completed (no log found)'
                      : 'Not reached yet'
                }
                componentsProps={{
                  tooltip: {
                    sx: { whiteSpace: 'pre-line', fontSize: 12, p: 1 },
                  }
                }}
              >
                <StepLabel
                  StepIconComponent={() => (
                    // <StatusIcon icon={statusIcons[step]} active={active} completed={isCompleted} />
                   <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`
                        w-10 h-10 flex items-center justify-center rounded-full border-4
                        ${isCompleted ? 'border-green-500 text-green-600' : 'border-gray-300 text-gray-400'}
                        ${currentStepIndex === index ? 'border-blue-500 text-blue-600 ring-2 ring-blue-300' : ''}
                        bg-white dark:bg-gray-800
                      `}
                    >
                      <StatusIcon icon={statusIcons[step]} active={active} completed={isCompleted} />
                    </motion.div>
                  )}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {statusLabels[step]}
                  </motion.span>
                </StepLabel>
              </Tooltip>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default OrderStatusStepper;
