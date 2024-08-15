import React, { useState } from 'react'
import { Book } from '../../Types/Book';
import { BookService } from '../../Services/BookService';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import Layout from './Layout';
import axios from 'axios';
import './AddBookDetails.css'
import { Modal } from '@mui/material';


function AddBookDetails() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const value = localStorage.getItem('seller_id');
    console.log("seller id",value);
    
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
        'sellerId':value || "",
    })

    const onChangeHandler=( e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value);
        setBook({
            ...book,
            [e.target.name]:e.target.value
        })   
        
    }

    const onSubmitHandler= (e: React.FormEvent<HTMLFormElement> ) =>{
      e.preventDefault()
      console.log("Product:", book); 
      BookService.addBookDetails(book)  
      .then(response=> {
          console.log("Response in frontend component", response);
          setIsModalOpen(true);
          
          
      })
      .catch(error=>{
          console.log(error);
          
      })     
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
                
                
            })
            .catch(error => {
                console.error("Error uploading image", error);
                
            });
    }       
  };
    
  console.log(book);
  



    return (    
    
    <React.Fragment>
      <Layout>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 3, width: '500', margin: 'auto', border: '3px solid #243b55' }} className='add-book-form'>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            ADD BOOK
          </Typography>
          <form onSubmit={onSubmitHandler} >
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
    style={{ display: 'none' }} 
    id="image-upload" 
  />
  <label htmlFor="image-upload">
    <Button
      component="span" 
      variant="outlined"
      startIcon={<UploadFileIcon />}
    >
      Choose Image
    </Button>
  </label>
</Grid>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Button type='submit' variant="contained" sx={{ backgroundColor: "#141e30'" }} >
              ADD BOOK
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} />
          </Grid>
          </form>
        </Box>
      </Paper>




      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="logout"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '18px',
            borderColor:'tra'
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" className='logout-msg'>
            Book Added Successfully !
          </Typography>
          <br/>
          <br/> 
          <Button onClick={()=>setIsModalOpen(false)} variant="contained" color="secondary" style={{textAlign: "center" }} >
            Ok
          </Button>
        </Box>
      </Modal>
      </Layout>
    </React.Fragment>
    
    )
}

export default AddBookDetails