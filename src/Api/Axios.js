import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

// Interceptors to add token to request in header for every request //

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Interceptors to catch 403 error and reload page //

axiosInstance.interceptors.response.use((response) => {
        if (response.status === 403) {
        console.log('Forbidden: ', response.data);
        
        localStorage.removeItem('token');
    }
    
    return response;
}, (error) => {
    if (error.response && error.response.status === 403) {
        window.location.reload();
        console.log('Forbidden error:', error.response.data);
        localStorage.clear();
    }
    
    return Promise.reject(error);
});

export default axiosInstance;