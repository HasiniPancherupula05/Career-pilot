import React from 'react';
import { JobFilterState } from '../types';
import { Search, MapPin, Briefcase, Clock, RotateCcw } from 'lucide-react';

interface JobFiltersProps {
  filters: JobFilterState;
  onChange: (filters: JobFilterState) => void;
  locations: string[];
  types: string[];
  experiences: string[];
  totalResults: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onChange,
  locations,
  types,
  experiences,
  totalResults,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleSelectChange = (key: keyof JobFilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onChange({
      search: '',
      location: '',
      type: '',
      experience: '',
    });
  };

  const hasActiveFilters =
    filters.search || filters.location || filters.type || filters.experience;

  return (
    <div className="theme-card rounded-2xl p-5 shadow-lg mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 theme-text-muted" />
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search jobs, companies or skills..."
          className="w-full pl-11 pr-4 py-3 theme-input rounded-xl text-sm theme-text placeholder-[var(--text-muted)] transition-all"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Location Dropdown */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
          <select
            value={filters.location}
            onChange={(e) => handleSelectChange('location', e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 theme-input rounded-xl text-xs theme-text appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Dropdown */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
          <select
            value={filters.type}
            onChange={(e) => handleSelectChange('type', e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 theme-input rounded-xl text-xs theme-text appearance-none cursor-pointer"
          >
            <option value="">All Job Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Dropdown */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
          <select
            value={filters.experience}
            onChange={(e) => handleSelectChange('experience', e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 theme-input rounded-xl text-xs theme-text appearance-none cursor-pointer"
          >
            <option value="">All Experience Levels</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-4 py-2.5 theme-secondary-btn text-[var(--primary)] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Results summary bar */}
      <div className="flex items-center justify-between text-xs theme-text-muted pt-2 border-t border-[var(--border-main)]">
        <span>
          Showing <strong className="theme-text-heading">{totalResults}</strong> jobs from Express API
        </span>
        {hasActiveFilters && (
          <span className="text-[var(--primary)] font-semibold">Filters Active</span>
        )}
      </div>
    </div>
  );
};
