#!/bin/bash

# Production Deployment Script
# Starts the application in production mode

set -e

echo "╔════════════════════════════════════════╗"
echo "║   Production Deployment                ║"
echo "╚════════════════════════════════════════╝"

# Validate environment variables
echo "✓ Validating environment variables..."

if [ -z "$MONGO_URI" ]; then
    echo "❌ MONGO_URI not set"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET not set"
    exit 1
fi

echo "✓ Environment variables validated"

# Set production mode
export NODE_ENV=production
export PORT=${PORT:-8080}

echo "✓ Environment: $NODE_ENV"
echo "✓ Port: $PORT"

# Install dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "✓ Installing backend dependencies..."
    cd backend && npm install --production && cd ..
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Starting Production Server           ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Start backend server
node backend/server.js
