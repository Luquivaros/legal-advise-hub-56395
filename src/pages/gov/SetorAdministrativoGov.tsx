import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GovFilterMenu, GovFilter } from '@/components/GovFilterMenu';
import { Input } from '@/components/ui/input';
import { Search, Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

// Mock data
const mockSeguroData = [
  {
    id: "1",
    clientName: "João Silva",
    cpf: "123.456.789-00",
    govPassword: "GOV123",
    requestDate: "2024-01-15",
    refundDate: "2024-02-15",
    refundValue: "R$ 5.000,00",
    consultantName: "Maria Santos",
    initialProcuration: true,
    selfieAttached: true,
    sectorNotes: "Documentação completa",
    hasInsurance: true,
    bank: "Banco do Brasil",
    insurer: "Porto Seguro"
  }
];

const mockContratoData = [
  {
    id: "1",
    clientName: "Ana Costa",
    cpf: "987.654.321-00",
    govPassword: "GOV456",
    requestDate: "2024-01-20",
    deadline: "30 dias",
    consultantName: "Pedro Oliveira",
    initialProcuration: false,
    selfieAttached: true,
    sectorNotes: "Aguardando assinatura",
    bank: "Caixa Econômica",
    insurer: "Bradesco Seguros"
  }
];

const mockDebitoData = [
  {
    id: "1",
    clientName: "Carlos Lima",
    cpf: "456.789.123-00",
    govPassword: "GOV789",
    requestDate: "2024-01-25",
    deadline: "15 dias",
    consultantName: "Julia Ferreira",
    initialProcuration: true,
    selfieAttached: false,
    sectorNotes: "Pendente de selfie",
    bank: "Itaú",
    insurer: "Allianz"
  }
];

const mockImoveisData = [
  {
    id: "1",
    clientName: "Fernanda Souza",
    cpf: "321.654.987-00",
    govPassword: "GOV321",
    requestDate: "2024-02-01",
    refundDate: "2024-03-01",
    refundValue: "R$ 8.500,00",
    consultantName: "Ricardo Alves",
    initialProcuration: true,
    selfieAttached: true,
    sectorNotes: "Processo concluído",
    bank: "Santander",
    insurer: "SulAmérica"
  }
];

export default function SetorAdministrativoGov() {
  const [activeFilter, setActiveFilter] = useState<GovFilter>("seguro");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Editable fields state
  const [editableNotes, setEditableNotes] = useState<{[key: string]: string}>({
    "1": "Documentação completa"
  });
  const [editableProcuration, setEditableProcuration] = useState<{[key: string]: boolean}>({
    "1": true
  });
  const [editableSelfie, setEditableSelfie] = useState<{[key: string]: boolean}>({
    "1": true
  });
  const [editableInsurance, setEditableInsurance] = useState<{[key: string]: boolean}>({
    "1": true
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [modalNotes, setModalNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const openNotesModal = (id: string, notes: string) => {
    setCurrentEditId(id);
    setModalNotes(notes || "");
    setIsEditingNotes(false);
    setIsModalOpen(true);
  };

  const saveNotes = () => {
    if (currentEditId) {
      setEditableNotes({ ...editableNotes, [currentEditId]: modalNotes });
    }
    setIsEditingNotes(false);
    setIsModalOpen(false);
  };

  const renderMetricCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Previsto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 50.000,00</div>
          <p className="text-xs text-muted-foreground">
            No mês
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Alcançado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 35.000,00</div>
          <p className="text-xs text-muted-foreground">
            Até o momento
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Meta do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 60.000,00</div>
          <p className="text-xs text-muted-foreground">
            Objetivo mensal
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Restante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 25.000,00</div>
          <p className="text-xs text-muted-foreground">
            Para atingir a meta
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderSeguroTable = () => (
    <div className="space-y-4 max-w-full">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200 max-w-full">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Seguro</h3>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input
                  placeholder="Buscar por CPF ou nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-6 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card className="max-w-full">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {mockSeguroData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline hover:scale-[1.01] transition-transform duration-200">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{item.clientName}</span>
                    <span className="text-xs text-muted-foreground">{item.cpf}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Senha GOV</Label>
                      <p className="text-sm">{item.govPassword}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Solicitação</Label>
                      <p className="text-sm">{item.requestDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Reembolso</Label>
                      <p className="text-sm">{item.refundDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Valor Reembolso</Label>
                      <p className="text-sm">{item.refundValue}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Consultor</Label>
                      <p className="text-sm">{item.consultantName}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Banco</Label>
                      <p className="text-sm">{item.bank}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Seguradora</Label>
                      <p className="text-sm">{item.insurer}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Procuração</Label>
                      <Select 
                        value={editableProcuration[item.id] ? "sim" : "nao"}
                        onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Selfie</Label>
                      <Select 
                        value={editableSelfie[item.id] ? "sim" : "nao"}
                        onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Observações do Setor</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNotesModal(item.id, editableNotes[item.id] || item.sectorNotes)}
                        className="w-full justify-start h-auto py-2 text-left"
                      >
                        <span className="truncate">
                          {(editableNotes[item.id] || item.sectorNotes)?.substring(0, 30) || "Adicionar..."}
                          {(editableNotes[item.id] || item.sectorNotes)?.length > 30 && "..."}
                        </span>
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Seguro</Label>
                      <Select 
                        value={editableInsurance[item.id] ? "sim" : "nao"}
                        onValueChange={(value) => setEditableInsurance({...editableInsurance, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );

  const renderContratoTable = () => (
    <div className="space-y-4 max-w-full">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200 max-w-full">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Contrato</h3>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input
                  placeholder="Buscar por CPF ou nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-6 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card className="max-w-full">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {mockContratoData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline hover:scale-[1.01] transition-transform duration-200">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{item.clientName}</span>
                    <span className="text-xs text-muted-foreground">{item.cpf}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Senha GOV</Label>
                      <p className="text-sm">{item.govPassword}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Solicitação</Label>
                      <p className="text-sm">{item.requestDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Prazo</Label>
                      <p className="text-sm">{item.deadline}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Consultor</Label>
                      <p className="text-sm">{item.consultantName}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Banco</Label>
                      <p className="text-sm">{item.bank}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Seguradora</Label>
                      <p className="text-sm">{item.insurer}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Procuração</Label>
                      <Select 
                        value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                        onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Selfie</Label>
                      <Select 
                        value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                        onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Observações do Setor</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNotesModal(item.id, editableNotes[item.id] || item.sectorNotes)}
                        className="w-full justify-start h-auto py-2 text-left"
                      >
                        <span className="truncate">
                          {(editableNotes[item.id] || item.sectorNotes)?.substring(0, 30) || "Adicionar..."}
                          {(editableNotes[item.id] || item.sectorNotes)?.length > 30 && "..."}
                        </span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );

  const renderDebitoTable = () => (
    <div className="space-y-4 max-w-full">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200 max-w-full">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Débito Automático</h3>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input
                  placeholder="Buscar por CPF ou nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-6 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card className="max-w-full">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {mockDebitoData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline hover:scale-[1.01] transition-transform duration-200">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{item.clientName}</span>
                    <span className="text-xs text-muted-foreground">{item.cpf}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Senha GOV</Label>
                      <p className="text-sm">{item.govPassword}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Solicitação</Label>
                      <p className="text-sm">{item.requestDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Prazo</Label>
                      <p className="text-sm">{item.deadline}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Consultor</Label>
                      <p className="text-sm">{item.consultantName}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Banco</Label>
                      <p className="text-sm">{item.bank}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Seguradora</Label>
                      <p className="text-sm">{item.insurer}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Procuração</Label>
                      <Select 
                        value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                        onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Selfie</Label>
                      <Select 
                        value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                        onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Observações do Setor</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNotesModal(item.id, editableNotes[item.id] || item.sectorNotes)}
                        className="w-full justify-start h-auto py-2 text-left"
                      >
                        <span className="truncate">
                          {(editableNotes[item.id] || item.sectorNotes)?.substring(0, 30) || "Adicionar..."}
                          {(editableNotes[item.id] || item.sectorNotes)?.length > 30 && "..."}
                        </span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );

  const renderImoveisTable = () => (
    <div className="space-y-4 max-w-full">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200 max-w-full">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Imóveis</h3>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input
                  placeholder="Buscar por CPF ou nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto px-6 py-3"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card className="max-w-full">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {mockImoveisData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline hover:scale-[1.01] transition-transform duration-200">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{item.clientName}</span>
                    <span className="text-xs text-muted-foreground">{item.cpf}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Senha GOV</Label>
                      <p className="text-sm">{item.govPassword}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Solicitação</Label>
                      <p className="text-sm">{item.requestDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data Reembolso</Label>
                      <p className="text-sm">{item.refundDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Valor Reembolso</Label>
                      <p className="text-sm">{item.refundValue}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Consultor</Label>
                      <p className="text-sm">{item.consultantName}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Banco</Label>
                      <p className="text-sm">{item.bank}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Seguradora</Label>
                      <p className="text-sm">{item.insurer}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Procuração</Label>
                      <Select 
                        value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                        onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Selfie</Label>
                      <Select 
                        value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                        onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Observações do Setor</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNotesModal(item.id, editableNotes[item.id] || item.sectorNotes)}
                        className="w-full justify-start h-auto py-2 text-left"
                      >
                        <span className="truncate">
                          {(editableNotes[item.id] || item.sectorNotes)?.substring(0, 30) || "Adicionar..."}
                          {(editableNotes[item.id] || item.sectorNotes)?.length > 30 && "..."}
                        </span>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 overflow-x-hidden max-w-full">
      <PageHeader 
        title="GOV" 
        subtitle="Gestão Operacional de Valores"
      />

      {renderMetricCards()}

      <GovFilterMenu 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {activeFilter === "seguro" && renderSeguroTable()}
      {activeFilter === "contrato" && renderContratoTable()}
      {activeFilter === "debito-automatico" && renderDebitoTable()}
      {activeFilter === "imoveis" && renderImoveisTable()}

      {/* Modal de Observações */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Observações do Setor</DialogTitle>
            <DialogDescription>
              {isEditingNotes ? "Edite as observações do setor abaixo." : "Visualize as observações do setor."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="observations">Observações</Label>
              {isEditingNotes ? (
                <Textarea
                  id="observations"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Digite as observações do setor..."
                  className="min-h-[200px] resize-none"
                />
              ) : (
                <div className="min-h-[200px] max-w-full p-3 border rounded-md bg-muted/50 text-sm break-words overflow-wrap-anywhere">
                  {modalNotes || "Nenhuma observação registrada."}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            {isEditingNotes ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingNotes(false);
                    setModalNotes(currentEditId ? (editableNotes[currentEditId] || "") : "");
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={saveNotes}>
                  Salvar Alterações
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Fechar
                </Button>
                <Button onClick={() => setIsEditingNotes(true)}>
                  Editar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
