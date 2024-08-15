import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Buyer/Buyer-header/Buyer-header';
import './Main.css';
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
import { WindowSharp } from '@mui/icons-material';



function Main() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const booksPerPage = 8; // Number of books to display per page
  const pagesVisited = pageNumber * booksPerPage;
  const userId = localStorage.getItem('buyer_id');

  useEffect(() => {
    fetchBooks();
  },[] );

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/approvedBooks');
      const books=response.data
      const booksWithFavorites = await Promise.all(books.map(async (book: { _id: string | undefined; }) => {
        const isFavorite = await isFav(book._id, userId); // Ensure isFav can handle null/undefined gracefully
        return { ...book, isFavorite };
      }));
      
      setBooks(booksWithFavorites);
      setSearchResults(booksWithFavorites);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPageNumber(0); // Reset page number when searching
  
    if (term.length === 0) {
      setSearchResults(books);
    } else {
      const results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(term.toLowerCase()) ||
          book.author.toLowerCase().includes(term.toLowerCase()) ||
          book.genre.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const addToFav= async (bookId: string| undefined) =>{
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
      window.location.reload();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  const removefromFav= async (bookId: string| undefined) =>{
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
      window.location.reload();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }


  const isFav= async (bookId: string| undefined, userId: string| null) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/checkFav/${bookId}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }

  const navigate = useNavigate();

  const displayBooks = searchResults.slice(pagesVisited, pagesVisited + booksPerPage).map((book) => (
    
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
          />
          <CardContent className='book-content'>
            <h2 className='book-title'  onClick={() => navigate(`/BookDetails/${book._id}`)} > {book.title}</h2>
            <div className="price-and-heart">
              <p className='price'><CurrencyRupeeIcon />{book.price} </p>
              {book.isFavorite
              ? (<FavoriteIcon className="heart-icon" style={{color: 'red'}} onClick={()=> {removefromFav(book._id)}} />)
              : (<FavoriteIcon className="heart-icon"  style={{color: 'gray'}} onClick={()=> {addToFav(book._id)}} />)}
            </div>
          </CardContent>
        </Card>
      </div>
    </Grid>
  ));

  const pageCount = Math.ceil(searchResults.length / booksPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  return (
    <div className='main_div'>
      <Header />
      <div className='all-books'>
        <div className='book-cards'>
          <div className="filter-section p-2 mt-5">
            <h3>Search</h3>
            <div className="search-container d-flex align-items-center">
              <input className="form-control ms-2" type="search" placeholder="Title/Author/Genre" aria-label="Search" value={searchTerm} onChange={handleSearch} />
              <SearchIcon style={{ alignSelf: 'center' , margin:'7px'}} />
            </div>
          </div>
          <div className='book-grid'>
            <Grid container spacing={1}> {/* Add spacing between grid items */}
              {displayBooks}
            </Grid>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <ReactPaginate
          previousLabel={<ArrowBackIcon style={{ border: '1px solid #000', padding: '5px', borderRadius: '5px', marginRight: '10px', color:'white' }} />} // Icon for Previous button
          nextLabel={<ArrowForwardIcon style={{ border: '1px solid #000', padding: '5px', borderRadius: '5px', marginLeft: '10px',  color:'white' }} />} // Icon for Next button
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination'}
          previousLinkClassName={'previous'}
          nextLinkClassName={'next'}
          pageLinkClassName={'page'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-number'} 
          
        />
      </div>
      <BuyerFooter />
    </div>
  );
}

export default Main;
