import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Compare from './pages/Compare';
import Wishlist from './pages/Wishlist';
import SavedComparisons from './pages/SavedComparisons';
import { useAuth } from './context/AuthContext';

export default function App() {
    const { token, loading, user } = useAuth();

    if (loading) return <div className="spinner" />;

    return (
        <>
            {token && <Navbar />}
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<ProtectedRoute>{user?.role === 'admin' ? <AdminDashboard /> : <Dashboard />}</ProtectedRoute>} />
                    <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                    <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
                    <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/saved" element={<ProtectedRoute><SavedComparisons /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
                </Routes>
            </main>
        </>
    );
}
