import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, LoginData } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => void;
  signUp: (data: LoginData) => Promise<boolean>;
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
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (supabaseUser) {
        // Buscar o role do usuário
        const { data: userRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', supabaseUser.id)
          .single();

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (profile && userRoles) {
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: userRoles.role as UserRole,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          });
        }
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
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        toast({
          title: "Erro no login",
          description: authError.message,
          variant: "destructive",
        });
        return false;
      }

      if (authData.user) {
        // Buscar o role do usuário
        const { data: userRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .single();

        // Verificar se o role corresponde ao selecionado
        if (!userRoles || userRoles.role !== data.role) {
          await supabase.auth.signOut();
          toast({
            title: "Erro no login",
            description: "Role selecionado não corresponde ao usuário",
            variant: "destructive",
          });
          return false;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          const user: User = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: userRoles.role as UserRole,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };

          setUser(user);
          
          toast({
            title: "Login realizado com sucesso!",
            description: `Bem-vindo(a), ${user.name}`,
          });
          
          return true;
        }
      }

      return false;
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

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado do sistema",
      });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const signUp = async (data: LoginData): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.email.split('@')[0],
          }
        }
      });

      if (authError) {
        toast({
          title: "Erro no cadastro",
          description: authError.message,
          variant: "destructive",
        });
        return false;
      }

      if (authData.user) {
        // Criar o role do usuário
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{
            user_id: authData.user.id,
            role: data.role,
          }]);

        if (roleError) {
          toast({
            title: "Erro no cadastro",
            description: "Erro ao atribuir role ao usuário",
            variant: "destructive",
          });
          return false;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          const user: User = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: data.role,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };

          setUser(user);
          
          toast({
            title: "Cadastro realizado com sucesso!",
            description: `Bem-vindo(a), ${user.name}`,
          });
          
          return true;
        }
      }

      return false;
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Erro interno do servidor",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signUp,
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