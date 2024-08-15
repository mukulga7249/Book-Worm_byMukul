import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { OrderData } from '../../Types/Orders';
import { BookCart } from '../../Types/BookCart';
import { CartBook } from '../../Types/CartBook';

function PaymentSuccessful() {



  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { formValues } = location.state || {};

  const buyerId = localStorage.getItem('buyer_id');

  const [products, setProducts] = useState<BookCart[]>([]);

  const [data, setData] = useState<CartBook[]>([]);
  const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');


  console.log('Data:', data);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
    // Call the combined function
  }, []);

  const fetchData = async () => {
  try {
    
    console.log('Cart Data:', storedProducts);
    setProducts(storedProducts);

    const bookIds = storedProducts.map((cartItem: any) => cartItem.book_id);
    const bookResponses = await Promise.all(bookIds.map((bookId: string) => {
      console.log('Book ID:', bookId); // Print bookId here
      return axios.get(`http://localhost:5001/api/getBookById/${bookId}`);
    }));

    const updatedProducts = storedProducts.map((cartItem: any, index: number) => ({
      ...cartItem,
      ...bookResponses[index].data,
    }));
    console.log('Updated Products:', updatedProducts);
    setData(updatedProducts);

    // Call saveOrderData after updating data
    saveOrderData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  const saveOrderData = async () => {
    try {

        

        console.log('in save order');
        
        
      if (!buyerId) {
        console.error('Buyer ID not found');
        return;
      }

      const formValuesFromLocalStorage = localStorage.getItem('formValues');
      const formValues = formValuesFromLocalStorage ? JSON.parse(formValuesFromLocalStorage) : {};

      const storedProducts : BookCart[] = JSON.parse(localStorage.getItem('products') || '[]');
      
      console.log('stored products....',storedProducts);
      console.log('form valuessssssssssss',formValues);

      console.log('products1111',products);
      console.log('dataaaaa',data);

      const bookIds = storedProducts.map((cartItem: any) => cartItem.book_id);
    const bookResponses = await Promise.all(bookIds.map((bookId: string) => {
      console.log('Book ID:', bookId); // Print bookId here
      return axios.get(`http://localhost:5001/api/getBookById/${bookId}`);
    }));

      const updatedProducts = storedProducts.map((cartItem: any, index: number) => ({
        ...cartItem,
        ...bookResponses[index].data,
      }));
      console.log('Updated Products in save order:', updatedProducts);

      if (!formValues || !storedProducts) {
        console.error('Form values or products not found');
        return;
      }

      const orderData = {
        userId: buyerId,
        customer: {
          name: formValues.firstName + ' ' + formValues.lastName,
          email: formValues.email,
          address: `${formValues.addressLine1}, ${formValues.addressLine2}, ${formValues.city}, ${formValues.state}, ${formValues.country}, ${formValues.postalCode}`,
          phoneNumber: formValues.phoneNumber
        },
        
        
        orderDate: new Date(),
        orderItems: storedProducts.map((product, index) => ({
          bookId: product.book_id,
          title: updatedProducts[index].title,
          quantity: product.orderquantity,
          price: product.price,
          sellerId: product.seller_id,
          orderStatus: 'Pending',
        })),
        totalAmount: calculateTotalPrice(storedProducts ),
        payment: {
          paymentId: '12345',
          status: 'Paid',
          transactionId: '67890'
        },
        shipping: {
          method: 'Express',
          address: `${formValues.addressLine1}, ${formValues.addressLine2}, ${formValues.city}, ${formValues.state}, ${formValues.country}, ${formValues.postalCode}`
        },
        notes: 'No special notes',
      };
      console.log('Order Dataaaaa:', orderData);

      await axios.post('http://localhost:5001/api/orders',orderData);

      // Call function to delete cart data
      deleteCartData(buyerId);
    } catch (error) {
      console.error('Error saving order data:', error);
    }
  };

  const deleteCartData = async (buyer_id : string) => {
    try {
      await axios.delete(`http://localhost:5001/api/deleteCartBooksByUserId/${buyer_id}`);
      console.log('Cart data deleted successfully');
    } catch (error) {
      console.error('Error deleting cart data:', error);
    }
  };

  const calculateTotalPrice = (products: BookCart[]) => {
    const subtotal = products.reduce((acc, product) => acc + (product.price * product.orderquantity), 0);
    let shipping = 10.00;
    if (subtotal > 500) {
      shipping = 0;
    }
    return subtotal + shipping;
  };
  
//   useEffect(() => {
//     // Call function to save order data when component mounts
//     saveOrderData();
//   }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Payment Successful</DialogTitle>
      <DialogContent>
        <div>Your payment was successful.</div>
      </DialogContent>
      <DialogActions>
        <Link to="/buyerHome" style={{ textDecoration: 'none' }}>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentSuccessful;
