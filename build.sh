#!/bin/bash
echo "🔨 Building backend..."
cd backend
npm install
cd ..

echo "🔨 Building frontend..."
cd frontend  
npm install
npm run build
cd ..

echo "✓ Build complete!"
