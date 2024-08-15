// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './OrderSummary.css'

// import {
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material'

// import { BookCart } from '../../Types/BookCart';
// import { CartBook } from '../../Types/CartBook';
// import Header from './Buyer-header/Buyer-header';
// import BuyerFooter from './Buyer-footer';

// // Sample product data

//   // Add more products if needed


// // Sample customer address
// const customerAddress = '1234 Street, City, Country'



// const OrderSummaryPage: React.FC = () => {

//   const location = useLocation();
//   const { formValues } = location.state || {};
//   console.log(formValues);
//   console.log(formValues.f);

//   const [products, setProducts] = useState<BookCart[]>([]);


//   const userId = localStorage.getItem("buyer_id");
//   const [data, setData] = useState<CartBook[]>([]);

//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     data.forEach((product, index) => {
//       totalPrice += product.price * products[index].orderquantity;
//     });
//     return totalPrice;
//   };


//   const [openPopup, setOpenPopup] = useState(false);
//   const navigate = useNavigate();
//   const handlePayNow = async () => {
//   try {
//     // Create an array to store book IDs and quantities to update
//     const booksToUpdate = products.map(product => ({
//       bookId: product.book_id,
//       quantity: product.orderquantity
//     }));

//     console.log(booksToUpdate);

//     // Create order data
//     const orderData = {
      
//       userId: userId,
//       customer: {
//         name: formValues.firstName + ' ' + formValues.lastName,
//         email: formValues.email,
//         address: `${formValues.addressLine1}, ${formValues.addressLine2}, ${formValues.city}, ${formValues.state}, ${formValues.country}, ${formValues.postalCode}`,
//         phoneNumber: formValues.phoneNumber
//       },
//       orderDate: new Date(),
//       orderItems: products.map((product, index) => ({
//         bookId: product.book_id,
//         title: data[index].title,
//         quantity: product.orderquantity,
//         price: product.price,
//         sellerId:product.seller_id,
//         orderStatus: 'Pending',

//       })),

//       totalAmount: calculateTotalPrice(), // Assuming you have a function to calculate total price
//       payment: {
//         paymentId: '12345', // Assuming you have a payment ID
//         status: 'Paid', // Assuming the payment is successful
//         transactionId: '67890' // Assuming you have a transaction ID
//       },
//        // Assuming the order is pending
//       shipping: {
//         method: 'Express', // Assuming the shipping method
//         address: `${formValues.addressLine1}, ${formValues.addressLine2}, ${formValues.city}, ${formValues.state}, ${formValues.country}, ${formValues.postalCode}`
//       },
//       notes: 'No special notes', // Assuming there are no special notes
//     };

//     console.log(orderData);

//     // Make API call to update book quantities
//     await axios.post('http://localhost:5001/api/updateBookQuantities', booksToUpdate);
    
//     // Make API call to save order data
//     await axios.post('http://localhost:5001/api/orders', orderData);

//     await axios.delete(`http://localhost:5001/api/deleteCartBooksByUserId/${userId}`);

//     setOpenPopup(true);
//     // Redirect to payment page
//     // Uncomment the following line if you have a payment page to redirect to
//     // history.push('/payment');
//   } catch (error) {
//     console.error('Error updating book quantities:', error);
//   }
// }

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//     navigate(`/buyerHome`);
    
//   };



//   // Calculate total order amount
 





//   const fetchData = async()=>{
//     axios.get(`http://localhost:5001/api/cart/${userId}`)
//       .then(response => {
//           // Log that only cart data is received
//           console.log("This is only cart data");
//           // Set the products state with the cart data received
//           setProducts(response.data);
//         //   addtocart(response.data);
//           // Log that the cart data process has ended
//           console.log("This is only cart data end");
          
//           // Extract the book IDs from the cart data
//           const bookIds = response.data.map((cartItem: any) => cartItem.book_id);
//           // Fetch book data for each book ID

//           Promise.all(bookIds.map((bookId: string) =>
//               axios.get(`http://localhost:5001/api/getBookById/${bookId}`)
//           ))
//               .then(bookResponses => {
//                   // Combine the cart and book data
//                   const updatedProducts = response.data.map((cartItem: any, index: number) => ({
//                       ...cartItem,
//                       ...bookResponses[index].data
//                   }));
                
//                   // Set the state with the combined cart and book data
//                   setData(updatedProducts);
//               })
//               .catch(error => {
//                   console.error('Error fetching books:', error);
//               });
//       })
//       .catch(error => {
//           console.error('Error fetching cart:', error);
//       });
//   }

//   useEffect(() => {
//     fetchData();
//   }, [userId]);

//   return (
//     <div className='order-summary-page'>
//       <Header/>
//       {/* Customer Address */}
//       <div className='summary-box'>

      
//       <Typography variant="h6" gutterBottom>
//         Customer Address
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         {formValues.firstName} {formValues.lastName}, {formValues.addressLine1}, {formValues.addressLine2} 
//         {formValues.city}, {formValues.state}, {formValues.country}, {formValues.postalCode}
//       </Typography>

//       {/* Product Table */}
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Book Name</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Total</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {data.map((product, index) => (
//               <TableRow key={index}>
//                 <TableCell>{product.title}</TableCell>
//                 <TableCell>
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     style={{ maxWidth: '50px', maxHeight: '50px' }}
//                   />
//                 </TableCell>
//                 <TableCell>{products[index].orderquantity}</TableCell>
//                 <TableCell>₹{product.price}</TableCell>
//                 <TableCell>₹{product.price * products[index].orderquantity}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Line break */}
//       <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

//       {/* Order Total */}
//       <Typography variant="h6" align="right" gutterBottom>
//         Order Total: {calculateTotalPrice()}
//       </Typography>

//       {/* Pay Now Button */}
//       <Grid container justifyContent="flex-end">
//         <Button variant="contained" color="primary" onClick={handlePayNow}>
//           Pay Now
//         </Button>
//       </Grid>
//       </div>

//       <Dialog open={openPopup} onClose={handleClosePopup}>
//         <DialogTitle>Payment Successful</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">Your payment was successful.</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePopup} color="primary">
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <BuyerFooter/>

//     </div>
//   )
// }

// export default OrderSummaryPage


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderSummary.css';
import { loadStripe } from '@stripe/stripe-js';

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { BookCart } from '../../Types/BookCart';
import { CartBook } from '../../Types/CartBook';
import Header from './Buyer-header/Buyer-header';
import BuyerFooter from './Buyer-footer';

const customerAddress = '1234 Street, City, Country';

const OrderSummaryPage: React.FC = () => {
  const location = useLocation();
  const { formValues } = location.state || {};
  console.log('Form Values:', formValues);

  const [products, setProducts] = useState<BookCart[]>([]);
  const userId = localStorage.getItem('buyer_id');
  console.log('User ID:', userId);

  const [data, setData] = useState<CartBook[]>([]);
  console.log('Data:', data);

  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  localStorage.setItem('formValues', JSON.stringify(formValues));
      // Save products to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  useEffect(() => {
    if (openPopup) {
      // Save form values to localStorage
      localStorage.setItem('formValues', JSON.stringify(formValues));
      // Save products to localStorage
      localStorage.setItem('products', JSON.stringify(products));

      // Save order data to MongoDB
      saveOrderData();
      // Delete cart data
      deleteCartData(userId);
    }
  }, [openPopup]);

  const handlePayNow = async () => {
    try {
      const stripe = await loadStripe("pk_test_51OrdxySIiS4jxxetC1uPVWRJGxNBDn98o9m0znPL0SQoKf5Knmi6vqTMgcqi9UwMYqhE6clpqwNFlKIAbDQBY3jP00kMeN2MIP");

      if (!stripe) {
        console.error('Failed to load Stripe.js');
        return;
      }

      const body = {
        products: data
      };
      const headers = {
        "Content-Type": "application/json"
      };

      const response = await fetch(`http://localhost:5001/api/create-checkout-session/${userId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      } else {
        setOpenPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const calculateTotalPrice = () => {
    const subtotal = data.reduce((acc, product, index) => acc + (product.price * products[index].orderquantity), 0);
    let shipping = 10.00;
    if (subtotal > 500) {
        shipping = 0;
    }
    return subtotal + shipping;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/cart/${userId}`);
      console.log('Cart Data:', response.data);
      setProducts(response.data);

      const bookIds = response.data.map((cartItem: any) => cartItem.book_id);
      const bookResponses = await Promise.all(bookIds.map((bookId: string) => axios.get(`http://localhost:5001/api/getBookById/${bookId}`)));
      const updatedProducts = response.data.map((cartItem: any, index: number) => ({
        ...cartItem,
        ...bookResponses[index].data,
      }));
      console.log('Updated Products:', updatedProducts);
      setData(updatedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveOrderData = async () => {
    try {
      const orderData = {
        userId: userId,
        customer: {
          name: formValues?.firstName + ' ' + formValues?.lastName,
          email: formValues?.email,
          address: `${formValues?.addressLine1}, ${formValues?.addressLine2}, ${formValues?.city}, ${formValues?.state}, ${formValues?.country}, ${formValues?.postalCode}`,
          phoneNumber: formValues?.phoneNumber
        },
        orderDate: new Date(),
        orderItems: products.map((product, index) => ({
          bookId: product.book_id,
          title: data[index].title,
          quantity: product.orderquantity,
          price: product.price,
          sellerId: product.seller_id,
          orderStatus: 'Pending',
        })),
        totalAmount: calculateTotalPrice(),
        payment: {
          paymentId: '12345',
          status: 'Paid',
          transactionId: '67890'
        },
        shipping: {
          method: 'Express',
          address: `${formValues?.addressLine1}, ${formValues?.addressLine2}, ${formValues?.city}, ${formValues?.state}, ${formValues?.country}, ${formValues?.postalCode}`
        },
        notes: 'No special notes',
      };
      console.log('Order Data:', orderData);

      await axios.post('http://localhost:5001/api/orders', orderData);
    } catch (error) {
      console.error('Error saving order data:', error);
    }
  };

  const deleteCartData = async (userId: string | null) => {
    try {
      if (userId) {
        await axios.delete(`http://localhost:5001/api/deleteCartBooksByUserId/${userId}`);
        console.log('Cart data deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting cart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div className="order-summary-page">
      <Header />
      <div className="container-order-summary">
        {/* Customer Address */}
        <div className="left-box mt-3">
          <Typography variant="h6" gutterBottom>
            Customer Address : 
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formValues?.firstName} {formValues?.lastName}, {formValues?.addressLine1}, {formValues?.addressLine2}
            {formValues?.city}, {formValues?.state}, {formValues?.country}, {formValues?.postalCode}
          </Typography>
        </div>
        {/* Product List */}
        <div className="right-box mt-3">
          <TableContainer className='order-summary-table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.title} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                    </TableCell>
                    <TableCell>{products[index].orderquantity}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>₹{product.price * products[index].orderquantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography variant="h6" align="right" gutterBottom className='order-total mt-3'>
            Order Total: {calculateTotalPrice()}
          </Typography>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handlePayNow} className='pay-button mb-3'>
              Pay Now
            </Button>
          </Grid>
        </div>
      </div>
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Your payment was successful.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <BuyerFooter />
    </div>
  );
};

export default OrderSummaryPage;
