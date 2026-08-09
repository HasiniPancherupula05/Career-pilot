import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded-xl border shadow-xl transition-all duration-300 animate-fade-in theme-card ${
            toast.type === 'success'
              ? 'border-[#22C55E]/40'
              : toast.type === 'error'
              ? 'border-[#EF4444]/40'
              : 'border-[var(--primary)]/40'
          }`}
        >
          <div className="flex items-start gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />}
            <p className="text-sm font-medium theme-text leading-snug">{toast.text}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="theme-text-muted hover:theme-text transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
