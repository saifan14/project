# 🎯 COPY & PASTE ENVIRONMENT VARIABLES

**Use this file to copy environment variables for each platform.**

---

## 1️⃣ GENERATE YOUR VALUES FIRST

### Get JWT Secret
Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output (this is your JWT_SECRET)

### Get MongoDB Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account → Create cluster (free)
3. Create user (e.g., username: `admin`)
4. Go to "Connect" → "Drivers" → Node.js
5. Copy connection string and replace username/password

**Format:** `mongodb+srv://admin:PASSWORD@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority`

---

## 📌 YOUR PERSONAL VALUES

**Save these after you generate them:**

```
Generated JWT Secret: 
_________________________________________________________________

MongoDB Connection String: 
_________________________________________________________________

Backend Render URL (after deployment):
_________________________________________________________________

Frontend Vercel URL (after deployment):
_________________________________________________________________
```

---

## 🔴 RENDER (Backend) - COPY ALL THESE

Go to: Render Dashboard → Your Web Service → Settings → Environment Variables

**Add these 4 variables:**

```
Key: MONGO_URI
Value: mongodb+srv://admin:YOUR_PASSWORD@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority

Key: JWT_SECRET
Value: YOUR_GENERATED_JWT_SECRET_HERE

Key: NODE_ENV
Value: production

Key: PORT
Value: 5000
```

---

## 🔵 VERCEL (Frontend) - COPY THIS

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

**Add this 1 variable:**

```
Key: VITE_API_URL
Value: https://YOUR-RENDER-BACKEND-URL.onrender.com/api
```

*Replace `YOUR-RENDER-BACKEND-URL` with your actual Render backend URL*
*Example: https://sem4-backend.onrender.com/api*

---

## 🟢 UPTIME ROOT (Monitoring) - ADD THESE URLs

Go to: Uptime Root Dashboard → Add Monitor

**Monitor 1 - Frontend:**
```
URL: https://YOUR-VERCEL-URL.vercel.app
Frequency: Every 5 minutes
Alert: Enable
```

**Monitor 2 - Backend:**
```
URL: https://YOUR-RENDER-URL.onrender.com/api
Frequency: Every 5 minutes
Alert: Enable
```

---

## ⚡ COMPLETE EXAMPLE (After filling values)

### Render Backend:
```
MONGO_URI: mongodb+srv://admin:MySecurePass123@my-cluster.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
NODE_ENV: production
PORT: 5000
```

### Vercel Frontend:
```
VITE_API_URL: https://sem4-backend.onrender.com/api
```

### Uptime Root:
```
Frontend Monitor: https://sem4.vercel.app
Backend Monitor: https://sem4-backend.onrender.com/api
```

---

## ✅ QUICK CHECKLIST

- [ ] Generated JWT Secret
- [ ] Got MongoDB URI
- [ ] Added all 4 variables to Render
- [ ] Deployed backend to Render
- [ ] Got Render backend URL
- [ ] Added Render URL to Vercel frontend env
- [ ] Deployed frontend to Vercel
- [ ] Got Vercel frontend URL
- [ ] Added monitoring to Uptime Root
- [ ] Tested everything works

---

## 🚀 DEPLOYMENT ORDER

1. **Get values** → Generate JWT, MongoDB connection
2. **Render** → Deploy backend, get backend URL
3. **Vercel** → Add backend URL to env, deploy frontend
4. **Uptime Root** → Add both URLs to monitor
5. **Test** → Check everything works

---

## 📞 DEFAULT TEST CREDENTIALS

Username: `admin@test.com`
Password: `admin123`

*Change these in production!*

---
