import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GovFilterMenu, GovFilter } from '@/components/GovFilterMenu';
import { Input } from '@/components/ui/input';
import { Search, Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

  const renderMetricCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="space-y-4">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
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

      {/* Tabela com scroll horizontal */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome do Cliente</TableHead>
                <TableHead className="whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">Senha GOV</TableHead>
                <TableHead className="whitespace-nowrap">Data Solicitação</TableHead>
                <TableHead className="whitespace-nowrap">Data Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Valor Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Consultor</TableHead>
                <TableHead className="whitespace-nowrap">Procuração</TableHead>
                <TableHead className="whitespace-nowrap">Selfie</TableHead>
                <TableHead className="whitespace-nowrap min-w-[200px]">Observações</TableHead>
                <TableHead className="whitespace-nowrap">Seguro</TableHead>
                <TableHead className="whitespace-nowrap">Banco</TableHead>
                <TableHead className="whitespace-nowrap">Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSeguroData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium whitespace-nowrap">{item.clientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.cpf}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.govPassword}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.requestDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.refundDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.refundValue}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.consultantName}</TableCell>
                  <TableCell>
                    <Select 
                      value={editableProcuration[item.id] ? "sim" : "nao"}
                      onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editableSelfie[item.id] ? "sim" : "nao"}
                      onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            value={editableNotes[item.id] || item.sectorNotes}
                            onChange={(e) => setEditableNotes({...editableNotes, [item.id]: e.target.value})}
                            className="w-full truncate"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{editableNotes[item.id] || item.sectorNotes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editableInsurance[item.id] ? "sim" : "nao"}
                      onValueChange={(value) => setEditableInsurance({...editableInsurance, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.bank}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContratoTable = () => (
    <div className="space-y-4">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
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

      {/* Tabela com scroll horizontal */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome do Cliente</TableHead>
                <TableHead className="whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">Senha GOV</TableHead>
                <TableHead className="whitespace-nowrap">Data Solicitação</TableHead>
                <TableHead className="whitespace-nowrap">Prazo</TableHead>
                <TableHead className="whitespace-nowrap">Consultor</TableHead>
                <TableHead className="whitespace-nowrap">Procuração</TableHead>
                <TableHead className="whitespace-nowrap">Selfie</TableHead>
                <TableHead className="whitespace-nowrap min-w-[200px]">Observações</TableHead>
                <TableHead className="whitespace-nowrap">Banco</TableHead>
                <TableHead className="whitespace-nowrap">Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContratoData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium whitespace-nowrap">{item.clientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.cpf}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.govPassword}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.requestDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.deadline}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.consultantName}</TableCell>
                  <TableCell>
                    <Select 
                      value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                      onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                      onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            value={editableNotes[item.id] || item.sectorNotes}
                            onChange={(e) => setEditableNotes({...editableNotes, [item.id]: e.target.value})}
                            className="w-full truncate"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{editableNotes[item.id] || item.sectorNotes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.bank}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDebitoTable = () => (
    <div className="space-y-4">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
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

      {/* Tabela com scroll horizontal */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome do Cliente</TableHead>
                <TableHead className="whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">Senha GOV</TableHead>
                <TableHead className="whitespace-nowrap">Data Solicitação</TableHead>
                <TableHead className="whitespace-nowrap">Prazo</TableHead>
                <TableHead className="whitespace-nowrap">Consultor</TableHead>
                <TableHead className="whitespace-nowrap">Procuração</TableHead>
                <TableHead className="whitespace-nowrap">Selfie</TableHead>
                <TableHead className="whitespace-nowrap min-w-[200px]">Observações</TableHead>
                <TableHead className="whitespace-nowrap">Banco</TableHead>
                <TableHead className="whitespace-nowrap">Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDebitoData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium whitespace-nowrap">{item.clientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.cpf}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.govPassword}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.requestDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.deadline}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.consultantName}</TableCell>
                  <TableCell>
                    <Select 
                      value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                      onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                      onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            value={editableNotes[item.id] || item.sectorNotes}
                            onChange={(e) => setEditableNotes({...editableNotes, [item.id]: e.target.value})}
                            className="w-full truncate"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{editableNotes[item.id] || item.sectorNotes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.bank}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderImoveisTable = () => (
    <div className="space-y-4">
      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
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

      {/* Tabela com scroll horizontal */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome do Cliente</TableHead>
                <TableHead className="whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">Senha GOV</TableHead>
                <TableHead className="whitespace-nowrap">Data Solicitação</TableHead>
                <TableHead className="whitespace-nowrap">Data Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Valor Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Consultor</TableHead>
                <TableHead className="whitespace-nowrap">Procuração</TableHead>
                <TableHead className="whitespace-nowrap">Selfie</TableHead>
                <TableHead className="whitespace-nowrap min-w-[200px]">Observações</TableHead>
                <TableHead className="whitespace-nowrap">Banco</TableHead>
                <TableHead className="whitespace-nowrap">Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockImoveisData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium whitespace-nowrap">{item.clientName}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.cpf}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.govPassword}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.requestDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.refundDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.refundValue}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.consultantName}</TableCell>
                  <TableCell>
                    <Select 
                      value={editableProcuration[item.id] !== undefined ? (editableProcuration[item.id] ? "sim" : "nao") : (item.initialProcuration ? "sim" : "nao")}
                      onValueChange={(value) => setEditableProcuration({...editableProcuration, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editableSelfie[item.id] !== undefined ? (editableSelfie[item.id] ? "sim" : "nao") : (item.selfieAttached ? "sim" : "nao")}
                      onValueChange={(value) => setEditableSelfie({...editableSelfie, [item.id]: value === "sim"})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            value={editableNotes[item.id] || item.sectorNotes}
                            onChange={(e) => setEditableNotes({...editableNotes, [item.id]: e.target.value})}
                            className="w-full truncate"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{editableNotes[item.id] || item.sectorNotes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.bank}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.insurer}</TableCell>
                </TableRow>
              ))}
             </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
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
    </div>
  );
}
