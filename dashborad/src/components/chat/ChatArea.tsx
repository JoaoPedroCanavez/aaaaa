import { Send, Tag, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "lead" | "operator";
  senderName?: string;
  time: string;
}

interface ChatAreaProps {
  conversationId: string | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const quickTags = ["Interessado", "Agendamento", "Dúvida", "Reclamação"];

export function ChatArea({ conversationId, messages, onSendMessage }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Send className="w-10 h-10 text-primary/50" />
          </div>
          <p className="text-muted-foreground">Selecione uma conversa para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background/30">
      {/* Tags Header */}
      <div className="p-5 border-b border-border/50 flex gap-3 overflow-x-auto">
        {quickTags.map((tag) => (
          <Button
            key={tag}
            variant="outline"
            size="default"
            className="flex-shrink-0 gap-2 border-border/50 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all text-base px-5 py-2.5"
          >
            <Tag className="w-4 h-4" />
            {tag}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full">
            Hoje
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[70%]",
              msg.sender === "operator" ? "ml-auto items-end" : "items-start"
            )}
          >
            {msg.sender === "operator" && msg.senderName && (
              <span className="text-sm text-primary mb-1.5 font-medium">{msg.senderName}</span>
            )}
            {msg.sender === "lead" && (
              <span className="text-sm text-muted-foreground mb-1.5 font-medium">LEAD</span>
            )}
            <div
              className={cn(
                "px-5 py-3.5 rounded-2xl",
                msg.sender === "operator"
                  ? "bg-secondary/80 text-foreground rounded-br-md"
                  : "bg-card border border-border/50 text-foreground rounded-bl-md"
              )}
            >
              <p className="text-base leading-relaxed">{msg.content}</p>
            </div>
            <span className="text-xs text-muted-foreground mt-1.5 px-1">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-border/50 bg-background/50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary h-11 w-11"
          >
            <Paperclip className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary h-11 w-11"
          >
            <Smile className="w-6 h-6" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Como posso ajudá-lo?"
            className="flex-1 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 text-base"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
