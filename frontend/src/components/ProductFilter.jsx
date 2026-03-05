import { HiOutlineSearch, HiOutlineInformationCircle } from 'react-icons/hi';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Appliances', 'Wearables', 'Accessories', 'Audio', 'Gaming', 'Other'];

export default function ProductFilter({ filters, onFilterChange }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(147, 112, 219, 0.1)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <HiOutlineInformationCircle style={{ flexShrink: 0 }} />
                <span>💡 Compare similar products within the same category (e.g., phones only, laptops only)</span>
            </div>
            <div className="filters-bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HiOutlineSearch style={{ color: 'var(--text-secondary)' }} />
                    <input 
                        className="form-input" 
                        placeholder="Search products..." 
                        value={filters.search} 
                        onChange={e => onFilterChange({ ...filters, search: e.target.value })}
                        style={{ flex: 1 }}
                    />
                </div>
                <select 
                    className="form-select" 
                    value={filters.category} 
                    onChange={e => onFilterChange({ ...filters, category: e.target.value })}
                >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input 
                    className="form-input" 
                    placeholder="Brand..." 
                    value={filters.brand} 
                    onChange={e => onFilterChange({ ...filters, brand: e.target.value })}
                />
                <input 
                    className="form-input" 
                    type="number" 
                    placeholder="Max Price ₹" 
                    value={filters.maxPrice} 
                    onChange={e => onFilterChange({ ...filters, maxPrice: e.target.value })}
                />
                <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onFilterChange({ search: '', category: 'All', brand: '', maxPrice: '' })}
                >
                    Reset
                </button>
            </div>
        </>
    );
}
