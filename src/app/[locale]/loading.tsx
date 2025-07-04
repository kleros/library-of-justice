"use client";

import React from "react";

import clsx from "clsx";
import { useTranslations } from "next-intl";

const Loading: React.FC = () => {
  const t = useTranslations("loading");

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8 animate-fade-in">
      {/* Loading Animation */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-primary-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary-600 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        </div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-16 h-16 border-3 border-purple-200 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
          <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-gradient tracking-tight">
          {t("title")}
        </h2>
        <p className="text-neutral-600 font-medium">
          Accessing case records...
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-100/30 to-purple-100/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-100/30 to-accent-100/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Loading;
