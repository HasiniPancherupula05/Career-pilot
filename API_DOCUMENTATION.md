# CareerPilot REST API Documentation

Base URL: `http://localhost:3000/api`

---

## 1. Jobs Endpoints

### 1.1 Get All Jobs
- **Method:** `GET`
- **Endpoint:** `/api/jobs`
- **Purpose:** Retrieve all job listings from the Express server memory array.
- **Request Parameters:** None
- **Response Format:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "job-001",
        "title": "Frontend Developer",
        "company": "TechNova Solutions",
        "location": "Hyderabad, India",
        "type": "Full Time",
        "experience": "0-2 years",
        "salary": "₹6 - ₹10 LPA",
        "description": "Join TechNova as a Frontend Developer...",
        "responsibilities": ["Develop user-facing features..."],
        "requirements": ["Proficiency in React..."],
        "skills": ["React", "JavaScript", "TypeScript"],
        "postedDate": "2026-08-01"
      }
    ]
  }
  ```
- **Status Code:** `200 OK`

---

### 1.2 Get Single Job by ID
- **Method:** `GET`
- **Endpoint:** `/api/jobs/:id`
- **Purpose:** Retrieve a specific job by its unique ID.
- **Response Format (Success):**
  ```json
  {
    "success": true,
    "data": {
      "id": "job-001",
      "title": "Frontend Developer",
      "company": "TechNova Solutions"
    }
  }
  ```
- **Response Format (Not Found):**
  ```json
  {
    "success": false,
    "message": "Job not found"
  }
  ```
- **Status Codes:** `200 OK` or `404 Not Found`

---

### 1.3 Create New Job
- **Method:** `POST`
- **Endpoint:** `/api/jobs`
- **Purpose:** Create a new job listing on the Express server.
- **Request Body:**
  ```json
  {
    "title": "Frontend Developer",
    "company": "TechNova",
    "location": "Hyderabad",
    "type": "Full Time",
    "experience": "0-2 years",
    "salary": "₹6-10 LPA",
    "description": "Job description here...",
    "responsibilities": ["Build UI components"],
    "requirements": ["Degree in CS"],
    "skills": ["React", "CSS"]
  }
  ```
- **Response Format:**
  ```json
  {
    "success": true,
    "data": {
      "id": "job-1723145678-123",
      "title": "Frontend Developer",
      "postedDate": "2026-08-08"
    }
  }
  ```
- **Status Codes:** `201 Created` or `400 Bad Request`

---

### 1.4 Update Existing Job
- **Method:** `PUT`
- **Endpoint:** `/api/jobs/:id`
- **Purpose:** Modify an existing job's details by ID.
- **Request Body:**
  ```json
  {
    "title": "Senior Frontend Developer",
    "salary": "₹12-16 LPA"
  }
  ```
- **Response Format:**
  ```json
  {
    "success": true,
    "data": {
      "id": "job-001",
      "title": "Senior Frontend Developer"
    }
  }
  ```
- **Status Codes:** `200 OK` or `404 Not Found`

---

### 1.5 Delete Job
- **Method:** `DELETE`
- **Endpoint:** `/api/jobs/:id`
- **Purpose:** Delete a job listing from server memory.
- **Response Format:**
  ```json
  {
    "success": true,
    "message": "Job deleted successfully",
    "deletedId": "job-001"
  }
  ```
- **Status Codes:** `200 OK` or `404 Not Found`

---

## 2. Applications Endpoints

### 2.1 Get All Applications
- **Method:** `GET`
- **Endpoint:** `/api/applications`
- **Purpose:** Retrieve all candidate applications.
- **Status Code:** `200 OK`

---

### 2.2 Get Application by ID
- **Method:** `GET`
- **Endpoint:** `/api/applications/:id`
- **Purpose:** Retrieve application details for a specific ID.
- **Status Codes:** `200 OK` or `404 Not Found`

---

### 2.3 Create New Application
- **Method:** `POST`
- **Endpoint:** `/api/applications`
- **Purpose:** Submit a new job application.
- **Request Body:**
  ```json
  {
    "jobId": "job-001",
    "applicantName": "Demo Student",
    "email": "student@example.com",
    "phone": "9876543210",
    "resume": "resume.pdf",
    "coverLetter": "I am interested in this role."
  }
  ```
- **Status Codes:** `201 Created` or `400 Bad Request`

---

### 2.4 Update Application
- **Method:** `PUT`
- **Endpoint:** `/api/applications/:id`
- **Purpose:** Update status or details (e.g. status transition from "Applied" to "Interview").
- **Request Body:**
  ```json
  {
    "status": "Interview"
  }
  ```
- **Status Codes:** `200 OK` or `404 Not Found`

---

### 2.5 Delete Application
- **Method:** `DELETE`
- **Endpoint:** `/api/applications/:id`
- **Purpose:** Remove an application record.
- **Status Codes:** `200 OK` or `404 Not Found`
