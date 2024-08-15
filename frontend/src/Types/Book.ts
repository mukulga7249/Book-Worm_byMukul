export interface Book
{
    "title": string,
    "author": string,
    'price':number,
    'quantity':number,
    'summary':string,
    "image":string,
    'genre':string,
    'publishYear': number,
    'isApproved':boolean,
    'isRejected':boolean,
    'sellerId':string,
    // 'imageData': FormData | null;
    '_id'?:string,
    'isFavorite'?:boolean
}

