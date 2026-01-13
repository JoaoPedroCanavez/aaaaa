import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Seg', conversas: 120, resolvidas: 100 },
  { name: 'Ter', conversas: 180, resolvidas: 150 },
  { name: 'Qua', conversas: 150, resolvidas: 130 },
  { name: 'Qui', conversas: 220, resolvidas: 190 },
  { name: 'Sex', conversas: 280, resolvidas: 250 },
  { name: 'Sab', conversas: 160, resolvidas: 140 },
  { name: 'Dom', conversas: 90, resolvidas: 80 },
];

export function ConversationsChart() {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Visão Geral de Conversas</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Conversas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Resolvidas</span>
            </div>
          </div>
        </div>
        <select className="bg-secondary text-secondary-foreground text-xs rounded-lg px-3 py-1.5 border border-border">
          <option>Esta semana</option>
          <option>Este mês</option>
          <option>Este ano</option>
        </select>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorConversas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorResolvidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
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
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="conversas" 
              stroke="hsl(217, 91%, 60%)" 
              fillOpacity={1} 
              fill="url(#colorConversas)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="resolvidas" 
              stroke="hsl(199, 89%, 48%)" 
              fillOpacity={1} 
              fill="url(#colorResolvidas)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
