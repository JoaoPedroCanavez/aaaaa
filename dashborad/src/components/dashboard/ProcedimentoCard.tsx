import { ClipboardList, Activity } from "lucide-react";

export function ProcedimentoCard() {
  return (
    <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Procedimento</h3>
        <Activity className="w-4 h-4 text-primary" />
      </div>
      
      <div className="flex flex-col items-center justify-center gap-3 py-4 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
          <ClipboardList className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">Nenhum ativo</p>
          <p className="text-xs text-muted-foreground mt-1">Procedimentos aparecerão aqui</p>
        </div>
      </div>
    </div>
  );
}
