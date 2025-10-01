import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NegotiationService } from '@/api/services/negotiationService';
import { Negotiation, NegotiationFilters } from '@/types';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MetricCard } from '@/components/ui/metric-card';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Eye, 
  Filter,
  Calendar,
  User,
  DollarSign,
  Clock,
  Users,
  Phone,
  Trophy,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Dados mock para as negociações
const negociacoesMock = [
  {
    id: 1,
    cliente: 'João Silva Santos',
    consultor: 'Maria Santos',
    produto: 'Revisional',
    valorProposto: 4500,
    status: 'Em negociação',
    tempoNegociacao: '3 dias',
    ultimoContato: '2024-01-15 14:30',
    horarioAgendado: '16/01/2024 10:00',
    observacoes: 'Cliente interessado, aguardando análise'
  },
  {
    id: 2,
    cliente: 'Ana Costa Lima',
    consultor: 'João Silva',
    produto: 'Consignado',
    valorProposto: 3200,
    status: 'Proposta enviada',
    tempoNegociacao: '1 dia',
    ultimoContato: '2024-01-15 16:45',
    horarioAgendado: '16/01/2024 14:30',
    observacoes: 'Proposta enviada via WhatsApp'
  },
  {
    id: 3,
    cliente: 'Carlos Pereira',
    consultor: 'Ana Costa',
    produto: 'Financiamento',
    valorProposto: 5800,
    status: 'Contratado',
    tempoNegociacao: '5 dias',
    ultimoContato: '2024-01-15 10:15',
    horarioAgendado: '17/01/2024 09:00',
    observacoes: 'Contrato assinado hoje'
  }
];

// Dados mock para ligações do dia
const ligacoesDia = [
  { horario: '08:30', consultor: 'Maria Santos', cliente: 'João Silva Santos', duracao: '12min' },
  { horario: '09:15', consultor: 'João Silva', cliente: 'Ana Costa Lima', duracao: '8min' },
  { horario: '10:00', consultor: 'Ana Costa', cliente: 'Carlos Pereira', duracao: '15min' },
  { horario: '11:30', consultor: 'Maria Santos', cliente: 'Pedro Oliveira', duracao: '20min' },
  { horario: '14:00', consultor: 'João Silva', cliente: 'Lucia Ferreira', duracao: '18min' },
];

// Dados mock para ranking mensal
const rankingMensal = [
  { posicao: 1, consultor: 'Maria Santos', vendas: 12, valor: 54000 },
  { posicao: 2, consultor: 'João Silva', vendas: 10, valor: 48000 },
  { posicao: 3, consultor: 'Ana Costa', vendas: 8, valor: 36000 },
];

const statusColors = {
  'Em negociação': 'bg-yellow-100 text-yellow-800',
  'Proposta enviada': 'bg-blue-100 text-blue-800',
  'Contratado': 'bg-green-100 text-green-800',
  'Cancelado': 'bg-red-100 text-red-800'
};

export default function SupervisorJuridicoNegotiations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Métricas calculadas
  const metaDiaria = 2500;
  const valorRealizadoDia = 1720;
  const montanteRestanteDia = metaDiaria - valorRealizadoDia;
  const leadsRecebidos = 24;
  const metaMensal = 35000;
  const valorRealizadoMes = 25800;
  const montanteRestanteMes = metaMensal - valorRealizadoMes;
  
  const negociacoesAbertas = negociacoesMock.filter(n => n.status !== 'Contratado' && n.status !== 'Cancelado').length;
  const negociacoesConcluidas = negociacoesMock.filter(n => n.status === 'Contratado').length;
  const percentualMeta = (valorRealizadoDia / metaDiaria) * 100;
  const negociacoesAtivas = negociacoesMock.filter(n => n.status === 'Em negociação').length;
  
  const ticketMedio = 4200;
  const projecaoIndividual = rankingMensal.reduce((acc, consultor) => acc + (consultor.valor / consultor.vendas), 0) / rankingMensal.length;

  const filteredNegociacoes = negociacoesMock.filter(negociacao => {
    const matchesSearch = negociacao.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         negociacao.consultor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || negociacao.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Supervisão Jurídica" 
        subtitle="Supervisione análises contratuais e validações jurídicas da equipe" 
      />

      {/* Acompanhamento de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Negociações em aberto"
          value={negociacoesAbertas.toString()}
          trend={{ value: "5%", isPositive: true }}
        />
        <MetricCard
          label="Negociações concluídas"
          value={negociacoesConcluidas.toString()}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          label="percentual meta do dia"
          value={`${percentualMeta.toFixed(1)}%`}
          trend={{ value: "12%", isPositive: true }}
        />
        <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
          {/* Glassmorphism texture overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          
          {/* Content Container */}
          <div className="relative z-10">
            <div className="mb-3">
              <p className="text-xs font-medium text-white/90 uppercase tracking-wide drop-shadow-sm">Valor obtido no dia</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white drop-shadow-lg">R$ {valorRealizadoDia.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                <span className="text-xs text-white/90 font-medium drop-shadow-sm">+15% desde ontem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projeção Diária */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Projeção do Dia
          </CardTitle>
          <p className="text-sm text-muted-foreground">Análises e projeções do dia</p>
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
                  <span className="text-xs text-trend-up font-medium">+12% desde ontem</span>
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
                  <span className="text-xs text-orange-light font-medium">+ 5% desde ontem</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Mensal */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Ranking do Setor Jurídico
          </CardTitle>
          <p className="text-sm text-muted-foreground">Performance dos consultores do setor</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 1º Colocado - Destacado */}
            <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
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
                    <p className="text-xs text-white/90 drop-shadow-sm">Consultor Jurídico Sênior</p>
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
                      <p className="text-xs text-muted-foreground">Consultor Jurídico</p>
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
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-light" />
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
                  <th className="text-left p-4 font-semibold">Produto em negociação</th>
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
                    <td className="p-4">{negociacao.produto}</td>
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