'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, FileText } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, type, title, message }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-sm
              animate-in slide-in-from-right-full duration-300
              ${toast.type === 'success' ? 'bg-green-50 border-green-200' : ''}
              ${toast.type === 'error' ? 'bg-red-50 border-red-200' : ''}
              ${toast.type === 'info' ? 'bg-blue-50 border-blue-200' : ''}
            `}
          >
            {/* Icon */}
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
              ${toast.type === 'success' ? 'bg-green-100' : ''}
              ${toast.type === 'error' ? 'bg-red-100' : ''}
              ${toast.type === 'info' ? 'bg-blue-100' : ''}
            `}>
              {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
              {toast.type === 'info' && <FileText className="h-5 w-5 text-blue-600" />}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm
                ${toast.type === 'success' ? 'text-green-900' : ''}
                ${toast.type === 'error' ? 'text-red-900' : ''}
                ${toast.type === 'info' ? 'text-blue-900' : ''}
              `}>
                {toast.title}
              </p>
              {toast.message && (
                <p className={`text-sm mt-0.5
                  ${toast.type === 'success' ? 'text-green-700' : ''}
                  ${toast.type === 'error' ? 'text-red-700' : ''}
                  ${toast.type === 'info' ? 'text-blue-700' : ''}
                `}>
                  {toast.message}
                </p>
              )}
            </div>
            
            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className={`
                p-1 rounded-md hover:bg-black/5 transition-colors
                ${toast.type === 'success' ? 'text-green-600' : ''}
                ${toast.type === 'error' ? 'text-red-600' : ''}
                ${toast.type === 'info' ? 'text-blue-600' : ''}
              `}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
