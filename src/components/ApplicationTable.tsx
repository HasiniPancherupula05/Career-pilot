import React from 'react';
import { Application, Job } from '../types';
import { Mail, Phone, Calendar, Trash2, Building2 } from 'lucide-react';

interface ApplicationTableProps {
  applications: Application[];
  jobsMap: Record<string, Job>;
  onStatusChange: (id: string, newStatus: Application['status']) => void;
  onDeleteClick: (id: string, name: string) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  jobsMap,
  onStatusChange,
  onDeleteClick,
}) => {
  const getStatusBadgeClass = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/30';
      case 'Screening':
        return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
      case 'Interview':
        return 'bg-[var(--accent-light)] text-[var(--accent)] border-[var(--accent)]/30';
      case 'Offer':
        return 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30';
      case 'Rejected':
        return 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30';
      default:
        return 'theme-badge';
    }
  };

  return (
    <div className="theme-card rounded-2xl shadow-xl overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-main)] text-xs font-semibold theme-text-muted uppercase tracking-wider">
              <th className="p-4">Applicant</th>
              <th className="p-4">Target Job</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Applied Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-main)] text-sm theme-text">
            {applications.map((app) => {
              const matchedJob = jobsMap[app.jobId];
              return (
                <tr key={app.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                  {/* Applicant Name & Resume */}
                  <td className="p-4">
                    <div className="font-bold theme-text-heading">{app.applicantName}</div>
                    <div className="text-xs theme-text-muted flex items-center gap-1 mt-0.5">
                      <span className="truncate max-w-[150px]">{app.resume}</span>
                    </div>
                  </td>

                  {/* Job Title & Company */}
                  <td className="p-4">
                    <div className="font-semibold text-[var(--primary)]">
                      {matchedJob ? matchedJob.title : `Job #${app.jobId}`}
                    </div>
                    <div className="text-xs theme-text-muted flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 theme-text-muted" />
                      {matchedJob ? matchedJob.company : 'Unknown Company'}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-4">
                    <div className="text-xs flex items-center gap-1.5 theme-text">
                      <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
                      {app.email}
                    </div>
                    {app.phone && (
                      <div className="text-xs flex items-center gap-1.5 theme-text-muted mt-1">
                        <Phone className="w-3.5 h-3.5 theme-text-muted" />
                        {app.phone}
                      </div>
                    )}
                  </td>

                  {/* Applied Date */}
                  <td className="p-4 text-xs theme-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 theme-text-muted" />
                      {app.appliedDate}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        onStatusChange(app.id, e.target.value as Application['status'])
                      }
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border appearance-none cursor-pointer focus:outline-none transition-all ${getStatusBadgeClass(
                        app.status
                      )}`}
                    >
                      <option value="Applied" className="bg-[var(--bg-card)] theme-text">
                        Applied
                      </option>
                      <option value="Screening" className="bg-[var(--bg-card)] theme-text">
                        Screening
                      </option>
                      <option value="Interview" className="bg-[var(--bg-card)] theme-text">
                        Interview
                      </option>
                      <option value="Offer" className="bg-[var(--bg-card)] theme-text">
                        Offer
                      </option>
                      <option value="Rejected" className="bg-[var(--bg-card)] theme-text">
                        Rejected
                      </option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onDeleteClick(app.id, app.applicantName)}
                      className="p-2 rounded-lg theme-text-muted hover:text-[#EF4444] hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                      title="Delete Application"
                      aria-label="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Card View */}
      <div className="block lg:hidden divide-y divide-[var(--border-main)]">
        {applications.map((app) => {
          const matchedJob = jobsMap[app.jobId];
          return (
            <div key={app.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold theme-text-heading text-base">{app.applicantName}</h4>
                  <p className="text-xs font-semibold text-[var(--primary)]">
                    {matchedJob ? matchedJob.title : `Job #${app.jobId}`}
                  </p>
                  <p className="text-xs theme-text-muted">
                    {matchedJob ? matchedJob.company : ''}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteClick(app.id, app.applicantName)}
                  className="p-2 theme-text-muted hover:text-[#EF4444]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs theme-text-muted space-y-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
                  {app.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 theme-text-muted" />
                  {app.phone}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 theme-text-muted" />
                  Applied on {app.appliedDate}
                </div>
              </div>

              {app.coverLetter && (
                <p className="text-xs theme-text-muted bg-[var(--bg-secondary)] p-2.5 rounded-lg border border-[var(--border-main)] italic">
                  "{app.coverLetter}"
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-main)]">
                <span className="text-xs theme-text-muted">Status:</span>
                <select
                  value={app.status}
                  onChange={(e) =>
                    onStatusChange(app.id, e.target.value as Application['status'])
                  }
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border appearance-none cursor-pointer focus:outline-none ${getStatusBadgeClass(
                    app.status
                  )}`}
                >
                  <option value="Applied" className="bg-[var(--bg-card)] theme-text">
                    Applied
                  </option>
                  <option value="Screening" className="bg-[var(--bg-card)] theme-text">
                    Screening
                  </option>
                  <option value="Interview" className="bg-[var(--bg-card)] theme-text">
                    Interview
                  </option>
                  <option value="Offer" className="bg-[var(--bg-card)] theme-text">
                    Offer
                  </option>
                  <option value="Rejected" className="bg-[var(--bg-card)] theme-text">
                    Rejected
                  </option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
