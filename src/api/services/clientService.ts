import { 
  Client, 
  ApiResponse, 
  PaginatedResponse, 
  ClientFilters, 
  AddClientModal,
  Document 
} from '@/types';

export class ClientService {
  static async getClients(
    userId: string, 
    userRole: string,
    filters?: ClientFilters,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Client>>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar busca real no Supabase com filtros e paginação
      // const query = supabase
      //   .from('clients')
      //   .select('*', { count: 'exact' })
      //   .range((page - 1) * limit, page * limit - 1);
      
      // if (userRole === 'consultor-comercial' || userRole === 'consultor-juridico') {
      //   query.eq('assigned_consultant', userId);
      // }
      
      // const { data, error, count } = await query;
      
      const mockData = await import('../mock/mockData');
      let clients = mockData.mockClients;
      
      // Aplicar filtros baseados no role
      if (userRole === 'consultor-comercial') {
        clients = clients.filter(client => 
          client.assignedConsultant === userId && 
          ['prospect', 'negotiation'].includes(client.status)
        );
      } else if (userRole === 'consultor-juridico') {
        clients = clients.filter(client => 
          client.assignedConsultant === userId &&
          client.protocol
        );
      }
      
      // Aplicar filtros adicionais
      if (filters?.status?.length) {
        clients = clients.filter(client => filters.status!.includes(client.status));
      }
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        clients = clients.filter(client => 
          client.name.toLowerCase().includes(searchTerm) ||
          client.email.toLowerCase().includes(searchTerm) ||
          client.cpf.includes(searchTerm)
        );
      }
      
      // Simulação de paginação
      const total = clients.length;
      const startIndex = (page - 1) * limit;
      const paginatedClients = clients.slice(startIndex, startIndex + limit);
      
      return {
        success: true,
        data: {
          data: paginatedClients,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao carregar clientes'
      };
    }
  }

  static async getClientById(clientId: string): Promise<ApiResponse<Client>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // TODO: Implementar busca por ID no Supabase
      // const { data, error } = await supabase
      //   .from('clients')
      //   .select('*')
      //   .eq('id', clientId)
      //   .single();
      
      const mockData = await import('../mock/mockData');
      const client = mockData.mockClients.find(c => c.id === clientId);
      
      if (client) {
        return {
          success: true,
          data: client
        };
      } else {
        return {
          success: false,
          error: 'Cliente não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao buscar cliente'
      };
    }
  }

  static async addClient(clientData: AddClientModal): Promise<ApiResponse<Client>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // TODO: Implementar inserção no Supabase
      // const { data, error } = await supabase
      //   .from('clients')
      //   .insert([{
      //     ...clientData,
      //     id: crypto.randomUUID(),
      //     status: 'prospect',
      //     created_at: new Date().toISOString(),
      //     updated_at: new Date().toISOString()
      //   }])
      //   .select()
      //   .single();
      
      const newClient: Client = {
        id: `cl${Date.now()}`,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        cpf: clientData.cpf,
        protocol: clientData.protocol,
        status: clientData.protocol ? 'contracted' : 'prospect',
        contractType: clientData.contractType,
        bankName: clientData.bankName,
        assignedConsultant: clientData.assignedConsultant || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: newClient,
        message: 'Cliente adicionado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao adicionar cliente'
      };
    }
  }

  static async updateClient(
    clientId: string, 
    updates: Partial<Client>
  ): Promise<ApiResponse<Client>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // TODO: Implementar atualização no Supabase
      // const { data, error } = await supabase
      //   .from('clients')
      //   .update({
      //     ...updates,
      //     updated_at: new Date().toISOString()
      //   })
      //   .eq('id', clientId)
      //   .select()
      //   .single();
      
      const mockData = await import('../mock/mockData');
      const client = mockData.mockClients.find(c => c.id === clientId);
      
      if (client) {
        const updatedClient = {
          ...client,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        return {
          success: true,
          data: updatedClient,
          message: 'Cliente atualizado com sucesso'
        };
      } else {
        return {
          success: false,
          error: 'Cliente não encontrado'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar cliente'
      };
    }
  }

  static async removeClient(clientId: string): Promise<ApiResponse<void>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Implementar remoção no Supabase (soft delete)
      // const { error } = await supabase
      //   .from('clients')
      //   .update({ deleted_at: new Date().toISOString() })
      //   .eq('id', clientId);
      
      return {
        success: true,
        message: 'Cliente removido com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover cliente'
      };
    }
  }

  static async uploadDocument(
    clientId: string,
    file: File,
    documentType: string
  ): Promise<ApiResponse<Document>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Upload simulation
      
      // TODO: Implementar upload real no Supabase Storage
      // const { data: uploadData, error: uploadError } = await supabase.storage
      //   .from('documents')
      //   .upload(`clients/${clientId}/${file.name}`, file);
      
      // const { data, error } = await supabase
      //   .from('documents')
      //   .insert([{
      //     client_id: clientId,
      //     type: documentType,
      //     name: file.name,
      //     url: uploadData?.path,
      //     uploaded_at: new Date().toISOString(),
      //     uploaded_by: userId
      //   }])
      //   .select()
      //   .single();
      
      const newDocument: Document = {
        id: `doc${Date.now()}`,
        type: documentType,
        name: file.name,
        url: `/documents/${file.name}`,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'current-user-id'
      };
      
      return {
        success: true,
        data: newDocument,
        message: 'Documento enviado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao enviar documento'
      };
    }
  }

  static async generateDocument(
    clientId: string,
    documentType: string
  ): Promise<ApiResponse<Document>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Generation simulation
      
      // TODO: Implementar geração de documentos
      const generatedDocument: Document = {
        id: `gen${Date.now()}`,
        type: documentType,
        name: `${documentType}_${clientId}.pdf`,
        url: `/generated/${documentType}_${clientId}.pdf`,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'system'
      };
      
      return {
        success: true,
        data: generatedDocument,
        message: 'Documento gerado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao gerar documento'
      };
    }
  }
}