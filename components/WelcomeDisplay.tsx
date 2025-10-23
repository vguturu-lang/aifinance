
import React from 'react';

export const WelcomeDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-20 bg-brand-surface border border-brand-border rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-2xl font-bold text-white">Welcome to the AI Financial Analyst</h2>
        <p className="text-brand-muted mt-2 max-w-md">
            Enter a stock ticker symbol above to get a comprehensive, AI-generated analysis report, complete with key metrics, future outlook, and the latest fictional news.
        </p>
    </div>
  );
};
