# Admin & User Role-Based Access Control Setup

## Overview
This application now supports role-based access control with **Admin** and **User** roles authenticated through **MongoDB Atlas**.

### Features by Role:

#### **Admin User** 👑
- Add new products
- Edit existing products
- Delete products
- View all products
- Access admin dashboard
- Full product management capabilities

#### **Regular User** 👤
- View all products
- Add products to wishlist
- Compare products
- Cannot add, edit, or delete products
- Read-only product management

---

## Setup Instructions

### 1. **Environment Variables**
Make sure your `.env` file contains the MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

### 2. **Seed Database with Admin & User Accounts**

Run the seed script to create test accounts with MongoDB Atlas:

```bash
cd backend
node seed.js
```

This will create:
- **Admin User**: `admin@smartadvisor.com` / `admin123456`
- **Regular User**: `user@smartadvisor.com` / `user123456`
- Sample products owned by admin user

### 3. **Start the Application**

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Login Credentials

### Admin Account (Full Access)
- **Email**: `admin@smartadvisor.com`
- **Password**: `admin123456`
- **Role**: Admin
- Can Add/Edit/Delete Products

### User Account (View Only)
- **Email**: `user@smartadvisor.com`
- **Password**: `user123456`
- **Role**: User
- Can only view and compare products

---

## MongoDB Atlas Authentication

All authentication is done through **MongoDB Atlas** (cloud database):

- User credentials are stored securely in MongoDB Atlas
- Passwords are hashed using bcrypt
- JWT tokens are issued on login
- Role information is stored in user documents
- Both admin and user roles are stored in MongoDB with `role` field

### User Schema in MongoDB:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String (enum: 'admin' or 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (defaults to 'user' role)
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/create-admin` - Create admin user (admin only)

### Products (Role-Protected)
- `GET /api/products` - View all products (authenticated users)
- `GET /api/products/:id` - View product details
- `POST /api/products` - **Admin only**: Add product
- `PUT /api/products/:id` - **Admin only**: Update product
- `DELETE /api/products/:id` - **Admin only**: Delete product

### Protection Mechanism
Middleware checks:
- `protect`: Verifies JWT token and authenticates user
- `adminOnly`: Verifies user has 'admin' role

---

## Frontend Features

### Navigation Bar
- Shows user name with "👑 Admin" badge for admin users
- Only shows "Add Product" link for admin users

### Products Page
- Regular users: See only Wishlist button
- Admin users: See Edit, Wishlist, and Delete buttons

### Add Product Page
- Accessible only to admin users
- Shows access denied message for regular users

### Edit Product Page
- Accessible only to admin users
- Full product editing capabilities for admins

---

## How to Create Additional Admin Users

If you need to create more admin users programmatically:

1. **Using the API endpoint** (requires admin login):
   ```bash
   POST /api/auth/create-admin
   
   Body: {
     "name": "New Admin",
     "email": "newadmin@example.com",
     "password": "secure_password_min_6_chars"
   }
   ```

2. **Using MongoDB Atlas directly**:
   - Connect to MongoDB Atlas cluster
   - Insert user with `role: 'admin'`
   - Hash password using bcrypt before storing

---

## Database Schema Changes

The `User` model now includes a `role` field:

```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user', 
        required: true 
    },
}, { timestamps: true });
```

---

## Testing the Admin Features

1. **Login as Admin**:
   - Go to login page
   - Enter: `admin@smartadvisor.com` / `admin123456`
   - You'll see "Add Product" in navbar and edit/delete buttons on products

2. **Login as Regular User**:
   - Go to login page
   - Enter: `user@smartadvisor.com` / `user123456`
   - You'll only see wishlist button, no add/edit/delete options

3. **Try to access admin features as user**:
   - Attempting to visit `/add-product` will redirect
   - API calls to POST/PUT/DELETE products will return 403 Forbidden

---

## Security Notes

- All passwords are hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 30 days
- Admin creation endpoint requires existing admin authentication
- Role-based access control enforced on both backend and frontend
- Products created by users are stored with their user ID (for audit purposes)

---

## Troubleshooting

**Issue**: "Only admins can create admin accounts"
- Solution: Login with an existing admin account first

**Issue**: "Access denied. Admin privileges required."
- Solution: Your account is a regular user. Contact admin to upgrade or login with admin account

**Issue**: Seed script fails
- Solution: Check MongoDB Atlas connection string in .env file
- Make sure MONGO_URI is pointing to correct cluster and database

**Issue**: User can't access product edit page
- Solution: Only admins can edit products. Login with admin account.
