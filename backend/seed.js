// Standalone seed script — run: node seed.js
// Seeds MongoDB Atlas with both Admin and User roles with sample products
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const allSeedProducts = require('./data/seedProducts');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas');

        // Find or create admin user
        let adminUser = await User.findOne({ email: 'admin@smartadvisor.com' });
        if (!adminUser) {
            adminUser = await User.create({ 
                name: 'Admin User', 
                email: 'admin@smartadvisor.com', 
                password: 'admin123456',
                role: 'admin'
            });
            console.log('✓ Created admin user:', adminUser.email);
        } else {
            console.log('✓ Using existing admin user:', adminUser.email);
        }

        // Find or create regular user
        let regularUser = await User.findOne({ email: 'user@smartadvisor.com' });
        if (!regularUser) {
            regularUser = await User.create({ 
                name: 'Regular User', 
                email: 'user@smartadvisor.com', 
                password: 'user123456',
                role: 'user'
            });
            console.log('✓ Created regular user:', regularUser.email);
        } else {
            console.log('✓ Using existing regular user:', regularUser.email);
        }

        // Remove existing products
        await Product.deleteMany({});
        console.log('✓ Cleared old products');

        // Add products with admin user as creator
        const productsToInsert = [];
        for (const [category, items] of Object.entries(allSeedProducts)) {
            for (const item of items) {
                productsToInsert.push({
                    ...item,
                    category,
                    userId: adminUser._id,  // Admin user owns all products
                    specs: new Map(Object.entries(item.specs)),
                });
            }
        }

        const inserted = await Product.insertMany(productsToInsert);
        console.log(`✓ Seeded ${inserted.length} products across ${Object.keys(allSeedProducts).length} categories`);

        console.log('\n--- Login Credentials ---');
        console.log('ADMIN:');
        console.log('  Email: admin@smartadvisor.com');
        console.log('  Password: admin123456');
        console.log('  Role: admin (Can Add/Edit/Delete products)');
        console.log('\nUSER:');
        console.log('  Email: user@smartadvisor.com');
        console.log('  Password: user123456');
        console.log('  Role: user (Can only view & compare products)');
        console.log('------------------------\n');

        await mongoose.disconnect();
        console.log('✓ Database seeding complete!');
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
