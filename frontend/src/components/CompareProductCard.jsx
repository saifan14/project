import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

export default function CompareProductCard({ product, isSelected, onToggle, selected3Limit }) {
    return (
        <div 
            className={`product-card ${isSelected ? 'selected-compare' : ''}`}
            style={{
                cursor: 'pointer',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                transition: 'all 0.2s ease'
            }}
        >
            <div className="product-card-header">
                <h3 style={{ fontSize: '0.95rem' }}>{product.name}</h3>
                <button 
                    className={`btn btn-icon ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => onToggle(product._id)}
                    disabled={!isSelected && selected3Limit}
                    title={!isSelected && selected3Limit ? 'Max 3 products' : isSelected ? 'Remove' : 'Add to Compare'}
                    style={{ opacity: !isSelected && selected3Limit ? 0.5 : 1 }}
                >
                    {isSelected ? <HiOutlineX /> : <HiOutlinePlus />}
                </button>
            </div>

            <div className="product-card-body">
                <div className="product-meta">
                    <span className="badge">{product.category}</span>
                    <span className="badge-warning badge">{product.brand}</span>
                </div>

                <div className="product-price" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', margin: '0.75rem 0' }}>
                    ₹{product.price?.toLocaleString()}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(n => (
                            <span key={n} className={`star ${n <= product.rating ? 'active' : ''}`}>★</span>
                        ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {product.rating}/5
                    </span>
                </div>

                {product.warranty > 0 && (
                    <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>
                        {product.warranty}mo warranty
                    </span>
                )}

                {product.specs && Object.keys(product.specs).length > 0 && (
                    <div className="product-specs" style={{ marginTop: '0.75rem' }}>
                        {Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                            <span key={k} className="spec-tag" style={{ fontSize: '0.75rem' }}>
                                <strong>{k}:</strong> {v}
                            </span>
                        ))}
                        {Object.keys(product.specs).length > 3 && (
                            <span className="spec-tag" style={{ fontSize: '0.75rem' }}>
                                +{Object.keys(product.specs).length - 3} more specs
                            </span>
                        )}
                    </div>
                )}

                {isSelected && (
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '0.375rem',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'var(--primary)',
                        fontWeight: 600
                    }}>
                        ✓ Selected for Comparison
                    </div>
                )}
            </div>
        </div>
    );
}
