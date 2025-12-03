import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import genreDistribution from '../../../data/genreDistribution.json';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--muted-foreground))',
];

const THRESHOLD_PERCENT = 3; // Group genres under 3% into "Other"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const totalValue = genreDistribution.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((value / totalValue) * 100).toFixed(1);
    return (
      <div className="glass-card rounded-lg px-4 py-3 border border-border/50">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{percentage}% of views</p>
      </div>
    );
  }
  return null;
};

export function GenreChart() {
  const totalValue = genreDistribution.reduce((sum, item) => sum + item.value, 0);

  // Separate large and small genres
  const largeGenres = [];
  let otherValue = 0;

  genreDistribution.forEach((item) => {
    const percent = (item.value / totalValue) * 100;
    if (percent >= THRESHOLD_PERCENT) {
      largeGenres.push(item);
    } else {
      otherValue += item.value;
    }
  });

  // Add "Other" category if applicable
  if (otherValue > 0) {
    largeGenres.push({ name: 'Other', value: otherValue });
  }

  // Calculate percentages for display
  const genreDataWithPercent = largeGenres.map((item) => ({
    ...item,
    percentage: ((item.value / totalValue) * 100).toFixed(1),
  }));

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Genre Distribution</h3>
        <p className="text-sm text-muted-foreground">Content views by category</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={largeGenres}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {largeGenres.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap lg:flex-col gap-3">
          {genreDataWithPercent.map((genre, index) => (
            <div key={genre.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-muted-foreground">{genre.name}</span>
              <span className="text-sm font-semibold">{genre.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
