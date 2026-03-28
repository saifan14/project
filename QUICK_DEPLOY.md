# Quick Start Guide

## 📋 First Time Setup

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/sem4.git
cd sem4

# 2. Run setup
npm run setup

# 3. Configure environment
nano backend/.env      # Add MongoDB URI & JWT Secret
nano frontend/.env     # Set API URL (keep as localhost for dev)
```

## 🚀 Development Mode

```bash
npm run dev
```

Both frontend (http://localhost:5173) and backend (http://localhost:5000) will start.

Test credentials:
- Email: `admin@test.com`
- Password: `admin123`

## 📦 Production Build

```bash
npm run build
```

Generates optimized build in `frontend/dist/`

## 🌍 Deploy to GitHub

```bash
git add .
git commit -m "Deploy: production-ready configuration"
git push origin main
```

## ⚡ Deploy to Render (Backend)

1. Connect GitHub repo to Render
2. Select this repository
3. Add environment variables (from DEPLOYMENT_ENV.md)
4. Deploy!

## 🎨 Deploy to Vercel (Frontend)

1. Import project to Vercel
2. Select `frontend` directory
3. Add VITE_API_URL environment variable
4. Deploy!

---

See DEPLOYMENT_ENV.md for detailed setup instructions.
