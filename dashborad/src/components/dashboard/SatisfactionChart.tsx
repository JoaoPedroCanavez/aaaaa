import { useEffect, useState } from "react";

interface SatisfactionChartProps {
  percentage: number;
  label: string;
}

export function SatisfactionChart({ percentage, label }: SatisfactionChartProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="glass rounded-xl p-6 card-hover">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Taxa de Satisfação</h3>
      <p className="text-xs text-muted-foreground/70 mb-6">De todas as conversas</p>
      
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold gradient-text">{animatedPercentage}%</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
