
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
//import { DarkModeContext } from '../Context/darkModeContext';
import './Sidebar.css';
import { Box, Button, Modal, Typography } from '@mui/material';

const Sidebar: React.FC = () => {
  //const { dispatch } = useContext(DarkModeContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const history = useNavigate()

  const handleLogout = () => {
    console.log("hey");

    localStorage.clear()
    history("/")
  }


  return (
    <div className="sidebar">
      {/* <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">LOGO</span>
        </Link>
      </div> */}

      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/adminHome" style={{ textDecoration: 'none' }}>
          <li>
            <DashboardIcon className="icon" />
            <span >DASHBOARD</span>
          </li>
        </Link>
        <p className="title">LISTS</p>
        <Link to="/adminbuyers" style={{ textDecoration: 'none' }}>
          <li>
            <PersonOutlineIcon className="icon" />
            <span>BUYERS</span>
          </li>
        </Link>
        <Link to="/adminsellers" style={{ textDecoration: 'none' }}>
          <li>
            <StoreIcon className="icon" />
            <span>SELLERS</span>
          </li>
        </Link>
        <Link to="/adminlisting" style={{ textDecoration: 'none' }}>
          <li>
            <MenuBookIcon className="icon" />
            <span>PENDING APPROVALS</span>
          </li>
        </Link>
        <Link to="/adminapprovedlisting" style={{ textDecoration: 'none' }}>
          <li>
            <MenuBookIcon className="icon" />
            <span>APPROVED BOOKS</span>
          </li>
        </Link>
        <Link to="/adminOrders" style={{ textDecoration: 'none' }}>
        <li>
          <LocalShippingIcon className="icon" />
          <span>ORDERS</span>
        </li>
        </Link>

        <li>
          <ExitToAppIcon className="icon" />
          <span onClick={()=>{setIsModalOpen(true)}}>LOGOUT</span>
        </li>
      </ul>

      <div className='sidebar-bottom'>

      </div>
    </div>
      {/* <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
      </div> */}
       <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="logout"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '18px',
            borderColor:'tra'
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" className='logout-msg'>
            Are you sure you want to Logout?
          </Typography>
          <br/>
          <br/>
          <Button onClick={() => handleLogout()} variant="contained" color="primary" className='logout-confirmation' style={{marginRight: '10px'}} >
            OK
          </Button>
          <Button onClick={()=>setIsModalOpen(false)} variant="contained" color="secondary" className='logout-cancel' >
            CANCEL
          </Button>
        </Box>
      </Modal>
    </div >
  );
};

export default Sidebar;
