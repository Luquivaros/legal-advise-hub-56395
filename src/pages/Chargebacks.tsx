import { useAuth } from '@/contexts/AuthContext';
import SupervisorJuridicoChargebacks from './chargebacks/SupervisorJuridicoChargebacks';
import SupervisorComercialChargebacks from './chargebacks/SupervisorComercialChargebacks';
import SetorAdministrativoChargebacks from './chargebacks/SetorAdministrativoChargebacks';
import GerenciaChargebacks from './chargebacks/GerenciaChargebacks';

export default function Chargebacks() {
  const { user } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  switch (user.role) {
    case 'supervisor-juridico':
      return <SupervisorJuridicoChargebacks />;
    case 'supervisor-comercial':
      return <SupervisorComercialChargebacks />;
    case 'setor-administrativo':
      return <SetorAdministrativoChargebacks />;
    case 'gerencia':
      return <GerenciaChargebacks />;
    default:
      return <div>Acesso não autorizado para chargebacks</div>;
  }
}