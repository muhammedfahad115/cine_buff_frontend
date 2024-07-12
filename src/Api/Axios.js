import axios from "axios";
import {logout} from '../Context/Context'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
axiosInstance.interceptors.response.use((response) => {
        if (response.status === 403) {
        console.log('Forbidden: ', response.data);
        
        localStorage.removeItem('token');
    }
    
    return response;
}, (error) => {
    if (error.response && error.response.status === 403) {
        console.log('Forbidden error:', error.response.data);
        localStorage.removeItem('token');
        logout();
    }
    
    return Promise.reject(error);
});

export default axiosInstance;