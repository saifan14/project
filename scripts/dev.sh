#!/bin/bash

# Development Start Script

echo "╔════════════════════════════════════════╗"
echo "║   Starting Development Server         ║"
echo "╚════════════════════════════════════════╝"

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found"
    echo "   Creating from example..."
    cp backend/.env.example backend/.env
    echo "   ⚠️  Please update backend/.env with your MongoDB URI and JWT_SECRET"
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env not found"
    echo "   Creating from example..."
    cp frontend/.env.example frontend/.env
fi

echo "✓ Environment files found"
echo "✓ Starting development server..."
echo ""

# Start both frontend and backend
npm run dev
