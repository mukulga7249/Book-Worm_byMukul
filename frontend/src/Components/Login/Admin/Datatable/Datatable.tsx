
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import './Datatable.css'
import { Box, Modal, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// Assuming this is the structure of your book data
interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  summary: string;
  image: string;
  genre: string;
  publishYear: number;
  isApproved: boolean;
  isRejected: boolean;
  sellerId: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId:string;
  bookTitle?:string;
}

const ApproveModal: React.FC<ModalProps> = ({ isOpen, onClose, bookId, bookTitle}) => {
 
  const handleApprove = async (bookId: string) => {
    try {
      // Adjust the URL and method according to your API
      await axios.put(`http://localhost:5001/api/books/approval/${bookId}`);
      // Optionally, refresh the books list or handle the UI update
      console.log(`Book ${bookId} approved`);
      onClose()
    } catch (error) {
      console.error("Failed to approve book", error);
    }

  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to approve '{bookTitle}'?
        </Typography>
        <Button onClick={() => handleApprove(bookId)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          YES
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          CANCEL
        </Button>
      </Box>
    </Modal>
  );
};


const RejectModal: React.FC<ModalProps> = ({ isOpen, onClose, bookId,  bookTitle}) => {
 
  const handleReject = async (bookId: string) => {
    try {
      // Adjust the URL and method according to your API
      await axios.put(`http://localhost:5001/api/books/rejection/${bookId}`);
      // Optionally, refresh the books list or handle the UI update
      console.log(`Book ${bookId} rejected`);
      onClose()
    } catch (error) {
      console.error("Failed to approve book", error);
    }

  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to Reject '{bookTitle}'?
        </Typography>
        <Button onClick={() => handleReject(bookId)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          YES
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          CANCEL
        </Button>
      </Box>
    </Modal>
  );
};



const Datatable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isApproveModalOpen, setIsAppoveModalOpen] = useState<{isOpen: boolean, bookId: string , bookTitle:string}>({isOpen: false, bookId: ' ', bookTitle: ' '});
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<{isOpen: boolean, bookId: string, bookTitle:string}>({isOpen: false, bookId: ' ', bookTitle: ' '});


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/books/pending');
        console.log(response);
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [books]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='main-table-container'>
      {books.length==0?
      <div className='empty-approval '> <h2 className='mt-5'> NO PENDING APPROVALS !</h2></div>
      :
      <>
      <div className='Table-title'><h2>PENDING FOR APPROVAL:  : </h2></div>
      <TableContainer component={Paper} className='Table-container'>
      <Table>
        <TableHead className='Table-head'>
          <TableRow>
            <TableCell style={{color:'white'}} >Title</TableCell>
            <TableCell align="right" style={{color:'white'}}>Author</TableCell>
            <TableCell align="right" style={{color:'white'}}>Price</TableCell>
            <TableCell align="right" style={{color:'white'}}>Quantity</TableCell>
            <TableCell align="right" style={{color:'white'}}>Genre</TableCell>
            <TableCell align="right" style={{color:'white'}}>Publish Year</TableCell>
            <TableCell align="center" style={{color:'white'}}>Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : books
          ).map((book) => (
            <TableRow key={book._id}>
              <TableCell component="th" scope="row">{book.title}</TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
              <TableCell align="right">{book.quantity}</TableCell>
              <TableCell align="right">{book.genre}</TableCell>
              <TableCell align="right">{book.publishYear}</TableCell>
              <TableCell align="center">
                    <div className='actions'>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsAppoveModalOpen({ isOpen: true, bookId: book._id, bookTitle: book.title })}
                      style={{ marginLeft: '15px' , backgroundColor:'white', textDecoration:'none',
                      border: '1px dotted green',
                      color: 'green',
                      cursor: 'pointer',
                    width: '20px'}}
                      className="ApproveButton"
                    >
                     <CheckCircleOutlineIcon/>
                    </Button>
                    {isApproveModalOpen &&  <ApproveModal isOpen={isApproveModalOpen.isOpen} onClose={()=>setIsAppoveModalOpen({ isOpen: false, bookId: '', bookTitle: ' ' })} bookId={isApproveModalOpen.bookId} bookTitle={isApproveModalOpen.bookTitle} />}
                  
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsRejectModalOpen({ isOpen: true, bookId: book._id,  bookTitle: book.title })}
                      style={{ marginLeft: '10px' , backgroundColor:'white', textDecoration:'none',
                      border: '1px dotted red',
                      color: 'red',
                      cursor: 'pointer',
                    width: '20px'}}
                    >
                      <CancelIcon/>
                    </Button>
                    {isRejectModalOpen &&  <RejectModal isOpen={isRejectModalOpen.isOpen} onClose={()=>setIsRejectModalOpen({ isOpen: false, bookId: '', bookTitle: ' ' })} bookId={isRejectModalOpen.bookId} bookTitle={isRejectModalOpen.bookTitle} />}
                    </div>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className='table-pagination'
     
      />
    </TableContainer>
    </>
    }
    </div>
    
  );
};

export default Datatable;

