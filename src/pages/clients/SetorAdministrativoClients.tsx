import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ClientFilterMenu, ClientFilter } from "@/components/ClientFilterMenu";
import { UniversalCard, DocumentList, DataGrid, NotesList } from "@/components/reusable/UniversalCard";
import { FileText, User, History, Scale, Package, Paperclip, CreditCard, Search, UserPlus, Users, ClipboardCheck } from "lucide-react";
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
  // Modal states for editing sections
  const [isEditDocumentsOpen, setIsEditDocumentsOpen] = useState(false);
  const [isEditClientDataOpen, setIsEditClientDataOpen] = useState(false);
  const [isEditHistoryOpen, setIsEditHistoryOpen] = useState(false);
  const [isEditMovementsOpen, setIsEditMovementsOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  
  // Edited data states
  const [editedEmail, setEditedEmail] = useState("roberto.silva@email.com");
  const [editedPhone, setEditedPhone] = useState("(11) 99999-9999");
  const [editedCPF, setEditedCPF] = useState("123.456.789-00");
  const [editedAddress, setEditedAddress] = useState("Rua das Flores, 123 - SP");
  const [editedDocuments, setEditedDocuments] = useState([
    { id: "1", name: "Contrato.pdf", uploadedAt: "2024-01-15T10:30:00Z" },
    { id: "2", name: "RG.pdf", uploadedAt: "2024-01-16T14:20:00Z" }
  ]);
  const [editedHistory, setEditedHistory] = useState("Cliente contatado via telefone. Confirmou interesse no processo.");
  const [editedMovements, setEditedMovements] = useState("Últimas movimentações do processo...");
  const [editedService, setEditedService] = useState("audiencia");
  
  // Pre-processual states
  const [isAddProtocolOpen, setIsAddProtocolOpen] = useState(false);
  const [newProtocol, setNewProtocol] = useState("");
  const [searchTermPreProcessual, setSearchTermPreProcessual] = useState("");
  const [isAddClientPreProcessualOpen, setIsAddClientPreProcessualOpen] = useState(false);
  const [newClientNamePreProcessual, setNewClientNamePreProcessual] = useState("");
  const [newClientPhonePreProcessual, setNewClientPhonePreProcessual] = useState("");
  const [newClientCPFPreProcessual, setNewClientCPFPreProcessual] = useState("");
  const [isAttachDocsPreProcessualOpen, setIsAttachDocsPreProcessualOpen] = useState(false);
  const [isGenerateDocsPreProcessualOpen, setIsGenerateDocsPreProcessualOpen] = useState(false);
  const [isChargebackPreProcessualOpen, setIsChargebackPreProcessualOpen] = useState(false);
  const [selectedDocTypePreProcessual, setSelectedDocTypePreProcessual] = useState("");
  const [selectedGenDocTypePreProcessual, setSelectedGenDocTypePreProcessual] = useState("");
  const [selectedFilePreProcessual, setSelectedFilePreProcessual] = useState<File | null>(null);
  const [paymentMethodPreProcessual, setPaymentMethodPreProcessual] = useState("");
  const [orderDatePreProcessual, setOrderDatePreProcessual] = useState("");
  const [chargebackValuePreProcessual, setChargebackValuePreProcessual] = useState("");
  const [consultantPreProcessual, setConsultantPreProcessual] = useState("");
  const [allegationPreProcessual, setAllegationPreProcessual] = useState("");
  const [isEditDocumentsPreProcessualOpen, setIsEditDocumentsPreProcessualOpen] = useState(false);
  const [isEditClientDataPreProcessualOpen, setIsEditClientDataPreProcessualOpen] = useState(false);
  const [isEditHistoryPreProcessualOpen, setIsEditHistoryPreProcessualOpen] = useState(false);
  const [editedEmailPreProcessual, setEditedEmailPreProcessual] = useState("maria.santos@email.com");
  const [editedPhonePreProcessual, setEditedPhonePreProcessual] = useState("(11) 98888-8888");
  const [editedCPFPreProcessual, setEditedCPFPreProcessual] = useState("987.654.321-00");
  const [editedAddressPreProcessual, setEditedAddressPreProcessual] = useState("Av. Paulista, 456 - SP");
  const [editedDocumentsPreProcessual, setEditedDocumentsPreProcessual] = useState([
    { id: "1", name: "RG.pdf", uploadedAt: "2024-01-20T10:30:00Z" },
  ]);
  const [editedHistoryPreProcessual, setEditedHistoryPreProcessual] = useState("Cliente em fase de análise inicial.");

  // Novos states
  const [searchTermNovos, setSearchTermNovos] = useState("");
  const [isAddClientNovosOpen, setIsAddClientNovosOpen] = useState(false);
  const [newClientNameNovos, setNewClientNameNovos] = useState("");
  const [newClientPhoneNovos, setNewClientPhoneNovos] = useState("");
  const [newClientCPFNovos, setNewClientCPFNovos] = useState("");
  const [isAttachDocsNovosOpen, setIsAttachDocsNovosOpen] = useState(false);
  const [isGenerateDocsNovosOpen, setIsGenerateDocsNovosOpen] = useState(false);
  const [isChargebackNovosOpen, setIsChargebackNovosOpen] = useState(false);
  const [selectedDocTypeNovos, setSelectedDocTypeNovos] = useState("");
  const [selectedGenDocTypeNovos, setSelectedGenDocTypeNovos] = useState("");
  const [selectedFileNovos, setSelectedFileNovos] = useState<File | null>(null);
  const [paymentMethodNovos, setPaymentMethodNovos] = useState("");
  const [orderDateNovos, setOrderDateNovos] = useState("");
  const [chargebackValueNovos, setChargebackValueNovos] = useState("");
  const [consultantNovos, setConsultantNovos] = useState("");
  const [allegationNovos, setAllegationNovos] = useState("");
  const [isEditDocumentsNovosOpen, setIsEditDocumentsNovosOpen] = useState(false);
  const [isEditClientDataNovosOpen, setIsEditClientDataNovosOpen] = useState(false);
  const [isEditHistoryNovosOpen, setIsEditHistoryNovosOpen] = useState(false);
  const [editedEmailNovos, setEditedEmailNovos] = useState("joao.pereira@email.com");
  const [editedPhoneNovos, setEditedPhoneNovos] = useState("(11) 97777-7777");
  const [editedCPFNovos, setEditedCPFNovos] = useState("456.789.123-00");
  const [editedAddressNovos, setEditedAddressNovos] = useState("Rua das Palmeiras, 789 - SP");
  const [editedDocumentsNovos, setEditedDocumentsNovos] = useState([
    { id: "1", name: "CPF.pdf", uploadedAt: "2024-01-25T10:30:00Z" },
  ]);
  const [editedHistoryNovos, setEditedHistoryNovos] = useState("Novo cliente cadastrado no sistema.");

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

  const handleSaveDocuments = () => {
    console.log("Salvar documentos:", editedDocuments);
    setIsEditDocumentsOpen(false);
  };

  const handleSaveClientData = () => {
    console.log("Salvar dados:", { editedEmail, editedPhone, editedCPF, editedAddress });
    setIsEditClientDataOpen(false);
  };

  const handleSaveHistory = () => {
    console.log("Salvar histórico:", editedHistory);
    setIsEditHistoryOpen(false);
  };

  const handleSaveMovements = () => {
    console.log("Salvar movimentações:", editedMovements);
    setIsEditMovementsOpen(false);
  };

  const handleSaveService = () => {
    console.log("Salvar serviço:", editedService);
    setIsEditServiceOpen(false);
  };

  // Pre-processual handlers
  const handleAddProtocol = () => {
    console.log("Adicionar protocolo:", newProtocol);
    setIsAddProtocolOpen(false);
    setNewProtocol("");
  };

  const handleAddClientPreProcessual = () => {
    console.log("Adicionar cliente pré-processual:", { 
      newClientNamePreProcessual, 
      newClientPhonePreProcessual, 
      newClientCPFPreProcessual 
    });
    setIsAddClientPreProcessualOpen(false);
    setNewClientNamePreProcessual("");
    setNewClientPhonePreProcessual("");
    setNewClientCPFPreProcessual("");
  };

  const handleAttachDocumentPreProcessual = () => {
    console.log("Anexar documento pré-processual:", selectedDocTypePreProcessual, selectedFilePreProcessual);
    setIsAttachDocsPreProcessualOpen(false);
    setSelectedDocTypePreProcessual("");
    setSelectedFilePreProcessual(null);
  };

  const handleGenerateDocumentsPreProcessual = () => {
    console.log("Gerar documento pré-processual:", selectedGenDocTypePreProcessual);
    setIsGenerateDocsPreProcessualOpen(false);
    setSelectedGenDocTypePreProcessual("");
  };

  const handleChargebackSubmitPreProcessual = () => {
    console.log("Chargeback pré-processual:", { 
      paymentMethodPreProcessual, 
      orderDatePreProcessual, 
      chargebackValuePreProcessual, 
      consultantPreProcessual, 
      allegationPreProcessual 
    });
    setIsChargebackPreProcessualOpen(false);
    setPaymentMethodPreProcessual("");
    setOrderDatePreProcessual("");
    setChargebackValuePreProcessual("");
    setConsultantPreProcessual("");
    setAllegationPreProcessual("");
  };

  const handleSaveDocumentsPreProcessual = () => {
    console.log("Salvar documentos pré-processual:", editedDocumentsPreProcessual);
    setIsEditDocumentsPreProcessualOpen(false);
  };

  const handleSaveClientDataPreProcessual = () => {
    console.log("Salvar dados pré-processual:", { 
      editedEmailPreProcessual, 
      editedPhonePreProcessual, 
      editedCPFPreProcessual, 
      editedAddressPreProcessual 
    });
    setIsEditClientDataPreProcessualOpen(false);
  };

  const handleSaveHistoryPreProcessual = () => {
    console.log("Salvar histórico pré-processual:", editedHistoryPreProcessual);
    setIsEditHistoryPreProcessualOpen(false);
  };

  // Novos handlers
  const handleAddClientNovos = () => {
    console.log("Adicionar cliente novos:", { 
      newClientNameNovos, 
      newClientPhoneNovos, 
      newClientCPFNovos 
    });
    setIsAddClientNovosOpen(false);
    setNewClientNameNovos("");
    setNewClientPhoneNovos("");
    setNewClientCPFNovos("");
  };

  const handleAttachDocumentNovos = () => {
    console.log("Anexar documento novos:", selectedDocTypeNovos, selectedFileNovos);
    setIsAttachDocsNovosOpen(false);
    setSelectedDocTypeNovos("");
    setSelectedFileNovos(null);
  };

  const handleGenerateDocumentsNovos = () => {
    console.log("Gerar documento novos:", selectedGenDocTypeNovos);
    setIsGenerateDocsNovosOpen(false);
    setSelectedGenDocTypeNovos("");
  };

  const handleChargebackSubmitNovos = () => {
    console.log("Chargeback novos:", { 
      paymentMethodNovos, 
      orderDateNovos, 
      chargebackValueNovos, 
      consultantNovos, 
      allegationNovos 
    });
    setIsChargebackNovosOpen(false);
    setPaymentMethodNovos("");
    setOrderDateNovos("");
    setChargebackValueNovos("");
    setConsultantNovos("");
    setAllegationNovos("");
  };

  const handleSaveDocumentsNovos = () => {
    console.log("Salvar documentos novos:", editedDocumentsNovos);
    setIsEditDocumentsNovosOpen(false);
  };

  const handleSaveClientDataNovos = () => {
    console.log("Salvar dados novos:", { 
      editedEmailNovos, 
      editedPhoneNovos, 
      editedCPFNovos, 
      editedAddressNovos 
    });
    setIsEditClientDataNovosOpen(false);
  };

  const handleSaveHistoryNovos = () => {
    console.log("Salvar histórico novos:", editedHistoryNovos);
    setIsEditHistoryNovosOpen(false);
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
                content: <DocumentList documents={editedDocuments} />,
                onEdit: () => setIsEditDocumentsOpen(true)
              },
              {
                id: "client-data",
                title: "Dados do cliente",
                icon: User,
                content: <DataGrid data={[
                  { label: "Email", value: editedEmail },
                  { label: "Telefone", value: editedPhone },
                  { label: "CPF", value: editedCPF },
                  { label: "Endereço", value: editedAddress }
                ]} />,
                onEdit: () => setIsEditClientDataOpen(true)
              },
              {
                id: "history",
                title: "Histórico do Cliente",
                icon: History,
                content: <NotesList notes={[
                  { 
                    id: "1", 
                    content: editedHistory, 
                    createdBy: "Ana Silva", 
                    createdAt: "2024-01-15T10:30:00Z" 
                  }
                ]} />,
                onEdit: () => setIsEditHistoryOpen(true)
              },
              {
                id: "movements",
                title: "Movimentações",
                icon: Scale,
                content: <p>{editedMovements}</p>,
                onEdit: () => setIsEditMovementsOpen(true)
              },
              {
                id: "service",
                title: "Serviço",
                icon: Package,
                content: <p>Serviço: <span className="font-medium text-foreground">{editedService}</span></p>,
                onEdit: () => setIsEditServiceOpen(true)
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

          {/* Modal Editar Documentos */}
          <Dialog open={isEditDocumentsOpen} onOpenChange={setIsEditDocumentsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Documentos Anexados</DialogTitle>
                <DialogDescription>
                  Gerencie os documentos anexados ao cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  {editedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                      <span>{doc.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditedDocuments(editedDocuments.filter(d => d.id !== doc.id))}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDocumentsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveDocuments}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Dados do Cliente */}
          <Dialog open={isEditClientDataOpen} onOpenChange={setIsEditClientDataOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Dados do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize as informações do cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cpf">CPF</Label>
                  <Input
                    id="edit-cpf"
                    type="text"
                    value={editedCPF}
                    onChange={(e) => setEditedCPF(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Endereço</Label>
                  <Input
                    id="edit-address"
                    type="text"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditClientDataOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveClientData}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Histórico */}
          <Dialog open={isEditHistoryOpen} onOpenChange={setIsEditHistoryOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Histórico do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize o histórico de interações com o cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-history">Histórico</Label>
                  <Input
                    id="edit-history"
                    type="text"
                    value={editedHistory}
                    onChange={(e) => setEditedHistory(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditHistoryOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveHistory}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Movimentações */}
          <Dialog open={isEditMovementsOpen} onOpenChange={setIsEditMovementsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Movimentações</DialogTitle>
                <DialogDescription>
                  Atualize as informações sobre movimentações do processo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-movements">Movimentações</Label>
                  <Input
                    id="edit-movements"
                    type="text"
                    value={editedMovements}
                    onChange={(e) => setEditedMovements(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditMovementsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveMovements}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Serviço */}
          <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Serviço</DialogTitle>
                <DialogDescription>
                  Atualize o tipo de serviço associado ao cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-service">Serviço</Label>
                  <Input
                    id="edit-service"
                    type="text"
                    value={editedService}
                    onChange={(e) => setEditedService(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditServiceOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveService}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      {activeFilter === "pre-processual" && (
        <div className="space-y-6">
          {/* Card de Busca com Search Bar e Adicionar Cliente */}
          <div className="bg-gradient-to-br from-card to-card/95 border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold">Pré-Processual</h3>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                  <Input 
                    placeholder="Buscar por CPF ou nome do cliente..."
                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                    value={searchTermPreProcessual}
                    onChange={(e) => setSearchTermPreProcessual(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && console.log("Buscar:", searchTermPreProcessual)}
                  />
                  <Button
                    onClick={() => console.log("Buscar:", searchTermPreProcessual)}
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
                  onClick={() => setIsAddClientPreProcessualOpen(true)}
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
            title="Maria dos Santos"
            subtitle="Cliente em análise"
            actions={[
              {
                label: "Anexar docs",
                onClick: () => setIsAttachDocsPreProcessualOpen(true),
                variant: "outline" as const,
                icon: Paperclip
              },
              {
                label: "Adicionar Protocolo",
                onClick: () => setIsAddProtocolOpen(true),
                variant: "outline" as const,
                icon: ClipboardCheck
              },
              {
                label: "Gerar docs",
                onClick: () => setIsGenerateDocsPreProcessualOpen(true),
                variant: "outline" as const,
                icon: FileText
              },
              {
                label: "ChargeBack",
                onClick: () => setIsChargebackPreProcessualOpen(true),
                variant: "outline" as const,
                icon: CreditCard
              }
            ]}
            sections={[
              {
                id: "documents",
                title: "Documentos anexados",
                icon: FileText,
                content: <DocumentList documents={editedDocumentsPreProcessual} />,
                onEdit: () => setIsEditDocumentsPreProcessualOpen(true)
              },
              {
                id: "client-data",
                title: "Dados do cliente",
                icon: User,
                content: <DataGrid data={[
                  { label: "Email", value: editedEmailPreProcessual },
                  { label: "Telefone", value: editedPhonePreProcessual },
                  { label: "CPF", value: editedCPFPreProcessual },
                  { label: "Endereço", value: editedAddressPreProcessual }
                ]} />,
                onEdit: () => setIsEditClientDataPreProcessualOpen(true)
              },
              {
                id: "history",
                title: "Histórico do Cliente",
                icon: History,
                content: <NotesList notes={[
                  { 
                    id: "1", 
                    content: editedHistoryPreProcessual, 
                    createdBy: "João Costa", 
                    createdAt: "2024-01-20T10:30:00Z" 
                  }
                ]} />,
                onEdit: () => setIsEditHistoryPreProcessualOpen(true)
              }
            ]}
            variant="default"
          />

          {/* Modal Adicionar Protocolo */}
          <Dialog open={isAddProtocolOpen} onOpenChange={setIsAddProtocolOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Protocolo</DialogTitle>
                <DialogDescription>
                  Adicione um número de protocolo para deslocar o cliente para outra aba.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="protocol-number">Número do Protocolo</Label>
                  <Input
                    id="protocol-number"
                    type="text"
                    placeholder="PROT-2024-XXX"
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProtocolOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProtocol} disabled={!newProtocol}>
                  Adicionar Protocolo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Adicionar Cliente Pré-Processual */}
          <Dialog open={isAddClientPreProcessualOpen} onOpenChange={setIsAddClientPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name-pre">Nome</Label>
                  <Input
                    id="client-name-pre"
                    type="text"
                    placeholder="Nome completo do cliente"
                    value={newClientNamePreProcessual}
                    onChange={(e) => setNewClientNamePreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone-pre">Telefone</Label>
                  <Input
                    id="client-phone-pre"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={newClientPhonePreProcessual}
                    onChange={(e) => setNewClientPhonePreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-cpf-pre">CPF</Label>
                  <Input
                    id="client-cpf-pre"
                    type="text"
                    placeholder="000.000.000-00"
                    value={newClientCPFPreProcessual}
                    onChange={(e) => setNewClientCPFPreProcessual(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClientPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClientPreProcessual} disabled={!newClientNamePreProcessual || !newClientPhonePreProcessual || !newClientCPFPreProcessual}>
                  Adicionar Cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Anexar Documentos Pré-Processual */}
          <Dialog open={isAttachDocsPreProcessualOpen} onOpenChange={setIsAttachDocsPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Anexar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento e faça o upload do arquivo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-type-pre">Tipo de Documento</Label>
                  <Select value={selectedDocTypePreProcessual} onValueChange={setSelectedDocTypePreProcessual}>
                    <SelectTrigger id="doc-type-pre">
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
                {selectedDocTypePreProcessual && (
                  <div className="space-y-2">
                    <Label htmlFor="file-upload-pre">Arquivo</Label>
                    <Input
                      id="file-upload-pre"
                      type="file"
                      onChange={(e) => setSelectedFilePreProcessual(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAttachDocsPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAttachDocumentPreProcessual} disabled={!selectedDocTypePreProcessual || !selectedFilePreProcessual}>
                  Anexar Documento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Gerar Documentos Pré-Processual */}
          <Dialog open={isGenerateDocsPreProcessualOpen} onOpenChange={setIsGenerateDocsPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Gerar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento que deseja gerar.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gen-doc-type-pre">Tipo de Documento</Label>
                  <Select value={selectedGenDocTypePreProcessual} onValueChange={setSelectedGenDocTypePreProcessual}>
                    <SelectTrigger id="gen-doc-type-pre">
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
                <Button variant="outline" onClick={() => setIsGenerateDocsPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGenerateDocumentsPreProcessual} disabled={!selectedGenDocTypePreProcessual}>
                  Gerar Documentos
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Chargeback Pré-Processual */}
          <Dialog open={isChargebackPreProcessualOpen} onOpenChange={setIsChargebackPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Maria dos Santos</DialogTitle>
                <DialogDescription>
                  Preencha as informações do chargeback.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method-pre">Método de Pagamento</Label>
                  <Select value={paymentMethodPreProcessual} onValueChange={setPaymentMethodPreProcessual}>
                    <SelectTrigger id="payment-method-pre">
                      <SelectValue placeholder="Selecione o método de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fictorpay">FICTORPAY</SelectItem>
                      <SelectItem value="mercadopago">Mercado Pago</SelectItem>
                      <SelectItem value="pix">Pix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-date-pre">Data do pedido</Label>
                  <Input
                    id="order-date-pre"
                    type="date"
                    value={orderDatePreProcessual}
                    onChange={(e) => setOrderDatePreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargeback-value-pre">Valor do Chargeback</Label>
                  <Input
                    id="chargeback-value-pre"
                    type="text"
                    placeholder="R$ 0,00"
                    value={chargebackValuePreProcessual}
                    onChange={(e) => setChargebackValuePreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultant-pre">Nome do Consultor</Label>
                  <Select value={consultantPreProcessual} onValueChange={setConsultantPreProcessual}>
                    <SelectTrigger id="consultant-pre">
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ana">Ana Silva</SelectItem>
                      <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                      <SelectItem value="patricia">Patrícia Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allegation-pre">Alegação</Label>
                  <Select value={allegationPreProcessual} onValueChange={setAllegationPreProcessual}>
                    <SelectTrigger id="allegation-pre">
                      <SelectValue placeholder="Selecione a alegação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desacordo">Desacordo Comercial</SelectItem>
                      <SelectItem value="fraude">Suspeita de fraude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsChargebackPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleChargebackSubmitPreProcessual} disabled={!paymentMethodPreProcessual || !orderDatePreProcessual || !chargebackValuePreProcessual || !consultantPreProcessual || !allegationPreProcessual}>
                  Enviar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Documentos Pré-Processual */}
          <Dialog open={isEditDocumentsPreProcessualOpen} onOpenChange={setIsEditDocumentsPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Documentos Anexados</DialogTitle>
                <DialogDescription>
                  Gerencie os documentos anexados ao cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Documentos</Label>
                  <div className="text-sm text-muted-foreground">
                    {editedDocumentsPreProcessual.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50 mb-2">
                        <span>{doc.name}</span>
                        <span className="text-xs">
                          {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDocumentsPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveDocumentsPreProcessual}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Dados do Cliente Pré-Processual */}
          <Dialog open={isEditClientDataPreProcessualOpen} onOpenChange={setIsEditClientDataPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Dados do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize as informações do cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email-pre">Email</Label>
                  <Input
                    id="edit-email-pre"
                    type="email"
                    value={editedEmailPreProcessual}
                    onChange={(e) => setEditedEmailPreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone-pre">Telefone</Label>
                  <Input
                    id="edit-phone-pre"
                    type="text"
                    value={editedPhonePreProcessual}
                    onChange={(e) => setEditedPhonePreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cpf-pre">CPF</Label>
                  <Input
                    id="edit-cpf-pre"
                    type="text"
                    value={editedCPFPreProcessual}
                    onChange={(e) => setEditedCPFPreProcessual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address-pre">Endereço</Label>
                  <Input
                    id="edit-address-pre"
                    type="text"
                    value={editedAddressPreProcessual}
                    onChange={(e) => setEditedAddressPreProcessual(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditClientDataPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveClientDataPreProcessual}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Histórico Pré-Processual */}
          <Dialog open={isEditHistoryPreProcessualOpen} onOpenChange={setIsEditHistoryPreProcessualOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Histórico do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize o histórico de interações com o cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-history-pre">Histórico</Label>
                  <Input
                    id="edit-history-pre"
                    type="text"
                    value={editedHistoryPreProcessual}
                    onChange={(e) => setEditedHistoryPreProcessual(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditHistoryPreProcessualOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveHistoryPreProcessual}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {activeFilter === "novos" && (
        <div className="space-y-6">
          {/* Card de Busca com Search Bar e Adicionar Cliente */}
          <div className="bg-gradient-to-br from-card to-card/95 border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-semibold">Novos Clientes</h3>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                  <Input 
                    placeholder="Buscar por CPF ou nome do cliente..."
                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                    value={searchTermNovos}
                    onChange={(e) => setSearchTermNovos(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && console.log("Buscar:", searchTermNovos)}
                  />
                  <Button
                    onClick={() => console.log("Buscar:", searchTermNovos)}
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
                  onClick={() => setIsAddClientNovosOpen(true)}
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
            title="João Pereira"
            subtitle="Cliente Novo"
            actions={[
              {
                label: "Anexar docs",
                onClick: () => setIsAttachDocsNovosOpen(true),
                variant: "outline" as const,
                icon: Paperclip
              },
              {
                label: "Gerar docs",
                onClick: () => setIsGenerateDocsNovosOpen(true),
                variant: "outline" as const,
                icon: FileText
              },
              {
                label: "ChargeBack",
                onClick: () => setIsChargebackNovosOpen(true),
                variant: "outline" as const,
                icon: CreditCard
              }
            ]}
            sections={[
              {
                id: "documents",
                title: "Documentos anexados",
                icon: FileText,
                content: <DocumentList documents={editedDocumentsNovos} />,
                onEdit: () => setIsEditDocumentsNovosOpen(true)
              },
              {
                id: "client-data",
                title: "Dados do cliente",
                icon: User,
                content: <DataGrid data={[
                  { label: "Email", value: editedEmailNovos },
                  { label: "Telefone", value: editedPhoneNovos },
                  { label: "CPF", value: editedCPFNovos },
                  { label: "Endereço", value: editedAddressNovos }
                ]} />,
                onEdit: () => setIsEditClientDataNovosOpen(true)
              },
              {
                id: "history",
                title: "Histórico do Cliente",
                icon: History,
                content: <NotesList notes={[
                  { 
                    id: "1", 
                    content: editedHistoryNovos, 
                    createdBy: "Pedro Santos", 
                    createdAt: "2024-01-25T10:30:00Z" 
                  }
                ]} />,
                onEdit: () => setIsEditHistoryNovosOpen(true)
              }
            ]}
            variant="default"
          />

          {/* Modal Adicionar Cliente Novos */}
          <Dialog open={isAddClientNovosOpen} onOpenChange={setIsAddClientNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name-novos">Nome</Label>
                  <Input
                    id="client-name-novos"
                    type="text"
                    placeholder="Nome completo do cliente"
                    value={newClientNameNovos}
                    onChange={(e) => setNewClientNameNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone-novos">Telefone</Label>
                  <Input
                    id="client-phone-novos"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={newClientPhoneNovos}
                    onChange={(e) => setNewClientPhoneNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-cpf-novos">CPF</Label>
                  <Input
                    id="client-cpf-novos"
                    type="text"
                    placeholder="000.000.000-00"
                    value={newClientCPFNovos}
                    onChange={(e) => setNewClientCPFNovos(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClientNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClientNovos} disabled={!newClientNameNovos || !newClientPhoneNovos || !newClientCPFNovos}>
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Anexar Documentos Novos */}
          <Dialog open={isAttachDocsNovosOpen} onOpenChange={setIsAttachDocsNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Anexar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento e faça o upload do arquivo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-type-novos">Tipo de Documento</Label>
                  <Select value={selectedDocTypeNovos} onValueChange={setSelectedDocTypeNovos}>
                    <SelectTrigger id="doc-type-novos">
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
                {selectedDocTypeNovos && (
                  <div className="space-y-2">
                    <Label htmlFor="file-upload-novos">Arquivo</Label>
                    <Input
                      id="file-upload-novos"
                      type="file"
                      onChange={(e) => setSelectedFileNovos(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAttachDocsNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAttachDocumentNovos} disabled={!selectedDocTypeNovos || !selectedFileNovos}>
                  Anexar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Gerar Documentos Novos */}
          <Dialog open={isGenerateDocsNovosOpen} onOpenChange={setIsGenerateDocsNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Gerar Documento</DialogTitle>
                <DialogDescription>
                  Selecione o tipo de documento que deseja gerar.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gen-doc-type-novos">Tipo de Documento</Label>
                  <Select value={selectedGenDocTypeNovos} onValueChange={setSelectedGenDocTypeNovos}>
                    <SelectTrigger id="gen-doc-type-novos">
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
                <Button variant="outline" onClick={() => setIsGenerateDocsNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGenerateDocumentsNovos} disabled={!selectedGenDocTypeNovos}>
                  Gerar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal ChargeBack Novos */}
          <Dialog open={isChargebackNovosOpen} onOpenChange={setIsChargebackNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>ChargeBack</DialogTitle>
                <DialogDescription>
                  Preencha as informações para processar o chargeback.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method-novos">Forma de Pagamento</Label>
                  <Select value={paymentMethodNovos} onValueChange={setPaymentMethodNovos}>
                    <SelectTrigger id="payment-method-novos">
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="debito">Cartão de Débito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-date-novos">Data do Pedido</Label>
                  <Input
                    id="order-date-novos"
                    type="date"
                    value={orderDateNovos}
                    onChange={(e) => setOrderDateNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargeback-value-novos">Valor do Chargeback</Label>
                  <Input
                    id="chargeback-value-novos"
                    type="text"
                    placeholder="R$ 0,00"
                    value={chargebackValueNovos}
                    onChange={(e) => setChargebackValueNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultant-novos">Nome do Consultor</Label>
                  <Select value={consultantNovos} onValueChange={setConsultantNovos}>
                    <SelectTrigger id="consultant-novos">
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ana">Ana Silva</SelectItem>
                      <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                      <SelectItem value="patricia">Patrícia Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allegation-novos">Alegação</Label>
                  <Select value={allegationNovos} onValueChange={setAllegationNovos}>
                    <SelectTrigger id="allegation-novos">
                      <SelectValue placeholder="Selecione a alegação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desacordo">Desacordo Comercial</SelectItem>
                      <SelectItem value="fraude">Suspeita de fraude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsChargebackNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleChargebackSubmitNovos} disabled={!paymentMethodNovos || !orderDateNovos || !chargebackValueNovos || !consultantNovos || !allegationNovos}>
                  Enviar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Documentos Novos */}
          <Dialog open={isEditDocumentsNovosOpen} onOpenChange={setIsEditDocumentsNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Documentos Anexados</DialogTitle>
                <DialogDescription>
                  Gerencie os documentos anexados ao cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Documentos</Label>
                  <div className="text-sm text-muted-foreground">
                    {editedDocumentsNovos.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50 mb-2">
                        <span>{doc.name}</span>
                        <span className="text-xs">
                          {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDocumentsNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveDocumentsNovos}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Dados do Cliente Novos */}
          <Dialog open={isEditClientDataNovosOpen} onOpenChange={setIsEditClientDataNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Dados do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize as informações do cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email-novos">Email</Label>
                  <Input
                    id="edit-email-novos"
                    type="email"
                    value={editedEmailNovos}
                    onChange={(e) => setEditedEmailNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone-novos">Telefone</Label>
                  <Input
                    id="edit-phone-novos"
                    type="text"
                    value={editedPhoneNovos}
                    onChange={(e) => setEditedPhoneNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cpf-novos">CPF</Label>
                  <Input
                    id="edit-cpf-novos"
                    type="text"
                    value={editedCPFNovos}
                    onChange={(e) => setEditedCPFNovos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address-novos">Endereço</Label>
                  <Input
                    id="edit-address-novos"
                    type="text"
                    value={editedAddressNovos}
                    onChange={(e) => setEditedAddressNovos(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditClientDataNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveClientDataNovos}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal Editar Histórico Novos */}
          <Dialog open={isEditHistoryNovosOpen} onOpenChange={setIsEditHistoryNovosOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Editar Histórico do Cliente</DialogTitle>
                <DialogDescription>
                  Atualize o histórico de interações com o cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-history-novos">Histórico</Label>
                  <Input
                    id="edit-history-novos"
                    type="text"
                    value={editedHistoryNovos}
                    onChange={(e) => setEditedHistoryNovos(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditHistoryNovosOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveHistoryNovos}>
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {activeFilter === "repiques" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Repiques</h3>
            <p className="text-muted-foreground">Conteúdo de repiques em desenvolvimento...</p>
          </div>
        </div>
      )}
      {activeFilter === "leads" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Leads Recebidos</h3>
            <p className="text-muted-foreground">Conteúdo de leads recebidos em desenvolvimento...</p>
          </div>
        </div>
      )}
    </div>
  );
}