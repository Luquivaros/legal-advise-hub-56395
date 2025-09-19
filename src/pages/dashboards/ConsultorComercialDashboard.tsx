import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Edit, Trash2 } from 'lucide-react';

// Dados mock específicos para Consultor Comercial
const rendimentoSemanal = [
  { periodo: 'Sem 1', valor: 12500 },
  { periodo: 'Sem 2', valor: 18750 },
  { periodo: 'Sem 3', valor: 8300 },
  { periodo: 'Sem 4', valor: 22100 },
  { periodo: 'Sem 5', valor: 15800 },
];

const rendimentoMensal = [
  { mes: 'Jan', valor: 45000 },
  { mes: 'Fev', valor: 52000 },
  { mes: 'Mar', valor: 38000 },
  { mes: 'Abr', valor: 61000 },
  { mes: 'Mai', valor: 48000 },
  { mes: 'Jun', valor: 55000 },
];

const vendasMes = [
  { id: 1, nome: 'João Silva', produto: 'Consultoria Jurídica Premium', valor: 15000, data: '2024-01-15' },
  { id: 2, nome: 'Maria Santos', produto: 'Assessoria Trabalhista', valor: 8500, data: '2024-01-18' },
  { id: 3, nome: 'Pedro Costa', produto: 'Consultoria Empresarial', valor: 12000, data: '2024-01-22' },
  { id: 4, nome: 'Ana Oliveira', produto: 'Regularização Fiscal', valor: 6800, data: '2024-01-25' },
  { id: 5, nome: 'Carlos Mendes', produto: 'Consultoria Jurídica Premium', valor: 15000, data: '2024-01-28' },
];

export default function ConsultorComercialDashboard() {
  // Dados das metas específicas para Consultor Comercial
  const metaDia = 2500;
  const valorFeitoDia = 1850;
  const restanteDia = metaDia - valorFeitoDia;

  const metaMes = 75000;
  const valorFeitoMes = 57300;
  const restanteMes = metaMes - valorFeitoMes;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Consultor Comercial" 
        subtitle="Acompanhe seu rendimento pessoal e metas" 
      />
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <MetricCard
          value="124"
          label="Leads recebidos"
          trend={{
            value: "+15.3%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="38"
          label="Leads em negociação"
          trend={{
            value: "+8.7%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="30.6%"
          label="Taxa de conversão"
          trend={{
            value: "+4.2%",
            isPositive: true
          }}
        />
        
        <div className="col-span-1 md:col-span-1 xl:col-span-2">
          <MetricCard
            value="R$ 12.450"
            label="Comissão alcançada"
            variant="glassmorphism"
            trend={{
              value: "+18.7%",
              isPositive: true
            }}
            className="h-full"
          />
        </div>
      </div>

      {/* Meta do Dia */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Meta do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Meta do dia</dt>
              <dd className="text-2xl font-bold text-foreground">R$ {metaDia.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Valor feito no dia</dt>
              <dd className="text-2xl font-bold text-trend-up">R$ {valorFeitoDia.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Valor restante para bater a meta do dia</dt>
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

      {/* Meta do Mês */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Meta do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Meta do mês</dt>
              <dd className="text-2xl font-bold text-foreground">R$ {metaMes.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Valor feito no mês</dt>
              <dd className="text-2xl font-bold text-trend-up">R$ {valorFeitoMes.toLocaleString()}</dd>
            </div>
            
            <div className="space-y-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Valor restante para bater a meta do mês</dt>
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

      {/* Vendas Feitas no Mês */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Vendas feitas no mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-muted/30">
                  <TableHead className="text-muted-foreground font-medium">Nome</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Produto</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Valor</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Data</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendasMes.map((venda) => (
                  <TableRow key={venda.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                    <TableCell className="font-medium text-foreground">{venda.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{venda.produto}</TableCell>
                    <TableCell className="text-muted-foreground font-medium">R$ {venda.valor.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(venda.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Rendimento Semanal */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Gráfico de rendimento semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rendimentoSemanal} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorSemanal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis 
                    dataKey="periodo" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px hsl(var(--foreground) / 0.15)'
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Rendimento']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fill="url(#colorSemanal)"
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Rendimento Mensal */}
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Gráfico de rendimento mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rendimentoMensal} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorMensal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis 
                    dataKey="mes" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px hsl(var(--foreground) / 0.15)'
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Rendimento']}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="url(#colorMensal)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}