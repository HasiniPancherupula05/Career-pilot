import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs, getApplications } from '../services/api';
import { Briefcase, FileCheck, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Zap, Layers } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [jobCount, setJobCount] = useState<number | null>(null);
  const [appCount, setAppCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadStats() {
      try {
        const [jobs, apps] = await Promise.all([getJobs(), getApplications()]);
        if (mounted) {
          setJobCount(jobs.length);
          setAppCount(apps.length);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    }
    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto hero-glow-bg">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-4 max-w-4xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-badge text-xs font-semibold shadow-sm">
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          <span>Full Stack REST API Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight theme-text-heading leading-tight">
          Find Your Next <span className="text-[var(--primary)]">Career Opportunity</span>
        </h1>

        <p className="text-lg sm:text-xl theme-text-muted max-w-2xl mx-auto font-normal leading-relaxed">
          Discover opportunities, explore roles and keep track of your applications with CareerPilot.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3.5 rounded-xl font-semibold theme-primary-btn flex items-center gap-2 cursor-pointer text-sm shadow-md"
          >
            Explore Jobs
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/admin/jobs/new')}
            className="px-6 py-3.5 rounded-xl font-semibold theme-secondary-btn flex items-center gap-2 cursor-pointer text-sm"
          >
            Post a Job
          </button>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="relative mx-auto max-w-5xl w-full">
        <div className="theme-card rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary-light)] rounded-full blur-3xl pointer-events-none opacity-50" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Live REST API Analytics
              </div>
              <h2 className="text-xl font-bold theme-text-heading mt-1">CareerPilot Dashboard Preview</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                Express API Active
              </span>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-xs font-bold theme-primary-btn rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                Open Full Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold theme-text-heading">
                  {jobCount !== null ? jobCount : '...'}
                </p>
                <p className="text-xs theme-text-muted">Active Jobs in Server Array</p>
              </div>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold theme-text-heading">
                  {appCount !== null ? appCount : '...'}
                </p>
                <p className="text-xs theme-text-muted">Submitted Applications</p>
              </div>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold theme-text-heading">100% REST</p>
                <p className="text-xs theme-text-muted">Full CRUD Operation Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold theme-text-heading">
            Everything You Need for Career Growth
          </h2>
          <p className="text-sm theme-text-muted max-w-xl mx-auto">
            A clean, efficient platform for candidates and hiring teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="theme-card theme-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold theme-text-heading">Job Discovery</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Explore diverse job roles with real-time search, company details, salary brackets, and location filters.
            </p>
          </div>

          <div className="theme-card theme-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold theme-text-heading">Easy Applications</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Submit applications effortlessly with tailored cover letters and resume uploads sent straight to Express server storage.
            </p>
          </div>

          <div className="theme-card theme-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold theme-text-heading">Application Tracking</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Monitor hiring progress across Screening, Interview, Offer, and Applied stages with interactive status updates.
            </p>
          </div>

          <div className="theme-card theme-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--primary)] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold theme-text-heading">Simple Job Management</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Full admin controls to post new job listings, modify responsibilities, and delete outdated roles.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="theme-card rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl border border-[var(--border-main)]">
        <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-heading">
          Ready to Explore Opportunities?
        </h2>
        <p className="text-sm theme-text-muted max-w-xl mx-auto">
          Start browsing active job listings or publish a new position using our RESTful backend.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('/jobs')}
            className="px-8 py-3.5 rounded-xl font-bold theme-primary-btn inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
