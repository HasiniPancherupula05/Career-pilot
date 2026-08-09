import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Job, ToastMessage } from '../types';
import { getJob } from '../services/api';
import { Loading } from '../components/Loading';
import { ApplicationFormModal } from '../components/ApplicationFormModal';
import { Toast } from '../components/Toast';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ArrowLeft,
  Send,
  Edit,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], text: string) => {
    const toastId = Date.now().toString();
    setToasts((prev) => [...prev, { id: toastId, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 4000);
  };

  useEffect(() => {
    async function loadJobDetails() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getJob(id);
        setJob(data);
      } catch (err: any) {
        setError(err.message || 'Job Not Found');
      } finally {
        setLoading(false);
      }
    }
    loadJobDetails();
  }, [id]);

  if (loading) {
    return <Loading message="Fetching job details from GET /api/jobs/:id..." />;
  }

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl theme-card border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold theme-text-heading">Job Not Found</h2>
        <p className="text-sm theme-text-muted">
          The job listing with ID <code className="text-[var(--primary)] font-mono">{id}</code> could not be found on the server.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigate('/jobs')}
            className="px-5 py-2.5 theme-primary-btn text-xs font-semibold rounded-xl inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Nav Back */}
      <button
        onClick={() => navigate('/jobs')}
        className="text-xs font-semibold text-[var(--primary)] hover:opacity-80 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      {/* Main Job Card Header */}
      <div className="theme-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
                {job.type}
              </span>
              <span className="text-xs theme-text-muted font-medium">
                ID: {job.id}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold theme-text-heading">{job.title}</h1>
            <p className="text-base font-semibold theme-text-muted flex items-center gap-2 mt-1">
              <Building2 className="w-5 h-5 text-[var(--primary)]" />
              {job.company}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/admin/jobs/edit/${job.id}`)}
              className="p-3 theme-secondary-btn rounded-xl transition-colors cursor-pointer"
              title="Edit Job"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="px-6 py-3 theme-primary-btn text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Apply Now
            </button>
          </div>
        </div>

        {/* Key Attributes Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
            <div>
              <p className="theme-text-muted">Location</p>
              <p className="font-semibold theme-text-heading">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--primary)]" />
            <div>
              <p className="theme-text-muted">Experience</p>
              <p className="font-semibold theme-text-heading">{job.experience}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#22C55E]" />
            <div>
              <p className="theme-text-muted">Salary Range</p>
              <p className="font-bold text-[#22C55E]">{job.salary}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 theme-text-muted" />
            <div>
              <p className="theme-text-muted">Posted Date</p>
              <p className="font-semibold theme-text-heading">{job.postedDate}</p>
            </div>
          </div>
        </div>

        {/* Overview Description */}
        <div className="space-y-3 pt-2">
          <h2 className="text-lg font-bold theme-text-heading border-b border-[var(--border-main)] pb-2">
            Job Description
          </h2>
          <p className="text-sm theme-text-muted leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold theme-text-heading border-b border-[var(--border-main)] pb-2">
              Key Responsibilities
            </h2>
            <ul className="space-y-2 text-sm theme-text-muted">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold theme-text-heading border-b border-[var(--border-main)] pb-2">
              Qualifications & Requirements
            </h2>
            <ul className="space-y-2 text-sm theme-text-muted">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold theme-text-heading border-b border-[var(--border-main)] pb-2">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-lg theme-badge"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div className="pt-6 border-t border-[var(--border-main)] flex items-center justify-between">
          <p className="text-xs theme-text-muted">
            Interested in this position? Submit your application directly to our REST backend.
          </p>
          <button
            onClick={() => setApplyModalOpen(true)}
            className="px-6 py-3 theme-primary-btn text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Apply Now
          </button>
        </div>
      </div>

      {/* Application Form Modal */}
      {applyModalOpen && (
        <ApplicationFormModal
          job={job}
          onClose={() => setApplyModalOpen(false)}
          onSuccess={(msg) => addToast('success', msg)}
          onError={(msg) => addToast('error', msg)}
        />
      )}

      {/* Toasts */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
};
