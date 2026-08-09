import { Request, Response } from 'express';
import { jobsData, Job } from '../data/jobs';

// GET /api/jobs
export const getAllJobs = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: jobsData
  });
};

// GET /api/jobs/:id
export const getJobById = (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobsData.find((j) => j.id === id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  res.status(200).json({
    success: true,
    data: job
  });
};

// POST /api/jobs
export const createJob = (req: Request, res: Response) => {
  const {
    title,
    company,
    location,
    type,
    experience,
    salary,
    description,
    responsibilities,
    requirements,
    skills
  } = req.body;

  // Basic validation
  if (!title || !company || !location || !type || !description) {
    return res.status(400).json({
      success: false,
      message: 'Invalid job data. Title, Company, Location, Type, and Description are required.'
    });
  }

  // Format array fields if passed as strings or comma-separated lists
  const formatArray = (input: any): string[] => {
    if (Array.isArray(input)) return input.map((s) => String(s).trim()).filter(Boolean);
    if (typeof input === 'string') {
      return input
        .split('\n')
        .map((line) => line.replace(/^[-•*]\s*/, '').trim())
        .filter(Boolean);
    }
    return [];
  };

  const newJob: Job = {
    id: `job-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
    title: String(title).trim(),
    company: String(company).trim(),
    location: String(location).trim(),
    type: String(type || 'Full Time').trim(),
    experience: String(experience || '0-2 years').trim(),
    salary: String(salary || 'Negotiable').trim(),
    description: String(description).trim(),
    responsibilities: formatArray(responsibilities),
    requirements: formatArray(requirements),
    skills: formatArray(skills),
    postedDate: new Date().toISOString().split('T')[0]
  };

  jobsData.unshift(newJob);

  res.status(201).json({
    success: true,
    data: newJob
  });
};

// PUT /api/jobs/:id
export const updateJob = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = jobsData.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  const existingJob = jobsData[index];
  const {
    title,
    company,
    location,
    type,
    experience,
    salary,
    description,
    responsibilities,
    requirements,
    skills
  } = req.body;

  const formatArray = (input: any, fallback: string[]): string[] => {
    if (Array.isArray(input)) return input.map((s) => String(s).trim()).filter(Boolean);
    if (typeof input === 'string') {
      return input
        .split('\n')
        .map((line) => line.replace(/^[-•*]\s*/, '').trim())
        .filter(Boolean);
    }
    return fallback;
  };

  const updatedJob: Job = {
    ...existingJob,
    title: title !== undefined ? String(title).trim() : existingJob.title,
    company: company !== undefined ? String(company).trim() : existingJob.company,
    location: location !== undefined ? String(location).trim() : existingJob.location,
    type: type !== undefined ? String(type).trim() : existingJob.type,
    experience: experience !== undefined ? String(experience).trim() : existingJob.experience,
    salary: salary !== undefined ? String(salary).trim() : existingJob.salary,
    description: description !== undefined ? String(description).trim() : existingJob.description,
    responsibilities: formatArray(responsibilities, existingJob.responsibilities),
    requirements: formatArray(requirements, existingJob.requirements),
    skills: formatArray(skills, existingJob.skills)
  };

  jobsData[index] = updatedJob;

  res.status(200).json({
    success: true,
    data: updatedJob
  });
};

// DELETE /api/jobs/:id
export const deleteJob = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = jobsData.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  jobsData.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Job deleted successfully',
    deletedId: id
  });
};
