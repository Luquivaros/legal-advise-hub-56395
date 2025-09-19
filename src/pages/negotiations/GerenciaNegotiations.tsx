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
import { 
  Search, 
  Eye, 
  Filter,
  Calendar,
  User,
  DollarSign,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle,
  Users,
  FileText,
  Download,
  Trophy
} from 'lucide-react';

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800', 
  'calculated': 'bg-purple-100 text-purple-800',
  'proposal-sent': 'bg-orange-100 text-orange-800',
  'contracted': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'chargeback': 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  'pending': 'Pendente',
  'in-progress': 'Em Andamento', 
  'calculated': 'Calculado',
  'proposal-sent': 'Proposta Enviada',
  'contracted': 'Contratado',
  'cancelled': 'Cancelado',
  'chargeback': 'Chargeback'
};

export default function GerenciaNegotiations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<NegotiationFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadNegotiations();
  }, [filters]);

  const loadNegotiations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await NegotiationService.getNegotiations(
        user.id,
        user.role,
        { ...filters, search: searchTerm }
      );
      
      if (response.success && response.data) {
        setNegotiations(response.data.data);
      } else {
        toast({
          title: "Erro",
          description: response.error || "Erro ao carregar negociações",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro interno do sistema",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      setFilters(prev => ({ ...prev, status: undefined }));
    } else {
      setFilters(prev => ({ ...prev, status: [status as any] }));
    }
  };

  const formatCurrency = (value?: number) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Métricas consolidadas
  const totalNegotiations = negotiations.length;
  const contracted = negotiations.filter(n => n.status === 'contracted').length;
  const pending = negotiations.filter(n => n.status === 'pending').length;
  const totalRevenue = negotiations
    .filter(n => n.status === 'contracted')
    .reduce((sum, n) => sum + (n.totalValue || 0), 0);

  const conversionRate = totalNegotiations > 0 ? (contracted / totalNegotiations) * 100 : 0;

  // Dados mock para métricas
  const setorJuridico = {
    negociacoesAbertas: 18,
    negociacoesConcluidas: 8,
    percentualMeta: 68.8,
    valorObtidoDia: 1720,
    rankingMensal: [
      { posicao: 1, consultor: 'Maria Santos', vendas: 12, valor: 54000 },
      { posicao: 2, consultor: 'João Silva', vendas: 10, valor: 48000 },
      { posicao: 3, consultor: 'Ana Costa', vendas: 8, valor: 36000 },
    ],
    ticketMedio: 4200,
    projecaoIndividual: 4600
  };

  const setorComercial = {
    negociacoesAbertas: 23,
    negociacoesConcluidas: 12,
    percentualMeta: 82.3,
    valorObtidoDia: 2340,
    rankingMensal: [
      { posicao: 1, consultor: 'Carlos Lima', vendas: 15, valor: 67500 },
      { posicao: 2, consultor: 'Patricia Mendes', vendas: 13, valor: 58500 },
      { posicao: 3, consultor: 'Roberto Santos', vendas: 11, valor: 49500 },
    ],
    ticketMedio: 4500,
    projecaoIndividual: 5200
  };

  const valorTotalObtido = setorJuridico.valorObtidoDia + setorComercial.valorObtidoDia;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Visão Geral das Negociações" 
        subtitle="Acompanhe o desempenho global de vendas e análises jurídicas" 
      />

      {/* Métricas do Setor Jurídico */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Setor Jurídico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Negociações em aberto"
            value={setorJuridico.negociacoesAbertas.toString()}
            trend={{ value: "5%", isPositive: true }}
          />
          <MetricCard
            label="Negociações concluídas"
            value={setorJuridico.negociacoesConcluidas.toString()}
            trend={{ value: "8%", isPositive: true }}
          />
          <MetricCard
            label="Percentual alcançado da meta do dia"
            value={`${setorJuridico.percentualMeta.toFixed(1)}%`}
            trend={{ value: "12%", isPositive: true }}
          />
          <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30 shadow-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white/90 uppercase tracking-wide drop-shadow-sm">Valor obtido no dia</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white drop-shadow-lg">R$ {setorJuridico.valorObtidoDia.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                  <span className="text-xs text-white/90 font-medium drop-shadow-sm">+15% desde ontem</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas do Setor Comercial */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Setor Comercial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Negociações em aberto"
            value={setorComercial.negociacoesAbertas.toString()}
            trend={{ value: "3%", isPositive: true }}
          />
          <MetricCard
            label="Negociações concluídas"
            value={setorComercial.negociacoesConcluidas.toString()}
            trend={{ value: "12%", isPositive: true }}
          />
          <MetricCard
            label="Percentual alcançado da meta do dia"
            value={`${setorComercial.percentualMeta.toFixed(1)}%`}
            trend={{ value: "18%", isPositive: true }}
          />
          <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30 shadow-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white/90 uppercase tracking-wide drop-shadow-sm">Valor obtido no dia</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white drop-shadow-lg">R$ {setorComercial.valorObtidoDia.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                  <span className="text-xs text-white/90 font-medium drop-shadow-sm">+22% desde ontem</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Consolidado - Valor Total da Empresa */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Consolidado Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm">
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30 shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white/90 uppercase tracking-wide drop-shadow-sm">Valor Total Obtido</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white drop-shadow-lg">R$ {valorTotalObtido.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                  <span className="text-sm text-white/90 font-medium drop-shadow-sm">Soma dos setores jurídico + comercial</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>

      {/* Projeções dos Setores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projeção Setor Jurídico */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Projeção do Dia - Setor Jurídico
            </CardTitle>
            <p className="text-sm text-muted-foreground">Análises e projeções do setor jurídico</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-2xl font-bold text-foreground">R$ {setorJuridico.ticketMedio.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-trend-up rounded-full"></div>
                    <span className="text-xs text-trend-up font-medium">+12% desde ontem</span>
                  </div>
                </div>
              </div>

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
                  <p className="text-2xl font-bold text-foreground">R$ {setorJuridico.projecaoIndividual.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-light rounded-full"></div>
                    <span className="text-xs text-orange-light font-medium">+ 5% desde ontem</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projeção Setor Comercial */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Projeção do Dia - Setor Comercial
            </CardTitle>
            <p className="text-sm text-muted-foreground">Análises e projeções do setor comercial</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-2xl font-bold text-foreground">R$ {setorComercial.ticketMedio.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-trend-up rounded-full"></div>
                    <span className="text-xs text-trend-up font-medium">+18% desde ontem</span>
                  </div>
                </div>
              </div>

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
                  <p className="text-2xl font-bold text-foreground">R$ {setorComercial.projecaoIndividual.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-light rounded-full"></div>
                    <span className="text-xs text-orange-light font-medium">+ 8% desde ontem</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rankings dos Setores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking Setor Jurídico */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Ranking do Setor Jurídico
            </CardTitle>
            <p className="text-sm text-muted-foreground">Performance dos consultores jurídicos</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                      <span className="text-sm font-bold text-white drop-shadow-sm">1°</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white drop-shadow-sm">{setorJuridico.rankingMensal[0].consultor}</h3>
                      <p className="text-xs text-white/90 drop-shadow-sm">Consultor Jurídico Sênior</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white drop-shadow-lg">{setorJuridico.rankingMensal[0].vendas}</p>
                        <p className="text-xs text-white/90 font-medium drop-shadow-sm">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white drop-shadow-lg">R$ {setorJuridico.rankingMensal[0].valor.toLocaleString()}</p>
                        <p className="text-xs text-white/90 font-medium drop-shadow-sm">Valor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {setorJuridico.rankingMensal.slice(1).map((consultor) => (
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

        {/* Ranking Setor Comercial */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Ranking do Setor Comercial
            </CardTitle>
            <p className="text-sm text-muted-foreground">Performance dos consultores comerciais</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                      <span className="text-sm font-bold text-white drop-shadow-sm">1°</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white drop-shadow-sm">{setorComercial.rankingMensal[0].consultor}</h3>
                      <p className="text-xs text-white/90 drop-shadow-sm">Consultor Comercial Sênior</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white drop-shadow-lg">{setorComercial.rankingMensal[0].vendas}</p>
                        <p className="text-xs text-white/90 font-medium drop-shadow-sm">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white drop-shadow-lg">R$ {setorComercial.rankingMensal[0].valor.toLocaleString()}</p>
                        <p className="text-xs text-white/90 font-medium drop-shadow-sm">Valor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {setorComercial.rankingMensal.slice(1).map((consultor) => (
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
      </div>
    </div>
  );
}