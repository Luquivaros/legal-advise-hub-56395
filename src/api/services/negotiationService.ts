import { 
  Negotiation, 
  ApiResponse, 
  PaginatedResponse, 
  NegotiationFilters,
  ServiceContract,
  ContractAnalysis,
  CalculationModal,
  EntryValueModal
} from '@/types';

export class NegotiationService {
  static async getNegotiations(
    userId: string,
    userRole: string,
    filters?: NegotiationFilters,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Negotiation>>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // TODO: Implementar busca real no Supabase
      // const query = supabase
      //   .from('negotiations')
      //   .select('*, client:clients(*)', { count: 'exact' })
      //   .range((page - 1) * limit, page * limit - 1);
      
      const mockData = await import('../mock/mockData');
      let negotiations = mockData.mockNegotiations;
      
      // Aplicar filtros baseados no role
      if (userRole === 'consultor-comercial' || userRole === 'consultor-juridico') {
        negotiations = negotiations.filter(neg => neg.consultant === userId);
      }
      
      // Aplicar filtros adicionais
      if (filters?.status?.length) {
        negotiations = negotiations.filter(neg => filters.status!.includes(neg.status));
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        negotiations = negotiations.filter(neg => 
          neg.client.name.toLowerCase().includes(searchTerm) ||
          neg.client.cpf.includes(searchTerm)
        );
      }
      
      const total = negotiations.length;
      const startIndex = (page - 1) * limit;
      const paginatedNegotiations = negotiations.slice(startIndex, startIndex + limit);
      
      return {
        success: true,
        data: {
          data: paginatedNegotiations,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar negociações'
      };
    }
  }

  static async getNegotiationById(negotiationId: string): Promise<ApiResponse<Negotiation>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const mockData = await import('../mock/mockData');
      const negotiation = mockData.mockNegotiations.find(n => n.id === negotiationId);
      
      if (negotiation) {
        return {
          success: true,
          data: negotiation
        };
      } else {
        return {
          success: false,
          error: 'Negociação não encontrada'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar negociação'
      };
    }
  }

  static async performCalculation(
    calculationData: CalculationModal
  ): Promise<ApiResponse<ContractAnalysis>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation of complex calculation
      
      // TODO: Implementar cálculo real de juros abusivos
      const { contractValue, interestRate, legalRate } = calculationData;
      
      // Simulação de cálculo
      const monthlySavings = (contractValue * (interestRate - legalRate) / 100) / 12;
      const potentialSavings = monthlySavings * 12; // Simplificado
      
      const analysis: ContractAnalysis = {
        originalValue: contractValue,
        abusiveRate: interestRate,
        legalRate: legalRate,
        potentialSavings: potentialSavings,
        analysisDate: new Date().toISOString(),
        analysedBy: 'current-user-id'
      };
      
      return {
        success: true,
        data: analysis,
        message: 'Cálculo realizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao realizar cálculo'
      };
    }
  }

  static async updateNegotiation(
    negotiationId: string,
    updates: Partial<Negotiation>
  ): Promise<ApiResponse<Negotiation>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar atualização no Supabase
      
      const mockData = await import('../mock/mockData');
      const negotiation = mockData.mockNegotiations.find(n => n.id === negotiationId);
      
      if (negotiation) {
        const updatedNegotiation = {
          ...negotiation,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        return {
          success: true,
          data: updatedNegotiation,
          message: 'Negociação atualizada com sucesso'
        };
      } else {
        return {
          success: false,
          error: 'Negociação não encontrada'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar negociação'
      };
    }
  }

  static async removeNegotiation(negotiationId: string): Promise<ApiResponse<void>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar remoção no Supabase
      return {
        success: true,
        message: 'Negociação removida com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover negociação'
      };
    }
  }

  static async contractService(
    entryData: EntryValueModal
  ): Promise<ApiResponse<ServiceContract>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementar criação de contrato no Supabase
      const contract: ServiceContract = {
        id: `contract${Date.now()}`,
        negotiationId: entryData.negotiationId,
        serviceType: 'Revisão de Juros Abusivos',
        value: entryData.entryValue * entryData.installments,
        installments: entryData.installments,
        paymentMethod: entryData.paymentMethod,
        startDate: new Date().toISOString(),
        contractedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: contract,
        message: 'Serviço contratado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao contratar serviço'
      };
    }
  }

  static async setEntryValue(
    negotiationId: string,
    entryData: EntryValueModal
  ): Promise<ApiResponse<Negotiation>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar atualização do valor de entrada
      const updates = {
        entryValue: entryData.entryValue,
        installments: entryData.installments,
        totalValue: entryData.entryValue * entryData.installments,
        status: 'proposal-sent' as const
      };
      
      return this.updateNegotiation(negotiationId, updates);
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao definir valor de entrada'
      };
    }
  }

  static async createNegotiation(
    clientId: string,
    consultant: string
  ): Promise<ApiResponse<Negotiation>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar criação de negociação no Supabase
      const mockData = await import('../mock/mockData');
      const client = mockData.mockClients.find(c => c.id === clientId);
      
      if (!client) {
        return {
          success: false,
          error: 'Cliente não encontrado'
        };
      }
      
      const newNegotiation: Negotiation = {
        id: `neg${Date.now()}`,
        clientId,
        client,
        status: 'pending',
        serviceType: 'Revisão de Juros Abusivos',
        consultant,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: newNegotiation,
        message: 'Negociação criada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar negociação'
      };
    }
  }
}