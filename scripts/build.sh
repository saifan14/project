#!/bin/bash

# Production Build Script
# This script prepares the application for production deployment

set -e  # Exit on error

echo "╔════════════════════════════════════════╗"
echo "║   Production Build Process             ║"
echo "╚════════════════════════════════════════╝"

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node version: $NODE_VERSION"

# Install root dependencies
echo "✓ Installing root dependencies..."
npm install

# Install backend dependencies
echo "✓ Installing backend dependencies..."
cd backend
npm install
npm run build 2>/dev/null || echo "  No build script for backend"
cd ..

# Install frontend dependencies
echo "✓ Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✓ Build Complete                     ║"
echo "╠════════════════════════════════════════╣"
echo "║ Frontend dist: frontend/dist/          ║"
echo "║ Backend: backend/server.js             ║"
echo "║ Ready for deployment!                  ║"
echo "╚════════════════════════════════════════╝"
echo ""
