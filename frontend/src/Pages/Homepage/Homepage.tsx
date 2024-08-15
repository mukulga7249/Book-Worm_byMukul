import React, { useEffect, useState } from 'react';

import "./Homepage.css"
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
 import logo from "../../Assets/final.png"
import image from "../../Assets/3d-rendering-cartoon-like-boy-reading-removebg-preview.png"
import buyer from "../../Assets/imagination-removebg.png"
import store from "../../Assets/store-removebg-preview.png"
import axios from 'axios';
import { Container, Grid, Typography } from '@mui/material';
import { Email, LocationOn } from '@mui/icons-material';
// Adjust the path as necessary

const HomePage: React.FC = () => {
  
  const [isGetStartedVisible, setisGetStartedVisible] = useState<boolean>(false)


  const toggleGetStarted = () => {
    
    setisGetStartedVisible(prevState => !prevState);

  }


  const closePopup = () => {

    setisGetStartedVisible(false);
   

  };

  useEffect(()=>{
    localStorage.clear()
  })


  return (
    <div className='BG homepage-container '>
      <div className="navbar">
        <div className="wrapper">
          <div className="top">
            <Link to="/" style={{ textDecoration: 'none'}}>
              <div className="logo">
                <img
                  src={logo}
                  alt=""
                  className="logo"
                  style={{marginLeft:'20px'}}
                />
              </div>
            </Link>
          </div>


          <div className="items">
            <div className="item">
              <button onClick={toggleGetStarted} className='get-started throb-button'> SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="first-section">
        <div className="row">
          <div className='col msg '>
            <h1 className='fixed'>
              BOOKS ARE NOT JUST STORIES
            </h1>
            <h1 className='glow'>
              THEY ARE PORTAL TO <span >ANOTHER DIMENSION</span>
            </h1>
          </div>
          <div className='col image-container'>
            <img src={image} />
          </div>

        </div>
      </div>

      <div className='about-us-section'>

        <div className="about-us-image">
          <img src={buyer} />
        </div>
        <div className='about-us-content'>
          <div className='welcome'>
            Welcome to Bookworm, your ultimate destination for all things literature! Founded with a passion for books and a commitment to fostering a love for reading, Bookworm is more than just an online bookstore – it's a community dedicated to enriching lives through the power of storytelling.
          </div>
          <div className='mission mt-5'>

            <span >Our mission is simple: </span>
            <div className='mission-text '>to provide a curated selection of books that captivate, educate, and entertain readers of all ages and interests. From timeless classics to contemporary bestsellers, from fiction to non-fiction, from mysteries to memoirs, our diverse collection ensures that there's something for everyone.
            </div>
          </div>

        </div>



      </div>

      <div className='testimonial-container'>

      

      <div className='testimonial-header'> VOTES OF APPRECIATION !</div>

    <div className="testimonials mt-3">
      
  <div className="testimonial-card">
    <div className= "inner">

   
    <p>"I've been a loyal customer of Bookworm for years.Whether I'm looking for a bestseller or a rare find, I always find what I'm looking for. It's like having a personal bookstore at my fingertips."</p>
    <p className="testimonial-name">Vaishnavi Garghate</p>
    <p className="testimonial-role">Book Enthusiast</p>
    </div>
  </div>

  <div className="testimonial-card">
  <div className= "inner">
    <p>"Bookworm is my go-to place for discovering new reads. The curated collection always surprises me with hidden gems. Plus, the customer service is excellent! Highly Recommendded ."</p>
    <p className="testimonial-name">Siddhi Shimpi</p>
    <p className="testimonial-role">Book Collector</p>
    </div>
  </div>


  <div className="testimonial-card">
  <div className= "inner">
    <p>"I've seen a significant increase in sales since joining Bookworm. Highly recommended for any seller looking to reach a wider audience and grow their business in the book industry"</p>
    <p className="testimonial-name">Atharva More</p>
    <p className="testimonial-role">Leading Book Seller</p>
  </div>
  </div>
</div>
</div>

   

<footer className='Footer-buyer mt-3' style={{  padding: '10px 0', marginTop: 'auto' }}>
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







      <Modal show={isGetStartedVisible} onHide={closePopup} centered>

        <Modal.Body>
          <div className="modal-options">
            <IoCloseCircle onClick={closePopup} className="close-btn" />
            <div className="option">

              <Link to="/signin/buyer" className='login-options'>  <h3>Buy a Book</h3></Link>

            </div>
            <div className="option" >
              <Link to="/signin/seller" className='login-options' ><h3>Sell a Book</h3></Link>

            </div>
            {/* <div className="option" onClick={toggleAdmin}>
              <Link to="/signin/admin"  className='login-options'><h3>I am a Admin</h3></Link>

            </div> */}
          </div>
        </Modal.Body>
      </Modal>




    </div>
  );
};

export default HomePage;
