import React, { useEffect, useState } from 'react'

import './WishList.css'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SearchIcon from '@mui/icons-material/Search';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Book } from '../../Types/Book';
import Header from './Buyer-header/Buyer-header';
import BuyerFooter from './Buyer-footer';

function WishList() {

    const [books, setBooks] = useState<Book[]>([]);


    const fetchBooks = async () => {
        try {
            console.log("before");

            const response = await axios.get('http://localhost:5001/api/approvedBooks');
            setBooks(response.data);
            setSearchResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []

    )

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Book[]>(books); // Initialize with books array

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        console.log(term);

        const data = books;
        console.log("This is", books);

        if (term.length == 0) {
            setSearchResults(books)
        } else {

            const results = data.filter(
                (book) =>
                    book.title.toLowerCase().includes(term.toLowerCase()) ||
                    book.author.toLowerCase().includes(term.toLowerCase()) ||
                    book.genre.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);

        }
    };



    const navigate = useNavigate();

    return (
        <div  >
            <div className='all-books' >
                <Header/>
                

                <div className='book-cards'>



                    <div className="wishlist-section p-3 mt-5 mb-5">
                        <span className='wishlist-title'>MY WISHLIST</span>
                    </div>

                    <div className='book-grid'>
                        <Grid container spacing={6}>
                            {searchResults.map((book) => (
                                <Grid item key={book._id} xs={12} sm={4} md={3}>
                                    <Card className='book-card' onClick={() => navigate(`/BookDetails/${book._id}`)}>
                                        <div className="wish-image-container">

                                            <CardMedia className='book-image'
                                                component="img"
                                                height="300"
                                                image={book.image}
                                                alt="Book Cover"
                                            />

                                        </div>


                                        <CardContent className='book-content'>
                                            <p className='price '>

                                                <CurrencyRupeeIcon style={{ height: "20px" }} />{book.price} </p>

                                            <h2 className='book-title'> {book.title}</h2>
                                            <FavoriteIcon className='wishlist-icon' style={{ height: "50px", width: "20%", padding: "8px", marginRight: "-17px" }} />


                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                </div>
                <BuyerFooter />
            </div>

        </div>
    )
}

export default WishList
