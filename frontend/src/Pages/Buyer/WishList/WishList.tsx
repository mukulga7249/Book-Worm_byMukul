import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Buyer/Buyer-header/Buyer-header';

import axios from 'axios';
import { Book } from '../../../Types/Book';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardMedia, Grid } from '@mui/material'; // Import Material-UI components
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SearchIcon from '@mui/icons-material/Search';
import BuyerFooter from '../../../Components/Buyer/Buyer-footer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactPaginate from 'react-paginate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';



function WishList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [bookswished, setbookswished] = useState<number>(0);
  const booksPerPage = 8; // Number of books to display per page
  const pagesVisited = pageNumber * booksPerPage;
  const userId = localStorage.getItem('buyer_id');
  

  useEffect(() => {
    fetchBooks();
  }, [searchResults]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/approvedBooks');
      const books = response.data
      const booksWithFavorites = await Promise.all(books.map(async (book: { _id: string | undefined; }) => {
        const isFavorite = await isFav(book._id, userId); // Ensure isFav can handle null/undefined gracefully
        return { ...book, isFavorite };
      }));
      console.log(booksWithFavorites);
      

      setBooks(booksWithFavorites);
      setSearchResults(booksWithFavorites);
      
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addToFav = async (bookId: string | undefined) => {
    //api call to update favbooks 
    if (!bookId) return;

    // Assuming you store userId in localStorage
    if (!userId) {
      console.log('User ID not found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5001/api/addFav/${bookId}`, { userId });
      console.log(response.data); // Or handle this more gracefully in your UI
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  const removefromFav = async (bookId: string | undefined) => {
    //api call to update favbooks 
    if (!bookId) return;

    // Assuming you store userId in localStorage
    if (!userId) {
      console.log('User ID not found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5001/api/removeFav/${bookId}`, { userId });
      console.log(response.data); // Or handle this more gracefully in your UI
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }


  const isFav = async (bookId: string | undefined, userId: string | null) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/checkFav/${bookId}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }

  const navigate = useNavigate();

 

  const displayBooks = 

  searchResults &&searchResults.map((book) => (
    book.isFavorite ?
    (
      <Grid item key={book._id} xs={12} sm={6} md={3}>

        <div style={{ padding: '5px' }}> {/* Reduce padding around each card */}
          <Card className='book-card'>
            <CardMedia
              className='book-image'
              component="img"
              // Reduce the height of the image
              image={book.image}
              alt="Book Cover"
              onClick={() => navigate(`/BookDetails/${book._id}`)}
              onLoad={()=>setbookswished(1)}
            />
            <CardContent className='book-content'>
              <h2 className='book-title' onClick={() => navigate(`/BookDetails/${book._id}`)} > {book.title}</h2>
              <div className="price-and-heart">
                <p className='price'><CurrencyRupeeIcon />{book.price} </p>
                {book.isFavorite
                  ? (<FavoriteIcon className="heart-icon" style={{ color: 'red' }} onClick={() => { removefromFav(book._id) }} />)
                  : (<FavoriteIcon className="heart-icon" onClick={() => { addToFav(book._id) }} />)}
              </div>
            </CardContent>
          </Card>
        </div>
      </Grid>)
    : null

    

    
  ));

  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

// Function to show the empty message after a delay
const showEmptyMessageWithDelay = () => {
  setTimeout(() => {
    setShowEmptyMessage(true);
  }, 500); // Adjust the delay time as needed (in milliseconds)
};

// Call the function to show the empty message after component renders
useEffect(() => {
  showEmptyMessageWithDelay();
}, []); // Empty dependency array ensures the effect runs only once after initial render
   

  const renderEmptyMessage =showEmptyMessage && (bookswished === 0 ? (<div style={{color:'white', fontSize:  '25px', margin:'auto', alignSelf: 'center'}} className='mt-5'>Your Wishlist seems Empty ! </div>) : null) 



return (
  <div className='main_div'>
    <Header />
    <div className='all-books'>
      <div className='book-cards'>
        <div className="filter-section p-2 mt-5">
          <h3>WishList</h3>
        </div>
        <div className='book-grid'>
          <Grid container spacing={1}> {/* Add spacing between grid items */}
            {displayBooks}
            {renderEmptyMessage}
          </Grid>
        </div>
      </div>
    </div>
    <BuyerFooter />
  </div>
);
}

export default WishList;
