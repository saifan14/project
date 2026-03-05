const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Auto-seed test users on startup
const seedUsers = async () => {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });
        if (!existingAdmin) {
            await User.create({ name: 'Admin User', email: 'admin@test.com', password: 'admin123', role: 'admin' });
            console.log('✓ Admin user seeded: admin@test.com / admin123');
        }
        const existingUser = await User.findOne({ email: 'user@test.com' });
        if (!existingUser) {
            await User.create({ name: 'Test User', email: 'user@test.com', password: 'user123', role: 'user' });
            console.log('✓ Test user seeded: user@test.com / user123');
        }
    } catch (err) {
        console.error('Error seeding users:', err.message);
    }
};

setTimeout(seedUsers, 1000);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/comparisons', require('./routes/comparisons'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/seed', require('./routes/seed'));

app.get('/', (req, res) => {
    res.json({ message: 'Smart Product Advisor API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
