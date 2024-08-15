
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import './Datatable.css'

import { Book } from '../../../../Types/Book';

// Assuming this is the structure of your book data



const ApprovedTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/approvedBooks');
        console.log(response);
        
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, []);



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='main-table-container'>
      <div className='Table-title'><h2>APPROVED BOOKS  : </h2></div>
      <TableContainer component={Paper} className='Table-container'>
      <Table>
        <TableHead className='Table-head'>
          <TableRow>
            <TableCell style={{color:'white'}}>Title</TableCell>
            <TableCell align="right" style={{color:'white'}}>Author</TableCell>
            <TableCell align="right" style={{color:'white'}}>Price</TableCell>
            <TableCell align="right" style={{color:'white'}}>Quantity</TableCell>
            <TableCell align="right" style={{color:'white'}}>Genre</TableCell>
            <TableCell align="right" style={{color:'white'}}>Publish Year</TableCell>
            {/* <TableCell align="right">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : books
          ).map((book) => (
            <TableRow key={book._id}>
              <TableCell component="th" scope="row">{book.title}</TableCell>
              <TableCell align="right">{book._id}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
              <TableCell align="right">{book.quantity}</TableCell>
              <TableCell align="right">{book.genre}</TableCell>
              <TableCell align="right">{book.publishYear}</TableCell>
          
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
      />
    </TableContainer>
    </div>
    
  );
};

export default ApprovedTable;

