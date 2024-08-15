const mongoose = require("mongoose");
const Schema= mongoose.Schema;



// Define the schema for each order item within the order
const orderItemSchema = new mongoose.Schema({
  bookId: { type:String, required: true },
  sellerId: { type:String, required: true }, 
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  title:{type:String, required:true},
  orderStatus: { type: String, required: true },  
});

// Define the main order schema
const orderSchema = new mongoose.Schema({


  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming User is the model for user details
//   sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Assuming Seller is the model for seller details
  orderDate: { type: Date, default: Date.now },

  orderItems: [orderItemSchema],

  totalAmount: { type: Number, required: true },
  payment: {
    paymentId: { type: String, required: true },
    status: { type: String, required: true },
    transactionId: { type: String, required: true },
  },

  shipping: {
    method: { type: String, required: true },
    address: { type: String, required: true },
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('order', orderSchema);