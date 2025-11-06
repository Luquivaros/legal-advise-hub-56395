import { useAuth } from '@/contexts/AuthContext';
import ConsultorJuridicoDashboard from './dashboards/ConsultorJuridicoDashboard';
import ConsultorComercialDashboard from './dashboards/ConsultorComercialDashboard';
import SupervisorJuridicoDashboard from './dashboards/SupervisorJuridicoDashboard';
import SupervisorComercialDashboard from './dashboards/SupervisorComercialDashboard';
import GerenciaDashboard from './dashboards/GerenciaDashboard';

export default function Dashboard() {
  const { setor, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Renderiza o dashboard específico baseado no setor do usuário
  switch (setor) {
    case 'juridico':
      return <ConsultorJuridicoDashboard />;
    
    case 'comercial':
      return <ConsultorComercialDashboard />;
    
    case 'supervisao_juridico':
      return <SupervisorJuridicoDashboard />;
    
    case 'supervisao_comercial':
      return <SupervisorComercialDashboard />;
    
    case 'gerencia':
    case 'master':
      return <GerenciaDashboard />;
    
    default:
      return <div className="text-center p-8">Acesso não autorizado para este setor.</div>;
  }
}