import { useState, useEffect } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { ChargebackService } from "@/api/services/chargebackService";
import { ChargebackMetrics } from "@/types";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/PageHeader";

export default function SupervisorJuridicoChargebacks() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<ChargebackMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await ChargebackService.getChargebackMetrics(user?.id, user?.role);
        if (response.success && response.data) {
          setMetrics(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar métricas de chargeback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.id, user?.role]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Chargebacks" 
          subtitle="Monitore e gerencie chargebacks e reversões" 
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
        subtitle="Monitore e gerencie chargebacks e reversões" 
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
    </div>
  );
}