import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const [showHome, setShowHome] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname !== '/'){
            setShowHome(true);
        }else{
            setShowHome(false);
        }
    },[location])
    return (
        <>
        <div className='  bg-[rgba(51,53,55,255)] px-2 py-4  flex justify-between text-[rgba(204,167,25,255)] items-center w-full '>
            <div ><h1 className='text-3xl font-semibold  '>Rationale List Manager</h1></div>
            <div><Link to={showHome ? '/' : '/profile'}><h1 className='cursor-pointer font-semibold' title='profile'>{showHome ? 'Home' : 'Profile'}</h1></Link></div>
        </div>
        </>
    )
}

export default Header