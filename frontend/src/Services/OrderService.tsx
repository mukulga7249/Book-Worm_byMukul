import { BookCart } from "../Types/BookCart";
import axios from "axios";
import { OrderData } from "../Types/Orders";

export class OrderServices{

//     public static async postOrderData (orderData) => {
//     try {
//       // Make POST request to the server endpoint with order data
//       const response = await axios.post('http://localhost:5001/api/orders', orderData);
      
//       console.log('Order data posted successfully:', response.data);
//       return response.data; // Return the response data from the server
//     } catch (error) {
//       console.error('Error posting order data:', error);
//       throw error; // Throw error if posting fails
//     }
//   };

 // Import the OrderData interface

    public static async getOrderDataBySellerId (sellerId: string): Promise<OrderData[]>
     {
            try {
                const response = await axios.get(`http://localhost:5001/api/sellerorders/${sellerId}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching order data:', error);
                throw error; // You might want to handle this error more gracefully in your application
            }
};


}