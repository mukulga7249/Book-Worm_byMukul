
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
 
import {useParams} from 'react-router-dom'
import Header from './Buyer-header/Buyer-header';
import './PlacedOrder.css'
import BuyerFooter from './Buyer-footer';

// Assuming this is the structure of your book data


interface Item {
    bookId: string;
    price: number;
    sellerId: string;
    orderId: string;
    buyerId: string;
    title: string;
    OrderStatus:string;
}

const PlacedOrders: React.FC = () => {
 
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {userId} = useParams();


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/getBuyerOrders/${userId}`);
                console.log("response",response.data);
                const allItems: Item[] = [];
                response.data.forEach((order: { orderItems: any[]; _id: any; userId: any }) => {
                    order.orderItems.forEach(item => {
                        allItems.push({
                            bookId: item.bookId,
                            price: item.price,
                            sellerId: item.sellerId,
                            orderId: order._id,
                            buyerId: order.userId,
                            title: item.title,
                            OrderStatus:item.orderStatus

                        });
                    });
                })
                console.log("All Items", allItems);
                

                setItems(allItems);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchOrders();
    }, []);


    // console.log("These are items", items);
    

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='buyer-order-container'>
        <Header/>
        <div className='main-table-container-buyer'>
            <div className='Table-title-buyer'><h2>Orders</h2></div>
            <TableContainer component={Paper} className='Table-container'>
                <Table>
                    <TableHead className='Table-head'>
                        <TableRow>

                            <TableCell align="left" style={{color:'white'}}>ORDER ID</TableCell>
                            <TableCell align="left" style={{color:'white'}}>SELLER ID</TableCell>
                            <TableCell align="left" style={{color:'white'}}>ORDERED BOOK</TableCell>
                            <TableCell align="left" style={{color:'white'}}>AMOUNT</TableCell>
                            <TableCell align="left" style={{color:'white'}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : items
                        ).map((items) => (
                            <>
                                <TableRow key={`${items.bookId}`}>
                                    <TableCell align="left">{items.orderId}</TableCell>
                                    {/* <TableCell align="left">{items}</TableCell> */}
                                    <TableCell align="left">{items.sellerId}</TableCell>
                                    <TableCell align="left">{items.title}</TableCell>
                                    <TableCell align="left">{items.price}</TableCell>
                                    <TableCell align="left">{items.OrderStatus}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
        <BuyerFooter/>
        </div>
    );
};

export default PlacedOrders;

