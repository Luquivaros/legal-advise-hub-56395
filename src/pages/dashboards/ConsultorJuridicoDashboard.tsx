import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Edit, Trash2 } from 'lucide-react';

// Dados mock específicos para Consultor Jurídico
const rendimentoSemanal = [
  { periodo: 'Semana 1', valor: 24000 },
  { periodo: 'Semana 2', valor: 32000 },
  { periodo: 'Semana 3', valor: 18000 },
  { periodo: 'Semana 4', valor: 41000 },
  { periodo: 'Semana 5', valor: 36000 },
];

const vendasMes = [
  { 
    id: 1, 
    nome: 'João Silva', 
    produto: 'Revisão Contratual', 
    valor: 15000, 
    data: '15/12/2024' 
  },
  { 
    id: 2, 
    nome: 'Maria Santos', 
    produto: 'Negociação de Dívidas', 
    valor: 22000, 
    data: '12/12/2024' 
  },
  { 
    id: 3, 
    nome: 'Carlos Oliveira', 
    produto: 'Análise de Juros', 
    valor: 18500, 
    data: '10/12/2024' 
  },
  { 
    id: 4, 
    nome: 'Ana Costa', 
    produto: 'Consultoria Jurídica', 
    valor: 12000, 
    data: '08/12/2024' 
  },
  { 
    id: 5, 
    nome: 'Pedro Almeida', 
    produto: 'Revisão Contratual', 
    valor: 16800, 
    data: '05/12/2024' 
  }
];

const rendimentoMensal = [
  { mes: 'Jan', valor: 45000 },
  { mes: 'Fev', valor: 52000 },
  { mes: 'Mar', valor: 38000 },
  { mes: 'Abr', valor: 61000 },
  { mes: 'Mai', valor: 55000 },
  { mes: 'Jun', valor: 67000 },
];

export default function ConsultorJuridicoDashboard() {
  // Dados das metas específicas para Consultor Jurídico
  const metaDia = 5000;
  const valorFeitoDia = 3200;
  const restanteDia = metaDia - valorFeitoDia;

  const metaMes = 150000;
  const valorFeitoMes = 89500;
  const restanteMes = metaMes - valorFeitoMes;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Consultor Jurídico" 
        subtitle="Acompanhe seu rendimento pessoal e metas" 
      />
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <MetricCard
          value="23"
          label="Leads Recebidos"
          trend={{
            value: "+15.2%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="8"
          label="Leads em Negociação"
          trend={{
            value: "+25.0%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="34.8%"
          label="Taxa de Conversão"
          trend={{
            value: "+5.3%",
            isPositive: true
          }}
        />
        
        <div className="xl:col-span-2">
          <MetricCard
            value="R$ 12.450"
            label="Comissão Alcançada"
            variant="glassmorphism"
            trend={{
              value: "+18.7%",
              isPositive: true
            }}
            className="h-full"
          />
        </div>
      </div>

      {/* Metas do Dia */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Metas do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meta do Dia</dt>
              <dd className="text-2xl font-bold text-foreground">R$ {metaDia.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valor Feito no Dia</dt>
              <dd className="text-2xl font-bold text-trend-up">R$ {valorFeitoDia.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valor Restante</dt>
              <dd className={`text-2xl font-bold ${restanteDia > 0 ? 'text-trend-down' : 'text-trend-up'}`}>
                R$ {Math.abs(restanteDia).toLocaleString()}
              </dd>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progresso do Dia</span>
              <span>{((valorFeitoDia / metaDia) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((valorFeitoDia / metaDia) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas do Mês */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Metas do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meta do Mês</dt>
              <dd className="text-2xl font-bold text-foreground">R$ {metaMes.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valor Feito no Mês</dt>
              <dd className="text-2xl font-bold text-trend-up">R$ {valorFeitoMes.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valor Restante</dt>
              <dd className={`text-2xl font-bold ${restanteMes > 0 ? 'text-trend-down' : 'text-trend-up'}`}>
                R$ {Math.abs(restanteMes).toLocaleString()}
              </dd>
            </div>
          </div>
          
          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progresso do Mês</span>
              <span>{((valorFeitoMes / metaMes) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((valorFeitoMes / metaMes) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Vendas do Mês */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Vendas Realizadas no Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendasMes.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell className="font-medium">{venda.nome}</TableCell>
                  <TableCell>{venda.produto}</TableCell>
                  <TableCell>R$ {venda.valor.toLocaleString()}</TableCell>
                  <TableCell>{venda.data}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gráficos de Rendimento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Semanal */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Rendimento das Últimas Semanas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rendimentoSemanal} barCategoryGap="20%">
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border) / 0.3)" 
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="periodo" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                    cursor={{ fill: 'hsl(var(--muted) / 0.1)' }}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Mensal */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Rendimento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rendimentoMensal}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border) / 0.3)" 
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="mes" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                    cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="url(#lineGradient)" 
                    strokeWidth={4}
                    dot={{ 
                      fill: 'hsl(var(--background))', 
                      stroke: 'hsl(var(--primary))',
                      strokeWidth: 3, 
                      r: 6 
                    }}
                    activeDot={{ 
                      r: 8, 
                      fill: 'hsl(var(--accent))',
                      stroke: 'hsl(var(--background))',
                      strokeWidth: 2
                    }}
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