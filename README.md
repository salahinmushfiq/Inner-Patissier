# 🍰 Inner Patissier — Full Stack E-Commerce Platform

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge\&logo=react)
![Django](https://img.shields.io/badge/Backend-Django-green?style=for-the-badge\&logo=django)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge\&logo=mysql)
![Status](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge)

---

## 🚀 Live Demo

👉 *[https://d0656224-b0e7-4cab-9686-82f518440a2f-00-3aa61hn03ihxh.sisko.replit.dev/](https://d0656224-b0e7-4cab-9686-82f518440a2f-00-3aa61hn03ihxh.sisko.replit.dev/)*

---

## 🧠 What This Project Solves

Most e-commerce apps break when handling:

* Guest users vs authenticated users
* Real-time cart updates across pages
* Token/session inconsistencies

👉 **Inner Patissier solves all three with a unified architecture.**

---

## ✨ Core Highlights

* 🛒 **Dual Cart System** (Guest + Authenticated)
* 🔄 **Real-Time Sync Across Pages (React Query)**
* 🔐 **JWT Authentication + Cookie-based Guest Sessions**
* 💳 **Full Checkout Flow**
* 📦 **Order Tracking & Receipt System**
* 🧑‍💼 **Admin Dashboard (multi-role ready)**

---

## 🏗️ Architecture Overview

```
Frontend (React)
│
├── React Query → Server State Sync
├── Context API → UI State
├── Axios → API Layer
│
Backend (Django REST)
│
├── JWT Auth (users)
├── Guest Token (cookies)
├── Cart & Order APIs
│
Database (MySQL)
```

---

## ⚙️ Tech Stack

### Frontend

* React (CRA)
* React Router v6
* React Query
* Context API
* Axios
* Tailwind CSS
* Framer Motion

### Backend

* Django
* Django REST Framework
* Custom User Model (Email आधारित login)
* JWT Authentication

### Database

* MySQL

---

## 🛒 Cart System (Key Feature)

### 🔓 Guest Users

* Assigned `guest_token` via cookies
* Cart persists without login

### 🔐 Authenticated Users

* Uses `access_token` (JWT)
* Cart tied to user account

### ⚡ Real-Time Sync

* React Query ensures:

  * Instant UI updates
  * Cross-page consistency
  * Automatic refetching

---

## 🔐 Authentication Flow

```
Login → JWT issued → Stored in localStorage
       ↓
API requests → Authorization Header
```

Guest flow:

```
Visit → guest_token (cookie) → cart linked
```

---

## 💳 Checkout Flow

1. Cart Review
2. Shipping Method Selection
3. Payment Method Selection
4. Order Placement
5. Order Confirmation + Receipt

---

## 📦 Order System

* View order details
* Track status
* Calculate totals (discount + shipping)
* Print receipt

---

## 🧑‍💼 Admin Dashboard

* Product CRUD
* Order Management
* Employee/Customer Management
* Analytics (charts)

---

## 📂 Project Structure

```
src/
│
├── api/                # Axios clients
├── front/              # Customer-facing app
│   ├── components/
│   ├── contexts/
│   ├── pages/
│
├── dashboard/          # Admin panel
│   ├── components/
│   ├── contexts/
│   ├── pages/
│
├── routes.js
└── index.js
```

---

## 🔄 State Management Strategy

| Type            | Tool Used    |
| --------------- | ------------ |
| Server State    | React Query  |
| Global UI State | Context API  |
| Auth Tokens     | localStorage |
| Guest Sessions  | Cookies      |

---

## 📡 API Endpoints (Cart)

```
POST   /cart/add/
GET    /cart/view/
PUT    /cart/update/<product_id>/
DELETE /cart/remove/<product_id>/
```

---

## 🛠 Setup Instructions

### 1. Clone

```bash
git clone <your-repo-url>
cd inner_patissier_react
```

### 2. Install

```bash
npm install
```

### 3. Environment Variables

Create `.env`:

```
REACT_APP_API_URL=http://localhost:8000
```

---

### 4. Run Frontend

```bash
npm start
```

---

### 5. Run Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🔐 Security Design

* JWT authentication for users
* HttpOnly cookies for guest sessions
* Role-based route protection
* API-level validation

---

## ⚠️ Known Limitations

* CRA dependency warnings (dev-only)
* Guest → user cart merge can be improved
* No payment gateway integration yet

---

## 🚀 Future Improvements

* Persist React Query cache
* Stripe / SSLCommerz integration
* Full cart merge on login
* Performance optimization
* Migration to Vite

---

## 👤 Author

**Mushfiq Us Salahin**

* GitHub: *[https://github.com/salahinmushfiq](https://github.com/salahinmushfiq)*
* Portfolio: *[https://ngsoftworks.netlify.app/](https://ngsoftworks.netlify.app/)*

---

## ⭐ Why This Project Matters

This is not just a UI project.

It demonstrates:

* Real-world state synchronization
* Authentication architecture
* Backend + frontend integration
* Scalable design patterns

---

