import React, { useEffect, useState, useMemo } from 'react';
import { Job, JobFilterState, ToastMessage } from '../types';
import { getJobs, deleteJob } from '../services/api';
import { JobCard } from '../components/JobCard';
import { JobFilters } from '../components/JobFilters';
import { JobAlertBanner } from '../components/JobAlertBanner';
import { ApplicationFormModal } from '../components/ApplicationFormModal';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Toast } from '../components/Toast';
import { PlusCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [filters, setFilters] = useState<JobFilterState>({
    search: '',
    location: '',
    type: '',
    experience: '',
  });

  // Modal States
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchJobsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Unable to load jobs from Express REST API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  // Compute unique filter options from fetched job data
  const locations = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location));
    return Array.from(set).sort();
  }, [jobs]);

  const types = useMemo(() => {
    const set = new Set(jobs.map((j) => j.type));
    return Array.from(set).sort();
  }, [jobs]);

  const experiences = useMemo(() => {
    const set = new Set(jobs.map((j) => j.experience));
    return Array.from(set).sort();
  }, [jobs]);

  // Filter jobs based on search & dropdowns
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        j.title.toLowerCase().includes(searchLower) ||
        j.company.toLowerCase().includes(searchLower) ||
        j.description.toLowerCase().includes(searchLower) ||
        j.skills.some((s) => s.toLowerCase().includes(searchLower));

      const matchesLocation = !filters.location || j.location === filters.location;
      const matchesType = !filters.type || j.type === filters.type;
      const matchesExp = !filters.experience || j.experience === filters.experience;

      return matchesSearch && matchesLocation && matchesType && matchesExp;
    });
  }, [jobs, filters]);

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteJob(deleteTarget.id);
      addToast('success', `Job "${deleteTarget.title}" deleted successfully!`);
      setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to delete job.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold theme-text-heading">Explore Opportunities</h1>
          <p className="text-sm theme-text-muted mt-1">
            Browse available roles fetched live from GET /api/jobs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchJobsData}
            className="p-2.5 rounded-xl theme-secondary-btn transition-colors cursor-pointer"
            title="Refresh jobs from API"
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

      {/* Filter Component */}
      <JobFilters
        filters={filters}
        onChange={setFilters}
        locations={locations}
        types={types}
        experiences={experiences}
        totalResults={filteredJobs.length}
      />

      {/* Subscribe to Job Alerts Feature */}
      <JobAlertBanner
        onToast={(type, text) => addToast(type, text)}
      />

      {/* Main Content Area */}
      {loading ? (
        <Loading message="Fetching job listings from REST API..." />
      ) : error ? (
        <div className="theme-card border-[#EF4444]/30 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-10 h-10 text-[#EF4444] mx-auto" />
          <h3 className="text-lg font-bold theme-text-heading">Unable to Load Jobs</h3>
          <p className="text-xs theme-text-muted">{error}</p>
          <button
            onClick={fetchJobsData}
            className="px-4 py-2 theme-secondary-btn rounded-xl text-xs font-semibold"
          >
            Try Again
          </button>
        </div>
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="No Matching Jobs Found"
          description="Try broadening your search criteria or clear your selected filters."
          actionText="Post a New Job"
          actionPath="/admin/jobs/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, idx) => (
            <JobCard
              key={job.id}
              job={job}
              index={idx}
              onApplyClick={(j) => setApplyJob(j)}
              onDeleteClick={(id, title) => setDeleteTarget({ id, title })}
            />
          ))}
        </div>
      )}

      {/* Application Modal */}
      {applyJob && (
        <ApplicationFormModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
          onSuccess={(msg) => addToast('success', msg)}
          onError={(msg) => addToast('error', msg)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="theme-card rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold theme-text-heading">Delete Job Listing?</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Are you sure you want to delete <strong className="theme-text-heading">"{deleteTarget.title}"</strong>? This will execute <code className="text-[var(--primary)] font-mono">DELETE /api/jobs/{deleteTarget.id}</code> on the Express server.
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
                {deleting ? 'Deleting...' : 'Delete Job'}
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
