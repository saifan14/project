import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineCube, HiOutlineUsers, HiOutlineEye, HiOutlineCheck, HiOutlineChartBar, HiOutlineTrash, HiOutlineLightBulb } from 'react-icons/hi';

export default function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        categories: {},
        categoriesCount: 0,
        avgRating: 0,
        seeding: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            toast.error('Admin access only');
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const prodRes = await API.get('/products');
                const products = prodRes.data;
                const categoryBreakdown = {};
                let totalRating = 0;

                products.forEach(p => {
                    categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
                    totalRating += p.rating || 0;
                });

                setStats({
                    totalProducts: products.length,
                    categories: categoryBreakdown,
                    categoriesCount: Object.keys(categoryBreakdown).length,
                    avgRating: (totalRating / products.length).toFixed(2),
                    seeding: false,
                });
            } catch (err) {
                console.error('Failed to fetch stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (!user || user.role !== 'admin') {
        return (
            <div className="page">
                <div className="container">
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h2>❌ Admin Access Restricted</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>This page is restricted to administrators only. Please contact your admin for access.</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleSeed = async () => {
        if (!confirm('⚠️ This will REPLACE all products with 400 sample products. Continue?')) return;
        try {
            setStats(s => ({ ...s, seeding: true }));
            const res = await API.post('/seed');
            toast.success('✓ Sample data loaded successfully!');
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Seeding failed');
            setStats(s => ({ ...s, seeding: false }));
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">👑 Admin Control Panel</h1>
                    <p className="page-subtitle">Manage products, view analytics, and maintain the system</p>
                </div>

                {loading ? (
                    <div className="spinner" />
                ) : (
                    <>
                        {/* Key Admin Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            <div className="stat-card">
                                <div className="stat-icon purple"><HiOutlineCube /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.totalProducts}</div>
                                    <div className="stat-label">Total Products</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon cyan"><HiOutlineChartBar /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.categoriesCount}</div>
                                    <div className="stat-label">Categories</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon green"><HiOutlineEye /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{stats.avgRating}</div>
                                    <div className="stat-label">Avg. Rating</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon amber"><HiOutlineCheck /></div>
                                <div className="stat-info">
                                    <div className="stat-value">✓</div>
                                    <div className="stat-label">System Active</div>
                                </div>
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        {Object.keys(stats.categories).length > 0 && (
                            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <HiOutlineChartBar /> Product Distribution by Category
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                    {Object.entries(stats.categories).map(([category, count]) => (
                                        <div key={category} style={{
                                            padding: '1rem',
                                            background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.1), rgba(74, 144, 226, 0.1))',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(147, 112, 219, 0.2)'
                                        }}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{category}</div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>{count}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                                {((count / stats.totalProducts) * 100).toFixed(0)}% of total
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Admin Action Panel */}
                        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <HiOutlineLightBulb /> Admin Actions
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                                <button
                                    onClick={() => navigate('/add-product')}
                                    className="btn btn-primary btn-block"
                                    style={{ padding: '1rem' }}
                                >
                                    ➕ Add Product
                                </button>

                                <button
                                    onClick={() => navigate('/products')}
                                    className="btn btn-secondary btn-block"
                                    style={{ padding: '1rem' }}
                                >
                                    📦 Manage Products
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="btn btn-secondary btn-block"
                                    style={{ padding: '1rem' }}
                                >
                                    📊 View All Data
                                </button>

                                <button
                                    onClick={handleSeed}
                                    disabled={stats.seeding}
                                    style={{
                                        padding: '1rem',
                                        border: '2px dashed var(--accent)',
                                        background: 'transparent',
                                        color: 'var(--accent)',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                        opacity: stats.seeding ? 0.6 : 1
                                    }}
                                >
                                    {stats.seeding ? '⏳ Loading...' : '📥 Load Sample Data'}
                                </button>
                            </div>
                        </div>

                        {/* Admin Info Card */}
                        <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.05), rgba(74, 144, 226, 0.05))', borderLeft: '4px solid var(--accent)' }}>
                            <h3 style={{ marginBottom: '1rem' }}>👤 Admin Account Information</h3>
                            <div style={{ lineHeight: '1.8' }}>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>👑 Administrator</span></p>
                            </div>
                        </div>

                        {/* Permissions Card */}
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>🔐 Admin Permissions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>✓ Product Management</h4>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <li>Add/Create new products</li>
                                        <li>Edit/Update all products</li>
                                        <li>Delete products</li>
                                        <li>Bulk import via seed</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>✓ Data Access</h4>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <li>View all comparisons</li>
                                        <li>Access system analytics</li>
                                        <li>View user wishlists</li>
                                        <li>Full product catalog access</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>✓ System Control</h4>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <li>Seed database with samples</li>
                                        <li>Manage categories</li>
                                        <li>Create admin accounts (API)</li>
                                        <li>System configuration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
