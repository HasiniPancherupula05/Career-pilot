import React, { useEffect, useState, useMemo } from 'react';
import { Application, Job, ToastMessage } from '../types';
import {
  getApplications,
  getJobs,
  updateApplication,
  deleteApplication
} from '../services/api';
import { ApplicationTable } from '../components/ApplicationTable';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Toast } from '../components/Toast';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Delete Target Modal
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Filter by status on page
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Toasts
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
      const [appData, jobData] = await Promise.all([getApplications(), getJobs()]);
      setApplications(appData);
      setJobs(jobData);
    } catch (err: any) {
      setError(err.message || 'Unable to fetch applications from Express REST API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Map job ID to Job object for rapid lookup
  const jobsMap = useMemo(() => {
    const map: Record<string, Job> = {};
    jobs.forEach((j) => {
      map[j.id] = j;
    });
    return map;
  }, [jobs]);

  // Handle Status Change (PUT /api/applications/:id)
  const handleStatusChange = async (id: string, newStatus: Application['status']) => {
    try {
      const updated = await updateApplication(id, { status: newStatus });
      addToast(
        'success',
        `Status updated to "${newStatus}" for ${updated.applicantName} via PUT /api/applications/${id}`
      );
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update application status.');
    }
  };

  // Handle Delete Application (DELETE /api/applications/:id)
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteApplication(deleteTarget.id);
      addToast('success', `Application for ${deleteTarget.name} deleted successfully!`);
      setApplications((prev) => prev.filter((app) => app.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete application.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredApplications = useMemo(() => {
    if (selectedStatus === 'All') return applications;
    return applications.filter((app) => app.status === selectedStatus);
  }, [applications, selectedStatus]);

  // Metrics
  const statusCounts = useMemo(() => {
    const counts = { All: applications.length, Applied: 0, Screening: 0, Interview: 0, Offer: 0, Rejected: 0 };
    applications.forEach((app) => {
      if (counts[app.status] !== undefined) {
        counts[app.status]++;
      }
    });
    return counts;
  }, [applications]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold theme-text-heading">Application Tracker</h1>
          <p className="text-sm theme-text-muted mt-1">
            Manage applicant status and responses fetched live from GET /api/applications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl theme-secondary-btn transition-colors cursor-pointer"
            title="Refresh applications from API"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              selectedStatus === st
                ? 'theme-primary-btn shadow-md'
                : 'theme-secondary-btn'
            }`}
          >
            {st}{' '}
            <span className="ml-1 px-1.5 py-0.2 rounded-full theme-badge text-[10px]">
              {statusCounts[st as keyof typeof statusCounts] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Main Table / Cards */}
      {loading ? (
        <Loading message="Fetching applications from Express REST API..." />
      ) : error ? (
        <div className="theme-card border-[#EF4444]/30 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-10 h-10 text-[#EF4444] mx-auto" />
          <h3 className="text-lg font-bold theme-text-heading">Unable to Load Applications</h3>
          <p className="text-xs theme-text-muted">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 theme-secondary-btn rounded-xl text-xs font-semibold"
          >
            Try Again
          </button>
        </div>
      ) : filteredApplications.length === 0 ? (
        <EmptyState
          title="No Applications Found"
          description={
            selectedStatus === 'All'
              ? 'No job applications have been submitted yet. Go to Jobs to apply!'
              : `No applications currently matching status "${selectedStatus}".`
          }
          actionText="Browse Jobs & Apply"
          actionPath="/jobs"
        />
      ) : (
        <ApplicationTable
          applications={filteredApplications}
          jobsMap={jobsMap}
          onStatusChange={handleStatusChange}
          onDeleteClick={(id, name) => setDeleteTarget({ id, name })}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="theme-card rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold theme-text-heading">Delete Application Record?</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Are you sure you want to delete the application record for <strong className="theme-text-heading">"{deleteTarget.name}"</strong>? This will execute <code className="text-[var(--primary)] font-mono">DELETE /api/applications/{deleteTarget.id}</code> on Express.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-main)]">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold theme-secondary-btn rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#EF4444] hover:bg-[#EF4444]/90 rounded-xl shadow-md cursor-pointer"
              >
                {deleting ? 'Deleting...' : 'Delete Application'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
};
