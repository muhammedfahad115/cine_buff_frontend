import { useEffect, useState } from 'react'
import userIcon from '../assets/Images/usericon.png'
import axiosInstance from '../Api/Axios';
import Spinner from './Spinner/Spinner';
function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(()=>{
    const getUserDetails = async ()=>{
     try {
      const response = await axiosInstance.get('/profile');
      // console.log(response.data);
      if (response.status === 200) {
        setUserDetails(response.data.user);
      }
     } catch (error) {
      // console.log(error);
     }
    }
    getUserDetails();
  },[])

  return (
    <>
      <div className='flex items-center  sm:h-[77%] justify-center'>
        <div className='bg-[rgba(51,53,55,255)] gap-9 sm:gap-10 flex sm:items-center flex-col sm:flex-row  px-2 text-[rgba(204,167,25,255)] rounded-xl py-3 w-full md:w-1/2  h-[70%] sm:h-[50%]' >
          <div className=' h-[110px] sm:h-full border-b sm:border-b-0 sm:border-r items-center sm:w-1/3 flex border-yellow-500 justify-center'>
            <img src={userIcon} className='w-20 h-20 sm:w-24 sm:h-24 grayscale'/>
          </div>
          <div className='flex gap-3 flex-col'>
            {userDetails ? <><p className=' font-semibold'>UserName : {userDetails.name}</p><p className=' font-semibold'>Email : {userDetails.email}</p></> : <Spinner/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile