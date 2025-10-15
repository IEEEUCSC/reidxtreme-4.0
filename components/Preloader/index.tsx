"use client"

import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ progress, isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading && progress === 100) {
      // Add a small delay before hiding to show 100% completion
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        !isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo or Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ReidXtreme 4.0
          </h1>
          <p className="text-muted-foreground text-sm">
            Loading experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80">
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-2xl font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
