import { Request, Response } from 'express';
import { applicationsData, Application } from '../data/applications';

// GET /api/applications
export const getAllApplications = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: applicationsData
  });
};

// GET /api/applications/:id
export const getApplicationById = (req: Request, res: Response) => {
  const { id } = req.params;
  const application = applicationsData.find((a) => a.id === id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  res.status(200).json({
    success: true,
    data: application
  });
};

// POST /api/applications
export const createApplication = (req: Request, res: Response) => {
  const { jobId, applicantName, email, phone, resume, coverLetter } = req.body;

  if (!jobId || !applicantName || !email) {
    return res.status(400).json({
      success: false,
      message: 'Invalid application data. jobId, applicantName, and email are required.'
    });
  }

  const newApplication: Application = {
    id: `app-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
    jobId: String(jobId).trim(),
    applicantName: String(applicantName).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : 'N/A',
    resume: resume ? String(resume).trim() : 'resume.pdf',
    coverLetter: coverLetter ? String(coverLetter).trim() : '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0]
  };

  applicationsData.unshift(newApplication);

  res.status(201).json({
    success: true,
    data: newApplication
  });
};

// PUT /api/applications/:id
export const updateApplication = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = applicationsData.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  const existingApp = applicationsData[index];
  const { status, applicantName, email, phone, resume, coverLetter } = req.body;

  const validStatuses = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`
    });
  }

  const updatedApp: Application = {
    ...existingApp,
    status: status || existingApp.status,
    applicantName: applicantName !== undefined ? String(applicantName).trim() : existingApp.applicantName,
    email: email !== undefined ? String(email).trim() : existingApp.email,
    phone: phone !== undefined ? String(phone).trim() : existingApp.phone,
    resume: resume !== undefined ? String(resume).trim() : existingApp.resume,
    coverLetter: coverLetter !== undefined ? String(coverLetter).trim() : existingApp.coverLetter
  };

  applicationsData[index] = updatedApp;

  res.status(200).json({
    success: true,
    data: updatedApp
  });
};

// DELETE /api/applications/:id
export const deleteApplication = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = applicationsData.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    });
  }

  applicationsData.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Application deleted successfully',
    deletedId: id
  });
};
