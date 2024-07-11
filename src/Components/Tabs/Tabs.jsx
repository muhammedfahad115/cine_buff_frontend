import { useContext, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Tabs.css'
import { myContext } from '../../Context/Context';

function Tabs() {
    const location = useLocation();
    const {activeTab, setActiveTab} = useContext(myContext);
  
  
    useEffect(() => {
      if (location.pathname === '/admin') {
        setActiveTab('admin');
      } else if (location.pathname === '/') {
        setActiveTab('user');
      }
    }, [location.pathname]);
  return (
    <>
        <div className="w-full px-2 sm:px-3 bg-[#646669]">
      <div className="flex space-x-4 border-b border-yellow-500 ">
        <Link to="/">
        <div 
          className={`tab cursor-pointer text-white py-2 ${activeTab === 'user' ? 'active' : ''}`} 
          onClick={() => setActiveTab('user')}
        >
          User
        </div>
        </Link>
        <Link to={"/admin"}>
        <div 
          className={`tab cursor-pointer text-white py-2 ${activeTab === 'admin' ? 'active' : ''}`} 
          onClick={() => setActiveTab('admin')}
        >
          Admin
        </div>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Tabs