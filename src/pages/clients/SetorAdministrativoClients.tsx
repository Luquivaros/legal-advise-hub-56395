import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";
import { UniversalCard, DocumentList, DataGrid, NotesList } from "@/components/reusable/UniversalCard";
import { FileText, User, History, Scale, Package, Paperclip, CreditCard, Search, UserPlus, Users, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SetorAdministrativoClients() {
  const [activeFilter, setActiveFilter] = useState<ClientFilter>("protocolados");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocType, setSelectedDocType] = useState<string>("");

  const attachDocTypes = [
    "RG/CNH",
    "Procuração judicial",
    "Comprovante de residência",
    "Declaração de hipossuficiência",
    "Carteira de trabalho",
    "Holerites / Declaração de Rendimento",
    "Declaração de IR",
    "Extratos 90 dias",
    "Reclamação GOV",
    "Contrato do financiamento",
    "Documento do veículo",
    "Cálculo Revisional",
    "Laudo Financiamento",
    "Comprovante do pagamento da parcela do financiamento",
    "Procuração Inicial",
    "Comprovante de seguro",
    "Outros gastos fixos",
    "Questionario para o Titular"
  ];

  const generateDocTypes = [
    "Procuração e Hipo",
    "Citação",
    "Termo de Ciência",
    "Homologação",
    "Termo GOV",
    "Solicitação de Laudo (Ata)",
    "Ata de Negociação"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDocType) {
      console.log("Upload file:", file.name, "Type:", selectedDocType);
      // Implementar lógica de upload
    }
  };

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
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold">Protocolados</h3>
              </div>
              
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
          <div className="bg-gradient-to-br from-card to-card/95 border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Roberto da Silva</h2>
                <p className="text-sm text-muted-foreground">Protocolo: PROT-2024-001</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Dropdown Anexar Docs */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all text-foreground hover:text-foreground"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Anexar docs
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-background">
                    <div className="p-2">
                      <p className="text-sm font-semibold mb-2">Selecione o tipo de documento:</p>
                      {attachDocTypes.map((docType) => (
                        <DropdownMenuItem
                          key={docType}
                          onClick={() => setSelectedDocType(docType)}
                          className="cursor-pointer"
                        >
                          {docType}
                        </DropdownMenuItem>
                      ))}
                      {selectedDocType && (
                        <div className="mt-4 p-3 border border-border rounded-lg bg-muted/30">
                          <p className="text-sm font-medium mb-2">Documento selecionado: {selectedDocType}</p>
                          <Input
                            type="file"
                            onChange={handleFileUpload}
                            className="cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Dropdown Gerar Docs */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all text-foreground hover:text-foreground"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar docs
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-background">
                    <div className="p-2">
                      <p className="text-sm font-semibold mb-2">Selecione o documento:</p>
                      {generateDocTypes.map((docType) => (
                        <DropdownMenuItem
                          key={docType}
                          className="cursor-pointer"
                        >
                          {docType}
                        </DropdownMenuItem>
                      ))}
                      <div className="mt-4 pt-2 border-t border-border">
                        <Button
                          onClick={() => console.log("Gerar documentos")}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Gerar Documentos
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Botão ChargeBack */}
                <Button
                  onClick={() => console.log("ChargeBack")}
                  variant="outline"
                  className="hover:bg-muted/50 hover:border-muted-foreground/40 transition-all text-foreground hover:text-foreground"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  ChargeBack
                </Button>
              </div>
            </div>
            
            <UniversalCard
            title=""
            subtitle=""
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