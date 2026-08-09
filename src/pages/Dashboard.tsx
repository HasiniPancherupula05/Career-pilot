import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job, Application } from '../types';
import { getJobs, getApplications, updateApplication } from '../services/api';
import { Loading } from '../components/Loading';
import { Toast } from '../components/Toast';
import { ToastMessage } from '../types';
import {
  Briefcase,
  FileCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  RefreshCw,
  Building2,
  Mail,
  Calendar,
  Zap,
  BarChart2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [jobData, appData] = await Promise.all([getJobs(), getApplications()]);
      setJobs(jobData);
      setApplications(appData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard metrics from REST API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const jobsMap = useMemo(() => {
    const map: Record<string, Job> = {};
    jobs.forEach((j) => {
      map[j.id] = j;
    });
    return map;
  }, [jobs]);

  // Metrics
  const statusCounts = useMemo(() => {
    const counts = { Applied: 0, Screening: 0, Interview: 0, Offer: 0, Rejected: 0 };
    applications.forEach((app) => {
      if (counts[app.status] !== undefined) {
        counts[app.status]++;
      }
    });
    return counts;
  }, [applications]);

  const offerRate = useMemo(() => {
    if (applications.length === 0) return 0;
    return Math.round((statusCounts.Offer / applications.length) * 100);
  }, [applications, statusCounts]);

  const handleStatusChange = async (id: string, newStatus: Application['status']) => {
    try {
      await updateApplication(id, { status: newStatus });
      addToast('success', `Status updated to "${newStatus}" via PUT /api/applications/${id}`);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update application status.');
    }
  };

  if (loading) {
    return <Loading message="Loading CareerPilot Dashboard analytics..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" /> Live REST API Analytics
          </div>
          <h1 className="text-3xl font-extrabold theme-text-heading">CareerPilot Dashboard</h1>
          <p className="text-sm theme-text-muted mt-1">
            Real-time telemetry and management portal powered by Express REST API
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl theme-secondary-btn transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate('/admin/jobs/new')}
            className="px-4 py-2.5 theme-primary-btn text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="theme-card p-5 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold theme-text-heading">{jobs.length}</p>
            <p className="text-xs theme-text-muted">Active Job Listings</p>
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold theme-text-heading">{applications.length}</p>
            <p className="text-xs theme-text-muted">Total Applicants</p>
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold theme-text-heading">{statusCounts.Offer}</p>
            <p className="text-xs theme-text-muted">Offers Extended ({offerRate}%)</p>
          </div>
        </div>

        <div className="theme-card p-5 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold theme-text-heading">
              {statusCounts.Screening + statusCounts.Interview}
            </p>
            <p className="text-xs theme-text-muted">In Active Pipeline</p>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Funnel Breakdown */}
        <div className="lg:col-span-2 theme-card rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg font-bold theme-text-heading">Application Pipeline Status</h2>
            </div>
            <button
              onClick={() => navigate('/applications')}
              className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              View All Applications <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Applied', count: statusCounts.Applied, color: 'bg-[var(--primary)]' },
              { label: 'Screening', count: statusCounts.Screening, color: 'bg-[#F59E0B]' },
              { label: 'Interview', count: statusCounts.Interview, color: 'bg-[var(--accent)]' },
              { label: 'Offer', count: statusCounts.Offer, color: 'bg-[#22C55E]' },
              { label: 'Rejected', count: statusCounts.Rejected, color: 'bg-[#EF4444]' },
            ].map((item) => {
              const percentage =
                applications.length > 0 ? Math.round((item.count / applications.length) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="theme-text-heading">{item.label}</span>
                    <span className="theme-text-muted">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REST API Telemetry Box */}
        <div className="theme-card rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[var(--border-main)] pb-4">
              <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
              <h2 className="text-lg font-bold theme-text-heading">Express Backend Status</h2>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)]">
                <span className="font-mono theme-text-muted">GET /api/jobs</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E]">
                  200 OK ({jobs.length} items)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)]">
                <span className="font-mono theme-text-muted">GET /api/applications</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E]">
                  200 OK ({applications.length} items)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)] space-y-1">
                <p className="font-semibold theme-text-heading">CRUD Capability</p>
                <p className="theme-text-muted">
                  Supports POST, PUT, DELETE for live real-time state management.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-main)]">
            <button
              onClick={() => navigate('/jobs')}
              className="w-full py-2.5 theme-primary-btn text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Manage Job Listings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Applications Activity */}
      <div className="theme-card rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="text-lg font-bold theme-text-heading">Recent Applications</h2>
          </div>
          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {applications.length === 0 ? (
          <p className="text-xs theme-text-muted text-center py-6">No applications submitted yet.</p>
        ) : (
          <div className="divide-y divide-[var(--border-main)]">
            {applications.slice(0, 5).map((app) => {
              const matchedJob = jobsMap[app.jobId];
              return (
                <div key={app.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold theme-text-heading text-sm">{app.applicantName}</span>
                    <div className="text-xs theme-text-muted flex items-center gap-2 mt-0.5">
                      <span className="text-[var(--primary)] font-medium">
                        {matchedJob ? matchedJob.title : `Job #${app.jobId}`}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {app.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="theme-text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {app.appliedDate}
                    </span>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value as Application['status'])
                      }
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border appearance-none cursor-pointer theme-input"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
};
