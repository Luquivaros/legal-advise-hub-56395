import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import { ChargebackService } from '@/api/services/chargebackService';
import { Chargeback } from '@/types';
import ChargebackList from '@/components/ui/chargeback-list';

export default function GerenciaChargebacks() {
  const { user } = useAuth();
  const [chargebacks, setChargebacks] = useState<Chargeback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chargebacks" 
        subtitle="Visão geral de chargebacks e reversões da gerência" 
      />

      <ChargebackList 
        chargebacks={chargebacks}
        loading={loading}
        title="Lista de Chargebacks"
      />
    </div>
  );
}
