#!/bin/bash

# Version: 1.0.0
# This script initializes the project for first-time setup

set -e

echo "╔════════════════════════════════════════╗"
echo "║   Smart Product Advisor Setup          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "  Node: $(node -v)"
echo "  NPM:  $(npm -v)"

# Create .env files from examples
echo ""
echo "✓ Setting up environment files..."

if [ ! -f ".env" ]; then
    echo "  Creating root .env"
    touch .env
fi

if [ ! -f "backend/.env" ]; then
    echo "  Creating backend/.env from example"
    cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    echo "  Creating frontend/.env from example"
    cp frontend/.env.example frontend/.env
fi

# Install dependencies
echo ""
echo "✓ Installing dependencies..."
npm run install:all

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✓ Setup Complete!                    ║"
echo "╠════════════════════════════════════════╣"
echo "║ Next steps:                            ║"
echo "║ 1. Update backend/.env with MongoDB   ║"
echo "║ 2. Update backend/.env with JWT       ║"
echo "║ 3. Run: npm run dev                    ║"
echo "╚════════════════════════════════════════╝"
