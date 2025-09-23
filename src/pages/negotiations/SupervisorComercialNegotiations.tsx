import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { 
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

export default function SupervisorComercialNegotiations() {

  // Dados simulados baseados na estrutura do supervisor jurídico
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Simulação de dados comerciais
  const metaDiaria = 50000;
  const valorRealizadoDia = 45670;
  const leadsRecebidos = 32;
  const metaMensal = 80000;
  const valorRealizadoMes = 68500;
  
  // Dados mock para as negociações comerciais
  const negociacoesMock = [
    {
      id: '1',
      cliente: 'Maria Silva Santos',
      consultor: 'João Santos',
      origem: 'Facebook',
      valorProposto: 15000,
      status: 'Em Análise',
      horarioAgendado: '2024-01-15 14:30',
      observacoes: 'Cliente interessado em prazo de 24 meses'
    },
    {
      id: '2',
      cliente: 'Carlos Eduardo Lima',
      consultor: 'Ana Costa',
      origem: 'Instagram',
      valorProposto: 32000,
      status: 'Aguardando Documentos',
      horarioAgendado: '2024-01-15 15:00',
      observacoes: 'Faltam comprovantes de renda'
    },
    {
      id: '3',
      cliente: 'Fernanda Oliveira',
      consultor: 'Pedro Lima',
      origem: 'Google',
      valorProposto: 25000,
      status: 'Aprovado',
      horarioAgendado: '2024-01-15 16:30',
      observacoes: 'Contrato assinado, aguardando liberação'
    },
    {
      id: '4',
      cliente: 'Roberto Silva',
      consultor: 'Mariana Santos',
      origem: 'TV',
      valorProposto: 18500,
      status: 'Em Análise',
      horarioAgendado: '2024-01-16 09:00',
      observacoes: 'Cliente compareceu presencialmente'
    },
    {
      id: '5',
      cliente: 'Luciana Costa',
      consultor: 'Paulo Oliveira',
      origem: 'Outros',
      valorProposto: 42000,
      status: 'Proposta Enviada',
      horarioAgendado: '2024-01-16 11:30',
      observacoes: 'Aguardando resposta do cliente'
    }
  ];

  // Dados mock para ranking mensal comercial
  const rankingMensal = [
    { posicao: 1, consultor: 'João Santos', vendas: 18, valor: 78000 },
    { posicao: 2, consultor: 'Ana Costa', vendas: 15, valor: 65000 },
    { posicao: 3, consultor: 'Pedro Lima', vendas: 12, valor: 52000 },
  ];

  // Métricas calculadas
  const negociacoesAbertas = negociacoesMock.filter(n => n.status !== 'Aprovado' && n.status !== 'Cancelado').length;
  const negociacoesConcluidas = negociacoesMock.filter(n => n.status === 'Aprovado').length;
  const percentualMeta = (valorRealizadoDia / metaDiaria) * 100;
  
  const ticketMedio = 28500;
  const projecaoIndividual = rankingMensal.reduce((acc, consultor) => acc + (consultor.valor / consultor.vendas), 0) / rankingMensal.length;

  const filteredNegociacoes = negociacoesMock.filter(neg => {
    const matchesBusca = neg.cliente.toLowerCase().includes(busca.toLowerCase()) ||
                        neg.consultor.toLowerCase().includes(busca.toLowerCase());
    const matchesStatus = filtroStatus === 'todos' || neg.status === filtroStatus;
    return matchesBusca && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Supervisão Comercial" 
        subtitle="Gerencie e monitore as negociações da equipe comercial" 
      />

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Negociações em aberto"
          value={negociacoesAbertas.toString()}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          label="Negociações concluídas"
          value={negociacoesConcluidas.toString()}
          trend={{ value: "15%", isPositive: true }}
        />
        <MetricCard
          label="Percentual meta do dia"
          value={`${percentualMeta.toFixed(1)}%`}
          trend={{ value: "12%", isPositive: true }}
        />
        <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
          {/* Glassmorphism texture overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          
          {/* Content Container */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-white/90 uppercase tracking-wide drop-shadow-sm">Valor obtido no dia</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white drop-shadow-lg">R$ {valorRealizadoDia.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                <span className="text-xs text-white/90 font-medium drop-shadow-sm">+18% desde ontem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projeção do Dia */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Projeção do Dia
          </CardTitle>
          <p className="text-sm text-muted-foreground">Análises e projeções comerciais do dia</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grid de métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ticket Médio */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ticket Médio</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">R$ {ticketMedio.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-trend-up rounded-full"></div>
                  <span className="text-xs text-trend-up font-medium">+22% desde ontem</span>
                </div>
              </div>
            </div>

            {/* Projeções Individuais */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Projeções</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">R$ {projecaoIndividual.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-light rounded-full"></div>
                  <span className="text-xs text-orange-light font-medium">+ 8% desde ontem</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Mensal */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Ranking do Setor Comercial
          </CardTitle>
          <p className="text-sm text-muted-foreground">Performance dos consultores comerciais</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 1º Colocado - Destacado */}
            <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
              {/* Glassmorphism texture overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                    <span className="text-sm font-bold text-white drop-shadow-sm">1°</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white drop-shadow-sm">{rankingMensal[0].consultor}</h3>
                    <p className="text-xs text-white/90 drop-shadow-sm">Consultor Comercial Sênior</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white drop-shadow-lg">{rankingMensal[0].vendas}</p>
                      <p className="text-xs text-white/90 font-medium drop-shadow-sm">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white drop-shadow-lg">R$ {rankingMensal[0].valor.toLocaleString()}</p>
                      <p className="text-xs text-white/90 font-medium drop-shadow-sm">Valor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demais colocações */}
            {rankingMensal.slice(1).map((consultor) => (
              <div key={consultor.posicao} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors hover:from-white/15 hover:to-muted/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center border border-border/30">
                      <span className="text-sm font-semibold text-muted-foreground">{consultor.posicao}°</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{consultor.consultor}</h3>
                      <p className="text-xs text-muted-foreground">Consultor Comercial</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground">{consultor.vendas}</p>
                        <p className="text-xs text-muted-foreground font-medium">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground">R$ {consultor.valor.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground font-medium">Valor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Negociações */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Lista de Negociações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Nome do cliente</th>
                  <th className="text-left p-4 font-semibold">Nome do consultor</th>
                  <th className="text-center p-4 font-semibold">Origem</th>
                  <th className="text-center p-4 font-semibold">Valor proposto</th>
                  <th className="text-center p-4 font-semibold">Horário agendado</th>
                  <th className="text-left p-4 font-semibold">Observações registradas</th>
                </tr>
              </thead>
              <tbody>
                {filteredNegociacoes.map((negociacao) => (
                  <tr key={negociacao.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4">
                      <span className="font-medium">{negociacao.cliente}</span>
                    </td>
                    <td className="p-4">{negociacao.consultor}</td>
                    <td className="text-center p-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {negociacao.origem}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <span className="font-semibold text-green-600">
                        R$ {negociacao.valorProposto.toLocaleString()}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <span className="text-sm font-medium">{negociacao.horarioAgendado.split(' ')[1]}</span>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-muted-foreground truncate" title={negociacao.observacoes}>
                          {negociacao.observacoes}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}