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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Cliente-redirect: se não houver token JWT no localStorage, redireciona para o login do Django.
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Redireciona fora do SPA para que o Django sirva a página de login.
      window.location.href = "/login/";
    }
  }, [navigate]);

  useEffect(() => {
    const handler = (e: Event) => {
      // @ts-ignore
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.collapsed === 'boolean') {
        setSidebarCollapsed(detail.collapsed);
      }
    };
    window.addEventListener('sidebar:toggle', handler as EventListener);
    return () => window.removeEventListener('sidebar:toggle', handler as EventListener);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <div className={sidebarCollapsed ? "flex-1 flex flex-col md:ml-20" : "flex-1 flex flex-col md:ml-64"}>
        <Header />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Row 1: Calendario, Leads, Owner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <CalendarioCard />
              <LeadsCard />
              <OwnerCard />
            </div>

            {/* Row 2: Agendamentos (large), Procedimento, Cancelamento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <AgendamentosCard />
              <ProcedimentoCard />
              <CancelamentoCard />
            </div>

            {/* Row 3: Taxa de Conversão, Taxa de Cancelamento */}
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
