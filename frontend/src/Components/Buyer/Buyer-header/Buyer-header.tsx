import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../../../Assets/final.png"
import LogoutIcon from '@mui/icons-material/Logout';
import './Buyer-header.css'
import { useNavigate } from 'react-router-dom';
import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaClipboardList } from 'react-icons/fa';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    history("/");
  }

  const userId = localStorage.getItem('buyer_id');

  return (
    <div>
      <Navbar className='navbar-buyer'>
        <Link to="/buyerHome">
          <img src={logo} alt="Logo" height="40" width='150' className='buyer-logo' />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex align-items-center ms-md-auto" id="navbarNav">
            <div className="navbar-nav ms-md-auto buyer-options">
              <div className="icons-container">
              <Link to={`/cart/${userId}`} title="Cart" style={{ textDecoration: 'none', color: 'white', marginRight: '25px' , height:'50px', width:'50px'  }}>
                  <FaShoppingCart size={20} />
                </Link>
                <Link to="/wishlist" title="Wishlist" style={{ textDecoration: 'none', color: 'white', marginRight: '25px', height:'50px', width:'50px'}}>
                  <FaHeart size={20} />
                </Link>
                <Link to={`/getBuyerOrders/${userId}`} title="Orders" style={{ textDecoration: 'none', color: 'white', marginRight: '25px', height:'50px', width:'50px'}}>
                  <FaClipboardList size={20} />
                </Link>
                <Link to="#"  title="" onClick={() => setIsModalOpen(true)} style={{ textDecoration: 'none', color: 'white', marginRight: '25px', height:'50px', width:'50px'}}>
                  <LogoutIcon sx={{ color: 'white', fontSize: 20 }} />
                </Link>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>

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
            borderColor: 'tra'
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" className='logout-msg'>
            Are you sure you want to Logout?
          </Typography>
          <br />
          <br />
          <Button onClick={() => handleLogout()} variant="contained" color="primary" className='logout-confirmation' >
            YES
          </Button>
          <Button onClick={() => setIsModalOpen(false)} variant="contained" color="secondary" className='logout-cancel' >
            CANCEL
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Header;








