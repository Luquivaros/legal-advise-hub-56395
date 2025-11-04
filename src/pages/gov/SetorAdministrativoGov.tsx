import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GovFilterMenu, GovFilter } from '@/components/GovFilterMenu';
import { Input } from '@/components/ui/input';
import { Search, Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Client } from '@/types';
import { ClientDetailCard } from '@/components/gov/ClientDetailCard';

// Mock data - Dados de exemplo dos clientes
const mockClientsData: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    status: "contracted",
    contractType: "Seguro",
    assignedConsultant: "Maria Santos",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    senhaGov: "GOV123",
    dataSolicitacao: "2024-01-15",
    dataReembolso: "2024-02-15",
    valorReembolso: 5000.00,
    nomeConsultor: "Maria Santos",
    procuracaoInicial: "sim",
    selfieAnexada: "sim",
    observacoes: "Documentação completa",
    seguro: "sim",
    banco: "Banco do Brasil",
    seguradora: "Porto Seguro"
  },
  {
    id: "2",
    name: "Ana Costa",
    email: "ana@example.com",
    phone: "(11) 98765-4322",
    cpf: "987.654.321-00",
    status: "negotiation",
    contractType: "Contrato",
    assignedConsultant: "Pedro Oliveira",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    senhaGov: "GOV456",
    dataSolicitacao: "2024-01-20",
    nomeConsultor: "Pedro Oliveira",
    procuracaoInicial: "nao",
    selfieAnexada: "sim",
    observacoes: "Aguardando assinatura do contrato",
    seguro: "nao",
    banco: "Caixa Econômica",
    seguradora: "Bradesco Seguros"
  },
  {
    id: "3",
    name: "Carlos Lima",
    email: "carlos@example.com",
    phone: "(11) 98765-4323",
    cpf: "456.789.123-00",
    status: "prospect",
    contractType: "Débito",
    assignedConsultant: "Julia Ferreira",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
    senhaGov: "GOV789",
    dataSolicitacao: "2024-01-25",
    nomeConsultor: "Julia Ferreira",
    procuracaoInicial: "sim",
    selfieAnexada: "nao",
    observacoes: "Pendente de selfie para conclusão do processo",
    seguro: "sim",
    banco: "Itaú",
    seguradora: "Allianz"
  },
  {
    id: "4",
    name: "Fernanda Souza",
    email: "fernanda@example.com",
    phone: "(11) 98765-4324",
    cpf: "321.654.987-00",
    status: "contracted",
    contractType: "Imóveis",
    assignedConsultant: "Ricardo Alves",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
    senhaGov: "GOV321",
    dataSolicitacao: "2024-02-01",
    dataReembolso: "2024-03-01",
    valorReembolso: 8500.00,
    nomeConsultor: "Ricardo Alves",
    procuracaoInicial: "sim",
    selfieAnexada: "sim",
    observacoes: "Processo concluído com sucesso. Todos os documentos enviados e aprovados.",
    seguro: "sim",
    banco: "Santander",
    seguradora: "SulAmérica"
  }
];

export default function SetorAdministrativoGov() {
  const [activeFilter, setActiveFilter] = useState<GovFilter>("seguro");
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>(mockClientsData);

  const handleUpdateClient = (clientId: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, ...updates } : client
    ));
  };

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

  return (
    <div className="space-y-6 overflow-x-hidden">
      <PageHeader 
        title="GOV" 
        subtitle="Gestão Operacional de Valores"
      />

      {renderMetricCards()}

      <GovFilterMenu 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Card de Busca */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">
                {activeFilter === "seguro" && "Seguro"}
                {activeFilter === "contrato" && "Contrato"}
                {activeFilter === "debito-automatico" && "Débito Automático"}
                {activeFilter === "imoveis" && "Imóveis"}
              </h3>
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

      {/* Tabela de Clientes */}
      <ClientDetailCard
        clients={clients}
        onUpdateClient={handleUpdateClient}
      />
    </div>
  );
}