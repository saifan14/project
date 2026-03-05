import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            API.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => { localStorage.removeItem('token'); setToken(null); })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRole', res.data.role);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    const register = async (name, email, password, role = 'user') => {
        const res = await API.post('/auth/register', { name, email, password, role });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRole', res.data.role);
        setToken(res.data.token);
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
