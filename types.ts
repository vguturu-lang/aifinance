
export interface NewsItem {
  headline: string;
  summary: string;
}

export interface PriceDataPoint {
  date: string;
  price: number;
}

export type AnalystRating = 'Buy' | 'Hold' | 'Sell';

export interface AnalystReport {
  companyName: string;
  ticker: string;
  profile: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: string;
  peRatio: number;
  dividendYield: number;
  analystRating: AnalystRating;
  rationale: string;
  shortTermOutlook: string;
  longTermOutlook: string;
  news: NewsItem[];
  historicalData: PriceDataPoint[];
}
