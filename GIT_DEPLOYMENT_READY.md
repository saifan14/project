# Smart Product Advisor - Git & Deployment Ready

## ✅ Production-Ready Configuration

### Port-Based Environment Setup
- **Development**: Port 5000 (Backend), 5173 (Frontend)
- **Production**: Port 8080 (Backend), configured via Render/Vercel
- **Healthcheck**: GET `/health` endpoint available on all ports

### Environment Files
```
backend/.env.example      → Copy to backend/.env and configure
frontend/.env.example     → Copy to frontend/.env and configure
.gitignore               → Excludes sensitive files from Git
```

### Scripts
```bash
npm run setup            # First-time setup
npm run dev              # Development mode (both frontend & backend)
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run start:prod       # Production mode
npm run build            # Build frontend for production
npm run install:all      # Install all dependencies
```

### Production Ports
- Backend defaults to **port 8080** in production
- Backend defaults to **port 5000** in development
- Port can be overridden with `PORT` environment variable

### Git Configuration
- **All sensitive files are gitignored**: .env files, node_modules, dist/, build/
- **Safe to push to GitHub**: Only source code and configuration examples are tracked
- **Environment variables**: Must be set on Render/Vercel dashboards (never commit .env)

---

## 🚀 Deployment Ready

### Render Deployment
1. Connect GitHub repo to Render
2. Build Command: `npm install && npm install --prefix backend`
3. Start Command: `node backend/server.js`
4. Environment Variables:
   ```
   MONGO_URI=your_connection_string
   JWT_SECRET=your_generated_secret
   NODE_ENV=production
   PORT=8080
   ```

### Vercel Deployment (Frontend)
1. Import frontend directory
2. Build: `npm run build`
3. Output: `dist`
4. Environment Variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com/api
   ```

---

## 📁 Project Structure (Git-Ready)

```
sem4/
├── .gitignore              ✓ Configured
├── .env.example           ✓ Template only
├── Procfile               ✓ For Render
├── render.yaml            ✓ Render config
├── package.json           ✓ Root scripts
├── backend/
│   ├── .env.example       ✓ Configuration template
│   ├── package.json       ✓ Dependencies
│   ├── server.js          ✓ Production-ready
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── .env.example       ✓ Configuration template
│   ├── package.json       ✓ Dependencies
│   ├── vite.config.js     ✓ Production-ready
│   ├── src/
│   └── dist/              ✓ Gitignored
└── scripts/
    ├── setup.sh           ✓ First-time setup
    ├── dev.sh             ✓ Development start
    ├── start.sh           ✓ Production start
    └── build.sh           ✓ Production build
```

---

## ✅ Ready to Push to GitHub

```bash
git add .
git commit -m "Production-ready MERN app with port-based configuration"
git push origin main
```

All sensitive files are already in `.gitignore`:
- ✓ `.env` files
- ✓ `node_modules`
- ✓ `dist` folder
- ✓ Build artifacts
- ✓ IDE settings

---

## 🔐 Security Checklist

- ✓ Environment validation on startup
- ✓ Security headers added
- ✓ CORS properly configured
- ✓ Graceful shutdown handling
- ✓ Error handling middleware
- ✓ Input validation
- ✓ JWT properly protected
- ✓ No secrets in code
- ✓ .gitignore configured

---
