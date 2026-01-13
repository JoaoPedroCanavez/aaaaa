import { MessageSquare, Tag, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Conversation {
  id: string;
  phone: string;
  lastMessage: string;
  time: string;
  tag?: string;
  unread?: boolean;
  finished?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const activeConversations = conversations.filter(c => !c.finished);
  const finishedConversations = conversations.filter(c => c.finished);

  return (
    <div className="h-full flex flex-col bg-background/50 backdrop-blur-xl border-r border-border/50">
      <div className="p-5 border-b border-border/50">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Conversas
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Active Conversations */}
        <div className="space-y-2 p-3">
          {activeConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200",
                selectedId === conv.id 
                  ? "bg-primary/20 border border-primary/30" 
                  : "hover:bg-secondary/50 border border-transparent"
              )}
            >
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-border/50">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg">
                    {conv.phone.slice(-2)}
                  </AvatarFallback>
                </Avatar>
                {conv.unread && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-medium text-foreground truncate">{conv.phone}</p>
                  <span className="text-sm text-muted-foreground flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                {conv.tag && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{conv.tag}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Finished Conversations */}
        {finishedConversations.length > 0 && (
          <>
            <div className="px-5 py-3 flex items-center gap-2 text-muted-foreground">
              <CheckCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Atendimentos Finalizados</span>
            </div>
            <div className="space-y-2 p-3 pt-0">
              {finishedConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => onSelect(conv.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 opacity-60",
                    selectedId === conv.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-secondary/30 border border-transparent"
                  )}
                >
                  <Avatar className="w-14 h-14 border-2 border-border/30">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-secondary/50 text-muted-foreground text-lg">
                      {conv.phone.slice(-2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-base font-medium text-muted-foreground truncate">{conv.phone}</p>
                      <span className="text-sm text-muted-foreground/60 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground/60 truncate mt-1">{conv.lastMessage}</p>
                    {conv.tag && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{conv.tag}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
