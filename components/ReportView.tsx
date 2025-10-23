
import React from 'react';
import type { AnalystReport, AnalystRating } from '../types';
import { PriceChart } from './PriceChart';
import { MetricCard } from './MetricCard';
import { NewsItemCard } from './NewsItemCard';

interface ReportViewProps {
  report: AnalystReport;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const formatPercent = (value: number) => `${value.toFixed(2)}%`;
const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

const RatingBadge: React.FC<{ rating: AnalystRating }> = ({ rating }) => {
  const baseClasses = 'px-3 py-1 text-sm font-bold rounded-full';
  const colorClasses = {
    Buy: 'bg-brand-success/20 text-brand-success',
    Hold: 'bg-brand-warning/20 text-brand-warning',
    Sell: 'bg-brand-danger/20 text-brand-danger',
  };
  return <span className={`${baseClasses} ${colorClasses[rating]}`}>{rating}</span>;
};

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  const isPriceUp = report.priceChange >= 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">{report.companyName} ({report.ticker})</h2>
            <p className="mt-2 text-brand-muted">{report.profile}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-4xl font-bold text-white">{formatCurrency(report.currentPrice)}</p>
            <p className={`text-lg font-semibold ${isPriceUp ? 'text-brand-success' : 'text-brand-danger'}`}>
              {isPriceUp ? '+' : ''}{formatCurrency(report.priceChange)} ({isPriceUp ? '+' : ''}{formatPercent(report.priceChangePercent)})
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricCard title="Market Cap" value={report.marketCap} />
        <MetricCard title="P/E Ratio" value={formatNumber(report.peRatio)} />
        <MetricCard title="Dividend Yield" value={formatPercent(report.dividendYield)} />
        <MetricCard title="52-Week High" value={formatCurrency(report.fiftyTwoWeekHigh)} />
        <MetricCard title="52-Week Low" value={formatCurrency(report.fiftyTwoWeekLow)} />
      </div>

      {/* Chart */}
      <div className="h-96 bg-brand-surface p-4 border border-brand-border rounded-lg">
        <PriceChart data={report.historicalData} />
      </div>
      
      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-brand-surface p-6 border border-brand-border rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Analyst Consensus</h3>
          <div className="flex items-center gap-4 mb-4">
            <RatingBadge rating={report.analystRating} />
          </div>
          <p className="text-brand-secondary">{report.rationale}</p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-surface p-6 border border-brand-border rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">Short-Term Outlook</h4>
                <p className="text-brand-muted">{report.shortTermOutlook}</p>
            </div>
            <div className="bg-brand-surface p-6 border border-brand-border rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">Long-Term Outlook</h4>
                <p className="text-brand-muted">{report.longTermOutlook}</p>
            </div>
        </div>
      </div>

      {/* News Section */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Recent News</h3>
        <div className="space-y-4">
          {report.news.map((item, index) => (
            <NewsItemCard key={index} newsItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
