# 📡 API Reference - Admin & User System

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // optional, defaults to "user"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@smartadvisor.com",
  "password": "admin123456"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Admin User",
  "email": "admin@smartadvisor.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartadvisor.com",
    "password": "admin123456"
  }'
```

---

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Admin User",
  "email": "admin@smartadvisor.com",
  "role": "admin"
}
```

**Example (curl):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

### Create Admin Account (Admin Only)
```http
POST /auth/create-admin
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "secure_password123"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "New Admin",
  "email": "newadmin@example.com",
  "role": "admin",
  "message": "Admin user created successfully"
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@example.com",
    "password": "secure_password123"
  }'
```

**Error Response (403):**
```json
{
  "message": "Only admins can create admin accounts"
}
```

---

## 📦 Product Endpoints

### Get All Products (Authenticated Users)
```http
GET /products
GET /products?category=Smartphones
GET /products?brand=Apple
GET /products?maxPrice=50000
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "iPhone 16 Pro",
    "category": "Smartphones",
    "brand": "Apple",
    "price": 99999,
    "specs": {
      "Screen Size": "6.1 inch",
      "RAM": "8GB",
      "Storage": "256GB"
    },
    "rating": 5,
    "review": "Excellent phone",
    "warranty": 12,
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Example (curl):**
```bash
curl -X GET "http://localhost:5000/api/products?category=Smartphones" \
  -H "Authorization: Bearer <token>"
```

---

### Get Product by ID
```http
GET /products/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "iPhone 16 Pro",
  "category": "Smartphones",
  "brand": "Apple",
  "price": 99999,
  "specs": {...},
  "rating": 5,
  "review": "Excellent phone",
  "warranty": 12,
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Example (curl):**
```bash
curl -X GET http://localhost:5000/api/products/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer <token>"
```

---

### Add Product (Admin Only)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Samsung Galaxy S24",
  "category": "Smartphones",
  "brand": "Samsung",
  "price": 79999,
  "rating": 4.5,
  "review": "Great flagship phone",
  "warranty": 12,
  "specs": {
    "Screen Size": "6.2 inch",
    "RAM": "12GB",
    "Storage": "256GB",
    "Camera": "200MP",
    "Processor": "Snapdragon 8 Gen 3",
    "OS": "Android 14"
  }
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "Samsung Galaxy S24",
  "category": "Smartphones",
  "brand": "Samsung",
  "price": 79999,
  "rating": 4.5,
  "review": "Great flagship phone",
  "warranty": 12,
  "specs": {...},
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T11:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z"
}
```

**Error Response (403 - Non-Admin):**
```json
{
  "message": "Access denied. Admin privileges required."
}
```

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "category": "Smartphones",
    "brand": "Samsung",
    "price": 79999,
    "rating": 4.5,
    "review": "Great flagship phone",
    "warranty": 12,
    "specs": {
      "Screen Size": "6.2 inch",
      "RAM": "12GB",
      "Storage": "256GB"
    }
  }'
```

---

### Update Product (Admin Only)
```http
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 75000,
  "rating": 4.8,
  "review": "Updated review"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "Samsung Galaxy S24",
  "category": "Smartphones",
  "brand": "Samsung",
  "price": 75000,  // Updated
  "rating": 4.8,   // Updated
  "review": "Updated review",  // Updated
  "warranty": 12,
  "specs": {...},
  "userId": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-15T11:30:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Example (curl):**
```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439015 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 75000,
    "rating": 4.8,
    "review": "Updated review"
  }'
```

---

### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Product removed"
}
```

**Error Response (403 - Non-Admin):**
```json
{
  "message": "Access denied. Admin privileges required."
}
```

**Example (curl):**
```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439015 \
  -H "Authorization: Bearer <admin_token>"
```

---

## 🔍 Status Codes Reference

| Code | Meaning | Common Causes |
|------|---------|--------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions (not admin) |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Server-side error |

---

## 🛡️ Authentication Header Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI...
```

Token obtained from login response.

---

## 📊 Test Scenarios

### Scenario 1: Admin Creates Product
```bash
# Step 1: Login as admin
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartadvisor.com","password":"admin123456"}' \
  | jq -r '.token')

# Step 2: Add product
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "category": "Smartphones",
    "brand": "Brand",
    "price": 50000
  }'
```

### Scenario 2: User Cannot Delete Product
```bash
# Step 1: Login as user
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@smartadvisor.com","password":"user123456"}' \
  | jq -r '.token')

# Step 2: Try to delete (will get 403)
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📝 Request/Response Examples

### Complete Workflow Example

```bash
#!/bin/bash

# 1. Register new admin
echo "1. Registering admin..."
ADMIN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "admin123456",
    "role": "admin"
  }')

ADMIN_TOKEN=$(echo $ADMIN | jq -r '.token')
echo "Admin token: $ADMIN_TOKEN"

# 2. Add product as admin
echo "2. Adding product as admin..."
PRODUCT=$(curl -s -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "Smartphones",
    "brand": "Apple",
    "price": 50000,
    "rating": 5,
    "warranty": 12
  }')

PRODUCT_ID=$(echo $PRODUCT | jq -r '._id')
echo "Product ID: $PRODUCT_ID"

# 3. Register regular user
echo "3. Registering user..."
USER=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Regular User",
    "email": "user@test.com",
    "password": "user123456",
    "role": "user"
  }')

USER_TOKEN=$(echo $USER | jq -r '.token')
echo "User token: $USER_TOKEN"

# 4. User tries to delete product (should fail)
echo "4. User tries to delete product..."
curl -s -X DELETE http://localhost:5000/api/products/$PRODUCT_ID \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'

# 5. Admin deletes product (should succeed)
echo "5. Admin deletes product..."
curl -s -X DELETE http://localhost:5000/api/products/$PRODUCT_ID \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq '.'
```

---

## 🚀 Ready to Use!

All endpoints are production-ready with:
- ✅ Role-based access control
- ✅ MongoDB Atlas authentication
- ✅ Error handling
- ✅ Input validation
- ✅ Security measures
