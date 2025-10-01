import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageHeader from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { Target, Users, TrendingUp, Share2, Calendar, DollarSign, Trophy, Settings, UserCheck, Clock } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatPercentage } from "@/utils/formatters";

// Dados mock específicos para Supervisor Comercial
const consultores = [
  { 
    id: '1',
    nome: 'João Silva', 
    avatar: 'JS',
    leadsRecebidos: 87, 
    leadsNegociacao: 15,
    conversoes: 23, 
    taxaConversao: 26.4,
    comissao: 34500,
    metaMensal: 150000,
    vendidoMes: 138000,
    metaDiaria: 5000,
    vendidoDia: 4200,
    ticketMedio: 15000
  },
  { 
    id: '2',
    nome: 'Carlos Oliveira', 
    avatar: 'CO',
    leadsRecebidos: 62, 
    leadsNegociacao: 12,
    conversoes: 18, 
    taxaConversao: 29.0,
    comissao: 27000,
    metaMensal: 120000,
    vendidoMes: 108000,
    metaDiaria: 4000,
    vendidoDia: 3800,
    ticketMedio: 13500
  },
  { 
    id: '3',
    nome: 'Pedro Santos', 
    avatar: 'PS',
    leadsRecebidos: 75, 
    leadsNegociacao: 18,
    conversoes: 19, 
    taxaConversao: 25.3,
    comissao: 28500,
    metaMensal: 140000,
    vendidoMes: 114000,
    metaDiaria: 4500,
    vendidoDia: 3900,
    ticketMedio: 14200
  },
  { 
    id: '4',
    nome: 'Ana Costa', 
    avatar: 'AC',
    leadsRecebidos: 58, 
    leadsNegociacao: 10,
    conversoes: 16, 
    taxaConversao: 27.6,
    comissao: 24000,
    metaMensal: 110000,
    vendidoMes: 96000,
    metaDiaria: 3500,
    vendidoDia: 3200,
    ticketMedio: 12800
  }
];

const conversaoPorPlataforma = [
  { plataforma: 'Facebook', leads: 580, conversoes: 145, taxa: 25.0, cor: '#3b82f6' },
  { plataforma: 'Instagram', leads: 280, conversoes: 56, taxa: 20.0, cor: '#8b5cf6' },
  { plataforma: 'Google', leads: 420, conversoes: 67, taxa: 16.0, cor: '#ef4444' },
  { plataforma: 'TV', leads: 180, conversoes: 25, taxa: 13.9, cor: '#f59e0b' },
  { plataforma: 'Outros', leads: 150, conversoes: 18, taxa: 12.0, cor: '#10b981' },
];

const rendimentoSemanal = [
  { semana: 'Sem 1', joao: 32000, carlos: 28000, pedro: 30000, ana: 25000 },
  { semana: 'Sem 2', joao: 35000, carlos: 25000, pedro: 28000, ana: 22000 },
  { semana: 'Sem 3', joao: 38000, carlos: 30000, pedro: 32000, ana: 26000 },
  { semana: 'Sem 4', joao: 33000, carlos: 25000, pedro: 24000, ana: 23000 },
];

const rendimentoMensal = [
  { semana: 'Jan', joao: 138000, carlos: 108000, pedro: 114000, ana: 96000 },
  { semana: 'Fev', joao: 142000, carlos: 112000, pedro: 118000, ana: 98000 },
  { semana: 'Mar', joao: 135000, carlos: 105000, pedro: 110000, ana: 94000 },
  { semana: 'Abr', joao: 148000, carlos: 115000, pedro: 122000, ana: 101000 },
  { semana: 'Mai', joao: 138000, carlos: 108000, pedro: 114000, ana: 96000 },
];

const ticketMedioProdutos = [
  { produto: 'Financiamento de veículo', ticket: 18500, vendas: 45 },
  { produto: 'Financiamento de Imóvel', ticket: 25000, vendas: 23 },
  { produto: 'Empréstimo', ticket: 8500, vendas: 78 },
];

export default function SupervisorComercialDashboard() {
  const [selectedConsultor, setSelectedConsultor] = useState<string>('');
  const [novaMeta, setNovaMeta] = useState<string>('');
  const [viewType, setViewType] = useState<'semanal' | 'mensal'>('semanal');
  
  // Calcular totais da equipe
  const totalLeadsRecebidos = consultores.reduce((acc, c) => acc + c.leadsRecebidos, 0);
  const totalLeadsNegociacao = consultores.reduce((acc, c) => acc + c.leadsNegociacao, 0);
  const totalConversoes = consultores.reduce((acc, c) => acc + c.conversoes, 0);
  const totalComissao = consultores.reduce((acc, c) => acc + c.comissao, 0);
  const totalVendidoDia = consultores.reduce((acc, c) => acc + c.vendidoDia, 0);
  const totalMetaDiaria = consultores.reduce((acc, c) => acc + c.metaDiaria, 0);
  const totalVendidoMes = consultores.reduce((acc, c) => acc + c.vendidoMes, 0);
  const totalMetaMensal = consultores.reduce((acc, c) => acc + c.metaMensal, 0);
  const taxaConversaoMedia = totalConversoes / totalLeadsRecebidos * 100;

  const currentData = viewType === 'semanal' ? rendimentoSemanal : rendimentoMensal;

  const handleDefinirMeta = () => {
    // Aqui implementaria a lógica para definir meta
    console.log(`Meta ${novaMeta} definida para ${selectedConsultor}`);
    setSelectedConsultor('');
    setNovaMeta('');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Supervisor Comercial" 
        subtitle="Gestão da equipe comercial e análise de performance" 
      />
      
      {/* Métricas Gerais da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          value={totalLeadsRecebidos.toString()}
          label="Leads Recebidos"
          trend={{
            value: "+18.7%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={totalConversoes.toString()}
          label="Conversões Totais"
          trend={{
            value: "+25.0%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={formatPercentage(taxaConversaoMedia)}
          label="Taxa Média da Equipe"
          trend={{
            value: "+1.8%",
            isPositive: true
          }}
        />
      </div>

      {/* Metas Diárias e Mensais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meta do Dia */}
        <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-light" />
              Meta do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor feito no dia</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(totalVendidoDia)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Meta diária</p>
                <p className="text-xl font-semibold">{formatCurrency(totalMetaDiaria)}</p>
              </div>
            </div>
            <Progress value={(totalVendidoDia / totalMetaDiaria) * 100} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Restante: {formatCurrency(Math.max(0, totalMetaDiaria - totalVendidoDia))}
              </span>
              <span className="font-medium">
                {((totalVendidoDia / totalMetaDiaria) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Meta do Mês */}
        <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-light" />
              Meta do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor feito no mês</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(totalVendidoMes)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Meta mensal</p>
                <p className="text-xl font-semibold">{formatCurrency(totalMetaMensal)}</p>
              </div>
            </div>
            <Progress value={(totalVendidoMes / totalMetaMensal) * 100} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Restante: {formatCurrency(Math.max(0, totalMetaMensal - totalVendidoMes))}
              </span>
              <span className="font-medium">
                {((totalVendidoMes / totalMetaMensal) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Individual da Equipe */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-light" />
            Performance Individual da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Consultor</th>
                  <th className="text-center p-4 font-semibold">Leads Recebidos</th>
                  <th className="text-center p-4 font-semibold">Taxa de Conversão</th>
                  <th className="text-center p-4 font-semibold">Meta Mensal</th>
                  <th className="text-center p-4 font-semibold">Valor Feito</th>
                  <th className="text-center p-4 font-semibold">Valor Restante</th>
                  <th className="text-center p-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultores.map((consultor) => (
                  <tr key={consultor.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {consultor.avatar}
                          </span>
                        </div>
                        <span className="font-medium">{consultor.nome}</span>
                      </div>
                    </td>
                    <td className="text-center p-4">{consultor.leadsRecebidos}</td>
                    <td className="text-center p-4">
                      <span className="font-semibold text-primary">{formatPercentage(consultor.taxaConversao)}</span>
                    </td>
                    <td className="text-center p-4">{formatCurrency(consultor.metaMensal)}</td>
                    <td className="text-center p-4">{formatCurrency(consultor.vendidoMes)}</td>
                    <td className="text-center p-4">{formatCurrency(Math.max(0, consultor.metaMensal - consultor.vendidoMes))}</td>
                    <td className="text-center p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Definir Meta
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Definir Meta para {consultor.nome}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="meta">Nova Meta (R$)</Label>
                              <Input
                                id="meta"
                                type="number"
                                placeholder="Ex: 150000"
                                value={novaMeta}
                                onChange={(e) => setNovaMeta(e.target.value)}
                              />
                            </div>
                            <Button onClick={handleDefinirMeta} className="w-full">
                              Definir Meta
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Taxa de Conversão por Plataforma */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Share2 className="w-5 h-5 text-orange-light" />
            Taxa de Conversão por Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {conversaoPorPlataforma.map((plataforma, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="space-y-2">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: plataforma.cor }}
                  >
                    {plataforma.plataforma.charAt(0)}
                  </div>
                  <h4 className="font-semibold">{plataforma.plataforma}</h4>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">{formatPercentage(plataforma.taxa)}</p>
                    <p className="text-sm text-muted-foreground">
                      {plataforma.conversoes}/{plataforma.leads} leads
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket Médio por Produto */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-light" />
            Ticket Médio por Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticketMedioProdutos.map((produto, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{produto.produto}</p>
                  <p className="text-sm text-muted-foreground">{produto.vendas} vendas realizadas</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{formatCurrency(produto.ticket)}</p>
                  <p className="text-sm text-muted-foreground">Ticket médio</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="space-y-6">
        {/* Rendimento com Controle de Visualização */}
        <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-light" />
                Rendimento {viewType === 'semanal' ? 'Semanal' : 'Mensal'} por Consultor
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={viewType === 'semanal' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('semanal')}
                >
                  Semanal
                </Button>
                <Button 
                  variant={viewType === 'mensal' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewType('mensal')}
                >
                  Mensal
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="semana" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="joao" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="João Silva"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="carlos" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Carlos Oliveira"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pedro" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Pedro Santos"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ana" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Ana Costa"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}