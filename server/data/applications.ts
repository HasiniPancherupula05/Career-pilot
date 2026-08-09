export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  appliedDate: string;
}

export let initialApplications: Application[] = [
  {
    id: "app-001",
    jobId: "job-001",
    applicantName: "Demo Student",
    email: "student@example.com",
    phone: "9876543210",
    resume: "demo_student_resume.pdf",
    coverLetter: "I am highly interested in the Frontend Developer position at TechNova. I have hands-on experience building React and JavaScript applications.",
    status: "Applied",
    appliedDate: "2026-08-08"
  },
  {
    id: "app-002",
    jobId: "job-002",
    applicantName: "Alex Morgan",
    email: "alex.morgan@dev.io",
    phone: "9812345678",
    resume: "alex_morgan_cv.pdf",
    coverLetter: "With 3 years of Node.js and Express experience, I would love to contribute to CodeSphere's scalable backend infrastructure.",
    status: "Interview",
    appliedDate: "2026-08-06"
  },
  {
    id: "app-003",
    jobId: "job-003",
    applicantName: "Priya Sharma",
    email: "priya.sharma@tech.com",
    phone: "9988776655",
    resume: "priya_sharma_resume.pdf",
    coverLetter: "As a full-stack enthusiast, I have engineered multiple web apps using Express REST APIs and React frontends.",
    status: "Screening",
    appliedDate: "2026-08-07"
  }
];

export let applicationsData: Application[] = [...initialApplications];
