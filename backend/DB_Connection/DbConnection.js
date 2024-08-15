
// const mongoose=require('mongoose')
// const con= mongoose.connect("mongodb+srv://priti:majorproject123@cluster0.atzwpcl.mongodb.net/FET_Major_Project_G2")
// if(con)
// {
//     console.log("Connected to DB");
// }

const mongoose=require('mongoose')

const connectDb= async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("db connected");

    }catch(err){
        console.log(err);
        process.exit(1);

    }
}
module.exports =connectDb