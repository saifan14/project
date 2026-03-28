const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

// Validate required env vars
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI not defined in environment');
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET not defined in environment');
    process.exit(1);
}

connectDB();

const app = express();

// Security & Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : '*'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// API status endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Smart Product Advisor API v1.0',
        environment: process.env.NODE_ENV || 'development',
        status: 'running',
    });
});

// Auto-seed test users on startup (only in development)
const seedUsers = async () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('⏭️  Skipping seed in production mode');
        return;
    }

    try {
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });
        if (!existingAdmin) {
            await User.create({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'admin123',
                role: 'admin',
            });
            console.log('✓ Admin user seeded: admin@test.com / admin123');
        }
        const existingUser = await User.findOne({ email: 'user@test.com' });
        if (!existingUser) {
            await User.create({
                name: 'Test User',
                email: 'user@test.com',
                password: 'user123',
                role: 'user',
            });
            console.log('✓ Test user seeded: user@test.com / user123');
        }
    } catch (err) {
        console.error('❌ Error seeding users:', err.message);
    }
};

setTimeout(seedUsers, 2000);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/comparisons', require('./routes/comparisons'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/seed', require('./routes/seed'));
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.path,
        method: req.method,
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message} at ${req.path}`);

    const statusCode = err.status || err.statusCode || 500;
    const isProduction = process.env.NODE_ENV === 'production';
    const response = {
        message: isProduction ? 'Internal server error' : err.message,
        status: statusCode,
    };

    if (!isProduction) {
        response.stack = err.stack;
        response.details = err;
    }

    res.status(statusCode).json(response);
});

// Determine port based on environment
const PORT = process.env.PORT || (process.env.NODE_ENV === 'development' ? 5000 : 8080);

// Start server
const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Smart Product Advisor API         ║
╠════════════════════════════════════════╣
║ Environment: ${(process.env.NODE_ENV || 'development').padEnd(25)} ║
║ Port:        ${PORT.toString().padEnd(25)} ║
║ Status:      Running ✓               ║
╚════════════════════════════════════════╝
    `);
});

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
    console.log(`\n[${signal}] Shutting down gracefully...`);
    server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('❌ Forced shutdown - some connections did not close');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
