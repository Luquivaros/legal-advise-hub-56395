import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";

export default function SetorAdministrativoClients() {
  const [activeFilter, setActiveFilter] = useState<ClientFilter>("protocolados");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes - Setor Administrativo" 
        subtitle="Gestão e acompanhamento de clientes administrativos" 
      />
      
      {/* Card de Filtros */}
      <ClientFilterMenu 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {/* Conteúdo baseado no filtro selecionado */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {activeFilter === "protocolados" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Clientes Protocolados</h3>
            <p className="text-muted-foreground">Conteúdo de clientes protocolados em desenvolvimento...</p>
          </div>
        )}
        {activeFilter === "pre-processual" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Clientes Pré-Processual</h3>
            <p className="text-muted-foreground">Conteúdo de clientes pré-processual em desenvolvimento...</p>
          </div>
        )}
        {activeFilter === "novos" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Clientes Novos</h3>
            <p className="text-muted-foreground">Conteúdo de clientes novos em desenvolvimento...</p>
          </div>
        )}
        {activeFilter === "repiques" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Repiques</h3>
            <p className="text-muted-foreground">Conteúdo de repiques em desenvolvimento...</p>
          </div>
        )}
        {activeFilter === "leads" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Leads Recebidos</h3>
            <p className="text-muted-foreground">Conteúdo de leads recebidos em desenvolvimento...</p>
          </div>
        )}
      </div>
    </div>
  );
}