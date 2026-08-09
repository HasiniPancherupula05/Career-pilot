import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home as HomeIcon } from 'lucide-react';
import { Logo } from '../components/Logo';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 text-center space-y-6 animate-fade-in">
      <Logo size="lg" showText={false} />

      <div className="space-y-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
          404 Error
        </span>
        <h1 className="text-4xl font-extrabold theme-text-heading">Page Not Found</h1>
        <p className="text-sm theme-text-muted max-w-md mx-auto">
          The route you are looking for does not exist on CareerPilot or has been moved.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 theme-primary-btn font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <HomeIcon className="w-4 h-4" />
          Go to Home
        </button>
        <button
          onClick={() => navigate('/jobs')}
          className="px-5 py-2.5 theme-secondary-btn font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Explore Jobs
        </button>
      </div>
    </div>
  );
};
