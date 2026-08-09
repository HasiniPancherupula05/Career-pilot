import React from 'react';
import { SearchX, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionPath?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Jobs Found',
  description = 'Try adjusting your search query or clear existing filters.',
  actionText,
  actionPath,
  onActionClick,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <div className="theme-card rounded-2xl p-10 text-center flex flex-col items-center justify-center my-6 max-w-lg mx-auto shadow-lg">
      <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center mb-4 text-[var(--primary)]">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold theme-text-heading mb-1">{title}</h3>
      <p className="text-xs theme-text-muted max-w-sm mb-6 leading-relaxed">{description}</p>

      {actionText && (
        <button
          onClick={handleAction}
          className="px-4 py-2.5 theme-primary-btn rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
};
