import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  customer: string;
  message: string;
  channel: string;
  time: string;
  status: "open" | "resolved" | "pending";
  avatar: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    customer: "Maria Silva",
    message: "Preciso de ajuda com meu pedido #12345",
    channel: "WhatsApp",
    time: "2 min",
    status: "open",
    avatar: "MS"
  },
  {
    id: "2",
    customer: "João Santos",
    message: "Quando meu produto será entregue?",
    channel: "Instagram",
    time: "15 min",
    status: "pending",
    avatar: "JS"
  },
  {
    id: "3",
    customer: "Ana Costa",
    message: "Obrigada pelo suporte! Problema resolvido.",
    channel: "Web Chat",
    time: "1h",
    status: "resolved",
    avatar: "AC"
  },
  {
    id: "4",
    customer: "Pedro Lima",
    message: "Gostaria de trocar o tamanho do produto",
    channel: "E-mail",
    time: "2h",
    status: "open",
    avatar: "PL"
  },
];

const statusConfig = {
  open: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  resolved: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  pending: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
};

const channelColors: Record<string, string> = {
  WhatsApp: "text-green-500",
  Instagram: "text-pink-500",
  Telegram: "text-blue-400",
  "Web Chat": "text-primary",
  "E-mail": "text-orange-500",
};

export function RecentConversations() {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground">Conversas Recentes</h3>
        <a href="/conversas" className="text-xs text-primary hover:underline">Ver todas</a>
      </div>
      
      <div className="space-y-4">
        {conversations.map((conv) => {
          const StatusIcon = statusConfig[conv.status].icon;
          return (
            <div 
              key={conv.id} 
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-medium flex-shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{conv.customer}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn("text-xs font-medium", channelColors[conv.channel])}>
                    {conv.channel}
                  </span>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                    statusConfig[conv.status].bg,
                    statusConfig[conv.status].color
                  )}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{conv.status === "open" ? "Aberta" : conv.status === "resolved" ? "Resolvida" : "Pendente"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
