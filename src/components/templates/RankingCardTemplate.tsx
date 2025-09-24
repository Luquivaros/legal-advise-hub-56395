import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

/**
 * ========== TEMPLATE COMPLETO DO CARD DE RANKING ==========
 * 
 * Este template contém todos os estilos e estruturas necessárias para criar
 * cards de ranking profissionais em qualquer tela do sistema.
 * 
 * ESTRUTURA:
 * - Card principal com header e título
 * - Card destacado para 1° colocado (glassmorphism SEM SOMBRA)
 * - Cards padrão para demais colocações (2° ao 5°)
 * - Layout responsivo e hover effects
 * 
 * CARACTERÍSTICAS VISUAIS:
 * - 1° lugar: Gradiente premium com efeitos glassmorphism
 * - Demais: Cards translúcidos com hover effects
 * - Dados: Nome, cargo, métricas (vendas/valor)
 */

interface RankingData {
  pos: string;
  name: string;
  title: string;
  sales: number;
  value: number;
}

interface RankingCardProps {
  title?: string;
  subtitle?: string;
  rankingData?: RankingData[];
  winner?: {
    pos: string;
    name: string;
    title: string;
    sales: number;
    value: number;
  };
}

// ========== DADOS EXEMPLO PARA REPLICAÇÃO ==========
const defaultRankingData: RankingData[] = [
  { pos: '2°', name: 'Fernanda Silva Rodrigues', title: 'Consultor Comercial', sales: 21, value: 142300 },
  { pos: '3°', name: 'Lucas Pereira Santos', title: 'Consultor Comercial', sales: 19, value: 128900 },
  { pos: '4°', name: 'Mariana Costa Lima', title: 'Consultor Comercial', sales: 16, value: 105600 },
  { pos: '5°', name: 'Daniel Oliveira Souza', title: 'Consultor Comercial', sales: 14, value: 92400 }
];

const defaultWinner = {
  pos: '1°',
  name: 'Ricardo Almeida Costa',
  title: 'Consultor Comercial Sênior',
  sales: 24,
  value: 156800
};

export default function RankingCardTemplate({ 
  title = "Ranking do Setor Comercial",
  subtitle = "Performance dos consultores do setor",
  rankingData = defaultRankingData,
  winner = defaultWinner
}: RankingCardProps) {

  return (
    <Card className="border border-gray-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          
          {/* ========== 1º COLOCADO - CARD PREMIUM ========== */}
          <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
            {/* ===== EFEITOS GLASSMORPHISM (3 camadas) ===== */}
            {/* Camada 1: Base blur */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            {/* Camada 2: Gradiente diagonal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
            {/* Camada 3: Gradiente radial do topo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            
            {/* ===== CONTEÚDO SOBRE O GLASSMORPHISM ===== */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                  <span className="text-sm font-bold text-white drop-shadow-sm">{winner.pos}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white drop-shadow-sm">{winner.name}</h3>
                  <p className="text-xs text-white/90 drop-shadow-sm">{winner.title}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-white drop-shadow-lg">{winner.sales}</p>
                    <p className="text-xs text-white/90 font-medium drop-shadow-sm">Vendas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-white drop-shadow-lg">R$ {winner.value.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-white/90 font-medium drop-shadow-sm">Valor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== DEMAIS COLOCAÇÕES (2° ao 5°) ========== */}
          {rankingData.map((consultant, index) => (
            <div key={index} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors hover:from-white/15 hover:to-muted/15">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">{consultant.pos}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{consultant.name}</h3>
                    <p className="text-xs text-muted-foreground">{consultant.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-base font-semibold text-foreground">{consultant.sales}</p>
                      <p className="text-xs text-muted-foreground font-medium">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-foreground">R$ {consultant.value.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-muted-foreground font-medium">Valor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * ========== GUIA DE USO COMPLETO ==========
 * 
 * 1. IMPORTAÇÃO:
 * import RankingCardTemplate from '@/components/templates/RankingCardTemplate';
 * 
 * 2. USO BÁSICO:
 * <RankingCardTemplate />
 * 
 * 3. USO PERSONALIZADO:
 * <RankingCardTemplate 
 *   title="Ranking Vendedores"
 *   subtitle="Top performers do mês"
 *   winner={{
 *     pos: '1°',
 *     name: 'João Silva',
 *     title: 'Vendedor Master',
 *     sales: 45,
 *     value: 250000
 *   }}
 *   rankingData={[
 *     { pos: '2°', name: 'Maria Santos', title: 'Vendedora Sênior', sales: 38, value: 195000 },
 *     { pos: '3°', name: 'Pedro Costa', title: 'Vendedor', sales: 32, value: 165000 }
 *   ]}
 * />
 * 
 * ========== CLASSES CSS IMPORTANTES ==========
 * 
 * Container Principal:
 * - Card: border border-gray-300
 * 
 * Card 1° Colocado (Glassmorphism SEM SOMBRA):
 * - relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden
 * 
 * Efeitos Glassmorphism (3 camadas):
 * - absolute inset-0 bg-white/10 backdrop-blur-sm
 * - absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent
 * - absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent
 * 
 * Badge Posição 1°:
 * - w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30
 * 
 * Cards Demais Posições:
 * - bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors hover:from-white/15 hover:to-muted/15
 * 
 * Badge Posições 2° ao 5°:
 * - w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center border border-border/30
 * 
 * Textos Card Winner:
 * - Nome: font-semibold text-white drop-shadow-sm
 * - Cargo: text-xs text-white/90 drop-shadow-sm
 * - Métricas: text-lg font-bold text-white drop-shadow-lg
 * - Labels: text-xs text-white/90 font-medium drop-shadow-sm
 * 
 * Textos Cards Normais:
 * - Nome: font-medium text-foreground
 * - Cargo: text-xs text-muted-foreground
 * - Métricas: text-base font-semibold text-foreground
 * - Labels: text-xs text-muted-foreground font-medium
 * 
 * ========== EXEMPLO DE DADOS CUSTOMIZADOS ==========
 * 
 * const salesRanking = [
 *   { pos: '2°', name: 'Ana Paula Lima', title: 'Consultora Sênior', sales: 18, value: 95000 },
 *   { pos: '3°', name: 'Carlos Eduardo', title: 'Consultor Pleno', sales: 15, value: 78000 },
 *   { pos: '4°', name: 'Beatriz Santos', title: 'Consultora Junior', sales: 12, value: 65000 }
 * ];
 * 
 * const topPerformer = {
 *   pos: '1°',
 *   name: 'Roberto Mendes',
 *   title: 'Consultor Master',
 *   sales: 25,
 *   value: 125000
 * };
 * 
 * <RankingCardTemplate 
 *   title="Ranking Mensal"
 *   subtitle="Performance de Janeiro 2024"
 *   winner={topPerformer}
 *   rankingData={salesRanking}
 * />
 */