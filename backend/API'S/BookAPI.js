const mongoose= require('mongoose')
const express= require('express')
const cors= require('cors')
const ProductModel = require('../Models/BookModel')
require("../DB_Connection/DbConnection") // establish a connection 

const server=express();

server.use(express.json()) 
server.use(cors())

server.post("/addBook", (request, response)=> {
        console.log("Backend API");
        const product= new ProductModel(request.body);
        
        const result= product.save();
        response.send(result);

})

server.get("/getBook", async(request, response)=> {
    console.log("Frontend API");
    const result= await ProductModel.find();
    console.log(result);
    response.send(result);

})


// ex.get("/getProduct",async (request,response)=>{
//     // console.log("Backend APiiI");
//     // const result = await ProductModel.find();
//     // console.log("Hello");
//     // response.send(result);
//     try {
//         const result = await ProductModel.find();
//         console.log(result); // Print the data
//         response.send(result);
//     } catch (error) {
//         console.error(error);
//         response.status(500).send("Internal Server Error");
//     }
// })

server.get("/getBook/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const result = await ProductModel.findById(id);
        if (!result) {
            return response.status(404).send("Book not found");
        }
        response.send(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

// Add update route
server.put("/updateBook/:id", async (request, response) => {
    const id = request.params.id;
    const newData = request.body;
    try {
        const result = await ProductModel.findByIdAndUpdate(id, newData, { new: true });
        if (!result) {
            return response.status(404).send("Book not found");
        }
        response.send(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});

server.delete("/deleteBook/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const result = await ProductModel.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send("Book not found");
        }
        response.send("Book deleted successfully");
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
});


server.listen(4000,()=>{
    console.log("Server running on 4000 port");
})