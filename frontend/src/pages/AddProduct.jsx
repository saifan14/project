import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const CATEGORIES = ['Smartphones', 'Laptops', 'Appliances', 'Wearables', 'Accessories', 'Audio', 'Gaming', 'Other'];

const CATEGORY_SPECS = {
    Smartphones: ['Screen Size', 'RAM', 'Storage', 'Battery', 'Camera', 'Processor', 'OS'],
    Laptops: ['Screen Size', 'RAM', 'Storage', 'Battery Life', 'Processor', 'GPU', 'OS', 'Weight'],
    Appliances: ['Power', 'Energy Rating', 'Capacity', 'Type', 'Material'],
    Wearables: ['Display', 'Battery Life', 'Sensors', 'Water Resistance', 'Connectivity'],
    Accessories: ['Type', 'Compatibility', 'Material', 'Color', 'Connectivity'],
    Audio: ['Type', 'Driver Size', 'Frequency Response', 'Battery Life', 'Noise Cancellation', 'Connectivity'],
    Gaming: ['Platform', 'GPU', 'RAM', 'Storage', 'Refresh Rate', 'Resolution'],
    Other: ['Feature 1', 'Feature 2', 'Feature 3'],
};

export default function AddProduct() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '', category: 'Smartphones', brand: '', price: '', rating: 0, review: '', warranty: '',
    });
    const [specs, setSpecs] = useState({});

    useEffect(() => {
        if (user && user.role !== 'admin') {
            toast.error('Only admins can add products');
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const specFields = CATEGORY_SPECS[form.category] || [];

    const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/products', {
                ...form,
                price: Number(form.price),
                warranty: Number(form.warranty) || 0,
                rating: Number(form.rating),
                specs,
            });
            toast.success('Product added!');
            navigate('/products');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="page">
                <div className="container">
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h2>Access Denied</h2>
                        <p>Only admin users can add products.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container" style={{ maxWidth: '640px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1rem' }}>
                    <HiOutlineArrowLeft /> Back
                </button>

                <div className="page-header">
                    <h1 className="page-title">Add Product</h1>
                    <p className="page-subtitle">Enter product details for comparison</p>
                </div>

                <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                    <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input className="form-input" placeholder="e.g. iPhone 16 Pro" value={form.name} onChange={e => handleChange('name', e.target.value)} required />
                    </div>

                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select className="form-select" value={form.category} onChange={e => { handleChange('category', e.target.value); setSpecs({}); }}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Brand</label>
                            <input className="form-input" placeholder="e.g. Apple" value={form.brand} onChange={e => handleChange('brand', e.target.value)} required />
                        </div>
                    </div>

                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Price (₹)</label>
                            <input className="form-input" type="number" min="0" placeholder="0" value={form.price} onChange={e => handleChange('price', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Warranty (months)</label>
                            <input className="form-input" type="number" min="0" placeholder="12" value={form.warranty} onChange={e => handleChange('warranty', e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Rating (0–5)</label>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(n => (
                                <span key={n} className={`star ${n <= form.rating ? 'active' : ''}`} onClick={() => handleChange('rating', n)}>★</span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Review Notes</label>
                        <textarea className="form-textarea" placeholder="Brief product review..." value={form.review} onChange={e => handleChange('review', e.target.value)} />
                    </div>

                    {specFields.length > 0 && (
                        <>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--accent-light)' }}>
                                {form.category} Specifications
                            </h3>
                            <div className="grid-2">
                                {specFields.map(field => (
                                    <div className="form-group" key={field}>
                                        <label className="form-label">{field}</label>
                                        <input className="form-input" placeholder={field} value={specs[field] || ''} onChange={e => setSpecs(prev => ({ ...prev, [field]: e.target.value }))} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading} style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}
