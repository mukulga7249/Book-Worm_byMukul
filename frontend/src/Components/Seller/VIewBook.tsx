import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { Book } from '../../Types/Book';
import { BookService } from '../../Services/BookService';
import './ViewBook.css'


const ViewBook: React.FC = () => {

  const sellerId  = localStorage.getItem('seller_id');

  const [data, setData] = useState<Book[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await BookService.getBooksBySellerId(sellerId as string);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  const handleDelete = async (id: string) => {
    try {
      await BookService.deleteBookById(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Layout>
      {
        data.length===0
        ?<div className='no-book-listed mt-10'>
          <span className='empty-msg'>You have not listed any book yet !!</span>
          <Link to="/addBook">
          <button >Add a book</button>
          </Link>
          


        </div>
        :<Grid container spacing={4}>
        {data.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={3}>
            <Card className="book-card-seller">
              <CardMedia className='book-image-seller'
                component="img"
                height="200"
                image={book.image}
                alt="Book Cover"
              />
              <CardContent className="book-content-seller">
                <h3 className='book-title-seller'>{book.title}</h3>
                  <ul>
    
                  {book.isApproved?<span className='approved-listing'>Approved</span>:<span className='pending-for-approval'>Pending for approval</span>}
                  <br/>
                  <span className='book-publish-seller'>
                  Quantity Available: {book.quantity}</span>
                  </ul>
                  
                  
                  
              </CardContent>
              <CardActions style={{alignItems:'center' }}
              className='mt-1 action-buttons-seller'>
                <Link to={`/update/${book._id}`}>
                  <Button style={{backgroundColor:'#ccc', color: 'black', border:'2px solid green', height:'30px', width:'40px', fontSize:'13px'}}>Update</Button>
                </Link>
                <Button  
                style={{backgroundColor:'#ccc', color: 'black', border:'2px solid red',  height:'30px', width:'40px', fontSize:'13px'}}
                onClick={() => book._id && handleDelete(book._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
         }
    </Layout>
  );
};

export default ViewBook;




