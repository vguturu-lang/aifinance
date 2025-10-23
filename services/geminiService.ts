
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalystReport } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    companyName: { type: Type.STRING, description: "Full name of the company." },
    ticker: { type: Type.STRING, description: "The stock ticker symbol." },
    profile: { type: Type.STRING, description: "A brief, one-paragraph profile of the company." },
    currentPrice: { type: Type.NUMBER, description: "A realistic, fictional current stock price." },
    priceChange: { type: Type.NUMBER, description: "A fictional daily price change (can be positive or negative)." },
    priceChangePercent: { type: Type.NUMBER, description: "A fictional daily price change in percent." },
    fiftyTwoWeekHigh: { type: Type.NUMBER, description: "A fictional 52-week high price." },
    fiftyTwoWeekLow: { type: Type.NUMBER, description: "A fictional 52-week low price." },
    marketCap: { type: Type.STRING, description: "A fictional market capitalization, e.g., '1.5T' or '250B'." },
    peRatio: { type: Type.NUMBER, description: "A fictional Price-to-Earnings (P/E) ratio." },
    dividendYield: { type: Type.NUMBER, description: "A fictional dividend yield percentage." },
    analystRating: { type: Type.STRING, enum: ['Buy', 'Hold', 'Sell'], description: "The overall analyst rating." },
    rationale: { type: Type.STRING, description: "A short paragraph justifying the analyst rating." },
    shortTermOutlook: { type: Type.STRING, description: "A short paragraph on the fictional short-term (1-3 months) outlook." },
    longTermOutlook: { type: Type.STRING, description: "A short paragraph on the fictional long-term (1-3 years) outlook." },
    news: {
      type: Type.ARRAY,
      description: "An array of 3 recent, fictional news headlines with summaries.",
      items: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          summary: { type: Type.STRING },
        },
        required: ['headline', 'summary'],
      },
    },
    historicalData: {
      type: Type.ARRAY,
      description: "An array of 30 days of fictional historical price data.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date in 'YYYY-MM-DD' format." },
          price: { type: Type.NUMBER, description: "Closing price for that date." },
        },
        required: ['date', 'price'],
      },
    },
  },
  required: [
    'companyName', 'ticker', 'profile', 'currentPrice', 'priceChange', 'priceChangePercent',
    'fiftyTwoWeekHigh', 'fiftyTwoWeekLow', 'marketCap', 'peRatio', 'dividendYield',
    'analystRating', 'rationale', 'shortTermOutlook', 'longTermOutlook', 'news', 'historicalData'
  ],
};

export const generateAnalystReport = async (ticker: string): Promise<AnalystReport> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const prompt = `
    For the stock ticker symbol "${ticker.toUpperCase()}", generate a fictional but realistic-sounding stock analyst report. 
    The data should be plausible for a major company associated with this ticker, but does not need to be real-time or accurate.
    Ensure the historical data shows plausible daily volatility and the dates are sequential leading up to today.
    Provide the response as a JSON object matching the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      },
    });

    const reportJson = response.text.trim();
    return JSON.parse(reportJson);
  } catch (error) {
    console.error("Error generating report from Gemini API:", error);
    throw new Error("Failed to generate analyst report. Please check the ticker or try again later.");
  }
};
