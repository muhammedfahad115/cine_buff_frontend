import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Home from '../Pages/Home'
import Profile from '../Components/Profile'
import User from '../Components/User'
import Admin from '../Components/Admin'
import Context from '../Context/Context'
import Auth from '../AuthGuard/Auth'

function UserRoutes() {
  return (
    <>
      <Context>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<Auth/>}>
          <Route path='/' element={<Home />}>
            <Route path='/' element={<User />}></Route>
            <Route path='admin' element={<Admin />}></Route>
            <Route path='profile' element={<Profile />}></Route>
          </Route>
          </Route>
        </Routes>
      </Context>
    </>
  )
}

export default UserRoutes