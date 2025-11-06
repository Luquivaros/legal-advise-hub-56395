// Tipos base do sistema
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 
  | 'consultor-comercial'
  | 'consultor-juridico' 
  | 'supervisor-comercial'
  | 'supervisor-juridico'
  | 'setor-administrativo'
  | 'gerencia'
  | 'escritorio-processual'
  | 'escritorio-audiencias';

export interface LoginData {
  email: string;
  password: string;
  role: UserRole;
  rememberMe: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

// Tipos de Dashboard
export interface DashboardData {
  user: User;
  metrics: DashboardMetrics;
  goals: Goal[];
  charts: ChartData[];
  conversions: ConversionData[];
}

export interface DashboardMetrics {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalRevenue: number;
  commission: number;
  averageTicket: number;
  monthlyGrowth: number;
}

export interface Goal {
  id: string;
  type: 'revenue' | 'leads' | 'conversion';
  target: number;
  current: number;
  period: string;
  userId: string;
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'donut';
  title: string;
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
}

export interface ConversionData {
  platform: string;
  leads: number;
  conversions: number;
  rate: number;
}

// Tipos de Clientes
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  protocol?: string;
  status: ClientStatus;
  contractValue?: number;
  interestRate?: number;
  bankName?: string;
  contractType: string;
  source?: string;
  assignedConsultant: string;
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
  notes?: Note[];
}

export type ClientStatus = 
  | 'prospect'
  | 'negotiation'
  | 'contracted'
  | 'cancelled'
  | 'chargeback';

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

// Tipos de Negociações
export interface Negotiation {
  id: string;
  clientId: string;
  client: Client;
  status: NegotiationStatus;
  serviceType: string;
  entryValue?: number;
  totalValue?: number;
  installments?: number;
  consultant: string;
  estimatedSavings?: number;
  contractAnalysis?: ContractAnalysis;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export type NegotiationStatus = 
  | 'pending'
  | 'in-progress'
  | 'calculated'
  | 'proposal-sent'
  | 'contracted'
  | 'cancelled'
  | 'chargeback';

export interface ContractAnalysis {
  originalValue: number;
  abusiveRate: number;
  legalRate: number;
  potentialSavings: number;
  analysisDate: string;
  analysedBy: string;
}

export interface ServiceContract {
  id: string;
  negotiationId: string;
  serviceType: string;
  value: number;
  installments: number;
  paymentMethod: string;
  startDate: string;
  contractedAt: string;
}

// Tipos de Chargebacks
export interface Chargeback {
  id: string;
  clientId: string;
  client: Client;
  negotiationId?: string;
  amount: number;
  reason: string;
  status: ChargebackStatus;
  createdAt: string;
  resolvedAt?: string;
  defenses: Defense[];
}

export type ChargebackStatus = 
  | 'pending'
  | 'in-defense'
  | 'resolved'
  | 'lost';

export interface Defense {
  id: string;
  chargebackId: string;
  description: string;
  documents: Document[];
  createdAt: string;
  createdBy: string;
  status: 'pending' | 'submitted' | 'accepted' | 'rejected';
}

export interface ChargebackMetrics {
  totalAmount: number;
  cancelledClients: number;
  revertedAmount: number;
  reversalRate: number;
  monthlyData: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
}

// Tipos de Feedback
export interface Feedback {
  id: string;
  userId: string;
  type: 'bug' | 'suggestion' | 'complaint' | 'compliment';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// Tipos de modals e formulários
export interface CalculationModal {
  clientId: string;
  contractValue: number;
  interestRate: number;
  legalRate: number;
}

export interface EntryValueModal {
  negotiationId: string;
  entryValue: number;
  installments: number;
  paymentMethod: string;
}

export interface AddClientModal {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  contractType: string;
  bankName?: string;
  assignedConsultant?: string;
  protocol?: string;
}

// Tipos de API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filtros e parâmetros de busca
export interface ClientFilters {
  status?: ClientStatus[];
  consultant?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface NegotiationFilters {
  status?: NegotiationStatus[];
  consultant?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}