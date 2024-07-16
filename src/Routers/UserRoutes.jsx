import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Context from '../Context/Context';
import Auth from '../AuthGuard/Auth';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const Login = lazy(() => import('../Components/Login'));
const Signup = lazy(() => import('../Components/Signup'));
const Home = lazy(() => import('../Pages/Home'));
const Profile = lazy(() => import('../Components/User/Profile'));
const User = lazy(() => import('../Components/User/Users/User'));
const Admin = lazy(() => import('../Components/Admin/Admin'));
const AddRationales = lazy(() => import('../Components/Admin/AddRationales'));
const ShowUsers = lazy(() => import('../Components/Admin/ShowUsers'));
const ShowRationales = lazy(() => import('../Components/Admin/ShowRationale/ShowRationales'));
const AddMedicalBill = lazy(() => import('../Components/Admin/AddMedicalBill/AddMedicalBill'));
const BillStatus = lazy(() => import('../Components/Admin/BillStatus'));

function UserRoutes() {
  return (
    <Context>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Auth />}>
            <Route path='/' element={<Home />}>
              <Route path='/' element={<User />} />
              <Route path='admin' element={<Admin />}>
                <Route index element={<AddRationales />} />
                <Route path='showusers' element={<ShowUsers />} />
                <Route path='rationales' element={<ShowRationales />} />
                <Route path='addbill' element={<AddMedicalBill />} />
                <Route path='billstatus' element={<BillStatus />} />
              </Route>
              <Route path='profile' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Context>
  );
}

export default UserRoutes;
