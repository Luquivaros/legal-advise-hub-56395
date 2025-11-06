import { useAuth } from '@/contexts/AuthContext';
import ConsultorComercialNegotiations from './negotiations/ConsultorComercialNegotiations';
import ConsultorJuridicoNegotiations from './negotiations/ConsultorJuridicoNegotiations';
import SupervisorComercialNegotiations from './negotiations/SupervisorComercialNegotiations';
import SupervisorJuridicoNegotiations from './negotiations/SupervisorJuridicoNegotiations';
import GerenciaNegotiations from './negotiations/GerenciaNegotiations';

export default function Negociacoes() {
  const { setor, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  switch (setor) {
    case 'comercial':
      return <ConsultorComercialNegotiations />;
    case 'juridico':
      return <ConsultorJuridicoNegotiations />;
    case 'supervisao_comercial':
      return <SupervisorComercialNegotiations />;
    case 'supervisao_juridico':
      return <SupervisorJuridicoNegotiations />;
    case 'gerencia':
    case 'master':
      return <GerenciaNegotiations />;
    default:
      return <div className="text-center p-8">Acesso não autorizado para negociações.</div>;
  }
}