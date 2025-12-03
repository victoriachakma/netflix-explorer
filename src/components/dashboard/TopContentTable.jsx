import topContent from '../../../data/topContent.json';
import { TrendingUp, Film, Tv, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function TopContentTable() {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    return views.toLocaleString();
  };

  const top10Content = topContent.slice(0, 10);

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Top Performing Content</h3>
          <p className="text-sm text-muted-foreground">Most viewed titles this quarter</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Title
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Type
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Views
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 hidden sm:table-cell">
                Completion
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 hidden md:table-cell">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {top10Content.map((item, index) => (
              <tr
                key={item.id}
                className="group hover:bg-secondary/30 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-5">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                        {item.trending && (
                          <TrendingUp className="h-4 w-4 text-chart-4" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.genre}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'gap-1',
                      item.type === 'Series' ? 'bg-chart-3/20 text-chart-3' : 'bg-chart-2/20 text-chart-2'
                    )}
                  >
                    {item.type === 'Series' ? (
                      <Tv className="h-3 w-3" />
                    ) : (
                      <Film className="h-3 w-3" />
                    )}
                    {item.type}
                  </Badge>
                </td>
                <td className="py-4 text-right font-semibold">
                  {formatViews(item.views)}
                </td>
                <td className="py-4 text-right hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-chart-4 rounded-full transition-all"
                        style={{ width: `${item.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.completionRate}%</span>
                  </div>
                </td>
                <td className="py-4 text-right hidden md:table-cell">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-4 w-4 text-chart-2 fill-chart-2" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}