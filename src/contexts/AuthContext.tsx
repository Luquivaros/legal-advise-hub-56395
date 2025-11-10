import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { SetorType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  setor: SetorType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, setor: SetorType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [setor, setSetor] = useState<SetorType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session first
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('setor')
          .eq('user_id', session.user.id)
          .single();
        
        setSetor(data?.setor || null);
      }
      
      setLoading(false);
    });

    // Setup auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user setor
          const { data } = await supabase
            .from('user_roles')
            .select('setor')
            .eq('user_id', session.user.id)
            .single();
          
          setSetor(data?.setor || null);
        } else {
          setSetor(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Fetch user setor
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('setor')
          .eq('user_id', data.user.id)
          .single();
        
        setUser(data.user);
        setSetor(roleData?.setor || null);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a)!`,
        });
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, setor: SetorType): Promise<boolean> => {
    try {
      setLoading(true);
      
      // 1. Criar o usuário com auto-confirm
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      
      if (signupError) throw signupError;
      
      if (!signupData.user || !signupData.session) {
        throw new Error('Usuário não foi criado');
      }
      
      // 2. Inserir o setor (usuário já está autenticado após signup)
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: signupData.user.id,
          setor: setor,
        });
      
      if (roleError) {
        console.error('Error inserting role:', roleError);
        throw new Error(`Não foi possível atribuir o setor: ${roleError.message}`);
      }
      
      // 3. Buscar o setor inserido
      const { data: roleData, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('setor')
        .eq('user_id', signupData.user.id)
        .single();
      
      if (roleCheckError || !roleData) {
        console.error('Role check error:', roleCheckError);
        throw new Error('Setor não foi salvo corretamente');
      }
      
      // 4. Definir estado
      setUser(signupData.user);
      setSetor(roleData.setor);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível criar sua conta",
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
      setSetor(null);
      
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
    setor,
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
