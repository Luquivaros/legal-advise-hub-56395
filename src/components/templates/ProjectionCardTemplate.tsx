import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Phone, Clock, TrendingUp, TrendingDown, DollarSign, Target, Calendar, BarChart3, PieChart, Activity, Award } from 'lucide-react';

/**
 * ========== TEMPLATE COMPLETO DO CARD DE PROJEÇÕES ==========
 * 
 * Este template contém todos os estilos e variações possíveis para criar
 * cards de métricas e projeções em qualquer tela do sistema.
 * 
 * ESTRUTURA BÁSICA:
 * - Container principal com gradiente
 * - Grid responsivo (1 col mobile, 2 tablet, 4 desktop)
 * - 3 tipos de cards diferentes: default, glassmorphism, multiline
 * - Sistema de cores semânticas
 * 
 * CORES DISPONÍVEIS (design system):
 * - bg-green-500 (verde - tendência positiva)
 * - bg-red-500 (vermelho - tendência negativa)  
 * - bg-orange-500 (laranja - neutro/atenção)
 * - bg-primary (azul - primário)
 * - bg-secondary (cinza - secundário)
 * - bg-accent (roxo - destaque)
 */

interface MetricData {
  id: string;
  title: string;
  value: string | string[];
  icon: any;
  trend?: {
    value: string;
    isPositive: boolean;
    color?: 'green' | 'red' | 'orange';
  };
  type: 'default' | 'glassmorphism' | 'multiline';
}

interface ProjectionCardProps {
  title?: string;
  subtitle?: string;
  metrics?: MetricData[];
}

// ========== DADOS EXEMPLO PARA REPLICAÇÃO ==========
const defaultMetrics: MetricData[] = [
  {
    id: 'negotiations',
    title: 'Negociações',
    value: '12',
    icon: Users,
    trend: { value: '+3 desde ontem', isPositive: true },
    type: 'default'
  },
  {
    id: 'calls',
    title: 'Ligações',
    value: '8',
    icon: Phone,
    trend: { value: '+1 desde ontem', isPositive: true, color: 'orange' },
    type: 'default'
  },
  {
    id: 'revenue',
    title: 'Previsto Hoje',
    value: 'R$ 45.780',
    icon: TrendingUp,
    trend: { value: 'Meta do dia: R$ 50.000', isPositive: true },
    type: 'glassmorphism'
  },
  {
    id: 'schedule',
    title: 'Horários',
    value: ['09:00 - 12:00', '14:00 - 18:00'],
    icon: Clock,
    type: 'multiline'
  }
];

export default function ProjectionCardTemplate({ 
  title = "Projeção do Dia",
  subtitle = "Análises e projeções do dia",
  metrics = defaultMetrics
}: ProjectionCardProps) {

  // Função para obter cor do indicador
  const getTrendColor = (trend?: MetricData['trend']) => {
    if (!trend) return '';
    
    if (trend.color === 'orange') return 'bg-orange-500 text-orange-500';
    if (trend.color === 'red') return 'bg-red-500 text-red-500';
    return trend.isPositive ? 'bg-green-500 text-green-500' : 'bg-red-500 text-red-500';
  };

  // Renderizar card padrão
  const renderDefaultCard = (metric: MetricData) => (
    <div key={metric.id} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
      {/* Header do card com ícone */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <metric.icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{metric.title}</p>
        </div>
      </div>
      {/* Conteúdo principal com valor e indicador */}
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{metric.value}</p>
        {metric.trend && (
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getTrendColor(metric.trend).split(' ')[0]}`}></div>
            <span className={`text-xs font-medium ${getTrendColor(metric.trend).split(' ')[1]}`}>
              {metric.trend.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Renderizar card glassmorphism (SEM SOMBRA)
  const renderGlassmorphismCard = (metric: MetricData) => (
    <div key={metric.id} className="relative bg-gradient-to-r from-primary to-orange-500 rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
      {/* ===== EFEITOS GLASSMORPHISM (3 camadas) ===== */}
      {/* Camada 1: Base blur */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      {/* Camada 2: Gradiente diagonal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
      {/* Camada 3: Gradiente radial do topo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
      
      {/* ===== CONTEÚDO SOBRE O GLASSMORPHISM ===== */}
      <div className="relative z-10">
        {/* Header com ícone glassmorphism */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30">
            <metric.icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white/95 uppercase tracking-wide">{metric.title}</p>
          </div>
        </div>
        {/* Conteúdo principal branco */}
        <div className="space-y-1">
          <p className="text-2xl font-bold text-white">{metric.value}</p>
          {metric.trend && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white/70 rounded-full"></div>
              <span className="text-xs text-white/90 font-medium">{metric.trend.value}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderizar card múltiplas linhas
  const renderMultilineCard = (metric: MetricData) => (
    <div key={metric.id} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
      {/* Header do card com ícone */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <metric.icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{metric.title}</p>
        </div>
      </div>
      {/* Conteúdo com múltiplas linhas */}
      <div className="space-y-1">
        {Array.isArray(metric.value) ? (
          metric.value.map((line, index) => (
            <p key={index} className="text-sm font-semibold text-foreground">{line}</p>
          ))
        ) : (
          <p className="text-sm font-semibold text-foreground">{metric.value}</p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grid responsivo de métricas - 1 col mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            switch (metric.type) {
              case 'glassmorphism':
                return renderGlassmorphismCard(metric);
              case 'multiline':
                return renderMultilineCard(metric);
              default:
                return renderDefaultCard(metric);
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * ========== GUIA DE USO COMPLETO ==========
 * 
 * 1. IMPORTAÇÃO:
 * import ProjectionCardTemplate from '@/components/templates/ProjectionCardTemplate';
 * 
 * 2. USO BÁSICO:
 * <ProjectionCardTemplate />
 * 
 * 3. USO PERSONALIZADO:
 * <ProjectionCardTemplate 
 *   title="Métricas do Dia"
 *   subtitle="Acompanhe seu desempenho"
 *   metrics={customMetrics}
 * />
 * 
 * 4. ESTRUTURA DE DADOS:
 * const customMetrics = [
 *   {
 *     id: 'unique-id',
 *     title: 'Nome da Métrica',
 *     value: 'Valor ou ["linha1", "linha2"]',
 *     icon: IconeDoLucide,
 *     trend: { value: 'Texto', isPositive: true, color: 'green' },
 *     type: 'default' | 'glassmorphism' | 'multiline'
 *   }
 * ];
 * 
 * 5. ÍCONES DISPONÍVEIS:
 * - Users, Phone, Clock, TrendingUp, TrendingDown
 * - DollarSign, Target, Calendar, BarChart3, PieChart
 * - Activity, Award
 * 
 * 6. CORES DE TENDÊNCIA:
 * - green: Tendência positiva (padrão para isPositive: true)
 * - red: Tendência negativa (padrão para isPositive: false)
 * - orange: Neutro/atenção
 * 
 * 7. TIPOS DE CARD:
 * - default: Card padrão com valor único
 * - glassmorphism: Card premium com efeitos visuais (SEM SOMBRA)
 * - multiline: Card com múltiplas linhas de texto
 * 
 * ========== CLASSES CSS IMPORTANTES ==========
 * 
 * Container Principal:
 * - bg-gradient-to-br from-card to-card/95 border border-border
 * 
 * Grid Responsivo:
 * - grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4
 * 
 * Card Padrão:
 * - bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10
 * 
 * Card Glassmorphism:
 * - relative bg-gradient-to-r from-primary to-orange-500 rounded-xl p-4 border border-white/20 backdrop-blur-lg
 * 
 * Ícone Container:
 * - p-2 bg-primary/10 rounded-lg (padrão)
 * - p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30 (glassmorphism)
 * 
 * Título Métrica:
 * - text-xs font-medium text-muted-foreground uppercase tracking-wide (padrão)
 * - text-xs font-medium text-white/95 uppercase tracking-wide (glassmorphism)
 * 
 * Valor Principal:
 * - text-2xl font-bold text-foreground (padrão)
 * - text-2xl font-bold text-white (glassmorphism)
 * 
 * Indicador de Tendência:
 * - w-2 h-2 rounded-full + cor específica
 * - text-xs font-medium + cor específica
 * 
 * ========== EXEMPLO DE USO PERSONALIZADO ==========
 * 
 * const dashboardMetrics = [
 *   {
 *     id: 'vendas',
 *     title: 'Vendas Hoje',
 *     value: '24',
 *     icon: Target,
 *     trend: { value: '+15% vs ontem', isPositive: true },
 *     type: 'default'
 *   },
 *   {
 *     id: 'revenue',
 *     title: 'Faturamento',
 *     value: 'R$ 125.400',
 *     icon: DollarSign,
 *     trend: { value: 'Meta: R$ 150.000', isPositive: true },
 *     type: 'glassmorphism'
 *   },
 *   {
 *     id: 'agenda',
 *     title: 'Próximos Compromissos',
 *     value: ['14:00 - Reunião Cliente A', '16:30 - Apresentação Proposta B'],
 *     icon: Calendar,
 *     type: 'multiline'
 *   }
 * ];
 * 
 * <ProjectionCardTemplate 
 *   title="Dashboard Vendas"
 *   subtitle="Métricas em tempo real"
 *   metrics={dashboardMetrics}
 * />
 */