import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";
import { UniversalCard, DocumentList, DataGrid, NotesList } from "@/components/reusable/UniversalCard";
import { FileText, User, History, Scale, Package, Paperclip, CreditCard, Search, UserPlus, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SetorAdministrativoClients() {
  const [activeFilter, setActiveFilter] = useState<ClientFilter>("protocolados");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAttachDocsOpen, setIsAttachDocsOpen] = useState(false);
  const [isGenerateDocsOpen, setIsGenerateDocsOpen] = useState(false);
  const [isChargebackOpen, setIsChargebackOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedGenDocType, setSelectedGenDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [chargebackValue, setChargebackValue] = useState("");
  const [consultant, setConsultant] = useState("");
  const [allegation, setAllegation] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientCPF, setNewClientCPF] = useState("");
  const [newClientProtocol, setNewClientProtocol] = useState("");
  const [isEditingDocuments, setIsEditingDocuments] = useState(false);
  const [isEditingClientData, setIsEditingClientData] = useState(false);
  const [isEditingHistory, setIsEditingHistory] = useState(false);
  const [editedEmail, setEditedEmail] = useState("roberto.silva@email.com");
  const [editedPhone, setEditedPhone] = useState("(11) 99999-9999");
  const [editedCPF, setEditedCPF] = useState("123.456.789-00");
  const [editedAddress, setEditedAddress] = useState("Rua das Flores, 123 - SP");

  const documentTypes = [
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

  const handleAttachDocument = () => {
    console.log("Anexar documento:", selectedDocType, selectedFile);
    setIsAttachDocsOpen(false);
    setSelectedDocType("");
    setSelectedFile(null);
  };

  const handleGenerateDocuments = () => {
    console.log("Gerar documento:", selectedGenDocType);
    setIsGenerateDocsOpen(false);
    setSelectedGenDocType("");
  };

  const handleChargebackSubmit = () => {
    console.log("Chargeback:", { paymentMethod, orderDate, chargebackValue, consultant, allegation });
    setIsChargebackOpen(false);
    setPaymentMethod("");
    setOrderDate("");
    setChargebackValue("");
    setConsultant("");
    setAllegation("");
  };

  const handleAddClient = () => {
    console.log("Adicionar cliente:", { newClientName, newClientPhone, newClientCPF, newClientProtocol });
    setIsAddClientOpen(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientCPF("");
    setNewClientProtocol("");
  };

  const handleSaveClientData = () => {
    console.log("Salvar dados:", { editedEmail, editedPhone, editedCPF, editedAddress });
    setIsEditingClientData(false);
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
                  onClick={() => setIsAddClientOpen(true)}
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
            actions={[
              {
                label: "Anexar docs",
                onClick: () => setIsAttachDocsOpen(true),
                variant: "outline" as const,
                icon: Paperclip
              },
              {
                label: "Gerar docs",
                onClick: () => setIsGenerateDocsOpen(true),
                variant: "outline" as const,
                icon: FileText
              },
              {
                label: "ChargeBack",
                onClick: () => setIsChargebackOpen(true),
                variant: "outline" as const,
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
                content: isEditingClientData ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <Input value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CPF</label>
                      <Input value={editedCPF} onChange={(e) => setEditedCPF(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Endereço</label>
                      <Input value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveClientData}>Salvar</Button>
                      <Button variant="outline" onClick={() => setIsEditingClientData(false)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <DataGrid data={[
                    { label: "Email", value: editedEmail },
                    { label: "Telefone", value: editedPhone },
                    { label: "CPF", value: editedCPF },
                    { label: "Endereço", value: editedAddress }
                  ]} />
                ),
                onEdit: () => setIsEditingClientData(true)
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

          {/* Modal Anexar Documentos */}
          <Dialog open={isAttachDocsOpen} onOpenChange={setIsAttachDocsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Anexar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento e faça o upload do arquivo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Tipo de Documento</Label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedDocType && (
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Arquivo</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAttachDocsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAttachDocument} disabled={!selectedDocType || !selectedFile}>
                  Anexar Documento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Gerar Documentos */}
          <Dialog open={isGenerateDocsOpen} onOpenChange={setIsGenerateDocsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Gerar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento que deseja gerar.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gen-doc-type">Tipo de Documento</Label>
                  <Select value={selectedGenDocType} onValueChange={setSelectedGenDocType}>
                    <SelectTrigger id="gen-doc-type">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateDocTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsGenerateDocsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGenerateDocuments} disabled={!selectedGenDocType}>
                  Gerar Documentos
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Adicionar Cliente */}
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nome</Label>
                  <Input
                    id="client-name"
                    type="text"
                    placeholder="Nome completo do cliente"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Telefone</Label>
                  <Input
                    id="client-phone"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-cpf">CPF</Label>
                  <Input
                    id="client-cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={newClientCPF}
                    onChange={(e) => setNewClientCPF(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-protocol">Protocolo</Label>
                  <Input
                    id="client-protocol"
                    type="text"
                    placeholder="PROT-2024-XXX"
                    value={newClientProtocol}
                    onChange={(e) => setNewClientProtocol(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClient} disabled={!newClientName || !newClientPhone || !newClientCPF || !newClientProtocol}>
                  Adicionar Cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Chargeback */}
          <Dialog open={isChargebackOpen} onOpenChange={setIsChargebackOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Chargeback - Roberto da Silva</DialogTitle>
                <DialogDescription>
                  Preencha as informações do chargeback.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Método de Pagamento</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FICTORPAY">FICTORPAY</SelectItem>
                      <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                      <SelectItem value="Pix">Pix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-date">Data do Pedido</Label>
                  <Input
                    id="order-date"
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargeback-value">Valor do Chargeback</Label>
                  <Input
                    id="chargeback-value"
                    type="text"
                    placeholder="R$ 0,00"
                    value={chargebackValue}
                    onChange={(e) => setChargebackValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultant">Nome do Consultor</Label>
                  <Select value={consultant} onValueChange={setConsultant}>
                    <SelectTrigger id="consultant">
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jean - COM">Jean - COM</SelectItem>
                      <SelectItem value="Maria - COM">Maria - COM</SelectItem>
                      <SelectItem value="Pedro - JUR">Pedro - JUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allegation">Alegação</Label>
                  <Select value={allegation} onValueChange={setAllegation}>
                    <SelectTrigger id="allegation">
                      <SelectValue placeholder="Selecione a alegação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desacordo Comercial">Desacordo Comercial</SelectItem>
                      <SelectItem value="Suspeita de fraude">Suspeita de fraude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsChargebackOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleChargebackSubmit}>
                  Enviar Chargeback
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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