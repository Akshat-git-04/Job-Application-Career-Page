# Job Application Management System

A full-featured **React job application portal** with:
- **Offline-first functionality** (actions queued and executed when back online)
- **Role-based access control (RBAC)** using CASL
- **Multi-step job application form** with **cross-validation** and **drag-and-drop file uploads**
- **Audit logging** for full traceability
- **Manager/Admin dashboards** for reviewing and approving applications
- Built with **React 18, Redux Toolkit, React Hook Form, and Tailwind CSS**

---

## Features

### 1. **Offline Support**
- Custom Redux middleware queues all **mutating actions** (e.g., submitting applications) when offline.
- Actions are **automatically retried and executed once the app detects connectivity**.
- Prevents data loss even during unstable connections.

### 2. **Role-Based Access Control (RBAC)**
- Implemented with [`@casl/ability`](https://casl.js.org/).
- Roles:
  - **Admin**: Full control, can view Dashboard and Audit Logs.
  - **Manager**: Can read, approve, and reject applications (but not delete).
  - **User**: Can create, edit, and submit their own applications.
- Rules configured in [`src/context/ability.js`](src/context/ability.js).

### 3. **Multi-Step Application Form**
- Built with **React Hook Form** for fast validation and minimal re-renders.
- **Cross-step validation** ensures consistency (e.g., required personal info before uploading files).
- **Drag-and-drop file uploads** (for resumes, cover letters, etc.).
- Drafts are saved to **localStorage** for persistence across refreshes.

### 4. **Manager & Admin Dashboards**
- **Manager Dashboard** (`/manager/review`):
  - Displays all submitted applications.
  - Sorts applications **newest first**.
  - Approve or reject applications with a single click.
- **Admin Dashboard & Logs** (`/admin/dashboard` and `/admin/logs`):
  - Admin-only views for system stats and action history.
  - View full **audit trail** of all user actions.

### 5. **Audit Logging**
- All key actions (login, logout, submit, approve, reject) logged via [`src/utils/audit.js`](src/utils/audit.js).
- Logs include **timestamp, actor role, and context**.
- Accessible only by Admin.

### 6. **Modern UI & Animations**
- Built with **Tailwind CSS** for a clean, responsive UI.
- Smooth transitions and hover effects with **Framer Motion**.
- Responsive design for desktop and mobile.

---

## Project Structure

```

src/
app/
slices/
formSlice.js           # Redux slice for role and session state
store.js                 # Redux store + offline middleware
components/
layout/
Navbar.jsx             # Navbar with RBAC-based links
context/
ability.js               # CASL abilities per role
pages/
MultiStepForm.jsx        # Multi-step job application form
ManagerReview\.jsx        # Manager dashboard for reviewing apps
AdminDashboard.jsx       # Admin stats view
AuditLogs.jsx            # Admin audit logs
utils/
audit.js                 # Logs all user actions
offlineMiddleware.js     # Queues Redux actions while offline

````

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/Akshat-git-04/Job-Application-Career-Page
cd job-application-portal
npm install
npm run dev
````

The app runs at `http://localhost:5173`.

---

## Usage

1. **Select a role (User, Manager, Admin)**
   Roles are simulated via Redux (`formSlice`). The login page or state setter can change roles.
2. **Submit Applications (Offline Mode Supported)**
   Turn off your network, submit an application — it’s **queued** and processed automatically when online.
3. **Multi-Step Form**

   * Step 1: Personal Information
   * Step 2: Job Preferences
   * Step 3: File Upload (drag-and-drop)
   * Cross-step validation ensures completion of required fields.
4. **Manager Review**
   Visit `/manager/review` (for Manager/Admin).
   Applications are sorted **newest first**.
5. **Admin Audit Logs**
   Visit `/admin/logs` to view all user actions.

---
## Application Routes

The application uses **React Router** with role-protected routes. Below is the full route map:

| Route                  | Description                                      | Access           |
|------------------------|--------------------------------------------------|------------------|
| `/`                    | **Login Page**                                   | Public           |
| `/apply`               | Start or resume a job application (drafts)       | User             |
| `/apply/*`             | Multi-step job application form                  | User             |
| `/success`             | Submission success page                          | User             |
| `/manager/review`      | Manager dashboard to review, approve, reject applications (sorted newest first) | Manager, Admin   |
| `/admin/dashboard`     | Admin dashboard with system stats                | Admin only       |
| `/admin/logs`          | Admin audit logs view (all logged actions)       | Admin only       |
| `*` (any other route)  | Redirects to `/` (Login Page)                    | Public (fallback)|

> **ProtectedRoute** is used to enforce RBAC rules for Manager and Admin routes, leveraging CASL abilities.

---
## Tech Stack

* **React 18**
* **Redux Toolkit** for state management
* **React Router** for routing
* **CASL** for RBAC
* **React Hook Form** for multi-step form and validation
* **Framer Motion** for animations
* **Tailwind CSS** for styling
* **LocalStorage** for drafts
* **Custom Redux Middleware** for offline queuing
* **Audit Logger** for traceability

---
