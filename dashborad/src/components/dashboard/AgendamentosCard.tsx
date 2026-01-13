import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const agendamentos = [
  { id: 1, cliente: "Maria Silva", hora: "09:00", status: "confirmado" },
  { id: 2, cliente: "João Santos", hora: "10:30", status: "pendente" },
  { id: 3, cliente: "Ana Costa", hora: "14:00", status: "confirmado" },
  { id: 4, cliente: "Pedro Lima", hora: "16:00", status: "pendente" },
];

export function AgendamentosCard() {
  return (
    <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Agendamentos</h3>
            <p className="text-xs text-muted-foreground">{agendamentos.length} para hoje</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
        {agendamentos.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 group/item"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground block">{item.cliente}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{item.hora}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={item.status === "confirmado" ? "default" : "secondary"} 
              className={
                item.status === "confirmado" 
                  ? "bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30" 
                  : "bg-amber-500/20 text-amber-500 border-amber-500/30 hover:bg-amber-500/30"
              }
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
