import axios from 'axios';

const PRODUCTION_API = 'https://project-woeu.onrender.com/api';
const LOCAL_API = 'http://localhost:5000/api';

const getBaseURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return LOCAL_API;
    }
    return PRODUCTION_API;
};

const API = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
});

// Request interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
