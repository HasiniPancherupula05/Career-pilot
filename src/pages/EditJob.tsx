import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, updateJob } from '../services/api';
import { ToastMessage } from '../types';
import { Toast } from '../components/Toast';
import { Loading } from '../components/Loading';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Save,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    experience: '',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
  });

  const addToast = (type: ToastMessage['type'], text: string) => {
    const toastId = Date.now().toString();
    setToasts((prev) => [...prev, { id: toastId, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 4000);
  };

  useEffect(() => {
    async function loadJob() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const job = await getJob(id);
        setFormData({
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          type: job.type || 'Full Time',
          experience: job.experience || '',
          salary: job.salary || '',
          description: job.description || '',
          responsibilities: (job.responsibilities || []).join('\n'),
          requirements: (job.requirements || []).join('\n'),
          skills: (job.skills || []).join(', '),
        });
      } catch (err: any) {
        setError(err.message || 'Job not found');
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSubmitting(true);
      const updated = await updateJob(id, {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        experience: formData.experience,
        salary: formData.salary,
        description: formData.description,
        responsibilities: formData.responsibilities
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        requirements: formData.requirements
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      });

      addToast('success', `Job "${updated.title}" updated successfully via PUT /api/jobs/${id}!`);

      setTimeout(() => {
        navigate('/jobs');
      }, 1000);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update job.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading message="Fetching existing job data from GET /api/jobs/:id..." />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-[#EF4444] mx-auto" />
        <h2 className="text-xl font-bold theme-text-heading">Job Not Found</h2>
        <p className="text-xs theme-text-muted">{error}</p>
        <button
          onClick={() => navigate('/jobs')}
          className="px-4 py-2 theme-primary-btn text-xs font-semibold rounded-xl"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <button
        onClick={() => navigate('/jobs')}
        className="text-xs font-semibold text-[var(--primary)] hover:opacity-80 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      <div className="theme-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
            Job Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-heading mt-2">
            Edit Job Listing
          </h1>
          <p className="text-xs theme-text-muted mt-1">
            Editing Job ID: <code className="text-[var(--primary)] font-mono">{id}</code> (Triggers <code className="text-[var(--primary)] font-mono">PUT /api/jobs/{id}</code>)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">
                Job Title <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">
                Company Name <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">
                Location <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">Job Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2.5 theme-input rounded-xl text-sm cursor-pointer"
              >
                <option value="Full Time" className="bg-[var(--bg-card)] theme-text">Full Time</option>
                <option value="Part Time" className="bg-[var(--bg-card)] theme-text">Part Time</option>
                <option value="Contract" className="bg-[var(--bg-card)] theme-text">Contract</option>
                <option value="Remote" className="bg-[var(--bg-card)] theme-text">Remote</option>
                <option value="Internship" className="bg-[var(--bg-card)] theme-text">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">Experience Level</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">Salary Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Description <span className="text-[#EF4444]">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Requirements (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Skills (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-main)]">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="px-5 py-2.5 text-xs font-semibold theme-secondary-btn rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-xs font-bold theme-primary-btn rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              {submitting ? (
                'Saving Changes...'
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
};
