const Admin= require("../Models/AdminModel")
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");


const login_admin = async (req, res, next)=>{
    const {email, password}= req.body
    let existingUser;
    try{
        existingUser= await Admin.findOne({email: email})
    }catch(err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(400).json({message:"user not found"})
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


    return res.status(200).json({message:'successfully logged in ', admin: existingUser, token})

}



module.exports= login_admin