import React, { useContext, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import logo from "../../../../Assets/final.png"
import MenuIcon from '@mui/icons-material/Menu';
//import { DarkModeContext } from '../Context/darkModeContext';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {


  return (
    <div className="navbar navbar-admin ">
  
      
      <div className="wrapper admin-wrapper">
     
      <div className="top-logo-admin ">
        <Link to="/adminHome" style={{ textDecoration: 'none' }}>
          <span ><img src={logo} alt="logo"></img></span>
        </Link>
      </div>
      {/* <div className="trial">

      </div> */}
        
      </div> 
    </div>
  );
};

export default Navbar;
