# CAREERPILOT

**"Your Career. Your Opportunities. One Place."**

CareerPilot is a modern Job & Application Management full-stack web application built for **Cognifyz Full Stack Development Task 5**.

---

## 🎯 Task 5 Objective
1. Create RESTful API endpoints using Node.js & Express.
2. Implement CRUD (Create, Read, Update, Delete) operations for Jobs and Applications.
3. Build a React frontend that communicates with the REST API using Axios.
4. Fetch data dynamically from the REST API and update the user interface.

---

## 🚀 Key Features

### Job Management (Admin & Candidates)
- **View All Jobs:** Dynamic listing fetched from `GET /api/jobs`.
- **Search & Filtering:** Real-time search by title, company, or skills, and filtering by location, job type, and experience level.
- **Job Details View:** Complete job breakdown including responsibilities, requirements, and salary.
- **Create Job:** Add new opportunities via `POST /api/jobs`.
- **Edit Job:** Update job details via `PUT /api/jobs/:id`.
- **Delete Job:** Remove job listings via `DELETE /api/jobs/:id`.

### Candidate Applications
- **Apply for Jobs:** Submit candidate details, resume links, and cover letters via `POST /api/applications`.
- **Application Tracker:** View candidates and status badges via `GET /api/applications`.
- **Status Workflow:** Update candidate progress (Applied → Screening → Interview → Offer → Rejected) via `PUT /api/applications/:id`.
- **Delete Application:** Remove candidate application records via `DELETE /api/applications/:id`.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, React Router v7, Axios, Tailwind CSS v4, Lucide Icons, Motion
- **Backend:** Node.js, Express.js, TypeScript, CORS, Body Parser
- **Storage:** Server-side temporary in-memory JavaScript arrays (`jobsData`, `applicationsData`)

---

## 🏗️ Architecture

```
React Frontend
      ↓
Axios Service Layer (src/services/api.ts)
      ↓
Express REST API Routes (/api/jobs & /api/applications)
      ↓
Node.js Express Controllers
      ↓
Temporary In-Memory Server Storage
```

---

## 📂 Project Structure

```
├── server.ts                       # Express server entry point (Port 3000)
├── API_DOCUMENTATION.md            # Detailed REST API endpoints documentation
├── COGNIFYZ_TASK_5.md             # Cognifyz Task 5 compliance verification
├── server/
│   ├── routes/
│   │   ├── jobRoutes.ts            # Express router for /api/jobs
│   │   └── applicationRoutes.ts    # Express router for /api/applications
│   ├── controllers/
│   │   ├── jobController.ts        # CRUD business logic for jobs
│   │   └── applicationController.ts  # CRUD business logic for applications
│   ├── data/
│   │   ├── jobs.ts                 # Temporary in-memory jobs array & initial data
│   │   └── applications.ts         # Temporary in-memory applications array
│   └── middleware/
│       └── errorHandler.ts         # Central Express error handling middleware
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Responsive navigation bar
│   │   ├── JobCard.tsx             # Job listing card component
│   │   ├── JobFilters.tsx          # Real-time search & filter bar
│   │   ├── ApplicationFormModal.tsx# Modal dialog to submit job applications
│   │   ├── ApplicationTable.tsx    # Candidate application management table
│   │   ├── Loading.tsx             # API loading spinner
│   │   ├── EmptyState.tsx          # Friendly empty state display
│   │   └── Toast.tsx               # Toast notification system
│   ├── pages/
│   │   ├── Home.tsx                # Hero landing page & REST API metrics
│   │   ├── Jobs.tsx                # Jobs exploration page
│   │   ├── JobDetails.tsx          # Detailed job description view
│   │   ├── Applications.tsx        # Application tracker dashboard
│   │   ├── CreateJob.tsx           # Create job form
│   │   ├── EditJob.tsx             # Edit job form
│   │   └── NotFound.tsx            # 404 page
│   ├── services/
│   │   └── api.ts                  # Axios API client functions
│   ├── types.ts                    # TypeScript interfaces
│   ├── App.tsx                     # Main React router setup
│   └── index.css                   # Tailwind CSS v4 custom theme
```

---

## ⚡ How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running the Full-Stack Application
```bash
npm run dev
```
The application runs on `http://localhost:3000`. Both the Express REST API and the React Vite dev middleware run concurrently on port 3000.

---

## 🧪 Testing REST Endpoints

### 1. Using Postman / Curl
- **Get Jobs:** `GET http://localhost:3000/api/jobs`
- **Create Job:** `POST http://localhost:3000/api/jobs`
- **Get Job Details:** `GET http://localhost:3000/api/jobs/job-001`
- **Update Job:** `PUT http://localhost:3000/api/jobs/job-001`
- **Delete Job:** `DELETE http://localhost:3000/api/jobs/job-001`
- **Submit Application:** `POST http://localhost:3000/api/applications`
- **Get Applications:** `GET http://localhost:3000/api/applications`
- **Update Status:** `PUT http://localhost:3000/api/applications/app-001`
- **Delete Application:** `DELETE http://localhost:3000/api/applications/app-001`
