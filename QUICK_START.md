# 🚀 Quick Start Guide - Admin & User System

## ⚡ In 5 Minutes

### Step 1: Setup Environment
```bash
# In backend/.env file, make sure you have:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

### Step 2: Seed Database
```bash
cd backend
npm install
node seed.js
```

**Output will show:**
```
✓ Created admin user: admin@smartadvisor.com
✓ Created regular user: user@smartadvisor.com
✓ Seeded X products across X categories

--- Login Credentials ---
ADMIN:
  Email: admin@smartadvisor.com
  Password: admin123456

USER:
  Email: user@smartadvisor.com
  Password: user123456
```

### Step 3: Start Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 4: Login & Test

**As Admin:**
- Go to http://localhost:5173
- Login: `admin@smartadvisor.com` / `admin123456`
- You'll see "Add Product" button in navbar
- You can add, edit, delete products

**As User:**
- Login: `user@smartadvisor.com` / `user123456`
- You can only see products and add to wishlist
- No edit/delete buttons or add product options

---

## 📋 What You Get

### Admin Capabilities ✅
- ✓ Add products
- ✓ Edit products
- ✓ Delete products
- ✓ View all products
- ✓ Admin dashboard
- ✓ Manage entire catalog

### User Capabilities ✅
- ✓ View all products
- ✓ Compare products
- ✓ Add to wishlist
- ✓ View comparisons
- ✓ (Cannot modify products)

---

## 🔑 Authentication
- Via MongoDB Atlas
- JWT tokens (30-day expiry)
- Roles: 'admin' or 'user'
- Password hashing with bcrypt

---

## 📁 Key Files Modified

**Backend:**
- `models/User.js` - Added role field
- `middleware/auth.js` - Added adminOnly check
- `routes/auth.js` - Role support
- `routes/products.js` - Admin-only CRUD
- `seed.js` - Creates test accounts

**Frontend:**
- `context/AuthContext.jsx` - Role management
- `components/Navbar.jsx` - Role-based menu
- `pages/AddProduct.jsx` - Admin protection
- `pages/EditProduct.jsx` - NEW
- `pages/AdminDashboard.jsx` - NEW
- `App.jsx` - New routes

---

## 🧪 Quick Test

1. Login as Admin → Click "+ Add Product" → Add a product ✓
2. Logout → Login as User → Try to add product → Blocked ✓
3. As User, click wishlist button → Works ✓
4. As User, try to edit product → Cannot see edit button ✓

---

## 💡 Common Tasks

### Create Another Admin
```bash
# Use API endpoint (requires admin token)
POST /api/auth/create-admin
Body: {
  "name": "New Admin",
  "email": "admin2@example.com",
  "password": "secure_password"
}
```

### Add Product (Admin Only)
1. Click "Add Product" in navbar (admin only)
2. Fill form with product details
3. Click "Add Product"

### Edit Product (Admin Only)
1. Go to Products page
2. Hover over product card
3. Click edit (pencil) icon (admin only)
4. Modify and save

### Delete Product (Admin Only)
1. Go to Products page
2. Click delete (trash) icon (admin only)
3. Confirm deletion

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't login | Check credentials: admin@smartadvisor.com / admin123456 |
| No "Add Product" button | You're logged in as user. Login as admin. |
| 403 error on delete | Only admins can delete. Login as admin. |
| Seed fails | Check MONGO_URI in .env file |
| Products not loading | Check internet connection, MongoDB Atlas is running |

---

## 📚 More Details

- Full setup: `ADMIN_USER_SETUP.md`
- Technical details: `IMPLEMENTATION_SUMMARY.md`
- API reference: See documentation

---

**You're all set! 🎉 Enjoy your admin & user system!**
