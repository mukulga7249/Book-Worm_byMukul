const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const BookSchema= new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
        // unique: true
    },

    price: {
        type : Number,
        required: true,
        // minlength: 6
    },
    quantity: {
        type : Number,
        required: true,
        // minlength: 6
    },
    summary:{
        type: String,
        required: true,
        
    },
    image:{
        type: String,
        required: false,
   
    },
    genre:{
        type: String,
        required: true,
      
    },
    publishYear: {
        type : Number,
        required: true,
        // minlength: 6
    },
    isApproved: {
        type : Boolean,
        required: true,
        // minlength: 6
    },
    isRejected: {
        type : Boolean,
        required: true,
        // minlength: 6
    },
    sellerId: {
        type : String,
        required: true,
        // minlength: 6
    },
    favOf: [{
        type: String
    }]
})

module.exports = mongoose.model('books', BookSchema)
