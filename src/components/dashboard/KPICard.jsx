import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function KPICard({ title, value, change, suffix = '', prefix = '', icon, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const isPositive = change >= 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </span>
          </div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-chart-4' : 'text-destructive'
          )}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{isPositive ? '+' : ''}{change}%</span>
            <span className="text-muted-foreground font-normal">vs last period</span>
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}