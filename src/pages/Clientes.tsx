import { useAuth } from "@/contexts/AuthContext";
import ConsultorJuridicoClients from "./clients/ConsultorJuridicoClients";
import SupervisorJuridicoClients from "./clients/SupervisorJuridicoClients";
import SupervisorComercialClients from "./clients/SupervisorComercialClients";
import PageHeader from "@/components/PageHeader";

export default function Clientes() {
  const { user } = useAuth();

  // Redirecionar baseado no role do usuário
  switch (user?.role) {
    case 'consultor-juridico':
      return <ConsultorJuridicoClients />;
    case 'supervisor-juridico':
      return <SupervisorJuridicoClients />;
    case 'supervisor-comercial':
      return <SupervisorComercialClients />;
    default:
      return (
        <div className="space-y-6">
          <PageHeader 
            title="Clientes" 
            subtitle="Gerencie e acompanhe seus clientes e prospects" 
          />
          <p className="text-muted-foreground">Página de clientes em desenvolvimento...</p>
        </div>
      );
  }
}