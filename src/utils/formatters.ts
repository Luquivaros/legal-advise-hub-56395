// Utilitários de formatação
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Cálculos de comissão e projeções
export const calculateCommission = (value: number, rate: number = 10): number => {
  return value * (rate / 100);
};

export const calculateSavings = (
  originalValue: number,
  abusiveRate: number,
  legalRate: number
): number => {
  return originalValue * ((abusiveRate - legalRate) / 100);
};