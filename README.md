# 🚀 Employee Management Analytics System

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blueviolet?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, industry-grade **Employee Management & Analytics Dashboard** built with the MERN stack. This system provides comprehensive administrative controls, real-time data visualization through MongoDB aggregation pipelines, and a seamless user experience with a responsive UI.

---

## 📖 Project Overview

The **Employee Management Analytics System** is a scalable enterprise solution designed to streamline workforce management. It features a robust backend following the **MVC Architecture**, a state-of-the-art frontend powered by **Redux Toolkit**, and secure **JWT-based Authentication**. 

Administrators can manage employee records, track performance metrics via an analytics dashboard, and perform complex data queries with built-in search, filtering, and pagination.

---

## 🔗 Live Links

| Resource | Link |
| :--- | :--- |
| **🌐 Frontend Live** | [View Live Site](https://employee-analytics-frontend.vercel.app) |
| **⚙️ Backend Live** | [API Production Server](https://employee-analytics-backend.render.com) |
| **📚 API Documentation** | [Postman Documentation](https://documenter.getpostman.com/view/example) |
| **💻 GitHub Repository** | [Source Code](https://github.com/username/employee-management-analytics) |

---

## ✨ Features

### 🛠️ Core Functionalities
- **Employee CRUD**: Create, Read, Update, and Delete employee profiles with ease.
- **Advanced Analytics**: Real-time insights using MongoDB Aggregation pipelines.
- **Search & Filter**: Powerful search by name/ID and multi-parameter filtering (Department, Role, Status).
- **Pagination & Sorting**: Optimized data fetching for high-performance UI.

### 🔐 Security & Access
- **JWT Authentication**: Secure login with token-based session management.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Admin and Employee roles.
- **Protected Routes**: Navigation guards to prevent unauthorized access.
- **Rate Limiting**: Protection against Brute Force and DoS attacks.

### 🎨 UI/UX Excellence
- **Responsive Dashboard**: Fully adaptive design for Desktop, Tablet, and Mobile.
- **Dark/Light Mode**: User-preferred theme switching.
- **Toast Notifications**: Real-time feedback for all user actions.
- **Loading States**: Shimmer effects and spinners for a premium feel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Charts**: Recharts / Chart.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js
- **Validation**: Joi / Express-Validator

### Deployment & DevOps
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📂 Folder Structure

```bash
employee-management-analytics-system/
├── backend/
│   ├── src/
│   │   ├── config/             # DB & Auth Config
│   │   ├── controllers/        # MVC Controllers (auth, employee, analytics)
│   │   ├── middlewares/        # Auth, Error, Logger, Role middlewares
│   │   ├── models/             # Mongoose Schemas (user, employee)
│   │   ├── routes/             # API Endpoints
│   │   ├── services/           # Business Logic Layer
│   │   ├── utils/              # Helper Functions (asyncHandler, generateToken)
│   │   ├── validations/        # Request Validation logic
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # Server entry point
│   ├── .env                    # Environment variables
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios instances & configuration
│   │   ├── app/                # Redux Store setup
│   │   ├── components/         # Reusable UI components (common, forms, tables)
│   │   ├── features/           # Redux Slices (auth, employees, analytics)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Page Layouts (Admin, Auth)
│   │   ├── pages/              # View Screens (Login, Dashboard, etc.)
│   │   ├── routes/             # App Navigation logic
│   │   ├── services/           # API service calls
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # React entry point
│   └── package.json            # Frontend dependencies
└── README.md
```

---

## ⚙️ Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/employee-management-analytics.git
   cd employee-management-analytics
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Application (Development)**
   - Backend: `npm run dev` (from /backend)
   - Frontend: `npm run dev` (from /frontend)

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 Backend API Overview

### Authentication
- `POST /api/auth/register` - User Registration
- `POST /api/auth/login` - User Login

### Employees
- `GET /api/employees` - Get all employees (Search, Filter, Sort, Paginate)
- `POST /api/employees` - Add new employee (Admin only)
- `GET /api/employees/:id` - Get single employee details
- `PUT /api/employees/:id` - Update employee info
- `DELETE /api/employees/:id` - Remove employee record

### Analytics
- `GET /api/analytics/stats` - Overall dashboard statistics
- `GET /api/analytics/dept-distribution` - MongoDB Aggregation by Department

---

## 🛡️ Security & Performance

- **Helmet.js**: Secured HTTP headers.
- **CORS Configuration**: Restricted cross-origin resource sharing.
- **Query Optimization**: Indexed MongoDB fields for faster retrieval.
- **MVC Architecture**: Clean separation of concerns for maintainability.
- **Middleware**: Logging with Morgan and robust Error Handling.

---

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Push `frontend` folder to GitHub.
2. Connect Vercel to your repo.
3. Set `VITE_API_URL` in environment variables.

### Backend (Render)
1. Push `backend` folder to GitHub.
2. Create a "Web Service" on Render.
3. Add all `.env` variables in the "Environment" tab.

---

## 📸 Screenshots

> *Add your project screenshots here*

| Dashboard Overview | Employee Management | Analytics Insights |
| :---: | :---: | :---: |
| ![Dashboard](https://via.placeholder.com/300x200?text=Dashboard) | ![Employee](https://via.placeholder.com/300x200?text=Employee+List) | ![Analytics](https://via.placeholder.com/300x200?text=Analytics+Charts) |

---

## 🔮 Future Improvements

- [ ] PDF Report Generation for Employee Performance.
- [ ] Integration with Slack/Email for Automated Notifications.
- [ ] AI-driven turnover prediction model.
- [ ] Multi-language support (i18n).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

⭐️ From [Your Name](https://github.com/yourusername)
