import { BookCart } from "../Types/BookCart";
import axios from "axios";
import { CartBook } from "../Types/CartBook";

export class CartServices{

    public static async deleteBookById(id: string): Promise<void> {
        try {
            console.log("Deleting Book with ID:", id);
            await axios.delete(`http://localhost:5001/api/deleteCartBook/${id}`);
            console.log("Book deleted successfully");
        } catch (error) {
            console.error("Error while deleting book by ID:", error);
            throw error;
        }
    }

    public static async getCartBookDetailsById(id: string): Promise<[]> {
        try {
            const result = await axios.get(`http://localhost:5001/api/getCartBookDetailsById/${id}`);
            console.log(result.data);
            const data = result.data; 
            return result.data;
        } catch (error) {
            console.error("Error while deleting book by ID:", error);
            throw error;
        }
    }
    

    public static async addTOCart(cart:BookCart):Promise<BookCart>
    {
        console.log("Frontend Service in cart");
        console.log(cart);
        const result = await axios.post('http://localhost:5001/api/addToCart',cart);
        return result.data;
        
    }

    public static async getCartBookDetails(): Promise<BookCart[]> {
        try {
            console.log("Fetching Book in Cart Data");
            
            const result = await axios.get(`http://localhost:5001/api/getCartBook`);
            console.log(result.data);
            const data = result.data; 
            return result.data;
        } catch (error) {
            console.error("Error while fetching product details:", error);
            throw error;
        }
    }

    public static async updateQuantity(id:string,quantity:number):Promise<void>
    {
        console.log("Frontend Service in cart");
        console.log("-----------------------------",quantity);
        const result = await axios.post(`http://localhost:5001/api/updatequantity/${id}`,{ quantity });
        console.log("quantity updated succesfully",result.data);
        
        return result.data;
               
    }

}
