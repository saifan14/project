const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['Smartphones', 'Laptops', 'Appliances', 'Wearables', 'Accessories', 'Audio', 'Gaming', 'Other'],
    },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    specs: { type: Map, of: String, default: {} },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    review: { type: String, default: '' },
    warranty: { type: Number, default: 0 }, // in months
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
