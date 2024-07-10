import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Home from '../Pages/Home'
import Content from '../Components/Content'
import Profile from '../Components/Profile'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}>
            <Route path='/' element={<Content/>}></Route>
            <Route path='profile' element={<Profile/>}></Route>
        </Route>
    </Routes>
    </>
  )
}

export default UserRoutes