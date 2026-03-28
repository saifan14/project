#!/bin/bash

# Pre-Push to GitHub Checklist
# Run this before pushing to ensure everything is production-ready

echo "╔════════════════════════════════════════╗"
echo "║   Pre-Push GitHub Checklist            ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if .env files exist in repo
if git ls-files .env | grep -q .; then
    echo "❌ .env file is tracked in Git (should be gitignored)"
    exit 1
fi

if git ls-files backend/.env | grep -q .; then
    echo "❌ backend/.env is tracked in Git (should be gitignored)"
    exit 1
fi

if git ls-files frontend/.env | grep -q .; then
    echo "❌ frontend/.env is tracked in Git (should be gitignored)"
    exit 1
fi

echo "✓ No .env files tracked"

# Check if .env.example files exist
if [ ! -f "backend/.env.example" ]; then
    echo "❌ backend/.env.example missing"
    exit 1
fi

if [ ! -f "frontend/.env.example" ]; then
    echo "❌ frontend/.env.example missing"
    exit 1
fi

echo "✓ .env.example files present"

# Check if node_modules is gitignored
if ! grep -q "node_modules" .gitignore; then
    echo "❌ node_modules not in .gitignore"
    exit 1
fi

echo "✓ node_modules is gitignored"

# Check if dist is gitignored
if ! grep -q "dist" .gitignore; then
    echo "❌ dist not in .gitignore"
    exit 1
fi

echo "✓ dist is gitignored"

# Verify package.json has production scripts
if ! grep -q '"start"' package.json; then
    echo "❌ Missing start script in package.json"
    exit 1
fi

echo "✓ Production scripts configured"

# Check Git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a Git repository. Run: git init"
    exit 1
fi

echo "✓ Git repository configured"

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✓ All Checks Passed!                 ║"
echo "╠════════════════════════════════════════╣"
echo "║ Ready to push:                         ║"
echo "║ git add .                              ║"
echo "║ git commit -m 'Production ready'       ║"
echo "║ git push origin main                   ║"
echo "╚════════════════════════════════════════╝"
