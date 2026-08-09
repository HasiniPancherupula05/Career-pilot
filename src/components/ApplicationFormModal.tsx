import React, { useState } from 'react';
import { Job } from '../types';
import { createApplication } from '../services/api';
import { X, Send, User, Mail, Phone, FileText, Building2 } from 'lucide-react';

interface ApplicationFormModalProps {
  job: Job | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  job,
  onClose,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    resume: 'resume.pdf',
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email) {
      onError('Please fill in your Full Name and Email.');
      return;
    }

    try {
      setLoading(true);
      await createApplication({
        jobId: job.id,
        applicantName: formData.applicantName,
        email: formData.email,
        phone: formData.phone || 'N/A',
        resume: formData.resume || 'resume.pdf',
        coverLetter: formData.coverLetter,
      });

      onSuccess(`Application submitted successfully for ${job.title} at ${job.company}!`);
      onClose();
    } catch (err: any) {
      onError(err.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="theme-card rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 theme-text-muted hover:theme-text p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
            Job Application
          </span>
          <h2 className="text-2xl font-bold theme-text-heading mt-2">Apply for {job.title}</h2>
          <p className="text-xs theme-text-muted flex items-center gap-1.5 mt-1">
            <Building2 className="w-4 h-4 text-[var(--primary)]" />
            {job.company} &bull; {job.location}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">
              Full Name <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
              <input
                type="text"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                placeholder="e.g. Navaneeth Patel"
                className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">
                Email Address <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium theme-text-muted mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">Resume Filename / Link</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-muted" />
              <input
                type="text"
                value={formData.resume}
                onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                placeholder="my_resume.pdf"
                className="w-full pl-10 pr-4 py-2.5 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium theme-text-muted mb-1">Cover Letter</label>
            <textarea
              rows={3}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Briefly describe why you are a great fit for this role..."
              className="w-full p-3 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-main)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold theme-secondary-btn rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-semibold theme-primary-btn rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
