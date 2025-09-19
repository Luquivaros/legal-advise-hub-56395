import { useLocation, Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  MessageSquare,
  Scale,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';


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
    roles: ['consultor-comercial', 'consultor-juridico', 'supervisor-comercial', 'supervisor-juridico', 'setor-administrativo', 'gerencia']
  },
  {
    icon: Briefcase,
    label: "Negociações",
    path: "/app/negociacoes",
    roles: ['consultor-comercial', 'consultor-juridico', 'supervisor-comercial', 'supervisor-juridico', 'gerencia']
  },
  {
    icon: Users,
    label: "Clientes",
    path: "/app/clientes",
    roles: ['consultor-comercial', 'consultor-juridico', 'supervisor-comercial', 'supervisor-juridico', 'setor-administrativo']
  },
  {
    icon: AlertTriangle,
    label: "Chargebacks",
    path: "/app/chargebacks",
    roles: ['supervisor-comercial', 'supervisor-juridico', 'setor-administrativo', 'gerencia']
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    path: "/app/feedback",
    roles: ['consultor-comercial', 'consultor-juridico', 'supervisor-comercial', 'supervisor-juridico', 'setor-administrativo', 'gerencia']
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
      <nav className="flex-1 px-3 py-4 min-h-0">
        <div className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
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
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-orange-50 mt-1">Função:</p>
            <p className="font-medium text-xs capitalize">
              {userRole.replace('-', ' ')}
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