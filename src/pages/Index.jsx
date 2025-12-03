import { Eye, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { ViewershipChart } from '@/components/dashboard/ViewershipChart';
import { GenreChart } from '@/components/dashboard/GenreChart';
import { TopContentTable } from '@/components/dashboard/TopContentTable';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import kpiMetrics from '../../data/kpiMetrics.json';

const Index = () => {
  const formatLargeNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-3/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Content Performance
            </h2>
            <p className="text-muted-foreground mt-1">
              Real-time analytics and insights for your streaming content
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Views"
            value={formatLargeNumber(kpiMetrics.totalViews)}
            change={kpiMetrics.totalViewsChange}
            icon={<Eye className="h-6 w-6" />}
            delay={0}
          />
          <KPICard
            title="Avg. Completion Rate"
            value={kpiMetrics.avgCompletionRate}
            suffix="%"
            change={kpiMetrics.completionChange}
            icon={<CheckCircle2 className="h-6 w-6" />}
            delay={100}
          />
          <KPICard
            title="Avg. Watch Time"
            value={kpiMetrics.avgWatchTime}
            suffix=" min"
            change={kpiMetrics.watchTimeChange}
            icon={<Clock className="h-6 w-6" />}
            delay={200}
          />
          <KPICard
            title="Active Subscribers"
            value={formatLargeNumber(kpiMetrics.activeSubscribers)}
            change={kpiMetrics.subscriberChange}
            icon={<Users className="h-6 w-6" />}
            delay={300}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ViewershipChart />
          </div>
          <GenreChart />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TopContentTable />
          </div>
          <InsightsPanel />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Data is a mix of real and mock values for demonstration purposes. Built with React & Recharts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;