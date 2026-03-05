import { useEffect, useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';

export default function Wishlist() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/wishlist')
            .then(res => setItems(res.data))
            .catch(() => toast.error('Failed to load wishlist'))
            .finally(() => setLoading(false));
    }, []);

    const handleRemove = async (productId) => {
        try {
            await API.delete(`/wishlist/${productId}`);
            setItems(prev => prev.filter(i => (i.productId?._id || i.productId) !== productId));
            toast.success('Removed from wishlist');
        } catch { toast.error('Failed to remove'); }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Wishlist 💜</h1>
                    <p className="page-subtitle">Products you've saved for later</p>
                </div>

                {loading ? <div className="spinner" /> : items.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">💜</div>
                        <h3>Your wishlist is empty</h3>
                        <p>Heart a product from the Products page to add it here</p>
                    </div>
                ) : (
                    <div className="grid-3">
                        {items.map(item => {
                            const p = item.productId;
                            if (!p) return null;
                            return (
                                <div key={item._id} className="product-card">
                                    <div className="product-card-header">
                                        <h3>{p.name}</h3>
                                        <button className="btn btn-icon btn-danger" onClick={() => handleRemove(p._id)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                    <div className="product-card-body">
                                        <div className="product-meta">
                                            <span className="badge">{p.category}</span>
                                            <span className="badge badge-warning">{p.brand}</span>
                                        </div>
                                        <div className="product-price">₹{p.price?.toLocaleString()}</div>
                                        <div className="stars" style={{ marginTop: '0.3rem' }}>
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <span key={n} className={`star ${n <= p.rating ? 'active' : ''}`}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
