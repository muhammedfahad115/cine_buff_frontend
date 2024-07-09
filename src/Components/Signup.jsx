import gmailIcon from '../assets/Images/gmailicon.png'
import passwordIcon from '../assets/Images/password.png'
import showPasswordIcon from '../assets/Images/showPasswordIcon.png'
import hidePasswordIcon from '../assets/Images/hiddenPasswordIcon.png'
import setPasswordIcon from '../assets/Images/setPasswordIcon.png'
import userIcon from '../assets/Images/usericon.png'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const checkRegexPasssword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const regexValidation = (password) => {
        if (checkRegexPasssword.test(password)) {
            setError('')
            return true
        }
        else {
            setError('Password must have 1 uppercase, 1 lowercase, 1 number and 1 special character.')
            return;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!email || !name || !password || !confirmPassword){
                setError('All fields are required')
                return;
            }
            if (password !== confirmPassword) {
                setError('Password does not match')
                return;
            }
            const response = await axios.post('http://localhost:5000/signup', { email, name, password })    
        } catch (error) {
            if(error.response.data.error){
               setError(error.response.data.error)
            }else{
                setError('')
            }
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center bg-gray-200 items-center '>
                <form onSubmit={handleSubmit} className='w-full mx-2.5  sm:w-1/2 md:w-2/4 lg:w-2/6 rounded-3xl p-5 px-0 sm:px-2 bg-opacity-25  shadow-2xl  bg-slate-800 h-auto'>
                    <h1 className='text-4xl text-center font-semibold text-white'>Signup</h1>
                    <div className='flex  flex-col mt-5 px-3'>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-4 h-4' src={userIcon} /></div>
                            <input type="text" onChange={(e) => setName(e.target.value)} className="w-full px-5 outline-none " placeholder="Enter your Full Name"  />
                        </div>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-4 h-4' src={gmailIcon} /></div>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-5 outline-none " placeholder="Enter your Email"  />
                        </div>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-4 h-4' src={setPasswordIcon} /></div>
                            <input type={showPassword ? "text" : "password"} onBlur={password ? () => regexValidation(password) : null} onChange={(e) => setPassword(e.target.value)} className={`w-full px-5 outline-none `} placeholder="Enter your Password"  />
                            <div className=' flex items-center'><img className='w-4 h-4 cursor-pointer' src={showPassword ? hidePasswordIcon : showPasswordIcon} title={showPassword ? "Hide Password" : "Show Password"} onClick={handleShowPassword} /></div>
                        </div>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-4 h-4' src={passwordIcon} /></div>
                            <input type={showConfirmPassword ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full px-5 outline-none `} placeholder="Confirm your Password"  />
                            <div className=' flex items-center'><img className='w-4 h-4 cursor-pointer' src={showConfirmPassword ? hidePasswordIcon : showPasswordIcon} title={showConfirmPassword ? "Hide Password" : "Show Password"} onClick={handleShowConfirmPassword} /></div>
                        </div>
                    </div>
                    <div className='flex   text-center justify-center  '><p className='text-red-500 mt-1 text-xs px-3 sm:w-[50%] md:w-[50%] lg:w-[30%] absolute sm:text-sm'>{error}</p></div>
                    <div className=" flex  justify-center mt-5">
                        <button type='submit' className="bg-slate-600 text-white p-2 w-24 active:scale-95 rounded-3xl mt-5">Sign Up</button>
                    </div>
                    <div className='flex justify-center mt-1 '><p className='text-white text-sm'>Already have an account ? <span className='underline text-gray-500 font-semibold'><Link to="/login">Login</Link></span></p></div>
                </form>
            </div>
        </>
    )
}

export default Signup