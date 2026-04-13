import React, {useEffect, useState} from 'react';
import { AiOutlineMenu,AiOutlineUserAdd ,AiOutlineSetting} from 'react-icons/ai';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdPersonOutline } from 'react-icons/md';
import Box from '@mui/material/Box';
import {Cart,Chat,Notification,UserProfile} from '.';
// import { useStateContext } from '../contexts/ContextProvider';
import { useStateContext } from '../../dashboard/contexts/ContextProvider';
import {Link,NavLink} from 'react-router-dom';
import { IconButton,Typography,Tooltip,MenuItem,ListItemIcon, Menu, Divider} from '@mui/material';
import { createTheme , ThemeProvider} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const theme = createTheme({
  palette: {
    background: {
      paper: 'rgba(136, 66, 66, 0.767)d',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

const Navbar = () => {
  const base_url = process.env.REACT_APP_API_URL ; 
  const {activeMenu,setActiveMenu,isClicked,setIsClicked,handleClick,screenSize,setScreenSize,currentColor,currentMode,currentToken,refreshToken}=useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const data = {
    "refresh": currentToken
  };
  const navigate = useNavigate();
  useEffect(() => {
        const handleResize=()=>setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return ()=>window.removeEventListener('resize', handleResize);
    },[]);
  
  useEffect(()=>{
    if(screenSize<=900){
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }
  },[screenSize]);


   
  const open = Boolean(anchorEl);
  const handleNavClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutClick= () => {
   
    axios
      .post(
        `${base_url}/user/logout/`,
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`, // Access token stored in local storage
          },
        }
      )
      .then((response) => {
        console.log('Successfully logged out:', response.data);
        console.log('Successfully logged out:', response.data);
        localStorage.removeItem('access_token');  // Optionally clear the access token
        localStorage.removeItem('refresh_token'); // Optionally clear the refresh token
        
      })
      .catch((error) => {
        console.error('There was an error logging out!', error);
      });
  };
  const NavButton=({title,customFunc,icon,color,dotColor})=>(
    <div>
       <button type="button" onClick={customFunc} style={{color}} className="relative text-xl rounded-full p-3">
        <span style={{background:dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
          {icon}
       </button>
    </div>
  
  )
  return (
    <div className='flex justify-between p-2 px-6 md:mx-0 drop-shadow-xl dark:text-gray-200 dark:bg-secondary-dark-bg sticky top-0 w-full'>
       <NavButton 
        title="Menu" 
        customFunc={()=>setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu/>}
        />

        <div className='flex'>
        <NavButton 
        title="cart" 
        customFunc={()=>handleClick('cart')}
        color={currentColor}
        icon={<FiShoppingCart/>}
        />
        </div>
        <div className='flex'>

        <NavButton 
        title="chat" 
        dotColor={currentColor}
        customFunc={()=>handleClick('chat')}
        color={currentColor}
        icon={<BsChatLeft/>}
        />
        </div>

        <div className='flex'>
        <NavButton 
        title="notification" 
        dotColor={currentColor}
        customFunc={()=>handleClick('notification')}
        color={currentColor}
        icon={<RiNotification3Line/>}
        />
        </div>
       
        <div>
        <>
         
         <Box>
          
          <Tooltip title="Account settings" className='dark:text-gray-200 dark:bg-secondary-dark-bg sticky top-0' >
            <IconButton
              onClick={handleNavClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={ open ? 'account-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ open ? 'true' : undefined }
              
            >
              <MdPersonOutline fontSize={26} color={currentColor}>M</MdPersonOutline>
            </IconButton>
          </Tooltip>
        </Box>
        
        <Menu
        style={{
          "& .MuiPaperRoot": {
          backgroundColor: "lightblue"
        }
      }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
       
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        
        sx={[
          {
            "& .MuiPaperRoot": {
              className:'bg-red-600',
              backgroundColor: currentMode==="Dark"? '#1e293b':"white",
              // backgroundColor: currentMode==="Dark"? '#334155':"white",
              color:currentColor
            }
          },
        
        ]}
      >
         
        <MenuItem>
            
        <Link to="/dash/profile" className='inline-flex'> <><MdPersonOutline color={currentColor}/><p className="ml-5">Profile</p></></Link>
            
        </MenuItem>
        <MenuItem>
          <MdPersonOutline color={currentColor}/><p className="ml-5">My account</p> 
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AiOutlineUserAdd  color={currentColor}/>
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AiOutlineSetting fontSize="small" color={currentColor}/>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <Link to="/" className='inline-flex' onClick={logoutClick}>
            <ListItemIcon>
              <FiLogOut fontSize="small"  color={currentColor}/>
            </ListItemIcon>
            Logout
          </Link>
        </MenuItem>
      </Menu>
      
      </>
        {isClicked.cart && <Cart/>}
        {isClicked.chat && <Chat/>}
        {isClicked.user && <UserProfile/>}
        {isClicked.notification && <Notification/>}
        </div>
    </div>
  )
}

export default Navbar