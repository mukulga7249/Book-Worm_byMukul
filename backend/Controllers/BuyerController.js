const Buyer= require("../Models/BuyerModel");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
//const JWT_SECRET_KEY="mykey" //prefer to store secret key in .env file 

const signup_buyer= async (req, res, next )=>{
    const {username, email, phone, password, isblocked}=req.body; //destructuring everything from the request body 
    let existingUser;
    try{
        existingUser= await Buyer.findOne({email:email});
    }catch (err){
        //console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message:"User already Exists "})
    }

    const hashedPassword= bcrypt.hashSync(password)


    const buyer=new Buyer({
        username,
        email,
        phone,
        password: hashedPassword,
        isblocked:false

    });

    try{
        await buyer.save();
    } catch (err){
        console.log(err);
    }

    return res.status(201).json({message:buyer})
   

}; 


const login_buyer = async (req, res, next)=>{
    const {email, password}= req.body

    let existingUser;
    try{
        existingUser= await Buyer.findOne({email: email})
    }catch(err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(202).json({message:"user not found. Signup please"})
    }


    let blockedUser;
    try{
        blockedUser= await Buyer.findOne({email: email, isblocked:true})
    }catch(err){
        return new Error(err);
    }

    if(blockedUser){
        return res.status(201).json({message:"This user is blocked"})
    }




    const isPasswordCorrect= bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Invalid Email/ Password'})
    }

    const token=jwt.sign({id:existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:"30s"
    })

    console.log("Generated token", token);


    res.cookie(String(existingUser._id), token,{
        path:'/',
        expires: new Date(Date.now()+1000*30),
        httpOnly: true,
        sameSite: 'lax'
    })


    return res.status(200).json({ buyer: existingUser, token})

}


const verifyToken =(req, res, next)=>{
    const cookies=req.headers.cookie;
    const token = cookies.split('=')[1];
    console.log(token);

    if(!token){
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, buyer)=>{
       if(err){
         return res.status(400).json({message:"Invalid token"})
        }

        console.log(buyer.id);
        req.id=buyer.id;
    })
    next()  
}


const getBuyer =async (req,res, next)=>{
    const buyerId= req.id;
    let buyer;
    try{
        buyer= await Buyer.findById(sellerId, "-password")
    }catch(err){
        return new Error(err)
    }

    if(!buyer){
        return res.status(404).json({message:"User not found "})
    }

    return res.status(200).json({buyer})


}


const getBuyers= async (req, res, next) => {
    try {
      // Query all documents from the book collection
      const buyers = await Buyer.find().select('-password');
  
      // If there are no books found, return a 404 response
      if (buyers.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      // Return the retrieved books in the response
      return res.status(200).json({ buyers });
    } catch (error) {
      // Handle errors
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



  const getTotalCount = async (req, res, next) => {
    try {
      // Use the countDocuments() method to get the total count
      const totalCount = await Buyer.countDocuments();
  
      // Return the total count in the response
      return res.status(200).json({ totalCount });
    } catch (error) {
      // Handle errors
      console.error('Error fetching total count:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

exports.signup_buyer = signup_buyer;
exports.login_buyer= login_buyer;
exports.verifyToken=verifyToken;
exports.getBuyer=getBuyer;
exports.getBuyers=getBuyers;
exports.getTotalCount=getTotalCount