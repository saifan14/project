import { useEffect, useState, useMemo } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { computeValueScore, findBestProduct } from '../utils/valueScore';
import { HiOutlineStar, HiOutlineSave } from 'react-icons/hi';
import ProductFilter from '../components/ProductFilter';
import CompareProductCard from '../components/CompareProductCard';

const MAX_COMPARE_PRODUCTS = 3;

export default function Compare() {
    const [allProducts, setAllProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weights, setWeights] = useState({ price: 5, performance: 5, rating: 5, warranty: 5 });
    const [saveTitle, setSaveTitle] = useState('');
    const [filters, setFilters] = useState({ search: '', category: 'All', brand: '', maxPrice: '' });

    useEffect(() => {
        API.get('/products').then(res => { setAllProducts(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    // Filter products based on current filters
    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                                 p.brand.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = filters.category === 'All' || p.category === filters.category;
            const matchesBrand = !filters.brand || p.brand.toLowerCase().includes(filters.brand.toLowerCase());
            const matchesPrice = !filters.maxPrice || p.price <= parseInt(filters.maxPrice);
            
            return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
        });
    }, [allProducts, filters]);

    const toggleSelect = (id) => {
        const product = allProducts.find(p => p._id === id);
        
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(x => x !== id);
            }
            
            // Check if adding this product maintains like-for-like comparison
            if (prev.length > 0) {
                const firstProductCategory = allProducts.find(p => p._id === prev[0])?.category;
                if (product.category !== firstProductCategory) {
                    toast.error(`❌ Cannot compare ${product.category} with other categories. Try comparing similar products only!`);
                    return prev;
                }
            }
            
            if (prev.length < MAX_COMPARE_PRODUCTS) {
                return [...prev, id];
            } else {
                toast.error(`Maximum ${MAX_COMPARE_PRODUCTS} products allowed`);
                return prev;
            }
        });
    };

    const selectedProducts = allProducts.filter(p => selected.includes(p._id));
    const best = selectedProducts.length >= 2 ? findBestProduct(selectedProducts, weights) : null;
    const allSpecs = [...new Set(selectedProducts.flatMap(p => Object.keys(p.specs || {})))];

    const handleSave = async () => {
        if (selectedProducts.length < 2) { toast.error('Select at least 2 products'); return; }
        try {
            await API.post('/comparisons', {
                title: saveTitle || `Comparison ${new Date().toLocaleDateString()}`,
                products: selected,
            });
            toast.success('Comparison saved!');
            setSaveTitle('');
        } catch { toast.error('Failed to save'); }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">⚖️ Compare Products</h1>
                        <p className="page-subtitle">Filter & select up to {MAX_COMPARE_PRODUCTS} similar products for comparison</p>
                        {selectedProducts.length > 0 && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                📁 Category: <strong>{selectedProducts[0].category}</strong> {selectedProducts.length > 1 && `(${selectedProducts.length} products selected)`}
                            </div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>{selected.length}/{MAX_COMPARE_PRODUCTS}</strong> selected
                    </div>
                </div>

                {loading ? (
                    <div className="spinner" />
                ) : (
                    <>
                        {/* Filter Bar */}
                        <ProductFilter filters={filters} onFilterChange={setFilters} />

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <>
                                <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                                </div>
                                <div className="grid-3" style={{ marginBottom: '2rem' }}>
                                    {filteredProducts.map(p => (
                                        <CompareProductCard 
                                            key={p._id} 
                                            product={p} 
                                            isSelected={selected.includes(p._id)}
                                            onToggle={toggleSelect}
                                            selected3Limit={selected.length >= MAX_COMPARE_PRODUCTS && !selected.includes(p._id)}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state" style={{ margin: '3rem 0' }}>
                                <div className="empty-icon">🔍</div>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters</p>
                            </div>
                        )}

                        {/* Comparison Section */}
                        {selectedProducts.length >= 2 && (
                            <>
                                {/* Weights Panel */}
                                <div className="weights-panel" style={{ marginTop: '2rem' }}>
                                    <h3>⚖️ Priority Weights</h3>
                                    {Object.entries(weights).map(([key, val]) => (
                                        <div className="weight-row" key={key}>
                                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                            <input
                                                type="range"
                                                className="range-slider"
                                                min="0" max="10"
                                                value={val}
                                                onChange={e => setWeights(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                                            />
                                            <span className="weight-val">{val}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Best Product Badge */}
                                {best && (
                                    <div className="card" style={{ marginBottom: '1.5rem', marginTop: '1.5rem', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <HiOutlineStar style={{ fontSize: '1.5rem', color: '#fbbf24' }} />
                                            <div>
                                                <div style={{ fontWeight: 700 }}>🏆 Best Value: {best.product.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                    Value Score: <span className="score-value">{best.score}/100</span> — {best.product.brand} · ₹{best.product.price?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Comparison Table */}
                                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                                    <table className="compare-table">
                                        <thead>
                                            <tr>
                                                <th>Attribute</th>
                                                {selectedProducts.map(p => (
                                                    <th key={p._id} className={best && p._id === best.product._id ? 'best-value' : ''}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                            <span>{p.name}</span>
                                                            <button
                                                                className="btn btn-icon btn-danger"
                                                                onClick={() => toggleSelect(p._id)}
                                                                title="Remove"
                                                                style={{ padding: '0.25rem' }}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Brand</td>
                                                {selectedProducts.map(p => <td key={p._id}>{p.brand}</td>)}
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Category</td>
                                                {selectedProducts.map(p => <td key={p._id}>{p.category}</td>)}
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Price</td>
                                                {selectedProducts.map(p => <td key={p._id} style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{p.price?.toLocaleString()}</td>)}
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Rating</td>
                                                {selectedProducts.map(p => (
                                                    <td key={p._id}>
                                                        <span style={{ color: '#fbbf24' }}>{'★'.repeat(p.rating)}</span>
                                                        <span style={{ color: 'var(--text-muted)' }}>{'★'.repeat(5 - p.rating)}</span>
                                                        {' '}{p.rating}/5
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Warranty</td>
                                                {selectedProducts.map(p => <td key={p._id}>{p.warranty || 0} months</td>)}
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Value Score</td>
                                                {selectedProducts.map(p => {
                                                    const score = computeValueScore(p, selectedProducts, weights);
                                                    return (
                                                        <td key={p._id} className={best && p._id === best.product._id ? 'best-value' : ''}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                <span className="score-value">{score}</span>
                                                                <div className="score-bar" style={{ flex: 1 }}>
                                                                    <div className="score-bar-fill" style={{ width: `${score}%` }} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {allSpecs.map(spec => (
                                                <tr key={spec}>
                                                    <td style={{ fontWeight: 600 }}>{spec}</td>
                                                    {selectedProducts.map(p => (
                                                        <td key={p._id}>{(p.specs && p.specs[spec]) || '—'}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                            <tr>
                                                <td style={{ fontWeight: 600 }}>Review</td>
                                                {selectedProducts.map(p => <td key={p._id} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.review || '—'}</td>)}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Save Comparison */}
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '0.5rem' }}>
                                    <input 
                                        className="form-input" 
                                        placeholder="Comparison title..." 
                                        value={saveTitle} 
                                        onChange={e => setSaveTitle(e.target.value)} 
                                        style={{ flex: 1 }}
                                    />
                                    <button className="btn btn-primary" onClick={handleSave}>
                                        <HiOutlineSave /> Save Comparison
                                    </button>
                                </div>
                            </>
                        )}

                        {!loading && selected.length === 0 && filteredProducts.length > 0 && (
                            <div className="empty-state" style={{ margin: '3rem 0' }}>
                                <div className="empty-icon">▶</div>
                                <h3>Select {MAX_COMPARE_PRODUCTS !== 2 ? 'at least 2' : '2'} products to compare</h3>
                                <p>Click the + button on product cards to select them</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
