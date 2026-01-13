import { UserPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OwnerCard() {
  return (
    <div className="glass rounded-2xl p-6 card-hover h-full flex flex-col relative overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Owner</h3>
        <Sparkles className="w-4 h-4 text-accent animate-pulse-slow" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
          <UserPlus className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Adicionar novo membro à equipe</p>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-medium shadow-lg shadow-primary/20"
          >
            Criar Usuário
          </Button>
        </div>
      </div>
    </div>
  );
}
