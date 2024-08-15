const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const SellerSchema= new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type : String,
        required: true,
        // minlength: 6
    },
    isblocked : {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Seller', SellerSchema)

//MONGODB WILL BY DEFAULT TAKE COLLECTION NAME IN PLURAL AND SMALLCASE 