// import React from 'react'
// import './Buyer-footer.css'

// export default function 
// () {
//   return (
//     <div className='Footer-buyer mt-5 '>
//         <div className='about-us mt-3' >
//             <h6>ABOUT US</h6>
//             <p>
//             Founded with a passion for books and a commitment to fostering a love for reading, Bookworm offers an extensive collection of handpicked titles spanning genres from fiction to non-fiction, bestsellers to hidden gems. 
//             </p>
          
//         </div>
//         <div className="contact-us mt-3">
//             <h6>CONTACT</h6>
//              <p>Feel free to reach out to us with any questions, concerns, or inquiries. Our dedicated team is here to assist you!<br/>
//              Email: info@bookworm.com<br/>
//              Phone: 123-456-7890</p>
//         </div>

//         <div className='address mt-3'>
//             <h6>ADDRESS</h6>
//             <p>Bookworm Online Bookstore<br/>
//             123 Main Street<br/>
//             Suite 101<br/>
//             Cityville, State<br/>
//             Country, Postal Code</p>

//         </div>
//     </div>
//   )
// }



import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Email, LocationOn } from '@mui/icons-material';
import './Buyer-footer.css'

const Footer = () => {
  return (
    <footer className='Footer-buyer' style={{  padding: '10px 0', marginTop: 'auto' }}>
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
                  <Link href="mailto:bookworm@gmail.com">bookworm@gmail.com</Link>
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
  );
};

export default Footer;
