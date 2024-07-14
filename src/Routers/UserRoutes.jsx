import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Home from '../Pages/Home'
import Profile from '../Components/User/Profile'
import User from '../Components/User/Users/User'
import Admin from '../Components/Admin/Admin'
import Context from '../Context/Context'
import Auth from '../AuthGuard/Auth'
import AddRationales from '../Components/Admin/AddRationales'
import ShowUsers from '../Components/Admin/ShowUsers'
import ShowRationales from '../Components/Admin/ShowRationale/ShowRationales'
import AddMedicalBill from '../Components/Admin/AddMedicalBill/AddMedicalBill'

function UserRoutes() {
  return (
    <>
      <Context>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<Auth />}>
            <Route path='/' element={<Home />}>
              <Route path='/' element={<User />}></Route>
              <Route path='admin' element={<Admin />}>
                <Route index element={<AddRationales />}></Route>
                <Route path='showusers' element={<ShowUsers />}></Route>
                <Route path='rationales' element={<ShowRationales />}></Route>
                <Route path='addbill' element={<AddMedicalBill />}></Route>
              </Route>
              <Route path='profile' element={<Profile />}></Route>
            </Route>
          </Route>
        </Routes>
      </Context>
    </>
  )
}

export default UserRoutes