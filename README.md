# CAREERPILOT

**"Your Career. Your Opportunities. One Place."**

CareerPilot is a modern Job & Application Management full-stack web application built for **Cognifyz Full Stack Development Task 5**.

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

