const Seller= require("../Models/SellerModel");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const SellerModel = require("../Models/SellerModel");
//const JWT_SECRET_KEY="mykey" //prefer to store secret key in .env file 

const signup = async (req, res, next )=>{
    const {username, email,phone, password}=req.body; //destructuring everything from the request body 
    let existingUser;
    try{
        existingUser= await Seller.findOne({email:email});
    }catch (err){
        //console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message:"User already "})
    }

    const hashedPassword= bcrypt.hashSync(password)


    const seller=new Seller({
        username,
        email,
        phone,
        password: hashedPassword,
        isblocked:false

    });

    
    try{
        await seller.save();
    } catch (err){
        console.log(err);
    }


    
   

    return res.status(201).json({message:seller})
   

}; 


const login = async (req, res, next)=>{
    const {email, password}= req.body

    let existingUser;
    try{
        existingUser= await Seller.findOne({email: email})
    }catch(err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(202).json({message:"user not found. Signup please"})
    }



    let blockedUser;
    try{
        blockedUser= await Seller.findOne({email: email, isblocked:true})
    }catch(err){
        return new Error(err);
    }

    if(blockedUser){
        return res.status(201).json({message:"This user is blocked"})
    }

    try{
        await seller.save();
    } catch (err){
        console.log(err);
    }

    const isPasswordCorrect= bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Invalid Email/ Password'})
    }

    const token=jwt.sign({id:existingUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:"30s"
    })

    console.log("Generated token", token);

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`]="";
    }

    res.cookie(String(existingUser._id), token,{
        path:'/',
        expires: new Date(Date.now()+1000*30),
        httpOnly: true,
        sameSite: 'lax'
    })


    return res.status(200).json({ seller: existingUser, token})

}


const verifyToken =(req, res, next)=>{
    const cookies=req.headers.cookie;
    const token = cookies.split('=')[1];
    console.log(token);

    if(!token){
        res.status(404).json({message:"No token found"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, seller)=>{
       if(err){
         return res.status(400).json({message:"Invalid token"})
        }

        console.log(seller.id);
        req.id=seller.id;
    })
    next()  
}


const getSeller =async (req,res, next)=>{
    const sellerId= req.id;
    let seller;
    try{
        seller= await Seller.findById(sellerId, "-password")
    }catch(err){
        return new Error(err)
    }

    if(!seller){
        return res.status(404).json({message:"User not found "})
    }

    return res.status(200).json({seller})
}



const getSellers= async (req, res, next) => {
    try {
      // Query all documents from the book collection
      const sellers = await Seller.find().select('-password');
  
      // If there are no books found, return a 404 response
      if (sellers.length === 0) {
        return res.status(404).json({ message: "No sellers found" });
      }
  
      // Return the retrieved books in the response
      return res.status(200).json({ sellers });
    } catch (error) {
      // Handle errors
      console.error('Error fetching sellers:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  
  const getSellerCount = async (req, res, next) => {
    try {
      // Use the countDocuments() method to get the total count
      const totalCount = await Seller.countDocuments();
  
      // Return the total count in the response
      return res.status(200).json({ totalCount });
    } catch (error) {
      // Handle errors
      console.error('Error fetching total count:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  const blockSeller=async (req, res) => {
    const sellerId = req.params.sellerId;
    const { isblocked } = req.body;
  
    try {
      // Find the book by ID and update the isApproved field
      const updatedSeller = await Seller.findByIdAndUpdate(sellerId, { isblocked:true }, { new: true });
  
      if (!updatedSeller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Return the updated book object
      res.json(updatedSeller);
    } catch (error) {
      console.error('Error updating Seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


  const unblockSeller=async (req, res) => {
    const sellerId = req.params.sellerId;
    const { isblocked } = req.body;
  
    try {
      // Find the book by ID and update the isApproved field
      const updatedSeller = await Seller.findByIdAndUpdate(sellerId, { isblocked:false }, { new: true });
  
      if (!updatedSeller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Return the updated book object
      res.json(updatedSeller);
    } catch (error) {
      console.error('Error updating Seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


exports.signup = signup;
exports.login= login;
exports.verifyToken=verifyToken;
exports.getSeller=getSeller
exports.getSellers=getSellers
exports.getSellerCount=getSellerCount
exports.blockSeller= blockSeller
exports.unblockSeller=unblockSeller