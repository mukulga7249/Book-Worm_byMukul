import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
interface FormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    isblocked:boolean;
}
function Signup() {

    const { userType } = useParams<{ userType: string }>();

    useEffect(() => {
        console.log('User type:', userType);
        // You can use the userType retrieved from the URL as needed
    }, [userType]);


   useEffect(()=>{
    localStorage.clear()
  })

   
    const history=useNavigate();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isblocked: false
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [phoneError, setPhoneError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        // Prevent more than 10 digits in the phone number field
        if (name === 'phone' && value.length > 10) {
            return;
        }

        setFormData(prevState => ({
            ...prevState, //destructuring the previus values in form 
            [name]: value
        }));

        // Real-time validation for username
        if (name === 'username') {
            const isValid = /^[a-zA-Z0-9]+$/.test(value);
            if (!isValid) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    username: 'Only letters and numbers are allowed'
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    username: ''
                }));
            }
        }

        // Real-time validation for password length and special characters
        if (name === 'password') {
            if (value.length < 8) {
                setPasswordError('Password must be at least 8 characters long');
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                setPasswordError('Password must contain at least one special character');
            } else {
                setPasswordError('');
            }
        }

        // Real-time validation for phone number
        if (name === 'phone') {
            if (value.length !== 10 || !/^\d+$/.test(value)) {
                setPhoneError('Phone number must be 10 digits long and contain only digits');
            } else {
                setPhoneError('');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate all fields before submission
        const newErrors: Partial<FormData> = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email must be in a valid format';
        }
        if (!formData.phone || formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits long and contain only digits';
        }
        if (!formData.password || formData.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
       
        }
        if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

      
        if (Object.keys(newErrors).length === 0) {
            setErrors({})
            try {
                const res = await axios.post(`http://localhost:5001/api/signup/${userType}`, {
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    isblocked:true
                });

                const data=  res.data;
                const id=data.message._id;
                console.log(data);
                
            
                if (res.status === 201) {
                    // Signup successful, handle as needed (e.g., redirect to login page)
                    console.log('Signup successful');
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userType', `${userType}`);
                    localStorage.setItem(`${userType}_id`, id)
                    history(`/${userType}Home`);
                } else {
                    // Signup failed, display error message
                    console.log('User exists');
                    setErrors({ email: 'User already exists' });
                }
            } catch (error) {
                setErrors({ email: 'User already exists' });
                console.error('Error during signup:', error);
                // Handle other errors (e.g., network issues)
            }
        } else {
            setErrors(newErrors);
        }

    };

  return (
    <div className='containerforsignup' >
    <div className="login-box">
                        {/* <IoCloseCircle onClick={closePopup} className="close-btn" /> */}
                        <h2>SIGN UP</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="user-box">
                                <input type="text" name="username" required value={formData.username} onChange={handleChange} />
                                <label>Username</label>
                                {errors.username && <p className="error">{errors.username}</p>}
                            </div>
                            <div className="user-box">
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                                <label>Email</label>
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <div className="user-box">
                                <input type="tel" name="phone" pattern="[0-9]{10}" required value={formData.phone} onChange={handleChange} />
                                <label>Phone Number</label>
                                {errors.phone && <p className="error">{errors.phone}</p>}
                                {phoneError && <p className="error">{phoneError}</p>}
                            </div>
                            <div className="user-box">
                                <input type="password" name="password" required value={formData.password} onChange={handleChange} />
                                <label>Password</label>
                                {errors.password && <p className="error">{errors.password}</p>}
                                {passwordError && <p className="error">{passwordError}</p>}
                            </div>
                            <div className="user-box">
                                <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                                <label>Confirm Password</label>
                                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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

                        <div className='signin-or-signup'>
                            Existing User? 
                           
                            <Link to={`/signin/${userType}`} style={{textDecoration:'none'}}> <span className='msg'>SIGN IN HERE !  </span></Link>
                            <FaRegHandPointRight className='right-point-hand'/>
                           



                        </div>

                    </div>
                    </div>
    
  )
}

export default Signup