import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChargebackService } from '@/api/services/chargebackService';
import { ChargebackMetrics, Chargeback } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import ChargebackList from '@/components/ui/chargeback-list';
import { TrendingDown, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";

export default function SupervisorJuridicoChargebacks() {
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
          subtitle="Monitore e gerencie chargebacks e reversões do setor jurídico" 
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
        subtitle="Monitore e gerencie chargebacks e reversões do setor jurídico" 
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

            {/* CARD COLORIDO ESPECIAL - Prejuízo Líquido */}
            <div className="group relative overflow-hidden rounded-lg p-6 hover-scale transition-all duration-300" style={{background: 'linear-gradient(to bottom right, #FE8330, #FFA832)'}}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium uppercase tracking-wide text-white/90">
                  Prejuízo Líquido
                </div>
                <div className="p-2 rounded-lg bg-white/20">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(monthSummary.prejuizoLiquido)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}