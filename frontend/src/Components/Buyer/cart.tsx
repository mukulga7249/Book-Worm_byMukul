import React, { useState, useEffect, createContext, Children, ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookCart } from '../../Types/BookCart';
import axios from 'axios';
import { Book } from '../../Types/Book';
import { CartBook } from '../../Types/CartBook';
import { CartServices } from '../../Services/CartServices';
import Test from './Test';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import Header from './Buyer-header/Buyer-header';
import './Cart.css'
import BuyerFooter from './Buyer-footer';
// import { useCart } from '../../Context/cartContext';

interface CartContextType {
    cartItems: BookCart[];
    // fetchData: () => void;
  }

interface CartProviderProps {
    children?: ReactNode;
  }
export const CartContext = createContext<CartContextType | undefined>(undefined);
// const addtocart = useCart();

const AddToCartPage: React.FC <CartProviderProps>= ({children}) => {
    const [products, setProducts] = useState<BookCart[]>([]);

    const {userId} = useParams();
    console.log("user id in cart",userId);
    

    useEffect(() => {
        fetchData();
      }, [userId]);
    
    
    const [data, setData] = useState<CartBook[]>([]);

    
      

 
      // Fetch the cart data for the given user ID
      const fetchData = async()=>{
        console.log("helooo",userId);
        
        axios.get(`http://localhost:5001/api/cart/${userId}`)
          .then(response => {
              // Log that only cart data is received
              console.log("This is only cart data");
              console.log("dataaaa",response.data);
              // Set the products state with the cart data received
              setProducts(response.data);
              
              
            //   addtocart(response.data);
              // Log that the cart data process has ended
              console.log("This is only cart data end");
              
              // Extract the book IDs from the cart data
              const bookIds = response.data.map((cartItem: any) => cartItem.book_id);
              // Fetch book data for each book ID
              Promise.all(bookIds.map((bookId: string) =>
                  axios.get(`http://localhost:5001/api/getBookById/${bookId}`)
              ))
                  .then(bookResponses => {
                      // Combine the cart and book data
                      const updatedProducts = response.data.map((cartItem: any, index: number) => ({
                          ...cartItem,
                          ...bookResponses[index].data
                      }));
                    
                      // Set the state with the combined cart and book data
                      setData(updatedProducts);
                  })
                  .catch(error => {
                      console.error('Error fetching books:', error);
                  });
          })
          .catch(error => {
              console.error('Error fetching cart:', error);
          });
      }
  


    console.log("set data");
    console.log(data);
    
    
    console.log("Products are here");
    console.log(products);
    
    
    // data.map(book=>{
    //   console.log(book.title);
      
    // })
    

    const handleIncreaseQuantity = (index: number) => {
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[index].orderquantity++;
            CartServices.updateQuantity(products[index]._id as string,updatedData[index].orderquantity);
            return updatedData;
        });
    };

    const handleDecreaseQuantity = (index: number) => {
        setData(prevData => {
            const updatedData = [...prevData];
            if (updatedData[index].orderquantity > 1) {
                updatedData[index].orderquantity--;
            }
            
            
            CartServices.updateQuantity(products[index]._id as string,updatedData[index].orderquantity);
            return updatedData;
        });
    };

    const handleDeleteProduct = async (productId: string) => {
        console.log(productId);
        try {
            await CartServices.deleteBookById(productId);
            fetchData();
          } catch (error) {
            console.error('Error deleting book:', error);
          }
        // setProducts(prevProducts =>
        //     prevProducts.filter(product => product.id !== productId)
        // );
    };

    const subtotal = data.reduce((acc, product) => acc + (product.price * product.orderquantity), 0);
    let shipping = 10.00;
    if (subtotal > 500) {
    shipping = 0;
    }
    const total = subtotal + shipping;

    return (
        <div className='cart-container'>
        <Header/>
        
        <Box p={4} className='cart-items'>
            <Grid container spacing={4}>
                {/* Left side - Orders list */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ padding: 2 }} className="left-box-container">
                        <Typography variant="h5" gutterBottom mb={2}>
                            Orders
                        </Typography>
                        {/* Product listings */}
                        <Box display="flex" flexDirection="column">
                            {data.map((product, index) => (
                                <Box
                                key={product.price}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                borderBottom="1px solid #e0e0e0"
                                py={2}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5", // Light gray background color on hover
                                    }
                                }}
                            >
                                {/* Product image */}
                                <img
                                    src={product.image}
                                    alt={product.image}
                                    style={{ width: 100, height: 100, marginRight: 10 }}
                                />
                                {/* Product information */}
                                
                                <Box flex="1">
                                    <Typography variant="subtitle1">{product.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ₹{product.price.toFixed(2)} | Quantity: {product.quantity} |{' '}
                                        <span style={{ color: product.quantity > 0 ? 'green' : 'red' }}>
                                            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </Typography>
                                </Box>
                            
                                {/* Quantity buttons */}
                                <Box display="flex" alignItems="center">
                                    <IconButton size="small" onClick={() => handleDecreaseQuantity(index)}>-</IconButton>
                                    <Typography variant="body1" sx={{ mx: 2 }}>{product.orderquantity}</Typography>
                                    <IconButton size="small" onClick={() => handleIncreaseQuantity(index)}>+</IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() =>  handleDeleteProduct(products[index]._id as string )}
                                        sx={{
                                            '&:hover': {
                                                color: 'red',
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            
                            ))}
                        </Box>
                    </Paper>
                </Grid>


                {/* Right side - Checkout box */}
                <Box component={Grid} item xs={12} md={4} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="h5" gutterBottom mb={2}>
                                Checkout
                            </Typography>
                            {/* Checkout information */}
                            <Typography variant="subtitle1">Subtotal: ₹{subtotal.toFixed(2)}</Typography>
                            <Typography variant="subtitle1">Shipping: ₹{shipping.toFixed(2)}</Typography>
                            <Typography variant="subtitle1">Total: ₹{total.toFixed(2)}</Typography>
                        </Box>
                        <Box>
                            {/* Checkout button */}
                            <Link to={`/checkout/${userId}`}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingCartIcon />}
                                fullWidth
                                size="small"
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#4caf50", // Green color
                                    }
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                            </Link>

                        </Box>
                    </Paper>
                </Box>
            </Grid>

            {/* Favorite button */}
            {/* <Box position="fixed" bottom={16} right={16}>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                </IconButton>
            </Box> */}
            
        </Box>
        <BuyerFooter/>
        </div>
        
    );
};

export default AddToCartPage;
