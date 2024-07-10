import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Home from '../Pages/Home'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default UserRoutes