import { Link } from 'react-router-dom'

function DashBoard() {
  return (
    <>
    <div>
        <div className='flex font-semibold rounded-sm bg-yellow-500 py-1  text-[13px] text-[rgba(51,53,55,255)] sm:text-base justify-center space-x-4'>
            <Link to={'/admin'}><button className='active:text-red-500'>Add Rationales</button></Link>
            <Link to={'/admin/showusers'}><button className='active:text-red-500'>Show Users</button></Link>
            <Link to={'/admin/rationales'}><button className='active:text-red-500'>Show Rationales</button></Link>
            <Link to={'/admin/addbill'}><button className='active:text-red-500'>Add Bill</button></Link>
            <Link to={'/admin/billstatus'}><button className='active:text-red-500'>Bill Status</button></Link>
        </div>
    </div>
    </>
  )
}

export default DashBoard