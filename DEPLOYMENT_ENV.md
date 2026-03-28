# Smart Product Advisor - Deployment Environment Configuration

## ✅ RENDER (Backend) Environment Variables

```
MONGO_URI=mongodb+srv://admin:PASSWORD@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET=GENERATED_JWT_SECRET_HERE
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-app.vercel.app
```

## ✅ VERCEL (Frontend) Environment Variables

```
VITE_API_URL=https://your-backend-render.onrender.com/api
```

---

## 📋 Complete Deployment Setup

### 1. GitHub Push
```bash
bash scripts/pre-push.sh      # Verify everything
git add .
git commit -m "Production ready configuration"
git push origin main
```

### 2. Render Backend Deployment
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect to GitHub repository
4. Fill in:
   - **Name**: sem4-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm install --prefix backend`
   - **Start Command**: `node backend/server.js`
5. Add Environment Variables (copy from above)
6. Deploy!

### 3. Vercel Frontend Deployment
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import GitHub repo
4. Fill in:
   - **Framework**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add Environment Variables (copy from above)
6. Deploy!

### 4. Uptime Root Monitoring
1. Add monitoring for both URLs

---

## 🔄 Environment-Based Port Handling

| Scenario | PORT | Connection |
|----------|------|-----------|
| Local Dev | 5000 | localhost:5000 |
| Production | 8080 | Assigned by Render |
| Render Deployment | 8080 | Port-assigned via env |

**Automatic handling**: The app automatically uses the correct port based on NODE_ENV

---

## ✓ Production Ready Checklist

- ✓ Port-based environment configuration
- ✓ Production scripts added
- ✓ Environment validation on startup
- ✓ CORS configured for production
- ✓ Security headers added
- ✓ Error handling middleware
- ✓ Graceful shutdown on SIGTERM
- ✓ .gitignore configured
- ✓ .env.example files created
- ✓ Deployment scripts ready

---
