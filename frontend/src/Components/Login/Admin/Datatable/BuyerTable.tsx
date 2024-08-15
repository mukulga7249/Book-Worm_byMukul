
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

// Assuming this is the structure of your book data
interface Buyer {
  _id: string;
  username: string;
  email: string;
  phone:number;
 
}

const Buyertable: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/buyers/getbuyers');
        setBuyers(response.data.buyers);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBuyers();
  }, []);

  const handleApprove = async (bookId: string) => {
    try {
      // Adjust the URL and method according to your API
      await axios.put(`http://localhost:5001/api/books/approval/${bookId}`);
      // Optionally, refresh the books list or handle the UI update
      console.log(`Book ${bookId} approved`);
    } catch (error) {
      console.error("Failed to approve book", error);
    }
  };
  
 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='main-table-container'>
      <div className='Table-title'><h2>ALL BUYERS</h2></div>
    <TableContainer component={Paper} className='Table-container'>
      <Table>
        <TableHead className='Table-head'>
          <TableRow>
            
            <TableCell align="center" style={{color:'white'}}>NAME</TableCell>
            <TableCell align="center" style={{color:'white'}}>EMAIL</TableCell>
            <TableCell align="center" style={{color:'white'}}>PHONE NUMBER</TableCell>
            {/* <TableCell align="center" style={{color:'white'}}>ACTION</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? buyers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : buyers
          ).map((buyer) => (
            <TableRow key={buyer._id}>
              {/* <TableCell component="th" scope="row">{buyer.username}</TableCell> */}
              <TableCell align="center">{buyer.username}</TableCell>
              <TableCell align="center">{buyer.email}</TableCell>
              <TableCell align="center">{buyer.phone}</TableCell>
              {/* <TableCell align="center"> */}
                
              {/* <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px', textDecoration: 'none', color:'red',background: 'transparent', border: '2 px solid red' }}
                    className='block-button'
                  >
                    Block
                  </Button> */}
                    
                 
              {/* </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={buyers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </div>
  );
};

export default Buyertable;

