import { StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderTopWidth: 4,
    borderRadius: 1,
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: '#22c55e', // green-500
    top:'16px',
    left:'10px'
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#22c55e', // green-500
  },
  [`&.Mui-disabled .MuiStepConnector-line`]: {
    borderColor: '#e5e7eb', // gray-200
  },
}));

export default CustomStepConnector;
