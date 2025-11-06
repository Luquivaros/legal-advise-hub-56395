import { DashboardData, ApiResponse, Goal, ChartData } from '@/types';

export class DashboardService {
  static async getDashboardData(userId: string): Promise<ApiResponse<DashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar busca real no Supabase
      // const { data, error } = await supabase
      //   .from('dashboard_metrics')
      //   .select('*')
      //   .eq('user_id', userId)
      //   .single();
      
      // Simulação baseada no mock
      const mockData = await import('../mock/mockData');
      const dashboardData = mockData.mockDashboardData[userId];
      
      if (dashboardData) {
        return {
          success: true,
          data: dashboardData
        };
      } else {
        return {
          success: false,
          error: 'Dados do dashboard não encontrados'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar dados do dashboard'
      };
    }
  }

  static async updateGoal(goalId: string, target: number): Promise<ApiResponse<Goal>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar atualização no Supabase
      // const { data, error } = await supabase
      //   .from('goals')
      //   .update({ target })
      //   .eq('id', goalId)
      //   .select()
      //   .single();
      
      return {
        success: true,
        data: {
          id: goalId,
          type: 'revenue',
          target: target,
          current: 0,
          period: '2024-12',
          userId: 'mock'
        },
        message: 'Meta atualizada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar meta'
      };
    }
  }

  static async getTeamMetrics(supervisorId: string): Promise<ApiResponse<DashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementar busca de métricas da equipe no Supabase
      // const { data, error } = await supabase
      //   .from('team_metrics')
      //   .select('*')
      //   .eq('supervisor_id', supervisorId);
      
      // Simulação de métricas consolidadas da equipe
      const teamData: DashboardData = {
        user: {
          id: supervisorId,
          email: 'supervisor@empresa.com',
          name: 'Supervisor',
          role: 'supervisao_comercial',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        metrics: {
          totalLeads: 125,
          convertedLeads: 45,
          conversionRate: 36,
          totalRevenue: 675000,
          commission: 67500,
          averageTicket: 15000,
          monthlyGrowth: 15.2
        },
        goals: [
          {
            id: 'team-goal1',
            type: 'leads',
            target: 150,
            current: 125,
            period: '2024-12',
            userId: 'team'
          }
        ],
        charts: [
          {
            type: 'bar',
            title: 'Performance da Equipe',
            data: [
              { label: 'João', value: 47, color: '#3b82f6' },
              { label: 'Maria', value: 35, color: '#10b981' },
              { label: 'Carlos', value: 43, color: '#f59e0b' }
            ]
          }
        ],
        conversions: [
          {
            platform: 'Facebook Ads',
            leads: 65,
            conversions: 25,
            rate: 38.5
          },
          {
            platform: 'Google Ads',
            leads: 40,
            conversions: 15,
            rate: 37.5
          },
          {
            platform: 'Indicação',
            leads: 20,
            conversions: 5,
            rate: 25
          }
        ]
      };
      
      return {
        success: true,
        data: teamData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar métricas da equipe'
      };
    }
  }

  static async getCompanyMetrics(): Promise<ApiResponse<DashboardData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // TODO: Implementar métricas consolidadas da empresa
      const companyData: DashboardData = {
        user: {
          id: 'company',
          email: 'gerencia@empresa.com',
          name: 'Gerência',
          role: 'gerencia',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        metrics: {
          totalLeads: 487,
          convertedLeads: 178,
          conversionRate: 36.5,
          totalRevenue: 2670000,
          commission: 267000,
          averageTicket: 15000,
          monthlyGrowth: 18.7
        },
        goals: [
          {
            id: 'company-goal1',
            type: 'revenue',
            target: 3000000,
            current: 2670000,
            period: '2024-12',
            userId: 'company'
          }
        ],
        charts: [
          {
            type: 'line',
            title: 'Faturamento por Setor',
            data: [
              { label: 'Comercial', value: 1200000 },
              { label: 'Jurídico', value: 1470000 }
            ]
          }
        ],
        conversions: []
      };
      
      return {
        success: true,
        data: companyData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar métricas da empresa'
      };
    }
  }
}