import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

const Toast = ({ toast, onDismiss, darkMode }) => {
  useEffect(() => {
    if (toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  const icons = {
    success: <CheckCircle size={20} className="flex-shrink-0" />,
    error: <AlertCircle size={20} className="flex-shrink-0" />,
    info: <Info size={20} className="flex-shrink-0" />,
    warning: <AlertCircle size={20} className="flex-shrink-0" />,
  };

  const bgColors = {
    success: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200',
    error: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200',
    info: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200',
    warning: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200',
  };

  const textColors = {
    success: darkMode ? 'text-green-200' : 'text-green-800',
    error: darkMode ? 'text-red-200' : 'text-red-800',
    info: darkMode ? 'text-blue-200' : 'text-blue-800',
    warning: darkMode ? 'text-yellow-200' : 'text-yellow-800',
  };

  const iconColors = {
    success: darkMode ? 'text-green-400' : 'text-green-600',
    error: darkMode ? 'text-red-400' : 'text-red-600',
    info: darkMode ? 'text-blue-400' : 'text-blue-600',
    warning: darkMode ? 'text-yellow-400' : 'text-yellow-600',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg mb-3 max-w-md animate-slide-in ${bgColors[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className={iconColors[toast.type]}>{icons[toast.type]}</span>
      <div className={`flex-1 ${textColors[toast.type]}`}>
        {toast.title && (
          <p className="font-semibold mb-1">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
        {toast.action && (
          <button
            onClick={() => {
              toast.action.onClick();
              onDismiss(toast.id);
            }}
            className={`mt-2 text-sm font-semibold underline ${textColors[toast.type]}`}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className={`flex-shrink-0 ${textColors[toast.type]} hover:opacity-70`}
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onDismiss, darkMode }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
