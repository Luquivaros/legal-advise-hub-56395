import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import { MetricCard } from "@/components/ui/metric-card";
import { ChargebackService } from '@/api/services/chargebackService';
import { ChargebackMetrics, Chargeback } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import ChargebackList from '@/components/ui/chargeback-list';

export default function SupervisorJuridicoChargebacks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<ChargebackMetrics | null>(null);
  const [chargebacks, setChargebacks] = useState<Chargeback[]>([]);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
}