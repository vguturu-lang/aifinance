
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-brand-surface p-4 border border-brand-border rounded-lg text-center sm:text-left">
      <h4 className="text-sm font-medium text-brand-muted">{title}</h4>
      <p className="text-xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};
