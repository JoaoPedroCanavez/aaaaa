import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStat {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

const stats: QuickStat[] = [
  { label: "Tempo médio de resposta", value: "2.5 min", trend: "down", trendValue: "-15%" },
  { label: "Taxa de resolução", value: "94%", trend: "up", trendValue: "+5%" },
  { label: "NPS Score", value: "72", trend: "up", trendValue: "+8" },
];

export function QuickStats() {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Indicadores Rápidos</h3>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold text-foreground">{stat.value}</p>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              stat.trend === "up" && "bg-green-500/10 text-green-500",
              stat.trend === "down" && "bg-red-500/10 text-red-500",
              stat.trend === "neutral" && "bg-muted text-muted-foreground"
            )}>
              {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
              {stat.trend === "down" && <TrendingDown className="w-3 h-3" />}
              {stat.trend === "neutral" && <Minus className="w-3 h-3" />}
              {stat.trendValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
