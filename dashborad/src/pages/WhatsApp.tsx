import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatArea } from "@/components/chat/ChatArea";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data - will be replaced by Django REST API
const mockConversations = [
  { id: "1", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag", unread: true },
  { id: "2", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag" },
  { id: "3", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag", finished: true },
  { id: "4", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag", finished: true },
];

const mockMessages = [
  { id: "1", content: "Olá preciso de ajuda", sender: "lead" as const, time: "14:00" },
  { id: "2", content: "como posso ajuda-lo", sender: "operator" as const, senderName: "Operador", time: "14:00" },
  { id: "3", content: "Olá preciso de ajuda", sender: "lead" as const, time: "14:00" },
  { id: "4", content: "como posso ajuda-lo", sender: "operator" as const, senderName: "Operador", time: "14:00" },
];

export default function WhatsApp() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messages, setMessages] = useState(mockMessages);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: "operator" as const,
      senderName: "Operador",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-16">
        {/* Header with theme toggle */}
        <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar conversas..." 
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="relative text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Conversation List */}
          <div className="w-96 flex-shrink-0">
            <ConversationList
              conversations={mockConversations}
              selectedId={selectedConversation}
              onSelect={setSelectedConversation}
            />
          </div>

          {/* Chat Area */}
          <ChatArea
            conversationId={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
