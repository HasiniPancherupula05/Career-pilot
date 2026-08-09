export interface JobAlertSubscription {
  id: string;
  email: string;
  keywords?: string;
  jobType?: string;
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
  subscribedAt: string;
}

export const subscriptionsData: JobAlertSubscription[] = [
  {
    id: 'sub-1',
    email: 'alex.developer@example.com',
    keywords: 'React, Node.js, Frontend',
    jobType: 'Full-Time',
    frequency: 'daily',
    active: true,
    subscribedAt: '2026-08-01',
  },
  {
    id: 'sub-2',
    email: 'sarah.engineering@example.com',
    keywords: 'Full Stack, Remote',
    jobType: 'Remote',
    frequency: 'instant',
    active: true,
    subscribedAt: '2026-08-05',
  },
];
