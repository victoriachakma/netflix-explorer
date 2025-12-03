import keyInsights from '../../../data/keyInsights.json';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InsightsPanel() {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Key performance highlights</p>
        </div>
      </div>
      <div className="space-y-4">
        {keyInsights.map((insight, index) => (
          <div
            key={index}
            className={cn(
              'group p-4 rounded-lg bg-secondary/30 border border-border/30',
              'hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {insight.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-medium text-chart-4 bg-chart-4/10 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3" />
                    +{insight.change}%
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
                <p className="text-xs text-muted-foreground/70">{insight.metric}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}