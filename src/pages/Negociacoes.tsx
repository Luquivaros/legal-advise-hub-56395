import { useAuth } from '@/contexts/AuthContext';
import ConsultorComercialNegotiations from './negotiations/ConsultorComercialNegotiations';
import ConsultorJuridicoNegotiations from './negotiations/ConsultorJuridicoNegotiations';
import SupervisorComercialNegotiations from './negotiations/SupervisorComercialNegotiations';
import SupervisorJuridicoNegotiations from './negotiations/SupervisorJuridicoNegotiations';
import GerenciaNegotiations from './negotiations/GerenciaNegotiations';

export default function Negociacoes() {
  const { user } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  switch (user.role) {
    case 'consultor-comercial':
      return <ConsultorComercialNegotiations />;
    case 'consultor-juridico':
      return <ConsultorJuridicoNegotiations />;
    case 'supervisor-comercial':
      return <SupervisorComercialNegotiations />;
    case 'supervisor-juridico':
      return <SupervisorJuridicoNegotiations />;
    case 'gerencia':
      return <GerenciaNegotiations />;
    default:
      return <div>Acesso não autorizado</div>;
  }
}