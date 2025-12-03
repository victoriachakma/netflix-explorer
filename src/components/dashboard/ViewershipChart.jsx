import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import viewershipTrend from '../../../data/viewershipTrend.json';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-4 border border-border/50">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {(entry.value / 1000000).toFixed(1)}M
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ViewershipChart() {
  const [activeMetric, setActiveMetric] = useState('views');

  const formatYAxis = (value) => `${(value / 1000000).toFixed(0)}M`;

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Viewership Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly performance over 2024</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMetric('views')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeMetric === 'views'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Total Views
          </button>
          <button
            onClick={() => setActiveMetric('uniqueViewers')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeMetric === 'uniqueViewers'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Unique Viewers
          </button>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={viewershipTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            {activeMetric === 'views' ? (
              <Area
                type="monotone"
                dataKey="views"
                name="Total Views"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#viewsGradient)"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="uniqueViewers"
                name="Unique Viewers"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                fill="url(#uniqueGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}