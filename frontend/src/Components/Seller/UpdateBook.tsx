import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Book } from '../../Types/Book';
import { BookService } from '../../Services/BookService';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import Layout from './Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateBook() {


    const { id: initialId } = useParams<{ id: string }>();
    

    const [id, setId] = useState<string>(initialId || '');

    console.log("Book Id For Update: ",id);
    
    const [book,setBook] = useState<Book>({
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

    const fetchBookById = async () => {
      try {
          const book = await BookService.getBookById(id);
          console.log(book);
          
          setBook({
              title: book.title,
              author: book.author,
              price:book.price,
              quantity:book.quantity,
              summary:book.summary,
              image:book.image,
              genre:book.genre,
              publishYear: book.publishYear,
              isApproved:book.isApproved,
              isRejected:book.isRejected,
              sellerId:book.sellerId,
              
          });
      } catch (error) {
          console.error('Error fetching book details:', error);
      }
  };

  useEffect(() => {
    // Fetch book details by ID when the component mounts
    fetchBookById();
}, []);

  const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
    console.log("change happened");
    setBook({
        ...book,
        [event.target.name]:event.target.value})
    
}


const onSubmitHandler = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    
    console.log("Book:",book);
    
    BookService.updateBookDetails(id,book).then(response=>{
        console.log("response in frontend component:",response)

    }).catch(error=>{
        console.log(error);
        
    });
    
};

const [imageFile, setImageFile] = useState<File | null>(null);

    const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
          setImageFile(file);

          axios.post('http://localhost:5001/api/uploadImages', formData)
            .then(response => {
                console.log("Image uploaded successfully", response.data);
                setBook({
                  ...book,
                  'image':response.data,
              })
                // Optionally, you can update state or perform other actions based on the response
                
            })
            .catch(error => {
                console.error("Error uploading image", error);
                // Optionally, you can handle errors here
            });
    }       
  };
  return (
    <React.Fragment>
      <Layout>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 3, width: '500', margin: 'auto' }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Update Book:- {id}
          </Typography>
          <form onSubmit={onSubmitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                value={book.title}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Author
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="author"
                name="author"
                label="Author"
                value={book.author}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Summary
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="outlined-multiline-static"
                name='summary'
                label="Summary"
                value={book.summary}
                multiline
                fullWidth
                rows={4}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Price
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                value={book.price}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Quantity
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                value={book.quantity}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Genre
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="genre"
                name="genre"
                label="Genre"
                value={book.genre}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Publish Year
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="publishYear"
                name="publishYear"
                label="Publish Year"
                value={book.publishYear}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={onChangeHandler}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
  <InputLabel
    sx={{
      display: "flex",
      justifyContent: "center",
      fontWeight: 700
    }}
  >
    Upload Image
  </InputLabel>
</Grid>
<Grid item xs={12} sm={10}>
  <input
    type="file"
    accept="image/*"
    name='image'
    onChange={onImageChangeHandler}
    style={{ display: 'none' }} // Hide the input field
    id="image-upload" // Add an ID to associate with the label
  />
  <label htmlFor="image-upload">
    <Button
      component="span" // Make the button behave like a regular button
      variant="outlined"
      startIcon={<UploadFileIcon />}
    >
      Choose Image
    </Button>
  </label>
</Grid>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Button type='submit' variant="contained" sx={{ color: "#ff781f" }} >
              Update Book
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} />
          </Grid>
          </form>
        </Box>
      </Paper>
      </Layout>
    </React.Fragment>
  )
}

export default UpdateBook