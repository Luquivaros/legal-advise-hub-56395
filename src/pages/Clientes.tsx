import { useAuth } from "@/contexts/AuthContext";
import ConsultorJuridicoClients from "./clients/ConsultorJuridicoClients";
import ConsultorComercialClients from "./clients/ConsultorComercialClients";
import SupervisorJuridicoClients from "./clients/SupervisorJuridicoClients";
import SupervisorComercialClients from "./clients/SupervisorComercialClients";
import SetorAdministrativoClients from "./clients/SetorAdministrativoClients";
import PageHeader from "@/components/PageHeader";

export default function Clientes() {
  const { setor } = useAuth();

  // Redirecionar baseado no setor do usuário
  switch (setor) {
    case 'juridico':
      return <ConsultorJuridicoClients />;
    case 'comercial':
      return <ConsultorComercialClients />;
    case 'supervisao_juridico':
      return <SupervisorJuridicoClients />;
    case 'supervisao_comercial':
      return <SupervisorComercialClients />;
    case 'administrativo':
      return <SetorAdministrativoClients />;
    default:
      return (
        <div className="space-y-6">
          <PageHeader 
            title="Clientes" 
            subtitle="Gerencie e acompanhe seus clientes e prospects" 
          />
          <p className="text-muted-foreground">Acesso não autorizado para este setor.</p>
        </div>
      );
  }
}