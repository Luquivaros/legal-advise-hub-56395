import { useAuth } from '@/contexts/AuthContext';
import SetorAdministrativoGov from './gov/SetorAdministrativoGov';

export default function Gov() {
  const { setor, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  switch (setor) {
    case 'administrativo':
    case 'master':
      return <SetorAdministrativoGov />;
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Acesso Negado
            </h2>
            <p className="text-muted-foreground">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
        </div>
      );
  }
}
