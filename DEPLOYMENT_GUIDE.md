# Deployment Guide

This project is ready for deployment to Vercel (Frontend), Render (Backend), and Uptime Root (Monitoring).

## Overview
- **Frontend**: Deployed on Vercel (React + Vite)
- **Backend**: Deployed on Render (Node.js + Express)
- **Database**: MongoDB Atlas
- **Monitoring**: Uptime Root (for uptime monitoring)

---

## Prerequisites

1. **MongoDB Atlas Account** - Create a free tier cluster
2. **Vercel Account** - Connect GitHub repo
3. **Render Account** - Create web service
4. **Uptime Root Account** - Add monitoring

---

## Environment Variables Setup

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (note the username and password)
4. Get your connection string: `mongodb+srv://username:password@cluster-name.mongodb.net/dbname?retryWrites=true&w=majority`

### Generate JWT Secret
Run this command in terminal to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ENVIRONMENT VARIABLES TO SET

Copy and organize these environment variables as needed:

### Backend Environment Variables (for Render)
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET=YOUR_GENERATED_JWT_SECRET_HERE
PORT=5000
NODE_ENV=production
```

### Frontend Environment Variables (for Vercel)
```
VITE_API_URL=https://your-backend-render-url.onrender.com/api
```

---

## Step-by-Step Deployment

### 1. Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → Select "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `sem4-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev` (or `node backend/server.js`)
   - **Region**: Choose nearest region
6. Add environment variables (one by one):
   ```
   MONGO_URI = [Your MongoDB connection string]
   JWT_SECRET = [Your generated JWT secret]
   NODE_ENV = production
   ```
7. Click "Deploy"
8. Note the deployed URL (e.g., `https://sem4-backend.onrender.com`)
9. Update `VITE_API_URL` in frontend with this URL

### 2. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → Select "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   ```
   VITE_API_URL = https://sem4-backend.onrender.com/api
   ```
6. Click "Deploy"
7. Your frontend will be live!

### 3. Set Up Monitoring with Uptime Root

1. Go to [Uptime Root](https://uptimeroot.com/)
2. Sign up / Login to your account
3. Add monitoring:
   - Click "Add Monitor"
   - URL: `https://your-vercel-frontend-url.vercel.app`
   - Frequency: Every 5 minutes
   - Alerts: Email notification
4. Add API monitoring:
   - URL: `https://sem4-backend.onrender.com/api`
   - Frequency: Every 5 minutes

---

## Complete Environment Variables List

### For Render (Backend)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET=abc123def456... (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
NODE_ENV=production
PORT=5000
```

### For Vercel (Frontend)
```
VITE_API_URL=https://sem4-backend.onrender.com/api
```

### For Uptime Root (Monitoring)
```
Frontend URL: https://your-app.vercel.app
Backend URL: https://sem4-backend.onrender.com
```

---

## Quick Reference

| Service | URL Example | Environment |
|---------|---|---|
| Frontend | `https://sem4.vercel.app` | Vercel |
| Backend | `https://sem4-backend.onrender.com` | Render |
| API Base | `https://sem4-backend.onrender.com/api` | - |
| Database | MongoDB Atlas | MongoDB Atlas |
| Monitor | Uptime Root Dashboard | Uptime Root |

---

## Testing Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit `https://sem4-backend.onrender.com/api`
3. **Test Login**: Use `admin@test.com` / `admin123`
4. **Check Logs**: 
   - Vercel: Dashboard → Deployments → Logs
   - Render: Dashboard → Logs
5. **Monitor Health**: Check Uptime Root dashboard

---

## Troubleshooting

### Frontend showing "Cannot find module"
- Rebuild on Vercel: Settings → Deployments → Redeploy
- Check `VITE_API_URL` environment variable

### Backend connection errors
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Restart service on Render

### CORS errors
- Backend already has `cors()` enabled
- If issues persist, add frontend URL to CORS in `backend/server.js`

### Uptime alerts not working
- Check email spam folder
- Verify alert notification settings in Uptime Root

---

## Important Notes

- ✅ Auto-seeding creates test users on first run: `admin@test.com` / `admin123`
- ✅ Render free tier: Service spins down after 15 min inactivity (use paid for production)
- ✅ Vercel provides unlimited bandwidth on free tier
- ✅ MongoDB Atlas free tier: 512MB storage
- ⚠️ Change default test user passwords in production!
- ⚠️ Never commit `.env` files to Git (already excluded)

---
