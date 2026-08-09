import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../types';
import { Building2, MapPin, Clock, DollarSign, Calendar, Edit, Trash2, ArrowRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
  index?: number;
  onApplyClick: (job: Job) => void;
  onDeleteClick: (jobId: string, title: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, index, onApplyClick, onDeleteClick }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDeleteClick(job.id, job.title);
  };

  return (
    <div
      className="theme-card theme-card-hover rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group animate-fade-in"
      style={{ animationDelay: index !== undefined ? `${Math.min(index * 60, 600)}ms` : undefined }}
    >
      <div>
        {/* Header: Title & Actions */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 mb-2">
              {job.type}
            </span>
            <h3 className="text-xl font-bold theme-text-heading group-hover:text-[var(--primary)] transition-colors leading-snug">
              {job.title}
            </h3>
            <p className="text-sm font-semibold theme-text-muted flex items-center gap-1.5 mt-1">
              <Building2 className="w-4 h-4 text-[var(--primary)]" />
              {job.company}
            </p>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => navigate(`/admin/jobs/edit/${job.id}`)}
              className="p-2 rounded-lg theme-text-muted hover:text-[var(--primary)] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
              title="Edit Job"
              aria-label="Edit Job"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-lg theme-text-muted hover:text-[#EF4444] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
              title="Delete Job"
              aria-label="Delete Job"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs theme-text-muted my-4 pt-3 border-t border-[var(--border-main)]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="font-semibold theme-text-heading">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>{job.postedDate}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs theme-text-muted line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium theme-badge rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-1.5 py-0.5 text-[11px] font-medium theme-text-muted">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="pt-3 border-t border-[var(--border-main)] flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="text-xs font-semibold text-[var(--primary)] hover:opacity-80 flex items-center gap-1 py-2 cursor-pointer"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onApplyClick(job)}
          className="px-4 py-2 text-xs font-medium theme-primary-btn rounded-xl cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
