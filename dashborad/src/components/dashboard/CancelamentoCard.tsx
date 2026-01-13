import { XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CancelamentoCard() {
  return (
    <div className="glass rounded-2xl p-6 card-hover h-full flex flex-col relative overflow-hidden group">
      {/* Warning gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-transparent to-destructive/10 opacity-50" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cancelamento</h3>
        <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center group-hover:bg-destructive/20 transition-colors duration-300">
          <XCircle className="w-8 h-8 text-destructive" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Solicitar cancelamento de serviço</p>
          <Button 
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-medium transition-all duration-300"
          >
            Efetuar Cancelamento
          </Button>
        </div>
      </div>
    </div>
  );
}
