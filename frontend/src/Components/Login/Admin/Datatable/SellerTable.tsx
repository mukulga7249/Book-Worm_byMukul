
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

// Assuming this is the structure of your book data
interface Seller {
  _id: string;
  username: string;
  email: string;
  phone: number;
  isblocked:boolean;
 
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId:string;
  userName:string,
  action:string
  
}

const BlockModal: React.FC<ModalProps> = ({ isOpen, onClose, sellerId, userName, action}) => {
 
  const handleBlock = async (sellerId: string) => {

    
    try {
      // Adjust the URL and method according to your API
      await axios.put(`http://localhost:5001/api/seller/${action}/${sellerId}`);
      // Optionally, refresh the books list or handle the UI update
      console.log(`Seller ${sellerId} blocked`);
      onClose()
    } catch (error) {
      console.error("Failed to approve book", error);
    }
    
  }

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
          Are you sure you want to {action} {userName} ?
        </Typography>
        <Button onClick={() => handleBlock(sellerId)} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          YES
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          CANCEL
        </Button>
      </Box>
    </Modal>
  );
};





const SellerTable: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState<{isOpen: boolean, sellerId: string , userName: string , action: string}>({isOpen: false, sellerId: ' ', userName: ' ', action: ' ' });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/sellers/getsellers');
        console.log(response);
        
        setSellers(response.data.sellers);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchSellers();
  }, [sellers]);

 
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='main-table-container'>
      <div className='Table-title'><h2>ALL SELLERSS</h2></div>
    <TableContainer component={Paper} className='Table-container'>
      <Table>
        <TableHead className='Table-head'>
          <TableRow className="Table-head-inner">
            <TableCell align='left' style={{color:'white'}}>Seller Name</TableCell>
            <TableCell align="left" style={{color:'white'}}>Email</TableCell>
            <TableCell align="left" style={{color:'white'}}>Phone</TableCell>
            <TableCell align="center" style={{color:'white'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sellers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sellers
          )?.map((seller) => (
            <TableRow key={seller._id}>
              <TableCell component="th" scope="row">{seller.username}</TableCell>
              <TableCell align="left">{seller.email}</TableCell>
              <TableCell align="left">{seller.phone}</TableCell>
              <TableCell align="center">
                    
                    {seller.isblocked?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsBlockModalOpen({ isOpen: true, sellerId: seller._id, userName:seller.username, action: "unblock" })}
                      style={{ marginRight: '10px' , textDecoration: 'none', color:'green',background: 'transparent', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'}}
                      className='unblock-button'
                    >
                      UnBlock
                    </Button>
                    :
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsBlockModalOpen({ isOpen: true, sellerId: seller._id,
                    userName:seller.username, action: "block" })}
                    style={{ marginRight: '10px', textDecoration: 'none', color:'red',background: 'transparent',  boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'}}
                    className='block-button'
                  >
                    Block
                  </Button>
                    }

                    {isBlockModalOpen &&  <BlockModal isOpen={isBlockModalOpen.isOpen} onClose={()=>setIsBlockModalOpen({ isOpen: false, sellerId: '', userName:' ', action: '' })} sellerId={isBlockModalOpen.sellerId} userName={isBlockModalOpen.userName} action={isBlockModalOpen.action}  />}
                  
                    
                 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={sellers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </div>
  );
};

export default SellerTable;

