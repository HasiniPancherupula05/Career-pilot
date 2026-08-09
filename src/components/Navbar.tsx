import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, FileText, PlusCircle, Menu, X, LayoutDashboard } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const activeClass =
    "text-[var(--primary)] font-semibold bg-[var(--primary-light)] px-3 py-1.5 rounded-lg border border-[var(--primary)]/30 flex items-center gap-2 text-sm transition-all";
  const inactiveClass =
    "theme-text-muted hover:theme-text hover:bg-[var(--bg-card-hover)] px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm transition-all";

  return (
    <nav className="sticky top-0 z-40 theme-navbar shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo size="md" showSubtitle={true} />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>
            <NavLink to="/jobs" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              <Briefcase className="w-4 h-4" />
              Jobs
            </NavLink>
            <NavLink to="/applications" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              <FileText className="w-4 h-4" />
              Applications
            </NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSelector />

            <button
              onClick={() => navigate('/jobs')}
              className="px-3.5 py-2 text-xs font-semibold theme-secondary-btn rounded-xl transition-all cursor-pointer"
            >
              Explore Jobs
            </button>
            <button
              onClick={() => navigate('/admin/jobs/new')}
              className="px-4 py-2 text-xs font-semibold theme-primary-btn rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Post a Job
            </button>
          </div>

          {/* Mobile Actions & Menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSelector compact />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg theme-text-muted hover:theme-text hover:bg-[var(--bg-card-hover)]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden theme-card border-b border-[var(--border-main)] px-4 pt-3 pb-6 space-y-3">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <Briefcase className="w-4 h-4" />
            Jobs
          </NavLink>
          <NavLink
            to="/applications"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <FileText className="w-4 h-4" />
            Applications
          </NavLink>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/jobs');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold theme-secondary-btn rounded-xl"
            >
              Explore Jobs
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/admin/jobs/new');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold theme-primary-btn rounded-xl flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Post a Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
