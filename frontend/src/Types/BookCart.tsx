export interface BookCart {
 
    "_id"?: string;
    "price": number;
    "orderquantity": number;
    "status":string;
    "user_id":string;
    "seller_id":string; 
    "book_id":string | undefined   
}