import { useState, useEffect } from 'react';
import { ApiService } from '@/api';
import { ApiResponse } from '@/types';

// Hook principal para consumir a API
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || 'Erro desconhecido');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, dependencies);

  return { data, loading, error, refetch: execute };
}

// Hook específico para autenticação
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await ApiService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (data: any) => {
    const response = await ApiService.login(data);
    if (response.success && response.data) {
      setUser(response.data.user);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      localStorage.setItem('authToken', response.data.token);
    }
    return response;
  };

  const logout = async () => {
    await ApiService.logout();
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  return { user, loading, login, logout };
}