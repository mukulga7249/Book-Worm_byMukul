import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BookDetail.css';
import Header from '../../../Components/Buyer/Buyer-header/Buyer-header';
import { BookCart } from '../../../Types/BookCart';
import { CartServices } from '../../../Services/CartServices';
import { BookService } from '../../../Services/BookService';
import Popup from './Popup';
import { Book } from '../../../Types/Book';
import BuyerFooter from '../../../Components/Buyer/Buyer-footer';
import { Grid, Button, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function BookDetail() {
  const { id: initialId } = useParams<{ id: string }>();
  const [id, setId] = useState<string>(initialId || '');
  const [quantity, setQuantity] = useState(1);

  const userId = localStorage.getItem('buyer_id');

  const [book, setBook] = useState<Book>({
    'title': "",
    'author': "",
    'price':0,
    'quantity':0,
    'summary':"",
    "image":"",
    'genre':"",
    'publishYear': 0,
    'isApproved':false,
    'isRejected':false,
    'sellerId':"",
  });

  const [cart, setCart] = useState<BookCart>({
    "price": 0,
    "orderquantity":quantity,
    "status":"active",
    "user_id":userId as string,
    "seller_id":"",
    "book_id":id ,
  });

  const [data, setData] = useState<BookCart[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const fetchedData = await CartServices.getCartBookDetails();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBookById = async () => {
    try {
      const book = await BookService.getBookById(id as string);
      setBook(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  const addToCartButton = async () => {
    try {
      const isBookInCart = data.some((item: BookCart) => item.book_id === id && item.user_id === userId);
      
      if (isBookInCart) {
        setPopupMessage("Book already present in cart");
      } else {
        const updatedCart = {
          ...cart,
          orderquantity: quantity,
          price: book.price,
          seller_id: book.sellerId,
          book_id: id
        };
        setCart(updatedCart);
        await CartServices.addTOCart(updatedCart);
        fetchCartData();
        setPopupMessage("Book added to cart successfully");
      }
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="buyer-container">
      <Header />
      <div className='book_details_div'>
      <Grid container spacing={2} justifyContent="center" className="book-details mt-2">
        <Grid item xs={12} sm={6} md={4} lg={3} className='book-image'>
          <div className="single-book">
            <img src={book.image} className="single-book-image" alt="Book Image"/>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9} className='book-content'>
          <div className="single-book-content mt-3 mt-sm-0">
            <Typography variant="h5" className="single-book-title">
              <span>Title: </span>
              <span className="title">{book.title}</span>
            </Typography>
            <div className="single-book-details" >
              <Typography>
                <span>Author: </span>
                <span className="data">{book.author}</span>
              </Typography>
              <Typography>
                <span>Price: </span>
                <span className="data">{book.price}</span>
              </Typography>
              <Typography>
                <span>Publish Year: </span>
                <span className="data">{book.publishYear}</span>
              </Typography>
            </div>
            <Typography className="single-book-summary mt-2">
              <span className="summary">Summary: </span>
              <span className="data">{book.summary}</span>
            </Typography>
            <br />
            <div className="buyer-options-for-purchase">
              <Link to={`/cart/${userId}`}>
                <Button onClick={addToCartButton} style={{height:'50px'}} variant="contained" color="primary">
                  BUY NOW
                </Button>
              </Link>
              <Button onClick={addToCartButton} variant="contained" color="primary">
                ADD TO CART
              </Button>
              <IconButton onClick={handleDecreaseQuantity} color="primary">
                <RemoveIcon />
              </IconButton>
              <Typography style={{color:'white', alignSelf:'center'}}>{quantity}</Typography>
              <IconButton onClick={handleIncreaseQuantity} color="primary">
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>
      </div>
      <BuyerFooter />
      {showPopup && <Popup open={showPopup} message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default BookDetail;
