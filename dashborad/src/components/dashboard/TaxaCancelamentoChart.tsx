import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TaxaCancelamentoChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<Array<{ name: string; taxa: number; count?: number; total?: number }>>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [latest, setLatest] = useState<number>(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/dashboard/metrics/', { credentials: 'include' });
        if (!res.ok) return;
        const json = await res.json();
        const labels: string[] = json.labels || [];
        const cancellation: number[] = json.cancellation || [];
        const totals: number[] = json.total_counts || [];
        const canceledCounts: number[] = json.canceled_counts || [];
        
          setLabels(labels);

          const totalSum = totals.reduce((s: number, v: number) => s + (v || 0), 0);
          if (!totalSum) {
            const zeroed = labels.map((lbl) => ({ name: lbl, taxa: 0, count: 0, total: 0 }));
            setCounts(labels.map(() => 0));
            setData(zeroed);
            setLatest(0);
            return;
          }

          setCounts(canceledCounts);
          setData(labels.map((lbl, i) => ({ name: lbl, taxa: cancellation[i] ?? 0, count: canceledCounts[i] ?? 0, total: totals[i] ?? 0 })));
          setLatest(json.cancellation_latest ?? 0);
      } catch (e) {
        // ignore
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-transparent" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Taxa de Cancelamento</h3>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <span className="text-3xl font-bold text-foreground">{latest}%</span>
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <span className="text-sm text-green-500 font-medium">&nbsp;</span>
        </div>
      </div>
      
      <div className="h-44 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.length ? data : [{ name: 'N/A', taxa: 0 }]}>
            <defs>
              <linearGradient id="colorCancelamento" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
              tickFormatter={(v) => `${v}%`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
              }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload as any;
                return (
                  <div className="p-3 text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                    <div className="font-semibold">{label}</div>
                    <div>Taxa: {point.taxa}%</div>
                    <div>Cancelados: {point.count ?? 0}</div>
                    <div>Total: {point.total ?? 0}</div>
                  </div>
                );
              }}
            />
            <Area 
              type="monotone" 
              dataKey="taxa" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCancelamento)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
