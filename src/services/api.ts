import axios from 'axios';
import { Job, Application, JobAlertSubscription, SubscriptionSimulation, ApiResponse } from '../types';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// JOBS API SERVICE
export const getJobs = async (): Promise<Job[]> => {
  const response = await API.get<ApiResponse<Job[]>>('/jobs');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to fetch jobs');
  }
  return response.data.data;
};

export const getJob = async (id: string): Promise<Job> => {
  const response = await API.get<ApiResponse<Job>>(`/jobs/${id}`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Job not found');
  }
  return response.data.data;
};

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const response = await API.post<ApiResponse<Job>>('/jobs', jobData);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to create job');
  }
  return response.data.data;
};

export const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
  const response = await API.put<ApiResponse<Job>>(`/jobs/${id}`, jobData);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to update job');
  }
  return response.data.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  const response = await API.delete<ApiResponse<null>>(`/jobs/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete job');
  }
};

// APPLICATIONS API SERVICE
export const getApplications = async (): Promise<Application[]> => {
  const response = await API.get<ApiResponse<Application[]>>('/applications');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to fetch applications');
  }
  return response.data.data;
};

export const getApplication = async (id: string): Promise<Application> => {
  const response = await API.get<ApiResponse<Application>>(`/applications/${id}`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Application not found');
  }
  return response.data.data;
};

export const createApplication = async (appData: Partial<Application>): Promise<Application> => {
  const response = await API.post<ApiResponse<Application>>('/applications', appData);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to submit application');
  }
  return response.data.data;
};

export const updateApplication = async (id: string, appData: Partial<Application>): Promise<Application> => {
  const response = await API.put<ApiResponse<Application>>(`/applications/${id}`, appData);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to update application');
  }
  return response.data.data;
};

export const deleteApplication = async (id: string): Promise<void> => {
  const response = await API.delete<ApiResponse<null>>(`/applications/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete application');
  }
};

// SUBSCRIPTIONS API SERVICE
export const getSubscriptions = async (): Promise<JobAlertSubscription[]> => {
  const response = await API.get<ApiResponse<JobAlertSubscription[]>>('/subscriptions');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to fetch job alert subscriptions');
  }
  return response.data.data;
};

export const createSubscription = async (subData: {
  email: string;
  keywords?: string;
  jobType?: string;
  frequency?: 'daily' | 'weekly' | 'instant';
}): Promise<{ subscription: JobAlertSubscription; message: string }> => {
  const response = await API.post<ApiResponse<JobAlertSubscription>>('/subscriptions', subData);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Failed to subscribe to job alerts');
  }
  return {
    subscription: response.data.data,
    message: response.data.message || 'Subscribed successfully',
  };
};

export const deleteSubscription = async (id: string): Promise<void> => {
  const response = await API.delete<ApiResponse<null>>(`/subscriptions/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete subscription');
  }
};

export const simulateSubscriptionNotification = async (
  id: string
): Promise<SubscriptionSimulation> => {
  const response = await API.post<
    ApiResponse<null> & { simulation?: SubscriptionSimulation }
  >(`/subscriptions/${id}/notify`);
  if (!response.data.success || !response.data.simulation) {
    throw new Error(response.data.message || 'Failed to trigger alert simulation');
  }
  return response.data.simulation;
};

