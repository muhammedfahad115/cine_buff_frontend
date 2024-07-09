import gmailIcon from '../assets/Images/gmailicon.png'
import passwordIcon from '../assets/Images/password.png'
import showPasswordIcon from '../assets/Images/showPasswordIcon.png'
import hidePasswordIcon from '../assets/Images/hiddenPasswordIcon.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
            setError('All fields are required')
            return
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center bg-gray-200 items-center '>
                <form onSubmit={handleSubmit} className='w-full mx-2.5  sm:w-1/2 md:w-2/4 lg:w-2/6 rounded-3xl p-5 px-0 sm:px-2 backdrop:blur-md bg-opacity-25  shadow-2xl  bg-slate-800 h-[60%]'>
                    <h1 className='text-4xl text-center font-semibold text-white'>Login</h1>
                    <div className='flex  flex-col gap-5 mt-5 px-3'>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-5 h-5' src={gmailIcon} /></div>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} className="w-full px-5 outline-none " placeholder="Enter your Email"  />
                        </div>
                        <div className="mt-5 w-full shadow-lg bg-white p-3 flex outline-none rounded-3xl">
                            <div className='flex items-center'><img className='w-5 h-5' src={passwordIcon} /></div>
                            <input type={showPassword ? "text" : "password"}  onChange={(e) => setPassword(e.target.value)} className={`w-full px-5 outline-none `} placeholder="Enter your Password"  />
                            <div className=' flex items-center'><img className='w-4 h-4 cursor-pointer' src={showPassword ? hidePasswordIcon : showPasswordIcon} title={showPassword ? "Hide Password" : "Show Password"} onClick={handleShowPassword} /></div>
                        </div>
                    </div>
                    <div className='flex   text-center justify-center  '><p className='text-red-500 text-xs px-3 sm:w-[50%] md:w-[50%] lg:w-[30%] absolute sm:text-sm'>{error}</p></div>
                    <div className=" flex  justify-center mt-5">
                        <button type='submit' className="bg-slate-600 text-white p-2 w-24 active:scale-95 rounded-3xl mt-5">Login</button>
                    </div>
                    <div  className='flex justify-center mt-1 '><p className='text-white text-sm'>Don't have an account ? <span className='underline text-gray-500 font-semibold'><Link to="/signup">Signup</Link></span></p></div>
                </form>
            </div>
        </>
    )
}

export default Login