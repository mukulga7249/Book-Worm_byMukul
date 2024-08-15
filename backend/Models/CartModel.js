const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const cartSchema = new mongoose.Schema({
  
  price: Number,
  orderquantity: Number,
  status:String,
  user_id:String,
  seller_id:String, 
  book_id:String 

})

  module.exports = mongoose.model('carts', cartSchema);