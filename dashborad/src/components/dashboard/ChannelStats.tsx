import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'WhatsApp', value: 1250, color: 'hsl(142, 70%, 45%)' },
  { name: 'Instagram', value: 820, color: 'hsl(330, 80%, 55%)' },
  { name: 'Telegram', value: 450, color: 'hsl(200, 80%, 50%)' },
  { name: 'Web Chat', value: 380, color: 'hsl(217, 91%, 60%)' },
  { name: 'E-mail', value: 290, color: 'hsl(35, 90%, 55%)' },
];

export function ChannelStats() {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground">Conversas por Canal</h3>
        <span className="text-xs text-muted-foreground">Últimos 7 dias</span>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={70}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
