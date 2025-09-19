import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, DollarSign, Calendar, Zap, Award, BarChart3, Settings } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dados mock específicos para Gerência
const leadsPorSetor = [
  { setor: 'Comercial', leads: 1850, conversao: 42.5 },
  { setor: 'Jurídico', leads: 95, conversao: 87.4 }
];

const rendimentoSemanal = [
  { periodo: 'Sem 1', comercial: 285000, juridico: 450000 },
  { periodo: 'Sem 2', comercial: 320000, juridico: 485000 },
  { periodo: 'Sem 3', comercial: 295000, juridico: 520000 },
  { periodo: 'Sem 4', comercial: 340000, juridico: 495000 }
];

const rendimentoMensal = [
  { mes: 'Jan', comercial: 980000, juridico: 1650000 },
  { mes: 'Fev', comercial: 1020000, juridico: 1720000 },
  { mes: 'Mar', comercial: 890000, juridico: 1580000 },
  { mes: 'Abr', comercial: 1150000, juridico: 1780000 },
  { mes: 'Mai', comercial: 1080000, juridico: 1690000 },
  { mes: 'Jun', comercial: 1240000, juridico: 1950000 }
];

const ticketMedioPorProduto = [
  { produto: 'Consultoria Jurídica Premium', valor: 25000, crescimento: 12.5 },
  { produto: 'Assessoria Comercial Completa', valor: 8500, crescimento: 8.3 },
  { produto: 'Gestão Administrativa', valor: 3200, crescimento: 5.7 },
  { produto: 'Auditoria Empresarial', valor: 18000, crescimento: 15.2 }
];

const conversaoPorPlataforma = [
  { plataforma: 'Facebook Ads', leads: 850, conversoes: 298, taxa: 35.1, cor: '#3b82f6' },
  { plataforma: 'Instagram Ads', leads: 620, conversoes: 248, taxa: 40.0, cor: '#e91e63' },
  { plataforma: 'Google Ads', leads: 740, conversoes: 340, taxa: 45.9, cor: '#4caf50' },
  { plataforma: 'TV/Rádio', leads: 180, conversoes: 89, taxa: 49.4, cor: '#ff9800' },
  { plataforma: 'Indicação', leads: 235, conversoes: 165, taxa: 70.2, cor: '#9c27b0' }
];

const metasDiarias = {
  meta: 110000,
  valorFeito: 90500,
  valorRestante: 19500,
  setores: {
    comercial: { meta: 45000, feito: 38500 },
    juridico: { meta: 65000, feito: 52000 }
  }
};

const metasMensais = {
  meta: 3190000,
  valorFeito: 2770000,
  valorRestante: 420000,
  setores: {
    comercial: { meta: 1240000, feito: 1080000 },
    juridico: { meta: 1950000, feito: 1690000 }
  }
};

export default function GerenciaDashboard() {
  const [viewType, setViewType] = useState<'semanal' | 'mensal'>('semanal');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Gerência" 
        subtitle="Visão consolidada de todos os setores e metas estratégicas" 
      />
      
      {/* Metas Diárias e Mensais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metas do Dia */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Metas do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Meta do Dia</p>
                  <p className="text-2xl font-bold text-primary">R$ {metasDiarias.meta.toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Feito no Dia</p>
                  <p className="text-2xl font-bold text-trend-up">R$ {metasDiarias.valorFeito.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-trend-up" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Restante</p>
                  <p className="text-2xl font-bold text-orange-500">R$ {metasDiarias.valorRestante.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            {/* Metas por Setor */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Metas por Setor:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Comercial</span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">R$ {metasDiarias.setores.comercial.feito.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Meta: R$ {metasDiarias.setores.comercial.meta.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Jurídico</span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">R$ {metasDiarias.setores.juridico.feito.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Meta: R$ {metasDiarias.setores.juridico.meta.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do dia</span>
                <span className="font-medium">78.8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" style={{ width: '78.8%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metas do Mês */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Metas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Meta do Mês</p>
                  <p className="text-2xl font-bold text-primary">R$ {metasMensais.meta.toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Feito no Mês</p>
                  <p className="text-2xl font-bold text-trend-up">R$ {metasMensais.valorFeito.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-trend-up" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Restante</p>
                  <p className="text-2xl font-bold text-orange-500">R$ {metasMensais.valorRestante.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            {/* Metas por Setor */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Metas por Setor:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Comercial</span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">R$ {metasMensais.setores.comercial.feito.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Meta: R$ {metasMensais.setores.comercial.meta.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Jurídico</span>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">R$ {metasMensais.setores.juridico.feito.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Meta: R$ {metasMensais.setores.juridico.meta.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do mês</span>
                <span className="font-medium">81.4%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" style={{ width: '81.4%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads e Taxa de Conversão por Setor */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" />
            Leads e Taxa de Conversão por Setor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadsPorSetor.map((setor, index) => (
              <div key={index} className="text-center p-6 bg-muted/20 rounded-lg border border-border/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">{setor.setor}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Leads Recebidos</p>
                    <p className="text-3xl font-bold text-primary">{setor.leads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-trend-up">{setor.conversao}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Rendimento */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              Gráfico de Rendimento por Setor
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
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewType === 'semanal' ? rendimentoSemanal : rendimentoMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={viewType === 'semanal' ? 'periodo' : 'mes'} 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="comercial" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  name="Comercial"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="juridico" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  name="Jurídico"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Médio por Produto e Gestão de Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Médio por Produto */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Ticket Médio por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketMedioPorProduto.map((produto, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{produto.produto}</p>
                    <p className="text-2xl font-bold text-primary">R$ {produto.valor.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      produto.crescimento > 0 ? 'text-trend-up' : 'text-trend-down'
                    }`}>
                      {produto.crescimento > 0 ? '+' : ''}{produto.crescimento}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gestão de Metas por Setor */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Gestão de Metas por Setor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaComercial" className="text-sm font-medium text-foreground">Meta Setor Comercial (R$)</Label>
                  <Input 
                    id="metaComercial" 
                    placeholder="Ex: 1.250.000" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="metaJuridico" className="text-sm font-medium text-foreground">Meta Setor Jurídico (R$)</Label>
                  <Input 
                    id="metaJuridico" 
                    placeholder="Ex: 1.950.000"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Salvar Metas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Taxa de Conversão por Plataforma */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Taxa de Conversão por Plataforma de Origem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabela de Conversão */}
            <div className="space-y-4">
              {conversaoPorPlataforma.map((plataforma, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/20">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: plataforma.cor }}
                    ></div>
                    <div>
                      <p className="font-medium text-foreground">{plataforma.plataforma}</p>
                      <p className="text-sm text-muted-foreground">
                        {plataforma.conversoes} / {plataforma.leads} leads
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{plataforma.taxa}%</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico de Colunas */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversaoPorPlataforma}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="plataforma" 
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
                    formatter={(value: number) => [`${value}%`, 'Taxa de Conversão']}
                  />
                  <Bar 
                    dataKey="taxa" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}