import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatArea } from "@/components/chat/ChatArea";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

// ... MOCKS (Mantenha seus mocks aqui) ...
const mockConversations = [
  { id: "1", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag", unread: true },
  { id: "2", phone: "+55 11 9 8888-7777", lastMessage: "Olá preciso de ajuda", time: "14:00", tag: "Tag" },
];
const mockMessages = [
  { id: "1", content: "Olá preciso de ajuda", sender: "lead" as const, time: "14:00" },
  { id: "2", content: "como posso ajuda-lo", sender: "operator" as const, senderName: "Operador", time: "14:00" },
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

  return (
    // PAI FLEX: Ocupa 100% da tela e proíbe scroll na janela inteira
    <div className="flex h-screen w-full bg-background overflow-hidden">
      
      {/* Sidebar: Agora se comporta como uma coluna Flex (não sobrepõe) */}
      <Sidebar />
      
      {/* CONTEÚDO DIREITA: Ocupa o resto do espaço */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* Header: Fixo no topo desta coluna */}
        <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between flex-shrink-0">
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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* ÁREA DE DOIS PINEIS (Lista + Chat) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Painel Esquerdo: Lista de Conversas */}
          {/* hidden md:block: Esconde no celular quando chat está aberto (responsividade básica) */}
          <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border flex flex-col bg-card/30">
             {/* Lista rolável */}
             <div className="flex-1 overflow-y-auto">
                <ConversationList
                  conversations={mockConversations}
                  selectedId={selectedConversation}
                  onSelect={setSelectedConversation}
                />
             </div>
          </div>

          {/* Painel Direito: Chat Area */}
          <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background">
             {/* Importante: O componente ChatArea deve ter overflow-y-auto internamente na lista de msgs */}
             <ChatArea
                conversationId={selectedConversation}
                messages={messages}
                onSendMessage={(c) => console.log(c)}
              />
          </main>
        </div>
      </div>
    </div>
  );
}