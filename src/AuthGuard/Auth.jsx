import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectToken, setToken } from '../Redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

function Auth() {
    const dispatch = useDispatch();
    const reduxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // useEffect for checking if token is available or not if not then redirect to login //
    useEffect(() => {
        const checkToken = async () => {
            if (!reduxToken) {
                const token = localStorage.getItem('token');
                if (token) {
                    dispatch(setToken(token));
                } else {
                    navigate('/login');
                }
            }
            setIsLoading(false);
        };
        checkToken();
    }, [dispatch, reduxToken, navigate]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}

export default Auth;
