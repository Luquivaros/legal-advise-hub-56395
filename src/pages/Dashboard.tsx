import { useAuth } from '@/contexts/AuthContext';
import ConsultorJuridicoDashboard from './dashboards/ConsultorJuridicoDashboard';
import ConsultorComercialDashboard from './dashboards/ConsultorComercialDashboard';
import SupervisorJuridicoDashboard from './dashboards/SupervisorJuridicoDashboard';
import SupervisorComercialDashboard from './dashboards/SupervisorComercialDashboard';
import SetorAdministrativoDashboard from './dashboards/SetorAdministrativoDashboard';
import GerenciaDashboard from './dashboards/GerenciaDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  // Renderiza o dashboard específico baseado na função do usuário
  switch (user.role) {
    case 'consultor-juridico':
      return <ConsultorJuridicoDashboard />;
    
    case 'consultor-comercial':
      return <ConsultorComercialDashboard />;
    
    case 'supervisor-juridico':
      return <SupervisorJuridicoDashboard />;
    
    case 'supervisor-comercial':
      return <SupervisorComercialDashboard />;
    
    case 'setor-administrativo':
      return <SetorAdministrativoDashboard />;
    
    case 'gerencia':
      return <GerenciaDashboard />;
    
    default:
      return <ConsultorJuridicoDashboard />; // Fallback padrão
  }
}