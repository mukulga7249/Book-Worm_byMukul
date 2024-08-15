import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { OrderServices } from '../../Services/OrderService';
import { OrderData } from '../../Types/Orders';
import Layout from './Layout';
import './SellerOrders.css'

function SellerOrder() {
    
    const sellerId = localStorage.getItem('seller_id');
    const [orders, setOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        fetchOrders(); // Fetch orders when the component mounts
    }, []);

    const fetchOrders = async () => {
        try {
            // Fetch order data by seller ID
            const response = await OrderServices.getOrderDataBySellerId(sellerId as string);
            console.log(response);   
            setOrders(response); // Set the orders state with the fetched data
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleConfirmOrder = async (orderId: string, bookId: string) => {
        try {
            // Make API call to update order status for a specific book in the order
            console.log(orderId,bookId);
            
            await axios.put(`http://localhost:5001/api/orders/${orderId}/books/${bookId}`, { orderStatus: 'Dispatched' });
            // Refetch orders to update the UI
            fetchOrders();
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };
    
  
    

    return (
        <>
       
        <Layout>
        <TableContainer className='seller-orders mb-5'>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>User ID</TableCell>
                        <TableCell>Book Title</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='seller-columns'>
                    {orders.map((order, index) => (
                        order.orderItems.map((item, itemIndex) => (
                            <TableRow key={`${index}-${itemIndex}`}>
                                <TableCell>{order.userId}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    {item.orderStatus==="Dispatched"?
                                    <h6>Order Dispatched</h6>
                                    :
                                    <Button variant="outlined" onClick={() => handleConfirmOrder(order._id as string, item.bookId)}>Dispatch Order</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Layout>
        </>
    );
}

export default SellerOrder;
