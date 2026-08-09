export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  postedDate: string;
}

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

export interface JobAlertSubscription {
  id: string;
  email: string;
  keywords?: string;
  jobType?: string;
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
  subscribedAt: string;
}

export interface SubscriptionSimulation {
  recipient: string;
  frequency: string;
  keywords?: string;
  matchingCount: number;
  sampleJobs: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
  }[];
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface JobFilterState {
  search: string;
  location: string;
  type: string;
  experience: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}
