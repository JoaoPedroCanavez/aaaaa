import { Users, TrendingUp, ArrowUpRight } from "lucide-react";

export function LeadsCard() {
  return (
    <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden group">
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Leads</h3>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Users className="w-7 h-7 text-accent" />
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <p className="text-4xl font-bold gradient-text">142</p>
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-green-500 font-medium">+8% este mês</p>
        </div>
      </div>
    </div>
  );
}
