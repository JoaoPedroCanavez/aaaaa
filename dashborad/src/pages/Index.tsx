import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { OwnerCard } from "@/components/dashboard/OwnerCard";
import { ProcedimentoCard } from "@/components/dashboard/ProcedimentoCard";
import { CalendarioCard } from "@/components/dashboard/CalendarioCard";
import { CancelamentoCard } from "@/components/dashboard/CancelamentoCard";
import { AgendamentosCard } from "@/components/dashboard/AgendamentosCard";
import { LeadsCard } from "@/components/dashboard/LeadsCard";
import { TaxaCancelamentoChart } from "@/components/dashboard/TaxaCancelamentoChart";
import { TaxaConversaoChart } from "@/components/dashboard/TaxaConversaoChart";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cliente-redirect: verifica token JWT
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login/";
    }
  }, [navigate]);

  return (
    // PAI: Define a tela inteira (h-screen) e impede rolagem dupla (overflow-hidden)
    <div className="flex h-screen w-full bg-background overflow-hidden">
      
      {/* SIDEBAR: Como não é mais 'fixed', ela ocupa seu espaço naturalmente */}
      <Sidebar />
      
      {/* CONTEÚDO PRINCIPAL:
          - flex-1: Ocupa todo o espaço restante automaticamente (Adeus 'ml-64')
          - flex-col: Organiza Header em cima e Main em baixo
          - overflow-hidden: Trava a rolagem externa
      */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* Header fixo no topo da área de conteúdo */}
        <Header />
        
        {/* ÁREA DE SCROLL:
            - overflow-y-auto: A barra de rolagem aparece SÓ AQUI
            - p-6: Espaçamento interno
        */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6 pb-10">
            
            {/* Linha 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <CalendarioCard />
              <LeadsCard />
              <OwnerCard />
            </div>

            {/* Linha 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <AgendamentosCard />
              <ProcedimentoCard />
              <CancelamentoCard />
            </div>

            {/* Linha 3 - Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <TaxaConversaoChart />
              <TaxaCancelamentoChart />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;