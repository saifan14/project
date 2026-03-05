import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineHeart, HiOutlineScale, HiOutlineStar, HiOutlineCollection, HiOutlineFire, HiOutlineCheckCircle } from 'react-icons/hi';

const CATEGORIES = [
    { name: 'Smartphones', icon: '📱' },
    { name: 'Laptops', icon: '💻' },
    { name: 'Appliances', icon: '🏠' },
    { name: 'Wearables', icon: '⌚' },
    { name: 'Accessories', icon: '🎧' },
    { name: 'Audio', icon: '🔊' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Other', icon: '📦' },
];

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ wishlist: 0, comparisons: 0, products: 0, categories: 0 });
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, cRes, wRes] = await Promise.all([
                    API.get('/products'),
                    API.get('/comparisons'),
                    API.get('/wishlist'),
                ]);
                const categories = new Set(pRes.data.map(p => p.category));
                setStats({
                    products: pRes.data.length,
                    comparisons: cRes.data.length,
                    wishlist: wRes.data.length,
                    categories: categories.size,
                });
                // Get top-rated products
                setTopProducts(pRes.data.sort((a, b) => b.rating - a.rating).slice(0, 4));
            } catch (err) { console.error('Failed to fetch stats'); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    const handleSeed = async () => {
        if (!confirm('This will replace all products with 400 sample products. Continue?')) return;
        setSeeding(true);
        try {
            const res = await API.post('/seed');
            toast.success(res.data.message);
            window.location.reload();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Seeding failed');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Welcome, {user?.name} 👋</h1>
                    <p className="page-subtitle">Your smart product comparison dashboard</p>
                </div>

                {loading ? (
                    <div className="spinner" />
                ) : (
                    <>
                        {/* User Stats */}
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <div className="stat-icon purple"><HiOutlineHeart /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.wishlist}</div>
                                    <div className="stat-label">Saved to Wishlist</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon cyan"><HiOutlineScale /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.comparisons}</div>
                                    <div className="stat-label">Comparisons Saved</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon green"><HiOutlineStar /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.products}</div>
                                    <div className="stat-label">Total Products</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon amber"><HiOutlineCollection /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.categories}</div>
                                    <div className="stat-label">Categories</div>
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Products */}
                        {topProducts.length > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div className="page-header" style={{ marginBottom: '1rem' }}>
                                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>⭐ Top Rated Products</h2>
                                </div>
                                <div className="grid-4">
                                    {topProducts.map(p => (
                                        <div key={p._id} className="product-card">
                                            <div className="product-card-header">
                                                <h4 style={{ fontSize: '0.9rem' }}>{p.name}</h4>
                                            </div>
                                            <div className="product-card-body">
                                                <span className="badge">{p.category}</span>
                                                <div style={{ marginTop:'0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                    {p.brand}
                                                </div>
                                                <div style={{ marginTop: '0.5rem' }}>
                                                    {[1,2,3,4,5].map(n => (
                                                        <span key={n} style={{ color: n <= p.rating ? '#fbbf24' : '#666' }}>★</span>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                    ₹{p.price?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>⚡ Quick Actions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <Link to="/products" className="btn btn-primary btn-block">
                                    Browse Products
                                </Link>
                                <Link to="/compare" className="btn btn-secondary btn-block">
                                    Compare Now
                                </Link>
                                <Link to="/wishlist" className="btn btn-secondary btn-block">
                                    View Wishlist
                                </Link>
                                <Link to="/saved-comparisons" className="btn btn-secondary btn-block">
                                    Saved Comparisons
                                </Link>
                            </div>
                        </div>

                        {/* Browse by Category */}
                        <div className="page-header" style={{ marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Browse by Category</h2>
                        </div>
                        <div className="grid-4">
                            {CATEGORIES.map(cat => (
                                <Link 
                                    key={cat.name}
                                    to={`/products?category=${cat.name}`}
                                    className="card"
                                    style={{
                                        padding: '1.5rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                                    <div style={{ fontWeight: 600 }}>{cat.name}</div>
                                </Link>
                            ))}
                        </div>

                        {/* Seed Data Section */}
                        <div className="card" style={{ padding: '2rem', marginTop: '2rem', backgroundColor: 'rgba(249, 115, 22, 0.05)', borderLeft: '4px solid #f97316' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <HiOutlineFire style={{ fontSize: '1.5rem', flexShrink: 0, color: '#f97316', marginTop: '0.25rem' }} />
                                <div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>Quick Setup</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                        Don't have products yet? Load 400 sample products from 8 categories with a single click.
                                    </p>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={handleSeed}
                                        disabled={seeding}
                                    >
                                        {seeding ? 'Loading...' : '📦 Load Sample Products'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
