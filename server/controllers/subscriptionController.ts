import { Request, Response } from 'express';
import { subscriptionsData, JobAlertSubscription } from '../data/subscriptions';
import { jobsData } from '../data/jobs';

// GET /api/subscriptions
export const getAllSubscriptions = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: subscriptionsData,
  });
};

// POST /api/subscriptions
export const createSubscription = (req: Request, res: Response) => {
  const { email, keywords, jobType, frequency } = req.body;

  if (!email || !String(email).includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Valid email address is required.',
    });
  }

  const existing = subscriptionsData.find(
    (s) => s.email.toLowerCase() === String(email).trim().toLowerCase()
  );

  if (existing) {
    // Update existing subscription preference
    existing.keywords = keywords ? String(keywords).trim() : existing.keywords;
    existing.jobType = jobType ? String(jobType).trim() : existing.jobType;
    existing.frequency = (frequency || existing.frequency) as any;
    existing.active = true;

    return res.status(200).json({
      success: true,
      message: 'Job alert preferences updated successfully!',
      data: existing,
    });
  }

  const newSub: JobAlertSubscription = {
    id: `sub-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
    email: String(email).trim(),
    keywords: keywords ? String(keywords).trim() : 'All Roles',
    jobType: jobType ? String(jobType).trim() : 'Any Location/Type',
    frequency: (frequency || 'daily') as any,
    active: true,
    subscribedAt: new Date().toISOString().split('T')[0],
  };

  subscriptionsData.unshift(newSub);

  res.status(201).json({
    success: true,
    message: 'Successfully subscribed to CareerPilot Job Alerts!',
    data: newSub,
  });
};

// DELETE /api/subscriptions/:id
export const deleteSubscription = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = subscriptionsData.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found',
    });
  }

  subscriptionsData.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Unsubscribed from job alerts successfully',
    deletedId: id,
  });
};

// POST /api/subscriptions/:id/notify - Simulate triggering a notification
export const simulateNotification = (req: Request, res: Response) => {
  const { id } = req.params;
  const sub = subscriptionsData.find((s) => s.id === id);

  if (!sub) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found',
    });
  }

  // Find matching jobs
  const matchingJobs = jobsData.filter((job) => {
    if (!sub.keywords || sub.keywords === 'All Roles') return true;
    const kw = sub.keywords.toLowerCase();
    return (
      job.title.toLowerCase().includes(kw) ||
      job.skills.some((s) => s.toLowerCase().includes(kw)) ||
      job.description.toLowerCase().includes(kw)
    );
  });

  const previewList = (matchingJobs.length > 0 ? matchingJobs : jobsData).slice(0, 3);

  res.status(200).json({
    success: true,
    message: `Simulation sent! Alert dispatched to ${sub.email}.`,
    simulation: {
      recipient: sub.email,
      frequency: sub.frequency,
      keywords: sub.keywords,
      matchingCount: previewList.length,
      sampleJobs: previewList.map((j) => ({
        id: j.id,
        title: j.title,
        company: j.company,
        location: j.location,
        salary: j.salary,
      })),
      timestamp: new Date().toISOString(),
    },
  });
};
