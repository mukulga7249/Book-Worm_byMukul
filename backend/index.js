const express= require("express") //framework for building API 

const connectDb= require("./DB_Connection/DbConnection")  //Function to establish a connection with MongoDB.

const dotenv = require ("dotenv").config(); // Loads environment variables from a .env file into process.env. , it is getting displayed as unused but without this we wont be able to connect to the database

const cors=require ("cors")

const router = require("./Routes/Routes")
const cookieParser=require("cookie-parser")

connectDb() //initiates a nconnection to the mongoDB database 


const app=express(); // creates an express application
app.use(cors()) //for cross origin communication
app.use(cookieParser())

const port= process.env.PORT || 5000; //Sets the port on which the server will listen. It tries to use the PORT environment variable; if not found, it defaults to 5000.
app.use(express.json())  //Adds middleware to parse JSON request bodies.
app.use('/api', router)


app.listen(port, ()=>{
    console.log(`server runnning on ${port}`);
})  // Starts the server and logs a message to the console indicating the port it's running on.