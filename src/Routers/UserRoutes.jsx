import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default UserRoutes