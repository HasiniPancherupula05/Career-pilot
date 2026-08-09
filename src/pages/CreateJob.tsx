import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/api';
import { ToastMessage } from '../types';
import { Toast } from '../components/Toast';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  PlusCircle,
  ArrowLeft
} from 'lucide-react';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    experience: '0-2 years',
    salary: '₹6-10 LPA',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
  });

  const addToast = (type: ToastMessage['type'], text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      addToast('error', 'Please fill in all required fields (Title, Company, Location, Description).');
      return;
    }

    try {
      setSubmitting(true);
      const newJob = await createJob({
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

      addToast('success', `Job "${newJob.title}" created successfully via POST /api/jobs!`);

      setTimeout(() => {
        navigate('/jobs');
      }, 1000);
    } catch (err: any) {
      addToast('error', err.message || 'Failed to create job.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/jobs')}
        className="text-xs font-semibold text-[var(--primary)] hover:opacity-80 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      {/* Header */}
      <div className="theme-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
            Job Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-heading mt-2">
            Post a New Opportunity
          </h1>
          <p className="text-xs theme-text-muted mt-1">
            Fill in details to execute <code className="text-[var(--primary)] font-mono">POST /api/jobs</code> on the Express backend.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Company */}
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
                  placeholder="e.g. Senior Frontend Engineer"
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
                  placeholder="e.g. TechNova Inc"
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Location & Type */}
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
                  placeholder="e.g. Hyderabad, India or Remote"
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

          {/* Experience & Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">Experience Level</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. 1-3 years"
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
                  placeholder="e.g. ₹8 - ₹12 LPA"
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Description <span className="text-[#EF4444]">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a comprehensive job description..."
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Develop user-facing features&#10;Optimize frontend bundle performance"
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Requirements & Qualifications (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Proficient in React and TypeScript&#10;Experience with REST APIs"
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Skills (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="React, Express.js, TypeScript, Tailwind CSS, REST API"
              className="w-full p-3 theme-input rounded-xl text-sm"
            />
          </div>

          {/* Form Actions */}
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
                'Posting Job...'
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Create Job Listing
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
