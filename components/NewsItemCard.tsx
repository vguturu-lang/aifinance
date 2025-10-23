
import React from 'react';
import type { NewsItem } from '../types';

interface NewsItemCardProps {
  newsItem: NewsItem;
}

export const NewsItemCard: React.FC<NewsItemCardProps> = ({ newsItem }) => {
  return (
    <div className="bg-brand-surface p-4 border border-brand-border rounded-lg transition-all duration-300 hover:border-brand-primary">
      <h4 className="font-semibold text-brand-secondary text-lg">{newsItem.headline}</h4>
      <p className="text-brand-muted mt-2 text-sm">{newsItem.summary}</p>
    </div>
  );
};
