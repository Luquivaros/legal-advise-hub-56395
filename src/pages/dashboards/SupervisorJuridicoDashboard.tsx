import { useState } from 'react';
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Trophy } from "lucide-react";

// Dados mock específicos para Supervisor Jurídico
const equipeConsultores = [
  { 
    nome: 'Maria Santos', 
    leadsRecebidos: 45, 
    taxaConversao: 68.9, 
    metaIndividual: 12000,
    valorFeito: 8750,
    valorQueResta: 3250
  },
  { 
    nome: 'João Silva', 
    leadsRecebidos: 38, 
    taxaConversao: 71.1, 
    metaIndividual: 11000,
    valorFeito: 9250,
    valorQueResta: 1750
  },
  { 
    nome: 'Ana Costa', 
    leadsRecebidos: 41, 
    taxaConversao: 65.9, 
    metaIndividual: 10500,
    valorFeito: 7800,
    valorQueResta: 2700
  },
];

const rendimentoSemanal = [
  { periodo: 'Sem 1', mariaSantos: 2100, joaoSilva: 1950, anaCosta: 1800 },
  { periodo: 'Sem 2', mariaSantos: 2300, joaoSilva: 2100, anaCosta: 1950 },
  { periodo: 'Sem 3', mariaSantos: 2150, joaoSilva: 2250, anaCosta: 2100 },
  { periodo: 'Sem 4', mariaSantos: 2200, joaoSilva: 1950, anaCosta: 1950 },
];

const rendimentoMensal = [
  { periodo: 'Jan', mariaSantos: 8500, joaoSilva: 7800, anaCosta: 7200 },
  { periodo: 'Fev', mariaSantos: 9200, joaoSilva: 8500, anaCosta: 7800 },
  { periodo: 'Mar', mariaSantos: 8800, joaoSilva: 9100, anaCosta: 8200 },
  { periodo: 'Abr', mariaSantos: 9500, joaoSilva: 8700, anaCosta: 8500 },
  { periodo: 'Mai', mariaSantos: 8750, joaoSilva: 9250, anaCosta: 7800 },
];

const ticketMedioProdutos = [
  { produto: 'Revisional', ticketMedio: 4500, participacao: 35 },
  { produto: 'Consignado', ticketMedio: 3200, participacao: 28 },
  { produto: 'Financiamento', ticketMedio: 5800, participacao: 22 },
  { produto: 'Cartão', ticketMedio: 2100, participacao: 15 },
];

export default function SupervisorJuridicoDashboard() {
  const [viewType, setViewType] = useState<'semanal' | 'mensal'>('semanal');
  
  const totalLeadsRecebidos = equipeConsultores.reduce((sum, consultor) => sum + consultor.leadsRecebidos, 0);
  const mediaConversao = equipeConsultores.reduce((sum, consultor) => sum + consultor.taxaConversao, 0) / equipeConsultores.length;
  const totalComissoes = equipeConsultores.reduce((sum, consultor) => sum + consultor.valorFeito, 0);
  const totalValorDia = 1720; // Simulando valor do dia
  const totalValorMes = equipeConsultores.reduce((sum, consultor) => sum + consultor.valorFeito, 0);
  
  const metaDia = 2500;
  const metaMes = 35000;
  const valorRestanteDia = metaDia - totalValorDia;
  const valorRestanteMes = metaMes - totalValorMes;

  const currentData = viewType === 'semanal' ? rendimentoSemanal : rendimentoMensal;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Supervisor Jurídico" 
        subtitle="Gestão da equipe jurídica e acompanhamento de performance" 
      />
      
      {/* Métricas Gerais da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          value={totalLeadsRecebidos.toString()}
          label="Leads recebidos (Equipe)"
          trend={{
            value: "+8.5%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={`${mediaConversao.toFixed(1)}%`}
          label="Taxa de conversão média"
          trend={{
            value: "+2.8%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={`R$ ${totalComissoes.toLocaleString()}`}
          label="Comissão total da equipe"
          trend={{
            value: "+15.2%",
            isPositive: true
          }}
          className="md:col-span-1"
        />
      </div>

      {/* Metas Diárias e Mensais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meta do Dia */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Meta do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor feito no dia</p>
                <p className="text-2xl font-bold text-primary">R$ {totalValorDia.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Meta diária</p>
                <p className="text-xl font-semibold">R$ {metaDia.toLocaleString()}</p>
              </div>
            </div>
            <Progress value={(totalValorDia / metaDia) * 100} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Restante: R$ {Math.max(0, valorRestanteDia).toLocaleString()}
              </span>
              <span className="font-medium">
                {((totalValorDia / metaDia) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Meta do Mês */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Meta do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor feito no mês</p>
                <p className="text-2xl font-bold text-primary">R$ {totalValorMes.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Meta mensal</p>
                <p className="text-xl font-semibold">R$ {metaMes.toLocaleString()}</p>
              </div>
            </div>
            <Progress value={(totalValorMes / metaMes) * 100} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Restante: R$ {Math.max(0, valorRestanteMes).toLocaleString()}
              </span>
              <span className="font-medium">
                {((totalValorMes / metaMes) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Individual dos Consultores */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Performance Individual da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Consultor</th>
                  <th className="text-center p-4 font-semibold">Leads Recebidos</th>
                  <th className="text-center p-4 font-semibold">Taxa de Conversão</th>
                  <th className="text-center p-4 font-semibold">Meta Individual</th>
                  <th className="text-center p-4 font-semibold">Valor Feito</th>
                  <th className="text-center p-4 font-semibold">Valor que Resta</th>
                  <th className="text-center p-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipeConsultores.map((consultor, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {consultor.nome.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{consultor.nome}</span>
                      </div>
                    </td>
                    <td className="text-center p-4">{consultor.leadsRecebidos}</td>
                    <td className="text-center p-4">
                      <span className="font-semibold text-primary">{consultor.taxaConversao}%</span>
                    </td>
                    <td className="text-center p-4">R$ {consultor.metaIndividual.toLocaleString()}</td>
                    <td className="text-center p-4">R$ {consultor.valorFeito.toLocaleString()}</td>
                    <td className="text-center p-4">R$ {consultor.valorQueResta.toLocaleString()}</td>
                    <td className="text-center p-4">
                      <Button variant="outline" size="sm">
                        Definir Meta
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de Rendimento Unificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendimento com Controle de Visualização */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
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
                    dataKey="periodo" 
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
                    dataKey="mariaSantos" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Maria Santos"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="joaoSilva" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="João Silva"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anaCosta" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Ana Costa"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Médio por Produto */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Ticket Médio por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketMedioProdutos.map((produto, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{produto.produto}</p>
                    <p className="text-sm text-muted-foreground">
                      {produto.participacao}% das vendas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      R$ {produto.ticketMedio.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Ticket médio</p>
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