import axios from 'axios'
import { Book } from '../Types/Book';

export class BookService
{
    public static async addBookDetails(book:Book):Promise<Book>
    {
        console.log("Frontend Service");

        console.log(book);
        const result = await axios.post('http://localhost:5001/api/addBooks',book);
        return result.data;
        
    }

    public static async getBookDetails(): Promise<Book[]> {
        try {
            console.log("Fetching Book Data");
            
            const result = await axios.get(`http://localhost:5001/api/getBooks`);
            console.log(result.data);
            const data = result.data; 
            return result.data;
        } catch (error) {
            console.error("Error while fetching product details:", error);
            throw error;
        }
    }
    

    public static async getBooksBySellerId(id:string): Promise<Book[]> {
        try {
            console.log("Fetching Book by seller ID:", id);
            const result = await axios.get(`http://localhost:5001/api/getBooksBySellerId/${id}`);
            console.log(result.data);

            return result.data;

        } catch (error) {
            console.error("Error while fetching book by ID:", error);
            throw error;
        }
    }

    public static async getBookById(id:string): Promise<Book> {
        try {
            console.log("Fetching Book by ID:", id);
            const result = await axios.get(`http://localhost:5001/api/getBookById/${id}`);
            console.log(result.data);

            return result.data;
        } catch (error) {
            console.error("Error while fetching book by ID:", error);
            throw error;
        }
    }

    public static async updateBookDetails(id: string, newData: Book): Promise<Book> {
        try {
            console.log("Updating Book with ID:", id);
            const result = await axios.put(`http://localhost:5001/api/updateBook/${id}`,newData);
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.error("Error while updating book details:", error);
            throw error;
        }
    }

    public static async deleteBookById(id: string): Promise<void> {
        try {
            console.log("Deleting Book with ID:", id);
            await axios.delete(`http://localhost:5001/api/deleteBook/${id}`);
            console.log("Book deleted successfully");
        } catch (error) {
            console.error("Error while deleting book by ID:", error);
            throw error;
        }
    }
    

    public static async searchBook(searchbook:string): Promise<Book> {
        try {
            console.log("Fetching Book by ID:", searchbook);
            const result = await axios.get(`http://localhost:5001/api/getBook/${searchbook}`);
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.error("Error while fetching book by ID:", error);
            throw error;
        }
    }

}