import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChargebackService } from '@/api/services/chargebackService';
import { ChargebackMetrics, Chargeback } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import ChargebackList from '@/components/ui/chargeback-list';
import { TrendingDown, TrendingUp, AlertTriangle, BarChart3, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SupervisorComercialChargebacks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<ChargebackMetrics | null>(null);
  const [chargebacks, setChargebacks] = useState<Chargeback[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for month summary
  const monthSummary = {
    totalPerdido: 45600,
    totalRecuperado: 28300,
    prejuizoLiquido: 17300
  };

  // Mock data for charts
  const prejudicoRevertidosData = [
    { name: 'Jan', prejuizo: 120000, revertidos: 45000 },
    { name: 'Fev', prejuizo: 150000, revertidos: 67000 },
    { name: 'Mar', prejuizo: 98000, revertidos: 52000 },
    { name: 'Abr', prejuizo: 180000, revertidos: 89000 },
    { name: 'Mai', prejuizo: 135000, revertidos: 76000 },
    { name: 'Jun', prejuizo: 167000, revertidos: 94000 },
  ];

  const tendenciaSemanalData = [
    { semana: 'S1', chargebacks: 12 },
    { semana: 'S2', chargebacks: 18 },
    { semana: 'S3', chargebacks: 8 },
    { semana: 'S4', chargebacks: 25 },
    { semana: 'S5', chargebacks: 15 },
    { semana: 'S6', chargebacks: 32 },
    { semana: 'S7', chargebacks: 19 },
  ];

  const chartConfig = {
    prejuizo: {
      label: "Prejuízo",
      color: "#FFCC33",
    },
    revertidos: {
      label: "Revertidos", 
      color: "#FE5F2F",
    },
    chargebacks: {
      label: "Chargebacks",
      color: "#FE5F2F",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch metrics
        const metricsResponse = await ChargebackService.getChargebackMetrics(user?.id, user?.role);
        if (metricsResponse.success && metricsResponse.data) {
          setMetrics(metricsResponse.data);
        }

        // Fetch chargebacks list
        const chargebacksResponse = await ChargebackService.getChargebacks(user?.id || '', user?.role || '');
        if (chargebacksResponse.success && chargebacksResponse.data) {
          setChargebacks(chargebacksResponse.data.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de chargeback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, user?.role]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Chargebacks" 
          subtitle="Monitore e gerencie chargebacks e reversões do setor comercial" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
          <div className="h-32 bg-muted rounded-lg animate-pulse lg:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chargebacks" 
        subtitle="Monitore e gerencie chargebacks e reversões do setor comercial" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          value={metrics?.monthlyData.reduce((sum, month) => sum + month.count, 0) || 0}
          label="CHARGEBACKS"
          trend={{
            value: "+12.3%",
            isPositive: false
          }}
        />
        
        <MetricCard
          value={metrics?.cancelledClients || 0}
          label="REVERTIDOS"
          trend={{
            value: "+15.2%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={formatPercentage(metrics?.reversalRate || 0)}
          label="TAXA DE REVERSÃO"
          trend={{
            value: "+5.7%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value={formatCurrency(metrics?.revertedAmount || 0)}
          label="VALOR TOTAL REVERTIDO"
          variant="glassmorphism"
          className="lg:col-span-2"
          trend={{
            value: "+22.1%",
            isPositive: true
          }}
        />
      </div>

      <ChargebackList 
        chargebacks={chargebacks}
        loading={loading}
        title="Lista de Chargebacks"
      />

      <Card className="bg-gradient-to-br from-card to-card/50 transition-all duration-300 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Resumo do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD BRANCO PADRÃO - Total Perdido */}
            <div className="group relative overflow-hidden rounded-lg bg-card border border-border p-6 hover-scale transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Perdido
                </div>
                <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(monthSummary.totalPerdido)}
              </div>
            </div>

            {/* CARD BRANCO PADRÃO - Total Recuperado */}
            <div className="group relative overflow-hidden rounded-lg bg-card border border-border p-6 hover-scale transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Recuperado
                </div>
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {formatCurrency(monthSummary.totalRecuperado)}
              </div>
            </div>

            {/* CARD GLASSMORPHISM - Prejuízo Líquido */}
            <div className="group relative overflow-hidden rounded-lg p-6 hover-scale transition-all duration-300 bg-gradient-to-r from-primary to-orange-light border border-white/20 backdrop-blur-lg">
              {/* Glassmorphism texture overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
              
              <div className="relative z-10 flex items-center justify-between mb-3">
                <div className="text-xs font-medium uppercase tracking-wide text-white/90">
                  Prejuízo Líquido
                </div>
                <div className="p-2 rounded-lg bg-white/20">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="relative z-10 text-2xl font-bold text-white">
                {formatCurrency(monthSummary.prejuizoLiquido)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Área - Prejuízo x Revertidos */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200 w-full">
        <CardHeader>
          <CardTitle className="text-foreground font-inter flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-500" />
            Prejuízo x Revertidos
          </CardTitle>
          <Separator className="mt-3" />
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <AreaChart data={prejudicoRevertidosData}>
              <defs>
                <linearGradient id="fillPrejuizo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFCC33" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFCC33" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="fillRevertidos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FE5F2F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FE5F2F" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value, name) => [
                    formatCurrency(Number(value)), 
                    name === 'prejuizo' ? 'Prejuízo' : 'Revertidos'
                  ]}
                />} 
              />
              <Area
                type="monotone"
                dataKey="prejuizo"
                stackId="1"
                stroke="#FFCC33"
                fill="url(#fillPrejuizo)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revertidos"
                stackId="2"
                stroke="#FE5F2F"
                fill="url(#fillRevertidos)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Linha - Tendência Semanal */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
        <CardHeader>
          <CardTitle className="text-foreground font-inter flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Tendência Semanal
          </CardTitle>
          <Separator className="mt-3" />
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={tendenciaSemanalData}>
              <XAxis 
                dataKey="semana" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value) => [value, 'Chargebacks']}
                />} 
              />
              <Line
                type="monotone"
                dataKey="chargebacks"
                stroke="#FE5F2F"
                strokeWidth={3}
                dot={{ 
                  fill: "#FE5F2F", 
                  strokeWidth: 2, 
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: "#FE5F2F",
                  strokeWidth: 2,
                  fill: "hsl(var(--background))"
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}