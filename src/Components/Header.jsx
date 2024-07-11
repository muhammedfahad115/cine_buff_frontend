import { Link } from 'react-router-dom'
import './Tabs/Tabs.css'
import { useContext } from 'react';
import { myContext } from '../Context/Context';
function Header() {
    const {activeTab, setActiveTab} = useContext(myContext);
    return (
        <>
        <div className='  bg-[rgba(51,53,55,255)] px-2 py-6  flex justify-between   items-center w-full '>
            <div ><h1 className='text-3xl font-bold text-[#e6c43c] '>Rationale List Manager</h1></div>
            <div><Link to={'/profile'}><h1 className={` tab cursor-pointer text-[rgba(204,167,25,255)]  font-semibold ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')} title='profile'>{'Profile'}</h1></Link></div>
        </div>
        </>
    )
}

export default Header