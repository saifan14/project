import { useEffect, useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';
import { computeValueScore } from '../utils/valueScore';

export default function SavedComparisons() {
    const [comparisons, setComparisons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        API.get('/comparisons')
            .then(res => setComparisons(res.data))
            .catch(() => toast.error('Failed to load'))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this comparison?')) return;
        try {
            await API.delete(`/comparisons/${id}`);
            setComparisons(prev => prev.filter(c => c._id !== id));
            toast.success('Deleted');
        } catch { toast.error('Failed'); }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Saved Comparisons</h1>
                    <p className="page-subtitle">Your previous product comparisons</p>
                </div>

                {loading ? <div className="spinner" /> : comparisons.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <h3>No saved comparisons</h3>
                        <p>Save a comparison from the Compare page</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {comparisons.map(comp => (
                            <div key={comp._id} className="card" style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div onClick={() => setExpanded(expanded === comp._id ? null : comp._id)}>
                                        <h3 style={{ fontWeight: 600 }}>{comp.title}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                            {comp.products?.length} products · {new Date(comp.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button className="btn btn-icon btn-danger" onClick={() => handleDelete(comp._id)}>
                                        <HiOutlineTrash />
                                    </button>
                                </div>

                                {expanded === comp._id && comp.products?.length > 0 && (
                                    <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                                        <table className="compare-table">
                                            <thead>
                                                <tr>
                                                    <th>Attribute</th>
                                                    {comp.products.map(p => <th key={p._id}>{p.name}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: 600 }}>Brand</td>
                                                    {comp.products.map(p => <td key={p._id}>{p.brand}</td>)}
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 600 }}>Price</td>
                                                    {comp.products.map(p => <td key={p._id}>₹{p.price?.toLocaleString()}</td>)}
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 600 }}>Rating</td>
                                                    {comp.products.map(p => <td key={p._id}>{p.rating}/5</td>)}
                                                </tr>
                                                <tr>
                                                    <td style={{ fontWeight: 600 }}>Value Score</td>
                                                    {comp.products.map(p => {
                                                        const score = computeValueScore(p, comp.products);
                                                        return <td key={p._id}><span className="score-value">{score}</span>/100</td>;
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
