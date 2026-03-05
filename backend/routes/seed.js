const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const allSeedProducts = require('../data/seedProducts');

const router = express.Router();

// POST /api/seed/users — seed test users (no auth required for initial setup)
router.post('/users', async (req, res) => {
    try {
        // Clear existing test users
        await User.deleteMany({ email: { $in: ['admin@test.com', 'user@test.com'] } });

        const testUsers = [
            { name: 'Admin User', email: 'admin@test.com', password: 'admin123', role: 'admin' },
            { name: 'Test User', email: 'user@test.com', password: 'user123', role: 'user' },
        ];

        const createdUsers = await User.create(testUsers);
        res.status(201).json({
            message: `Seeded ${createdUsers.length} test users`,
            users: createdUsers.map(u => ({ name: u.name, email: u.email, role: u.role })),
        });
    } catch (error) {
        console.error('User seed error:', error);
        res.status(500).json({ message: error.message });
    }
});

// POST /api/seed — seed 400 products for the current user
router.post('/', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        // Remove existing products for this user first
        await Product.deleteMany({ userId });

        const productsToInsert = [];
        for (const [category, items] of Object.entries(allSeedProducts)) {
            for (const item of items) {
                productsToInsert.push({
                    ...item,
                    category,
                    userId,
                    specs: new Map(Object.entries(item.specs)),
                });
            }
        }

        const inserted = await Product.insertMany(productsToInsert);
        res.status(201).json({
            message: `Seeded ${inserted.length} products across ${Object.keys(allSeedProducts).length} categories`,
            count: inserted.length,
        });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
