import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import ChargebackList from '@/components/ui/chargeback-list';
import { ChargebackService } from '@/api/services/chargebackService';
import { Chargeback } from '@/types';

export default function SupervisorJuridicoChargebacks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chargebacks, setChargebacks] = useState<Chargeback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChargebacks();
  }, [user]);

  const loadChargebacks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await ChargebackService.getChargebacks(user.id, user.role);
      if (response.success && response.data) {
        setChargebacks(response.data.data);
      } else {
        toast({
          title: "Erro",
          description: response.error || "Erro ao carregar chargebacks",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar chargebacks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Chargebacks" 
        subtitle="Monitore e gerencie chargebacks e reversões do setor jurídico" 
      />

      <ChargebackList 
        chargebacks={chargebacks}
        loading={loading}
        title="Lista de Chargebacks"
      />
    </div>
  );
}