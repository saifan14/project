# Project Title

![Architecture Diagram](file:///C:/Users/SAIFAN/.gemini/antigravity/brain/9e90f3aa-c0d7-445a-9214-6799672820/architecture_diagram_1772682849617.png)

---

## 📖 Overview

A **MERN stack** web application that provides a modern, responsive interface for managing products, users, and analytics. The backend is powered by **Node.js/Express** with **MongoDB** for data storage, while the frontend is built with **React** and **Vite** for fast development.

---

## 🎨 UI Mockup

![UI Mockup](file:///C:/Users/SAIFAN/.gemini/antigravity/brain/9e90f3aa-c0d7-445a-9214-6799672820/ui_mockup_1772682819930.png)

---

## 🚀 Features

- **Authentication** – Secure login & signup with JWT.
- **Dashboard** – Real‑time analytics and summary cards.
- **Product Management** – CRUD operations with image upload.
- **Responsive Design** – Works on desktop, tablet, and mobile.
- **RESTful API** – Clear separation of concerns.
- **Environment Config** – `.env` for secrets and DB connection.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, TailwindCSS (optional) |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Auth | JWT, bcrypt |
| Dev Tools | ESLint, Prettier |

---

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies for both frontend and backend
npm install   # installs root dependencies (includes workspaces)

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB connection string and JWT secret

# Run the development servers
npm run dev   # starts both frontend and backend (via concurrently)
```

---

## 📚 Usage

1. Open `http://localhost:3000` in your browser.
2. Register a new account or use the demo credentials.
3. Explore the Dashboard, manage products, and view analytics.

---

## 📈 Architecture Diagram

The architecture diagram above illustrates the flow of data:
- **Client** (React) makes HTTP requests to **API Server** (Express).
- The server interacts with **MongoDB** for persistence.
- JWT tokens are issued for authenticated routes.

---

## 🧪 Testing

```bash
# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend
```

---

## 📜 License

MIT License – see the `LICENSE` file for details.

---

*Created with ❤️ by Antigravity AI*
