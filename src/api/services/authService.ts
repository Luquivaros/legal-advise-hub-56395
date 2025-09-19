import { LoginData, AuthResponse, User, ApiResponse } from '@/types';

// Simulação de chamadas para Firebase/Supabase
export class AuthService {
  static async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    try {
      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementar integração real com Supabase
      // const { data: authData, error } = await supabase.auth.signInWithPassword({
      //   email: data.email,
      //   password: data.password
      // });
      
      // Simulação de resposta
      if (data.email.includes('@empresa.com')) {
        // Mapear roles para IDs específicos que correspondem aos dados mockados
        const roleToId: Record<string, string> = {
          'consultor-comercial': '1',
          'consultor-juridico': '2', 
          'supervisor-comercial': '3',
          'supervisor-juridico': '4',
          'setor-administrativo': '5',
          'gerencia': '6'
        };

        const mockUser: User = {
          id: roleToId[data.role] || Math.random().toString(),
          email: data.email,
          name: data.email.split('@')[0].replace('.', ' '),
          role: data.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const response: AuthResponse = {
          user: mockUser,
          token: 'mock-jwt-token-' + Date.now(),
          expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 horas
        };
        
        return {
          success: true,
          data: response,
          message: 'Login realizado com sucesso'
        };
      } else {
        return {
          success: false,
          error: 'Credenciais inválidas'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro interno do servidor'
      };
    }
  }

  static async logout(): Promise<ApiResponse<void>> {
    try {
      // TODO: Implementar logout no Supabase
      // await supabase.auth.signOut();
      
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao realizar logout'
      };
    }
  }

  static async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // TODO: Implementar verificação de usuário atual no Supabase
      // const { data: { user } } = await supabase.auth.getUser();
      
      // Simulação
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        return {
          success: true,
          data: JSON.parse(storedUser)
        };
      } else {
        return {
          success: false,
          error: 'Usuário não autenticado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao verificar autenticação'
      };
    }
  }

  static async refreshToken(): Promise<ApiResponse<string>> {
    try {
      // TODO: Implementar refresh token no Supabase
      // const { data, error } = await supabase.auth.refreshSession();
      
      return {
        success: true,
        data: 'new-mock-token-' + Date.now(),
        message: 'Token atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar token'
      };
    }
  }
}