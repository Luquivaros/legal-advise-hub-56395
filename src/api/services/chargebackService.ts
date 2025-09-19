import { 
  Chargeback, 
  ApiResponse, 
  PaginatedResponse,
  Defense,
  ChargebackMetrics,
  Document
} from '@/types';

export class ChargebackService {
  static async getChargebacks(
    userId: string,
    userRole: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Chargeback>>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar busca real no Supabase
      const mockData = await import('../mock/mockData');
      let chargebacks = mockData.mockChargebacks;
      
      // Filtros baseados no role - administrativos e supervisores veem todos
      if (userRole === 'consultor-comercial' || userRole === 'consultor-juridico') {
        chargebacks = chargebacks.filter(cb => 
          cb.client.assignedConsultant === userId
        );
      }
      
      const total = chargebacks.length;
      const startIndex = (page - 1) * limit;
      const paginatedChargebacks = chargebacks.slice(startIndex, startIndex + limit);
      
      return {
        success: true,
        data: {
          data: paginatedChargebacks,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar chargebacks'
      };
    }
  }

  static async getChargebackById(chargebackId: string): Promise<ApiResponse<Chargeback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockData = await import('../mock/mockData');
      const chargeback = mockData.mockChargebacks.find(cb => cb.id === chargebackId);
      
      if (chargeback) {
        return {
          success: true,
          data: chargeback
        };
      } else {
        return {
          success: false,
          error: 'Chargeback não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar chargeback'
      };
    }
  }

  static async getChargebackMetrics(
    userId?: string,
    userRole?: string
  ): Promise<ApiResponse<ChargebackMetrics>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar cálculo real de métricas no Supabase
      const mockData = await import('../mock/mockData');
      
      return {
        success: true,
        data: mockData.mockChargebackMetrics
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar métricas de chargeback'
      };
    }
  }

  static async createDefense(
    chargebackId: string,
    description: string,
    documents: File[]
  ): Promise<ApiResponse<Defense>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Upload simulation
      
      // TODO: Implementar upload de documentos e criação de defesa no Supabase
      const uploadedDocs: Document[] = documents.map((file, index) => ({
        id: `defense_doc${Date.now()}_${index}`,
        type: 'Defesa',
        name: file.name,
        url: `/documents/defenses/${file.name}`,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'current-user-id'
      }));
      
      const newDefense: Defense = {
        id: `def${Date.now()}`,
        chargebackId,
        description,
        documents: uploadedDocs,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user-id',
        status: 'pending'
      };
      
      return {
        success: true,
        data: newDefense,
        message: 'Defesa criada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar defesa'
      };
    }
  }

  static async updateChargebackStatus(
    chargebackId: string,
    status: Chargeback['status']
  ): Promise<ApiResponse<Chargeback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar atualização no Supabase
      const mockData = await import('../mock/mockData');
      const chargeback = mockData.mockChargebacks.find(cb => cb.id === chargebackId);
      
      if (chargeback) {
        const updatedChargeback = {
          ...chargeback,
          status,
          resolvedAt: status === 'resolved' ? new Date().toISOString() : chargeback.resolvedAt
        };
        
        return {
          success: true,
          data: updatedChargeback,
          message: 'Status do chargeback atualizado com sucesso'
        };
      } else {
        return {
          success: false,
          error: 'Chargeback não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar status do chargeback'
      };
    }
  }

  static async submitDefense(defenseId: string): Promise<ApiResponse<Defense>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementar submissão de defesa
      const mockDefense: Defense = {
        id: defenseId,
        chargebackId: 'mock',
        description: 'Defesa submetida',
        documents: [],
        createdAt: new Date().toISOString(),
        createdBy: 'current-user-id',
        status: 'submitted'
      };
      
      return {
        success: true,
        data: mockDefense,
        message: 'Defesa submetida com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao submeter defesa'
      };
    }
  }

  static async createChargeback(
    clientId: string,
    negotiationId: string,
    amount: number,
    reason: string
  ): Promise<ApiResponse<Chargeback>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar criação de chargeback no Supabase
      const mockData = await import('../mock/mockData');
      const client = mockData.mockClients.find(c => c.id === clientId);
      
      if (!client) {
        return {
          success: false,
          error: 'Cliente não encontrado'
        };
      }
      
      const newChargeback: Chargeback = {
        id: `chb${Date.now()}`,
        clientId,
        client,
        negotiationId,
        amount,
        reason,
        status: 'pending',
        createdAt: new Date().toISOString(),
        defenses: []
      };
      
      return {
        success: true,
        data: newChargeback,
        message: 'Chargeback criado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar chargeback'
      };
    }
  }
}