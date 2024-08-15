import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import "./login.css"
// import {image} from "../Assets/bookBG.jpg"
import { Link } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';

interface SignInFormData {
    email: string;
    password: string;
}
function Signin() {
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false)
    const { userType } = useParams<{ userType: string }>();

    useEffect(() => {
        console.log('User type:', userType);
        // You can use the userType retrieved from the URL as needed
    }, [userType]);

    useEffect(()=>{
        localStorage.clear()
      })
 

   const history=useNavigate();

   const [errors, setErrors] = useState<Partial<SignInFormData>>({});
   const [passwordError, setPasswordError] = useState<string>('');
   const [signin, setsignin]= useState<SignInFormData>({
    email: '',
    password: ''

})

   const handleChangeSignin=(e: React.ChangeEvent<HTMLInputElement>) =>{
       const{name, value}= e.target;
       setsignin(prevState => ({
           ...prevState, //destructuring the previus values in form 
           [name]: value
       }));
       if (name === 'password') {
           if (value.length < 8) {
               setPasswordError('Password must be at least 8 characters long');
           } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
               setPasswordError('Password must contain at least one special character');
           } else {
               setPasswordError('');
           }
       }

   }

   const handleSignIn = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    
   
    try{
        const res=await axios
        .post(`http://localhost:5001/api/login/${userType}`,{
            email: signin.email,
            password:signin.password
        })
        const data=  res.data;
        
        if (res.status === 202) {
            // Assuming the server responds with a 400 status and a message for existing emails
            console.log("error");
            setErrors({ email: data.message });
        }
        
        if(res.status===201){
            setIsModalOpen(true);
        }
        
        else {
            console.log(data);
            let id='';
            if (userType==='buyer'){
                id = data.buyer._id
            }

            if (userType==='seller'){
                id = data.seller._id
            }

            if (userType==='admin'){
                id = data.message._id
            }
            console.log(id);
            
           
            // Handle successful signup, such as redirecting to a login page or clearing the form
            console.log('navigate');
            // After successful login
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userType', `${userType}`);
            localStorage.setItem(`${userType}_id`, id)

            
            history(`/${userType}Home`)
        }
       
    }catch (error) {
        console.error(error);
    }



}
  return (
    <div className='containerforsignin' >
    <div className="login-box">
    <h2>SIGN IN</h2>
    <form onSubmit={handleSignIn} >

        <div className="user-box">
            <input type="email" name="email" required value={signin.email} onChange={handleChangeSignin} />
            <label>Email</label>
            {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="user-box">
            <input type="password" name="password" required value={signin.password} onChange={handleChangeSignin} />
            <label>Password</label>
            {errors.password && <p className="error">{errors.password}</p>}
            {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div className='btn'>
            <button type="submit" id="submitBtn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </button>
        </div>
    </form>

    <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="logout"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '18px',
            borderColor:'tra'
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" className='logout-msg'>
            <h4>Your access to this website is blocked by admin</h4>
            <h4>Please Contact at admin@gmail.com if you think it was a mistake</h4>
          </Typography>
          <br/>
          <br/>
          <Button onClick={()=>setIsModalOpen(false)} variant="contained" color="secondary"  >
            OKAY
          </Button>
        </Box>
      </Modal>
    {userType !== 'admin' &&

    <div className='signin-or-signup'>
        New User? 
        
        <Link to={`/signup/${userType}`} style={{textDecoration:'none'}}><span className='msg'> SIGN UP HERE ! </span></Link> 
        <FaRegHandPointRight className='right-point-hand'/>
        

    
    </div>}

</div>
</div>
    
  )
}

export default Signin