const express = require('express');
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/wishlist
router.get('/', protect, async (req, res) => {
    try {
        const items = await Wishlist.find({ userId: req.user._id })
            .populate('productId')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/wishlist
router.post('/', protect, async (req, res) => {
    try {
        const { productId } = req.body;
        const exists = await Wishlist.findOne({ userId: req.user._id, productId });
        if (exists) return res.status(400).json({ message: 'Already in wishlist' });
        const item = await Wishlist.create({ userId: req.user._id, productId });
        const populated = await item.populate('productId');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', protect, async (req, res) => {
    try {
        const item = await Wishlist.findOneAndDelete({
            userId: req.user._id,
            productId: req.params.productId,
        });
        if (!item) return res.status(404).json({ message: 'Item not found in wishlist' });
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
