# 🚀 ENVIRONMENT VARIABLES - COPY & PASTE HERE

This file contains all environment variables you need to set for each deployment platform.

---

## ✅ QUICK SETUP - COPY THESE EXACTLY

### Step 1: Generate JWT Secret
Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and replace `YOUR_JWT_SECRET` below.

### Step 2: Get MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (name: `admin`, password: `strong_password`)
4. Copy the connection string
5. Replace placeholders in URI below

---

## 📋 ENVIRONMENT VARIABLES FOR RENDER (Backend)

**Copy all of these into Render Environment Variables:**

```
MONGO_URI=mongodb+srv://admin:your_password@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET=your_generated_secure_jwt_secret_key_here
NODE_ENV=production
PORT=5000
```

**How to add in Render:**
1. Go to Render Dashboard → Your Web Service
2. Settings → Environment Variables
3. Add each variable one by one (key in left, value in right)
4. Click "Save Changes"

---

## 🎨 ENVIRONMENT VARIABLES FOR VERCEL (Frontend)

**Copy this into Vercel Environment Variables:**

```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

**How to add in Vercel:**
1. Go to Vercel Dashboard → Your Project → Settings
2. Environment Variables
3. Add: `VITE_API_URL` = `https://your-backend-render-url.onrender.com/api`
4. Redeploy project

---

## 📊 EXAMPLE FILLED VALUES

After you get all the values, they should look like:

### Render Backend:
```
MONGO_URI=mongodb+srv://admin:Xyz123Pass@cluster-name.mongodb.net/sem4-db?retryWrites=true&w=majority
JWT_SECRET=aB12cD34eF56gH78iJ90kL12mN34oP56qR78sT90uV12wX34yZ56
NODE_ENV=production
PORT=5000
```

### Vercel Frontend:
```
VITE_API_URL=https://sem4-backend.onrender.com/api
```

---

## 🔑 WHERE TO GET EACH VALUE

### MONGO_URI
- Go to MongoDB Atlas
- Cluster → Connect → "Connect your application"
- Copy connection string
- Format: `mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority`

### JWT_SECRET
- Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Use the output

### Backend URL (for Frontend)
- After deploying to Render, you get: `https://sem4-backend.onrender.com`
- Frontend API_URL = `{BACKEND_URL}/api`

---

## 🚀 DEPLOYMENT ORDER

1. ✅ Create MongoDB Atlas account & cluster
2. ✅ Generate JWT Secret
3. ✅ Deploy Backend to Render
   - Get your Render backend URL
4. ✅ Deploy Frontend to Vercel
   - Add backend URL to `VITE_API_URL`
5. ✅ Set up monitoring on Uptime Root
   - Monitor both frontend and backend URLs

---

## 💾 MY VALUES (Keep Safe!)

Save your values here (then delete from version control):

**MongoDB Atlas:**
- Connection String: ___________________________________

**JWT Secret:**
- Secret: ___________________________________

**Render Backend:**
- Deployed URL: ___________________________________

**Vercel Frontend:**
- Deployed URL: ___________________________________

---

## ⚠️ IMPORTANT SECURITY NOTES

- ❌ NEVER commit `.env` files to Git
- ❌ NEVER share JWT_SECRET or MongoDB password
- ✅ Always use environment variables on deployment platforms
- ✅ Change default test user passwords (`admin@test.com` / `admin123`)
- ✅ Update MongoDB Atlas IP whitelist to `0.0.0.0/0` OR specific IPs only

---

## 🧪 TEST YOUR DEPLOYMENT

After everything is deployed:

1. **Frontend loads?** Visit your Vercel URL: `https://your-app.vercel.app`
2. **Can log in?** Use `admin@test.com` / `admin123`
3. **Backend works?** Visit: `https://your-backend.onrender.com/api`
4. **API responds?** Should see: `{"message":"Smart Product Advisor API is running"}`

---

## 📞 UPTIME ROOT MONITORING

Add these URLs to Uptime Root:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com/api`

Set alerts to email for:
- Down
- Status code != 200
- Response time > 2s

---
