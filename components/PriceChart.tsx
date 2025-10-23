
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { PriceDataPoint } from '../types';

interface PriceChartProps {
  data: PriceDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-surface/80 backdrop-blur-sm p-3 border border-brand-border rounded-lg shadow-lg">
        <p className="label text-brand-secondary">{`${label}`}</p>
        <p className="intro text-brand-primary font-bold">{`Price: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};


export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const isTrendingUp = data.length > 1 && data[data.length - 1].price > data[0].price;
  const strokeColor = isTrendingUp ? '#3FB950' : '#F85149';

  const formattedData = data.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
        <XAxis dataKey="date" stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin', 'dataMax']} tickFormatter={(value) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
