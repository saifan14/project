import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineHome, HiOutlineCube, HiOutlineScale, HiOutlineHeart, HiOutlineCollection, HiOutlinePlusCircle } from 'react-icons/hi';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const links = [
        { to: '/dashboard', label: 'Dashboard', icon: <HiOutlineHome /> },
        { to: '/products', label: 'Products', icon: <HiOutlineCube /> },
        { to: '/compare', label: 'Compare', icon: <HiOutlineScale /> },
        { to: '/wishlist', label: 'Wishlist', icon: <HiOutlineHeart /> },
        { to: '/saved', label: 'Saved', icon: <HiOutlineCollection /> },
    ];

    const adminLinks = user?.role === 'admin' ? [
        { to: '/add-product', label: 'Add Product', icon: <HiOutlinePlusCircle /> }
    ] : [];

    const allLinks = [...links, ...adminLinks];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/dashboard" className="navbar-logo">
                    <span className="logo-icon">⚡</span>
                    <span>SmartAdvisor</span>
                </Link>

                <div className="navbar-links">
                    {allLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar-user">
                    <span className="user-name">
                        {user?.name}
                        {user?.role === 'admin' && <span style={{ marginLeft: '8px', color: '#ff6b6b', fontWeight: 'bold' }}>👑 Admin</span>}
                    </span>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}
