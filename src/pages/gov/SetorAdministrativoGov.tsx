import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GovFilterMenu, GovFilter } from '@/components/GovFilterMenu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <Card>
      <CardHeader>
        <CardTitle>Seguros</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cliente, CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Senha GOV</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Data Reembolso</TableHead>
                <TableHead>Valor Reembolso</TableHead>
                <TableHead>Consultor</TableHead>
                <TableHead>Procuração</TableHead>
                <TableHead>Selfie</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Seguro</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSeguroData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.clientName}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.govPassword}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.refundDate}</TableCell>
                  <TableCell>{item.refundValue}</TableCell>
                  <TableCell>{item.consultantName}</TableCell>
                  <TableCell>{item.initialProcuration ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.selfieAttached ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.sectorNotes}</TableCell>
                  <TableCell>{item.hasInsurance ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderContratoTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contratos</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cliente, CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Senha GOV</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Consultor</TableHead>
                <TableHead>Procuração</TableHead>
                <TableHead>Selfie</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContratoData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.clientName}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.govPassword}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell>{item.consultantName}</TableCell>
                  <TableCell>{item.initialProcuration ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.selfieAttached ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.sectorNotes}</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderDebitoTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Débito Automático</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cliente, CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Senha GOV</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Consultor</TableHead>
                <TableHead>Procuração</TableHead>
                <TableHead>Selfie</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDebitoData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.clientName}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.govPassword}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell>{item.consultantName}</TableCell>
                  <TableCell>{item.initialProcuration ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.selfieAttached ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.sectorNotes}</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderImoveisTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Imóveis</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar cliente, CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Senha GOV</TableHead>
                <TableHead>Data Solicitação</TableHead>
                <TableHead>Data Reembolso</TableHead>
                <TableHead>Valor Reembolso</TableHead>
                <TableHead>Consultor</TableHead>
                <TableHead>Procuração</TableHead>
                <TableHead>Selfie</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockImoveisData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.clientName}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.govPassword}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.refundDate}</TableCell>
                  <TableCell>{item.refundValue}</TableCell>
                  <TableCell>{item.consultantName}</TableCell>
                  <TableCell>{item.initialProcuration ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.selfieAttached ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.sectorNotes}</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>{item.insurer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
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
