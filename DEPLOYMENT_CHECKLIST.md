# 📋 DEPLOYMENT CHECKLIST

Use this checklist to track your deployment progress.

---

## ✅ PRE-DEPLOYMENT SETUP

- [ ] Push code to GitHub (main branch)
- [ ] Generate JWT Secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster on MongoDB Atlas
- [ ] Create database user (note username & password)
- [ ] Get MongoDB connection string
- [ ] Have Vercel account ready
- [ ] Have Render account ready
- [ ] Have Uptime Root account ready

---

## 🔧 PART 1: DEPLOY BACKEND TO RENDER

- [ ] Go to [Render Dashboard](https://dashboard.render.com)
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Fill in details:
  - Name: `sem4-backend`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `node backend/server.js`
  - Region: Pick nearest region
- [ ] Add Environment Variables in Render:
  - [ ] `MONGO_URI` = your_mongodb_connection_string
  - [ ] `JWT_SECRET` = your_generated_jwt_secret
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `5000`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (green checkmark)
- [ ] Copy your Backend URL: `https://sem4-backend.onrender.com`
- [ ] Test backend: Visit `https://sem4-backend.onrender.com/api`
  - Should see: `{"message":"Smart Product Advisor API is running"}`

---

## 🎨 PART 2: DEPLOY FRONTEND TO VERCEL

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Configure:
  - [ ] Framework: `Vite`
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add Environment Variable:
  - [ ] `VITE_API_URL` = `https://sem4-backend.onrender.com/api`
- [ ] Click "Deploy"
- [ ] Wait for deployment (green checkmark)
- [ ] Copy your Frontend URL (show on success page)
- [ ] Test frontend: Visit your Vercel URL
  - [ ] Page loads
  - [ ] Try login with `admin@test.com` / `admin123`
  - [ ] Can view products

---

## 📊 PART 3: SET UP MONITORING WITH UPTIME ROOT

- [ ] Go to [Uptime Root](https://uptimeroot.com/)
- [ ] Sign up/Login
- [ ] Add Monitor #1 (Frontend):
  - [ ] URL: `https://your-vercel-app.vercel.app`
  - [ ] Check frequency: Every 5 minutes
  - [ ] Add email alert
- [ ] Add Monitor #2 (Backend API):
  - [ ] URL: `https://sem4-backend.onrender.com/api`
  - [ ] Check frequency: Every 5 minutes
  - [ ] Add email alert
- [ ] Configure alerts to notify on:
  - [ ] Website Down
  - [ ] Status Code != 200
  - [ ] Response time > 2 seconds

---

## 🧪 FINAL TESTING

- [ ] Frontend loads at Vercel URL
- [ ] Can log in with test user
- [ ] Can view products
- [ ] Can compare products
- [ ] Wishlist works
- [ ] Admin functions work (if admin logged in)
- [ ] API responds correctly
- [ ] Database operations work (products saved, etc.)
- [ ] NO console errors in browser
- [ ] NO errors in Render logs

---

## 📱 OPTIONAL: IMPROVE PERFORMANCE

- [ ] Enable Vercel Analytics
- [ ] Set up GitHub Actions for CI/CD (optional)
- [ ] Configure Render auto-deploy on push
- [ ] Add custom domain (if needed)
- [ ] Set up SSL certificate (automatic on Vercel/Render)

---

## 🎉 DEPLOYMENT COMPLETE!

**Summary of deployed services:**

| Service | Status | URL |
|---------|--------|-----|
| Frontend | ✅ | `https://your-vercel-app.vercel.app` |
| Backend | ✅ | `https://sem4-backend.onrender.com` |
| API | ✅ | `https://sem4-backend.onrender.com/api` |
| Database | ✅ | MongoDB Atlas |
| Monitoring | ✅ | Uptime Root |

**Your app is now live!** 🚀

---

## 🆘 TROUBLESHOOTING

### Frontend errors:
- [ ] Check environment variables in Vercel
- [ ] Rebuild on Vercel (Settings → Redeploy)
- [ ] Check browser console (F12)

### Backend errors:
- [ ] Check environment variables in Render
- [ ] Check Render logs (click "Logs" tab)
- [ ] Verify MongoDB connection
- [ ] Restart Render service

### Connection issues:
- [ ] Verify `VITE_API_URL` matches backend URL
- [ ] Check CORS is enabled in backend
- [ ] Verify MongoDB IP whitelist: `0.0.0.0/0`

### Uptime monitoring down:
- [ ] Check URLs are correct
- [ ] Wait 5 minutes for next check
- [ ] Verify services are actually running

---
