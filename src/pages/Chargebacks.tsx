import { useAuth } from '@/contexts/AuthContext';
import SupervisorJuridicoChargebacks from './chargebacks/SupervisorJuridicoChargebacks';
import SupervisorComercialChargebacks from './chargebacks/SupervisorComercialChargebacks';

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
    default:
      return <div>Acesso não autorizado para chargebacks</div>;
  }
}