// API abstraction layer - permite alternar entre mock e serviços reais
import { AuthService } from './services/authService';
import { DashboardService } from './services/dashboardService';
import { ClientService } from './services/clientService';
import { NegotiationService } from './services/negotiationService';
import { ChargebackService } from './services/chargebackService';
import { FeedbackService } from './services/feedbackService';

// Configuração para alternar entre mock e produção
const USE_MOCK_DATA = true; // Altere para false quando integrar com Supabase

// Mock services (implementação futura se necessário)
class MockApiService {
  // Aqui poderiam ser implementados serviços mock específicos
  // Por enquanto, os serviços reais já têm simulação embutida
}

// API principal que abstrai entre mock e real
export class ApiService {
  // Auth
  static async login(data: Parameters<typeof AuthService.login>[0]) {
    return AuthService.login(data);
  }

  static async logout() {
    return AuthService.logout();
  }

  static async getCurrentUser() {
    return AuthService.getCurrentUser();
  }

  static async refreshToken() {
    return AuthService.refreshToken();
  }

  // Dashboard
  static async getDashboardData(userId: string) {
    return DashboardService.getDashboardData(userId);
  }

  static async updateGoal(goalId: string, target: number) {
    return DashboardService.updateGoal(goalId, target);
  }

  static async getTeamMetrics(supervisorId: string) {
    return DashboardService.getTeamMetrics(supervisorId);
  }

  static async getCompanyMetrics() {
    return DashboardService.getCompanyMetrics();
  }

  // Clients
  static async getClients(
    userId: string,
    userRole: string,
    filters?: Parameters<typeof ClientService.getClients>[2],
    page?: number,
    limit?: number
  ) {
    return ClientService.getClients(userId, userRole, filters, page, limit);
  }

  static async getClientById(clientId: string) {
    return ClientService.getClientById(clientId);
  }

  static async addClient(clientData: Parameters<typeof ClientService.addClient>[0]) {
    return ClientService.addClient(clientData);
  }

  static async updateClient(
    clientId: string,
    updates: Parameters<typeof ClientService.updateClient>[1]
  ) {
    return ClientService.updateClient(clientId, updates);
  }

  static async removeClient(clientId: string) {
    return ClientService.removeClient(clientId);
  }

  static async uploadDocument(
    clientId: string,
    file: File,
    documentType: string
  ) {
    return ClientService.uploadDocument(clientId, file, documentType);
  }

  static async generateDocument(clientId: string, documentType: string) {
    return ClientService.generateDocument(clientId, documentType);
  }

  // Negotiations
  static async getNegotiations(
    userId: string,
    userRole: string,
    filters?: Parameters<typeof NegotiationService.getNegotiations>[2],
    page?: number,
    limit?: number
  ) {
    return NegotiationService.getNegotiations(userId, userRole, filters, page, limit);
  }

  static async getNegotiationById(negotiationId: string) {
    return NegotiationService.getNegotiationById(negotiationId);
  }

  static async performCalculation(
    calculationData: Parameters<typeof NegotiationService.performCalculation>[0]
  ) {
    return NegotiationService.performCalculation(calculationData);
  }

  static async updateNegotiation(
    negotiationId: string,
    updates: Parameters<typeof NegotiationService.updateNegotiation>[1]
  ) {
    return NegotiationService.updateNegotiation(negotiationId, updates);
  }

  static async removeNegotiation(negotiationId: string) {
    return NegotiationService.removeNegotiation(negotiationId);
  }

  static async contractService(
    entryData: Parameters<typeof NegotiationService.contractService>[0]
  ) {
    return NegotiationService.contractService(entryData);
  }

  static async setEntryValue(
    negotiationId: string,
    entryData: Parameters<typeof NegotiationService.setEntryValue>[1]
  ) {
    return NegotiationService.setEntryValue(negotiationId, entryData);
  }

  static async createNegotiation(clientId: string, consultant: string) {
    return NegotiationService.createNegotiation(clientId, consultant);
  }

  // Chargebacks
  static async getChargebacks(
    userId: string,
    userRole: string,
    page?: number,
    limit?: number
  ) {
    return ChargebackService.getChargebacks(userId, userRole, page, limit);
  }

  static async getChargebackById(chargebackId: string) {
    return ChargebackService.getChargebackById(chargebackId);
  }

  static async getChargebackMetrics(userId?: string, userRole?: string) {
    return ChargebackService.getChargebackMetrics(userId, userRole);
  }

  static async createDefense(
    chargebackId: string,
    description: string,
    documents: File[]
  ) {
    return ChargebackService.createDefense(chargebackId, description, documents);
  }

  static async updateChargebackStatus(
    chargebackId: string,
    status: Parameters<typeof ChargebackService.updateChargebackStatus>[1]
  ) {
    return ChargebackService.updateChargebackStatus(chargebackId, status);
  }

  static async submitDefense(defenseId: string) {
    return ChargebackService.submitDefense(defenseId);
  }

  static async createChargeback(
    clientId: string,
    negotiationId: string,
    amount: number,
    reason: string
  ) {
    return ChargebackService.createChargeback(clientId, negotiationId, amount, reason);
  }

  // Feedback
  static async submitFeedback(
    userId: string,
    feedbackData: Parameters<typeof FeedbackService.submitFeedback>[1]
  ) {
    return FeedbackService.submitFeedback(userId, feedbackData);
  }

  static async getFeedbacks(
    userId?: string,
    userRole?: string,
    page?: number,
    limit?: number
  ) {
    return FeedbackService.getFeedbacks(userId, userRole, page, limit);
  }

  static async getFeedbackById(feedbackId: string) {
    return FeedbackService.getFeedbackById(feedbackId);
  }

  static async updateFeedbackStatus(
    feedbackId: string,
    status: Parameters<typeof FeedbackService.updateFeedbackStatus>[1],
    adminUserId: string
  ) {
    return FeedbackService.updateFeedbackStatus(feedbackId, status, adminUserId);
  }

  static async deleteFeedback(feedbackId: string) {
    return FeedbackService.deleteFeedback(feedbackId);
  }
}

// Export default para facilitar importação
export default ApiService;

// Re-export dos tipos para facilitar uso
export * from '../types';