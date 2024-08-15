import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Container, Button, Modal, Box, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import AddBookForm from './AddBookDetails';
import ViewBook from './VIewBook';
import logo from "../../Assets/final.png";
import './Layout.css';
import Logout from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';


import { Grid } from '@mui/material';
import { Email, LocationOn } from '@mui/icons-material';




interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const history = useNavigate()

  const handleLogout = () => {
    console.log("hey");

    localStorage.clear()
    history("/")
  }


  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

 
  return (
    <div className='seller-container'>
      <AppBar position="sticky" className="app-bar" style={{ backgroundColor: '#141e30' }}>
        <Toolbar className="toolbar">
          
          <Link to="/sellerHome" className="logo-seller">
            <img src={logo} alt="Logo" />
          </Link>


          <div className='seller-options' >
            <Link to="/sellerHome" className='seller-icon'>
              <Tooltip title="View Book" placement="bottom">
                <IconButton className='btns' style={{ textDecoration: 'none', color: 'white',height:'80px', width:'50px' }}>
                  <MenuBookIcon style={{height:'25px', width:'25px'}} />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to='/addbook'>
              <Tooltip title="Add Book" placement="bottom">
                <IconButton className='btns' style={{ textDecoration: 'none', color: 'white' , margin:'15px' ,height:'50px', width:'50px'}}>
                  <AddBoxIcon style={{height:'25px', width:'25px'}}/>
                </IconButton>
              </Tooltip>
            </Link>

            <Link to='/sellerorders'>
              <Tooltip title="View Orders" placement="bottom">
                <IconButton className='btns' style={{ textDecoration: 'none', color: 'white' ,height:'50px', width:'50px'}}>
                  <AssignmentIcon style={{height:'25px', width:'25px'}}/>
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title="Logout" placement="bottom">
              <IconButton className="logout-button" style={{ backgroundColor: '#243b55', color: 'white', margin:'15px', height:'50px', width:'50px' }} onClick={() => { setIsModalOpen(true) }}>
                <Logout style={{height:'25px', width:'25px'}}/>
              </IconButton>
            </Tooltip>

          </div>



        </Toolbar>


       

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
              <Button onClick={() => handleLogout()} variant="contained" color="primary" className='logout-confirmation' style={{marginRight:'10px'}} >
                OK
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="contained" color="secondary" className='logout-cancel' >
                CANCEL
              </Button>
            </Box>
          </Modal>
      </AppBar>
   
      <Container className='seller-child-containers' >
        {children}
        {showAddBookForm && <AddBookForm />}
        {/* {viewBook && <ViewBook />} */}
        {/* <ViewBook bookname={searchBook} /> */}
      </Container>


      <footer className='Footer-buyer mt-5' style={{  padding: '10px 0', marginTop: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* About Us Section */}
          <Grid item xs={12} sm={4} style={{ marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" component="p" className='about-us'>
            At Bookworm, we're dedicated to creating a seamless online book-buying experience. Our diverse collection and intuitive platform help readers discover their next favorite book with ease.
            </Typography>
          </Grid>
          {/* Contact Us Section */}
          <Grid item xs={12} sm={4} style={{ marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Email />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Link to="mailto:bookworm@gmail.com">bookworm@gmail.com</Link>

                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Address Section */}
          <Grid item xs={12} sm={4} style={{ marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <LocationOn />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  123 Street Name, City, Country
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
    </div>
  );
};

export default Layout;
