import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";
import { UniversalCard, DocumentList, DataGrid, NotesList } from "@/components/reusable/UniversalCard";
import { FileText, User, History, Scale, Package, Paperclip, CreditCard, Search, Users, UserPlus } from "lucide-react";

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
      {activeFilter === "protocolados" && (
        <div className="space-y-6">
          {/* Card de Busca */}
          <UniversalCard
            title="Protocolados"
            headerIcon={Users}
            actions={[
              {
                label: "Buscar",
                onClick: () => console.log("Buscar clientes"),
                variant: "default",
                icon: Search
              },
              {
                label: "Adicionar Cliente",
                onClick: () => console.log("Adicionar cliente"),
                variant: "default",
                icon: UserPlus
              }
            ]}
            variant="default"
          >
            <div className="relative bg-background w-full md:w-auto md:min-w-[20rem] md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
              <input 
                placeholder="Buscar por CPF ou nome do cliente..."
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
              />
            </div>
          </UniversalCard>

          {/* Card de Detalhes do Cliente */}
          <UniversalCard
            title="Roberto da Silva"
            subtitle="Protocolo: PROT-2024-001"
            actions={[
              {
                label: "Anexar docs",
                onClick: () => console.log("Anexar documentos"),
                variant: "outline",
                icon: Paperclip
              },
              {
                label: "Gerar docs",
                onClick: () => console.log("Gerar documentos"),
                variant: "outline",
                icon: FileText
              },
              {
                label: "ChargeBack",
                onClick: () => console.log("ChargeBack"),
                variant: "outline",
                icon: CreditCard
              }
            ]}
            sections={[
              {
                id: "documents",
                title: "Documentos anexados",
                icon: FileText,
                content: <DocumentList documents={[
                  { id: "1", name: "Contrato.pdf", uploadedAt: "2024-01-15T10:30:00Z" },
                  { id: "2", name: "RG.pdf", uploadedAt: "2024-01-16T14:20:00Z" }
                ]} />,
                onEdit: () => console.log("Editar documentos")
              },
              {
                id: "client-data",
                title: "Dados do cliente",
                icon: User,
                content: <DataGrid data={[
                  { label: "Email", value: "roberto.silva@email.com" },
                  { label: "Telefone", value: "(11) 99999-9999" },
                  { label: "CPF", value: "123.456.789-00" },
                  { label: "Endereço", value: "Rua das Flores, 123 - SP" }
                ]} />,
                onEdit: () => console.log("Editar dados do cliente")
              },
              {
                id: "history",
                title: "Histórico do Cliente",
                icon: History,
                content: <NotesList notes={[
                  { 
                    id: "1", 
                    content: "Cliente contatado via telefone. Confirmou interesse no processo.", 
                    createdBy: "Ana Silva", 
                    createdAt: "2024-01-15T10:30:00Z" 
                  }
                ]} />,
                onEdit: () => console.log("Editar histórico")
              },
              {
                id: "movements",
                title: "Movimentações",
                icon: Scale,
                content: <p>Últimas movimentações do processo...</p>,
                onEdit: () => console.log("Editar movimentações")
              },
              {
                id: "service",
                title: "Serviço",
                icon: Package,
                content: <p>Serviço: <span className="font-medium text-foreground">audiencia</span></p>,
                onEdit: () => console.log("Editar serviço")
              }
            ]}
            variant="default"
          />
        </div>
      )}
      
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
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