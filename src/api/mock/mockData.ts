import { 
  User, 
  Client, 
  Negotiation, 
  Chargeback, 
  DashboardData, 
  Feedback,
  ChargebackMetrics,
  ConversionData,
  Goal,
  ChartData
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'consultor.comercial@empresa.com',
    name: 'João Silva',
    role: 'comercial',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-01T15:30:00Z'
  },
  {
    id: '2',
    email: 'consultor.juridico@empresa.com',
    name: 'Maria Santos',
    role: 'juridico',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-12-01T14:20:00Z'
  },
  {
    id: '3',
    email: 'supervisor.comercial@empresa.com',
    name: 'Carlos Oliveira',
    role: 'supervisao_comercial',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-12-01T16:45:00Z'
  },
  {
    id: '4',
    email: 'supervisor.juridico@empresa.com',
    name: 'Ana Costa',
    role: 'supervisao_juridico',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-12-01T17:10:00Z'
  },
  {
    id: '5',
    email: 'administrativo@empresa.com',
    name: 'Pedro Ferreira',
    role: 'administrativo',
    createdAt: '2024-01-01T07:00:00Z',
    updatedAt: '2024-12-01T18:00:00Z'
  },
  {
    id: '6',
    email: 'gerencia@empresa.com',
    name: 'Laura Rodrigues',
    role: 'gerencia',
    createdAt: '2024-01-01T07:00:00Z',
    updatedAt: '2024-12-01T19:15:00Z'
  },
  {
    id: '7',
    email: 'escritorio@empresa.com',
    name: 'Ricardo Almeida',
    role: 'processual',
    createdAt: '2024-01-01T07:00:00Z',
    updatedAt: '2024-12-01T20:00:00Z'
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 'cl1',
    name: 'Roberto da Silva',
    email: 'roberto.silva@email.com',
    phone: '(11) 99999-1234',
    cpf: '123.456.789-00',
    protocol: 'PROT-2024-001',
    status: 'contracted',
    contractValue: 250000,
    interestRate: 8.5,
    bankName: 'Banco do Brasil',
    contractType: 'Financiamento Imobiliário',
    assignedConsultant: '2',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-15T14:30:00Z',
    documents: [
      {
        id: 'doc1',
        type: 'Contrato',
        name: 'contrato_financiamento.pdf',
        url: '/documents/contrato_financiamento.pdf',
        uploadedAt: '2024-11-01T10:30:00Z',
        uploadedBy: '2'
      }
    ],
    notes: [
      {
        id: 'note1',
        content: 'Cliente muito interessado na revisão. Taxa abusiva identificada.',
        createdAt: '2024-11-02T09:15:00Z',
        createdBy: '2'
      }
    ]
  },
    {
      id: 'cl2',
      name: 'Mariana Oliveira',
      email: 'mariana.oliveira@email.com',
      phone: '(11) 98888-5678',
      cpf: '987.654.321-00',
      status: 'negotiation',
      contractValue: 180000,
      interestRate: 12.3,
      bankName: 'Caixa Econômica Federal',
      contractType: 'Crédito Consignado',
      source: 'Facebook',
      assignedConsultant: '1',
      createdAt: '2024-11-20T11:00:00Z',
      updatedAt: '2024-12-01T16:00:00Z'
    },
    {
      id: 'cl3',
      name: 'José Santos',
      email: 'jose.santos@email.com',
      phone: '(11) 97777-9012',
      cpf: '456.789.123-00',
      status: 'prospect',
      contractValue: 95000,
      interestRate: 15.8,
      bankName: 'Itaú',
      contractType: 'Cartão de Crédito',
      source: 'Instagram',
      assignedConsultant: '1',
      createdAt: '2024-12-01T08:30:00Z',
      updatedAt: '2024-12-01T08:30:00Z'
    },
  {
    id: 'cl4',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 96666-3456',
    cpf: '789.123.456-00',
    status: 'chargeback',
    contractValue: 320000,
    interestRate: 9.2,
    bankName: 'Santander',
    contractType: 'Financiamento Veicular',
    assignedConsultant: '2',
    createdAt: '2024-10-15T14:00:00Z',
    updatedAt: '2024-11-28T10:45:00Z'
  }
];

// Mock Negotiations
export const mockNegotiations: Negotiation[] = [
  {
    id: 'neg1',
    clientId: 'cl1',
    client: mockClients[0],
    status: 'contracted',
    serviceType: 'Revisão de Juros Abusivos',
    entryValue: 2500,
    totalValue: 15000,
    installments: 12,
    consultant: '2',
    estimatedSavings: 45000,
    contractAnalysis: {
      originalValue: 250000,
      abusiveRate: 8.5,
      legalRate: 4.2,
      potentialSavings: 45000,
      analysisDate: '2024-11-02T10:00:00Z',
      analysedBy: '2'
    },
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-15T14:30:00Z',
    closedAt: '2024-11-15T14:30:00Z'
  },
  {
    id: 'neg2',
    clientId: 'cl2',
    client: mockClients[1],
    status: 'proposal-sent',
    serviceType: 'Revisão de Juros Abusivos',
    entryValue: 1800,
    totalValue: 12000,
    installments: 10,
    consultant: '1',
    estimatedSavings: 32000,
    contractAnalysis: {
      originalValue: 180000,
      abusiveRate: 12.3,
      legalRate: 5.8,
      potentialSavings: 32000,
      analysisDate: '2024-11-21T11:30:00Z',
      analysedBy: '2'
    },
    createdAt: '2024-11-20T11:00:00Z',
    updatedAt: '2024-12-01T16:00:00Z'
  },
  {
    id: 'neg3',
    clientId: 'cl3',
    client: mockClients[2],
    status: 'pending',
    serviceType: 'Revisão de Juros Abusivos',
    consultant: '1',
    createdAt: '2024-12-01T08:30:00Z',
    updatedAt: '2024-12-01T08:30:00Z'
  }
];

// Mock Chargebacks
export const mockChargebacks: Chargeback[] = [
  {
    id: 'chb1',
    clientId: 'cl1',
    client: {
      id: 'cl1',
      name: 'Maria Silva Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 99999-1234',
      cpf: '123.456.789-00',
      status: 'chargeback',
      contractValue: 80000,
      interestRate: 12.5,
      bankName: 'Banco do Brasil',
      contractType: 'Revisional',
      assignedConsultant: '2',
      createdAt: '2024-12-15T10:00:00Z',
      updatedAt: '2024-12-15T10:00:00Z'
    },
    negotiationId: 'neg1',
    amount: 2890,
    reason: 'Cliente insatisfeito com resultado da revisão',
    status: 'lost',
    createdAt: '2024-12-15T10:45:00Z',
    defenses: []
  },
  {
    id: 'chb2',
    clientId: 'cl2',
    client: {
      id: 'cl2',
      name: 'Carlos Eduardo Lima',
      email: 'carlos.lima@email.com',
      phone: '(11) 98888-5678',
      cpf: '987.654.321-00',
      status: 'chargeback',
      contractValue: 120000,
      interestRate: 10.8,
      bankName: 'Itaú',
      contractType: 'Consignado',
      assignedConsultant: '4',
      createdAt: '2024-12-14T14:00:00Z',
      updatedAt: '2024-12-14T14:00:00Z'
    },
    amount: 5420,
    reason: 'Não houve economia suficiente conforme prometido',
    status: 'resolved',
    createdAt: '2024-12-14T11:20:00Z',
    defenses: []
  },
  {
    id: 'chb3',
    clientId: 'cl3',
    client: {
      id: 'cl3',
      name: 'Fernanda Oliveira',
      email: 'fernanda.oliveira@email.com',
      phone: '(11) 97777-9012',
      cpf: '456.789.123-00',
      status: 'chargeback',
      contractValue: 45000,
      interestRate: 15.2,
      bankName: 'Caixa',
      contractType: 'Cartão de Crédito',
      assignedConsultant: '2',
      createdAt: '2024-12-13T16:30:00Z',
      updatedAt: '2024-12-13T16:30:00Z'
    },
    amount: 1680,
    reason: 'Cliente contestou os valores cobrados',
    status: 'lost',
    createdAt: '2024-12-13T17:00:00Z',
    defenses: []
  },
  {
    id: 'chb4',
    clientId: 'cl4',
    client: {
      id: 'cl4',
      name: 'Ricardo Mendes',
      email: 'ricardo.mendes@email.com',
      phone: '(11) 96666-3456',
      cpf: '789.123.456-00',
      status: 'chargeback',
      contractValue: 200000,
      interestRate: 9.5,
      bankName: 'Santander',
      contractType: 'Financiamento',
      assignedConsultant: '6',
      createdAt: '2024-12-12T09:15:00Z',
      updatedAt: '2024-12-12T09:15:00Z'
    },
    amount: 7350,
    reason: 'Divergência nos cálculos apresentados',
    status: 'resolved',
    createdAt: '2024-12-12T10:00:00Z',
    defenses: []
  },
  {
    id: 'chb5',
    clientId: 'cl5',
    client: {
      id: 'cl5',
      name: 'Juliana Ferreira',
      email: 'juliana.ferreira@email.com',
      phone: '(11) 95555-7890',
      cpf: '321.654.987-00',
      status: 'chargeback',
      contractValue: 90000,
      interestRate: 13.8,
      bankName: 'Bradesco',
      contractType: 'Crédito Pessoal',
      assignedConsultant: '8',
      createdAt: '2024-12-11T11:00:00Z',
      updatedAt: '2024-12-11T11:00:00Z'
    },
    amount: 3200,
    reason: 'Serviço não atendeu às expectativas',
    status: 'lost',
    createdAt: '2024-12-11T12:30:00Z',
    defenses: []
  },
  {
    id: 'chb6',
    clientId: 'cl6',
    client: {
      id: 'cl6',
      name: 'Roberto Cardoso',
      email: 'roberto.cardoso@email.com',
      phone: '(11) 94444-1234',
      cpf: '654.987.321-00',
      status: 'chargeback',
      contractValue: 75000,
      interestRate: 11.2,
      bankName: 'Banco do Brasil',
      contractType: 'Revisional',
      assignedConsultant: '10',
      createdAt: '2024-12-10T15:20:00Z',
      updatedAt: '2024-12-10T15:20:00Z'
    },
    amount: 4890,
    reason: 'Cliente não concordou com o valor final',
    status: 'resolved',
    createdAt: '2024-12-10T16:00:00Z',
    defenses: []
  }
];

// Mock Feedback
export const mockFeedbacks: Feedback[] = [
  {
    id: 'fb1',
    userId: '1',
    type: 'suggestion',
    title: 'Melhorar filtros na tela de clientes',
    description: 'Seria útil ter mais opções de filtro por data e status na tela de clientes.',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-11-30T14:00:00Z',
    updatedAt: '2024-11-30T14:00:00Z'
  },
  {
    id: 'fb2',
    userId: '2',
    type: 'bug',
    title: 'Erro no cálculo de comissões',
    description: 'O sistema está calculando incorretamente as comissões quando há múltiplas negociações.',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-11-29T10:30:00Z',
    updatedAt: '2024-12-01T09:15:00Z'
  }
];

// Mock Dashboard Data
export const mockDashboardData: Record<string, DashboardData> = {
  '1': { // Consultor Comercial
    user: mockUsers[0],
    metrics: {
      totalLeads: 47,
      convertedLeads: 12,
      conversionRate: 25.5,
      totalRevenue: 145000,
      commission: 14500,
      averageTicket: 12083,
      monthlyGrowth: 8.3
    },
    goals: [
      {
        id: 'goal1',
        type: 'leads',
        target: 50,
        current: 47,
        period: '2024-12',
        userId: '1'
      },
      {
        id: 'goal2',
        type: 'revenue',
        target: 150000,
        current: 145000,
        period: '2024-12',
        userId: '1'
      }
    ],
    charts: [
      {
        type: 'line',
        title: 'Leads por Semana',
        data: [
          { label: 'Sem 1', value: 8 },
          { label: 'Sem 2', value: 12 },
          { label: 'Sem 3', value: 15 },
          { label: 'Sem 4', value: 12 }
        ]
      }
    ],
    conversions: [
      {
        platform: 'Facebook Ads',
        leads: 25,
        conversions: 8,
        rate: 32
      },
      {
        platform: 'Google Ads',
        leads: 15,
        conversions: 3,
        rate: 20
      },
      {
        platform: 'Indicação',
        leads: 7,
        conversions: 1,
        rate: 14.3
      }
    ]
  },
  '2': { // Consultor Jurídico
    user: mockUsers[1],
    metrics: {
      totalLeads: 35,
      convertedLeads: 28,
      conversionRate: 80,
      totalRevenue: 420000,
      commission: 42000,
      averageTicket: 15000,
      monthlyGrowth: 12.5
    },
    goals: [
      {
        id: 'goal3',
        type: 'conversion',
        target: 85,
        current: 80,
        period: '2024-12',
        userId: '2'
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Contratos Analisados',
        data: [
          { label: 'Aprovados', value: 28, color: '#22c55e' },
          { label: 'Reprovados', value: 7, color: '#ef4444' }
        ]
      }
    ],
    conversions: []
  }
};

// Mock Chargeback Metrics
export const mockChargebackMetrics: ChargebackMetrics = {
  totalAmount: 26500,
  cancelledClients: 2,
  revertedAmount: 18000,
  reversalRate: 3.2,
  monthlyData: [
    { month: 'Set', amount: 5000, count: 1 },
    { month: 'Out', amount: 8500, count: 1 },
    { month: 'Nov', amount: 13000, count: 2 },
    { month: 'Dez', amount: 0, count: 0 }
  ]
};

// Mock Goals by Role
export const mockGoalsByRole: Record<string, Goal[]> = {
  'supervisor-comercial': [
    {
      id: 'team-goal1',
      type: 'leads',
      target: 200,
      current: 182,
      period: '2024-12',
      userId: 'team'
    }
  ],
  'supervisor-juridico': [
    {
      id: 'team-goal2',
      type: 'conversion',
      target: 85,
      current: 78,
      period: '2024-12',
      userId: 'team'
    }
  ],
  'gerencia': [
    {
      id: 'company-goal1',
      type: 'revenue',
      target: 2000000,
      current: 1750000,
      period: '2024-12',
      userId: 'company'
    }
  ]
};