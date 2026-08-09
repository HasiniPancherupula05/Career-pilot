import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading data from Express REST API...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-[var(--border-main)] border-t-[var(--primary)] animate-spin flex items-center justify-center mb-4">
        <Loader2 className="w-6 h-6 text-[var(--primary)] animate-pulse" />
      </div>
      <p className="text-sm font-medium theme-text-muted">{message}</p>
    </div>
  );
};
