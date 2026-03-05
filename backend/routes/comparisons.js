const express = require('express');
const Comparison = require('../models/Comparison');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/comparisons
router.get('/', protect, async (req, res) => {
    try {
        const comparisons = await Comparison.find({ userId: req.user._id })
            .populate('products')
            .sort({ createdAt: -1 });
        res.json(comparisons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/comparisons
router.post('/', protect, async (req, res) => {
    try {
        const { title, products } = req.body;
        const comparison = await Comparison.create({
            userId: req.user._id,
            title,
            products,
        });
        const populated = await comparison.populate('products');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/comparisons/:id
router.delete('/:id', protect, async (req, res) => {
    try {
        const comparison = await Comparison.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!comparison) return res.status(404).json({ message: 'Comparison not found' });
        res.json({ message: 'Comparison removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
