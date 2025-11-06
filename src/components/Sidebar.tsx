import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  MessageSquare,
  Scale,
  LogOut,
  MessagesSquare,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';


interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    icon: BarChart3,
    label: "Dashboard",
    path: "/app/dashboard",
    roles: ['comercial', 'juridico', 'supervisao_comercial', 'supervisao_juridico', 'gerencia', 'master']
  },
  {
    icon: Briefcase,
    label: "Negociações",
    path: "/app/negociacoes",
    roles: ['comercial', 'juridico', 'supervisao_comercial', 'supervisao_juridico', 'gerencia', 'master']
  },
  {
    icon: Users,
    label: "Clientes",
    path: "/app/clientes",
    roles: ['comercial', 'juridico', 'supervisao_comercial', 'supervisao_juridico', 'administrativo', 'master']
  },
  {
    icon: AlertTriangle,
    label: "Chargebacks",
    path: "/app/chargebacks",
    roles: ['supervisao_comercial', 'supervisao_juridico', 'administrativo', 'gerencia', 'master']
  },
  {
    icon: MessagesSquare,
    label: "Conversas",
    path: "/app/conversas",
    roles: ['comercial', 'juridico', 'supervisao_comercial', 'supervisao_juridico', 'master']
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    path: "/app/feedback",
    roles: ['comercial', 'juridico', 'supervisao_comercial', 'supervisao_juridico', 'administrativo', 'gerencia', 'master']
  },
  {
    icon: Building2,
    label: "GOV",
    path: "/app/gov",
    roles: ['administrativo', 'master']
  },
  {
    icon: Scale,
    label: "Audiências",
    path: "/app/escritorio/audiencias",
    roles: ['processual', 'master']
  },
  {
    icon: Briefcase,
    label: "Processual",
    path: "/app/escritorio/processual",
    roles: ['processual', 'master']
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    path: "/app/escritorio/feedback",
    roles: ['processual', 'master']
  }
];

interface SidebarProps {
  userRole: UserRole;
}

export function Sidebar({ 
  userRole
}: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState<string>('Usuário');
  
  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('nome')
          .eq('id', user.id)
          .single();
        
        if (data?.nome) {
          setUserName(data.nome);
        } else {
          setUserName(user.email || 'Usuário');
        }
      }
    };
    
    fetchUserName();
  }, [user]);
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-52 bg-gradient-to-b from-orange-400 to-orange-500 flex flex-col shadow-xl z-40 overflow-y-auto">
      
      {/* Header/Logo */}
      <div className="p-4 border-b border-orange-300/30 flex-shrink-0">
        <div className="flex items-center justify-center">
          <img src="/lovable-uploads/12499d55-cf6f-4dc9-9521-acf51947ce7b.png" alt="Logo" className="h-12 w-auto object-contain drop-shadow-md" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 min-h-0">
        <div className="space-y-8">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  "shadow-sm hover:shadow-md text-sm",
                  isActive 
                    ? "bg-white/25 text-white shadow-lg border border-white/20" 
                    : "text-orange-50 hover:bg-white/15 hover:text-white active:bg-white/20"
                )}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-3 border-t border-orange-300/30 flex-shrink-0">
        <div className="bg-white/10 rounded-lg p-3 mb-3">
          <div className="text-white">
            <p className="text-xs text-orange-50">Usuário:</p>
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-xs text-orange-50 mt-1">Função:</p>
            <p className="font-medium text-xs capitalize">
              {userRole.replace(/_/g, ' ')}
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
            "text-orange-50 hover:bg-red-500/20 hover:text-white",
            "shadow-sm hover:shadow-md"
          )}
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;