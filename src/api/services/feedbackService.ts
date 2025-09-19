import { Feedback, ApiResponse, PaginatedResponse } from '@/types';

export class FeedbackService {
  static async submitFeedback(
    userId: string,
    feedbackData: Omit<Feedback, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Feedback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar inserção no Supabase
      // const { data, error } = await supabase
      //   .from('feedbacks')
      //   .insert([{
      //     ...feedbackData,
      //     user_id: userId,
      //     status: 'open',
      //     created_at: new Date().toISOString(),
      //     updated_at: new Date().toISOString()
      //   }])
      //   .select()
      //   .single();
      
      const newFeedback: Feedback = {
        id: `fb${Date.now()}`,
        userId,
        ...feedbackData,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: newFeedback,
        message: 'Feedback enviado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao enviar feedback'
      };
    }
  }

  static async getFeedbacks(
    userId?: string,
    userRole?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Feedback>>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar busca no Supabase
      const mockData = await import('../mock/mockData');
      let feedbacks = mockData.mockFeedbacks;
      
      // Filtros baseados no role
      if (userRole && !['setor-administrativo', 'gerencia'].includes(userRole)) {
        feedbacks = feedbacks.filter(fb => fb.userId === userId);
      }
      
      const total = feedbacks.length;
      const startIndex = (page - 1) * limit;
      const paginatedFeedbacks = feedbacks.slice(startIndex, startIndex + limit);
      
      return {
        success: true,
        data: {
          data: paginatedFeedbacks,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar feedbacks'
      };
    }
  }

  static async getFeedbackById(feedbackId: string): Promise<ApiResponse<Feedback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockData = await import('../mock/mockData');
      const feedback = mockData.mockFeedbacks.find(fb => fb.id === feedbackId);
      
      if (feedback) {
        return {
          success: true,
          data: feedback
        };
      } else {
        return {
          success: false,
          error: 'Feedback não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar feedback'
      };
    }
  }

  static async updateFeedbackStatus(
    feedbackId: string,
    status: Feedback['status'],
    adminUserId: string
  ): Promise<ApiResponse<Feedback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar atualização no Supabase
      const mockData = await import('../mock/mockData');
      const feedback = mockData.mockFeedbacks.find(fb => fb.id === feedbackId);
      
      if (feedback) {
        const updatedFeedback = {
          ...feedback,
          status,
          updatedAt: new Date().toISOString(),
          resolvedAt: status === 'resolved' ? new Date().toISOString() : feedback.resolvedAt
        };
        
        return {
          success: true,
          data: updatedFeedback,
          message: 'Status do feedback atualizado com sucesso'
        };
      } else {
        return {
          success: false,
          error: 'Feedback não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar status do feedback'
      };
    }
  }

  static async deleteFeedback(feedbackId: string): Promise<ApiResponse<void>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar remoção no Supabase
      return {
        success: true,
        message: 'Feedback removido com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover feedback'
      };
    }
  }
}