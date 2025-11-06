import { useAuth } from '@/contexts/AuthContext';
import ConsultorComercialConversas from './conversations/ConsultorComercialConversas';
import ConsultorJuridicoConversas from './conversations/ConsultorJuridicoConversas';
import SupervisorComercialConversas from './conversations/SupervisorComercialConversas';
import SupervisorJuridicoConversas from './conversations/SupervisorJuridicoConversas';

export default function Conversas() {
  const { setor, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  switch (setor) {
    case 'comercial':
      return <ConsultorComercialConversas />;
    case 'juridico':
      return <ConsultorJuridicoConversas />;
    case 'supervisao_comercial':
      return <SupervisorComercialConversas />;
    case 'supervisao_juridico':
      return <SupervisorJuridicoConversas />;
    default:
      return <div className="text-center p-8">Acesso não autorizado para este setor.</div>;
  }
}
