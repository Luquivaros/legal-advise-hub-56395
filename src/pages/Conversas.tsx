import { useAuth } from '@/contexts/AuthContext';
import ConsultorComercialConversas from './conversations/ConsultorComercialConversas';
import ConsultorJuridicoConversas from './conversations/ConsultorJuridicoConversas';
import SupervisorComercialConversas from './conversations/SupervisorComercialConversas';
import SupervisorJuridicoConversas from './conversations/SupervisorJuridicoConversas';

export default function Conversas() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'consultor-comercial':
      return <ConsultorComercialConversas />;
    case 'consultor-juridico':
      return <ConsultorJuridicoConversas />;
    case 'supervisor-comercial':
      return <SupervisorComercialConversas />;
    case 'supervisor-juridico':
      return <SupervisorJuridicoConversas />;
    default:
      return <div>Acesso não autorizado</div>;
  }
}
