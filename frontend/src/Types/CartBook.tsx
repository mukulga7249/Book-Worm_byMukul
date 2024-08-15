export interface CartBook{
    'id': string;
    'price': number;
    'orderquantity': number;
    'image': string;
    'status':string;
    "title": string,
    "author": string,
    
    'quantity':number,
    'summary':string,
    
    'genre':string,
    'publishYear': number,
    'isApproved':boolean,
    'isRejected':boolean,
    'sellerId':string,
    // 'imageData': FormData | null;
    '_id'?:string,
    
}