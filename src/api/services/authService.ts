import { LoginData, AuthResponse, User, ApiResponse } from '@/types';

// Simulação de chamadas para Firebase/Supabase
export class AuthService {
  static async signUp(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email.endsWith('@empresa.com')) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.email.split('@')[0],
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = `mock-token-${Date.now()}`;

      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockToken);

      return {
        success: true,
        data: {
          user: mockUser,
          token: mockToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      };
    }

    return { success: false, error: 'Email deve ser do domínio @empresa.com' };
  }

  static async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      
      if (user.email === data.email && user.role === data.role) {
        const mockToken = `mock-token-${Date.now()}`;
        
        localStorage.setItem('authToken', mockToken);
        
        return {
          success: true,
          data: {
            user,
            token: mockToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          },
        };
      }
    }

    return { success: false, error: 'Credenciais inválidas' };
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