"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  const t = useTranslations("error");

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 animate-fade-in">
      {/* Error Icon */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-error-50 to-error-100 rounded-full flex items-center justify-center shadow-medium">
          <svg className="w-12 h-12 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        {/* Decorative rings */}
        <div className="absolute inset-0 border-2 border-error-200 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-2 border border-error-300 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Error Content */}
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
          {t("title")}
        </h1>
        
        <p className="text-lg text-neutral-600 leading-relaxed">
          {t("subtitle")}
        </p>
        
        {/* Additional help text */}
        <div className="card-elevated p-4 text-left space-y-2 bg-gradient-to-br from-neutral-50 to-purple-50/30">
          <h3 className="font-semibold text-neutral-800 text-sm">Troubleshooting Tips:</h3>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li>• Check if the case number exists</li>
            <li>• Try a different case number (e.g., #1, #42)</li>
            <li>• Refresh the page and try again</li>
          </ul>
        </div>
        
        {/* Error details for debugging (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="text-xs text-neutral-500 bg-neutral-100 p-3 rounded-lg">
            <summary className="cursor-pointer font-medium">Technical Details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="btn-primary"
        >
          {t("button")}
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="btn-secondary"
        >
          Return Home
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-gradient-to-br from-error-100/20 to-neutral-100/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-40 h-40 bg-gradient-to-br from-neutral-100/20 to-purple-100/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Error;
