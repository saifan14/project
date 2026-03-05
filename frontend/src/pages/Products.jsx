import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineHeart, HiOutlinePlus } from 'react-icons/hi';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Appliances', 'Wearables', 'Accessories', 'Audio', 'Gaming', 'Other'];

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const initialCat = searchParams.get('category') || 'All';

    const [filters, setFilters] = useState({
        category: initialCat,
        brand: '',
        maxPrice: '',
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category !== 'All') params.category = filters.category;
            if (filters.brand) params.brand = filters.brand;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;
            const res = await API.get('/products', { params });
            setProducts(res.data);
        } catch (err) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, [filters.category]);

    const handleFilter = () => fetchProducts();

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await API.delete(`/products/${id}`);
            toast.success('Product deleted');
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch { toast.error('Delete failed'); }
    };

    const handleEdit = (id) => {
        // Navigate to edit page (we'll create this route)
        navigate(`/products/edit/${id}`);
    };

    const handleWishlist = async (id) => {
        try {
            await API.post('/wishlist', { productId: id });
            toast.success('Added to wishlist!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed');
        }
    };

    const filtered = products;
    const isAdmin = user?.role === 'admin';

    return (
        <div className="page">
            <div className="container">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="page-title">Products</h1>
                        <p className="page-subtitle">{products.length} product{products.length !== 1 ? 's' : ''} available</p>
                    </div>
                    {isAdmin && (
                        <Link to="/add-product" className="btn btn-primary"><HiOutlinePlus /> Add Product</Link>
                    )}
                </div>

                <div className="filters-bar">
                    <select className="form-select" value={filters.category} onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input className="form-input" placeholder="Brand..." value={filters.brand} onChange={e => setFilters(p => ({ ...p, brand: e.target.value }))} />
                    <input className="form-input" type="number" placeholder="Max Price ₹" value={filters.maxPrice} onChange={e => setFilters(p => ({ ...p, maxPrice: e.target.value }))} />
                    <button className="btn btn-secondary btn-sm" onClick={handleFilter}>Filter</button>
                </div>

                {loading ? (
                    <div className="spinner" />
                ) : filtered.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h3>No products found</h3>
                        <p>{isAdmin ? 'Add your first product to get started' : 'Check back soon!'}</p>
                        {isAdmin && (
                            <Link to="/add-product" className="btn btn-primary" style={{ marginTop: '1rem' }}>Add Product</Link>
                        )}
                    </div>
                ) : (
                    <div className="grid-3">
                        {filtered.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-card-header">
                                    <h3>{product.name}</h3>
                                    <div className="product-actions">
                                        {isAdmin && (
                                            <button className="btn btn-icon btn-secondary" title="Edit" onClick={() => handleEdit(product._id)}>
                                                <HiOutlinePencil />
                                            </button>
                                        )}
                                        <button className="btn btn-icon btn-secondary" title="Wishlist" onClick={() => handleWishlist(product._id)}>
                                            <HiOutlineHeart />
                                        </button>
                                        {isAdmin && (
                                            <button className="btn btn-icon btn-danger" title="Delete" onClick={() => handleDelete(product._id)}>
                                                <HiOutlineTrash />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="product-card-body">
                                    <div className="product-meta">
                                        <span className="badge">{product.category}</span>
                                        <span className="badge-warning badge">{product.brand}</span>
                                    </div>
                                    <div className="product-price">₹{product.price?.toLocaleString()}</div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.4rem 0' }}>
                                        <div className="stars">
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <span key={n} className={`star ${n <= product.rating ? 'active' : ''}`}>★</span>
                                            ))}
                                        </div>
                                        {product.warranty > 0 && <span className="badge badge-success">{product.warranty}mo warranty</span>}
                                    </div>
                                    {product.specs && Object.keys(product.specs).length > 0 && (
                                        <div className="product-specs">
                                            {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                                                <span key={k} className="spec-tag">{k}: {v}</span>
                                            ))}
                                            {Object.keys(product.specs).length > 4 && <span className="spec-tag">+{Object.keys(product.specs).length - 4} more</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
