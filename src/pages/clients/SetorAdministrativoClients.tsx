import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";
import { UniversalCard, DocumentList, DataGrid, NotesList } from "@/components/reusable/UniversalCard";
import { FileText, User, History, Scale, Package, Paperclip, CreditCard, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetorAdministrativoClients() {
  const [activeFilter, setActiveFilter] = useState<ClientFilter>("protocolados");
  const [searchTerm, setSearchTerm] = useState("");

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
          {/* Card de Busca com Search Bar e Adicionar Cliente */}
          <div className="bg-gradient-to-br from-card to-card/95 border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">Protocolados</h3>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                  <Input 
                    placeholder="Buscar por CPF ou nome do cliente..."
                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && console.log("Buscar:", searchTerm)}
                  />
                  <Button
                    onClick={() => console.log("Buscar:", searchTerm)}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    <div className="relative">
                      <div className="flex items-center">
                        <Search className="w-4 h-4 mr-2" />
                        <span className="text-sm font-semibold whitespace-nowrap truncate">
                          Buscar
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Botão Adicionar Cliente */}
                <Button
                  onClick={() => console.log("Adicionar cliente")}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Cliente
                </Button>
              </div>
            </div>
          </div>

          {/* Card de Detalhes do Cliente */}
          <UniversalCard
            title="Roberto da Silva"
            subtitle="Protocolo: PROT-2024-001"
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
          >
            {/* Botões de Ação com Hover Personalizado */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <Button
                onClick={() => console.log("Anexar documentos")}
                variant="outline"
                className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all"
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Anexar docs
              </Button>
              <Button
                onClick={() => console.log("Gerar documentos")}
                variant="outline"
                className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all"
              >
                <FileText className="w-4 h-4 mr-2" />
                Gerar docs
              </Button>
              <Button
                onClick={() => console.log("ChargeBack")}
                variant="outline"
                className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                ChargeBack
              </Button>
            </div>
          </UniversalCard>
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