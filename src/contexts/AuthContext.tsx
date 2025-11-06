import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, LoginData } from '@/types';
import { AuthService } from '@/api/services/authService';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await AuthService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await AuthService.login(data);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${response.data.user.name}`,
        });
        
        return true;
      } else {
        toast({
          title: "Erro no login",
          description: response.error || "Credenciais inválidas",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Erro interno do servidor",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Aqui você implementaria a chamada ao backend para criar o usuário
      // Por enquanto, vamos simular um cadastro bem-sucedido
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login com suas credenciais",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado do sistema",
      });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}