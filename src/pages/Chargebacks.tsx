import { useAuth } from '@/contexts/AuthContext';
import SupervisorJuridicoChargebacks from './chargebacks/SupervisorJuridicoChargebacks';
import SupervisorComercialChargebacks from './chargebacks/SupervisorComercialChargebacks';
import SetorAdministrativoChargebacks from './chargebacks/SetorAdministrativoChargebacks';
import GerenciaChargebacks from './chargebacks/GerenciaChargebacks';

export default function Chargebacks() {
  const { setor, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  switch (setor) {
    case 'supervisao_juridico':
      return <SupervisorJuridicoChargebacks />;
    case 'supervisao_comercial':
      return <SupervisorComercialChargebacks />;
    case 'administrativo':
      return <SetorAdministrativoChargebacks />;
    case 'gerencia':
    case 'master':
      return <GerenciaChargebacks />;
    default:
      return <div className="text-center p-8">Acesso não autorizado para chargebacks.</div>;
  }
}