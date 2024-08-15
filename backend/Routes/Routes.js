const express= require('express');
const cloudinary = require('cloudinary').v2;

const stripe = require("stripe")(process.env.STRIPE_SECRET);
require("dotenv").config();

// const { getCart , deleteCartBooks, addToCart, getCartBook,updateQuantity}= require('../Controllers/CartController')
// const { signup, login, verifyToken, getSeller, getSellers ,getSellerCount } = require('../Controllers/SellerController');
const { getCart , deleteCartBooks, addToCart, getCartBook,updateQuantity, getCartBookDetailsById, deleteCartBooksByUserId}= require('../Controllers/CartController')
const { signup, login, verifyToken, getSeller, getSellers ,getSellerCount, blockSeller, unblockSeller } = require('../Controllers/SellerController');
const { signup_buyer, login_buyer, getBuyers, getTotalCount } = require('../Controllers/BuyerController');
// const { getBooks, approval,addBooks,deleteBooks,updateBookDetails, uploadImages, getBookById } = require('../Controllers/BookController');
// const { signup_buyer, login_buyer, getBuyers, getTotalCount} = require('../Controllers/BuyerController');
const { getAllBooks,getBooks,getBookById, approval,addBooks,deleteBooks,updateBookDetails, uploadImages, getBook, getApprovedBooks, getBookDetailsById, getBooksforAdmin, rejection, getPendingBooks, getBooksBySellerId, updateBookQuantities, booksByGenre, booksCount, updateFavStatus, checkisFav, removeFav } = require('../Controllers/BookController');
const login_admin = require('../Controllers/AdminController');
const { uploadPhoto } = require('../Middleware/uploadImages');
const cloudinaryUploadImg = require('../Utils/cloudinary');
const { saveOrderToDatabase, getOrders, getBuyerOrders, getOrdersBySellerId, updateOrderStatus, ordersCount, ordersByStatus } = require('../Controllers/OrdersController');
const router= express.Router();

//Commmon Routes 
router.post('/signup/seller', signup);
router.post('/login/seller', login);
router.get('/user', verifyToken, getSeller)
router.post('/signup/buyer', signup_buyer)
router.post('/login/buyer', login_buyer)
router.post('/login/admin', login_admin)

//Admin Routes
router.get('/books', getBooksforAdmin)
router.put('/books/approval/:bookId', approval)
router.get('/buyers/getbuyers', getBuyers)
router.get('/sellers/getsellers', getSellers)
router.get('/buyer/count', getTotalCount)
router.get('/seller/count', getSellerCount)
router.put('/books/rejection/:bookId', rejection)
router.get('/books/pending', getPendingBooks)
router.get('/books/genre', booksByGenre)
router.get('/books/count', booksCount )
router.get('/orders/count', ordersCount )
router.put('/seller/block/:sellerId', blockSeller)
router.put('/seller/unblock/:sellerId', unblockSeller)
router.get('/orders/status', ordersByStatus)



//Seller routes
router.get('/getBooks', getAllBooks)
router.post('/getBookbyID/:id',getBook)
router.post('/addBooks',addBooks );
router.put('/updateBook/:id',updateBookDetails);
router.delete('/deleteBook/:id', deleteBooks);
router.get('/getBookById/:id', getBookById);
router.get('/getBooksBySellerId/:id',getBooksBySellerId);

//Buyer Section Routes 
router.get("/approvedBooks", getApprovedBooks);
router.get("/getBookDetailsById/:id", getBookDetailsById);
router.post("/updateBookQuantities",updateBookQuantities);
router.post('/addFav/:bookId', updateFavStatus)
router.post('/removeFav/:bookId', removeFav)
router.get('/checkFav/:bookId/:userId', checkisFav)
   

//cart routes
router.get('/cart/:user_id',getCart);
router.get('/getCartBook/',getCartBook);
router.delete('/deleteCartBook/:id',deleteCartBooks);
router.post('/addToCart',addToCart);
router.post('/updatequantity/:id',updateQuantity)
router.get('/getCartBookDetailsById/:id',getCartBookDetailsById);
router.delete('/deleteCartBooksByUserId/:id',deleteCartBooksByUserId);



//Order routes
router.post('/orders',saveOrderToDatabase);
router.get('/getOrders', getOrders)
router.get('/getBuyerOrders/:userId', getBuyerOrders)
router.get('/sellerorders/:id', getOrdersBySellerId)
router.put('/orders/:orderId/books/:bookId', updateOrderStatus);

router.post('/uploadImages', uploadPhoto.single('image'), async(req, res) => {
    // Handle uploaded image. The uploaded image will be available as req.file.
    console.log(req.file);
    
    const { url } = await cloudinaryUploadImg(req.file.path);
    console.log(url);
    res.send(url);
});


router.post("/create-checkout-session/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const { products } = req.body;
        console.log(products);
        // console.log(customer_email);

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd", // Change currency to USD for US mode
                product_data: {
                    name: product.title,
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100), // Convert price to smallest currency unit (cents)
            },
            quantity: product.orderquantity
        }));

        // Determine if the transaction is in USD or not
        const isUsdTransaction = lineItems.some(item => item.price_data.currency === 'inr');

        const sessionOptions = {
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/payment-success`,
            cancel_url: "http://localhost:3000/cancel",
            billing_address_collection: "auto",
            shipping_address_collection: {}
        };

        // Check if Stripe is in test mode
        if (stripe.mode === 'test') {
            sessionOptions.shipping_address_collection = {
                allowed_countries: isUsdTransaction ? ["US"] : ["*"] // Allow US for USD transactions
            };
        } else {
            sessionOptions.shipping_address_collection = {
                allowed_countries: ["US"] // Only allow US for non-test mode transactions
            };
        }

        const session = await stripe.checkout.sessions.create(sessionOptions);

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

//verify token


// router.post('/addBooks',uploadPhoto.single('image'),async(req,res)=>{

//     console.log(req.file);
// })
module.exports= router