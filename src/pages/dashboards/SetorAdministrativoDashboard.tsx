import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { FileText, Users, AlertTriangle, Archive } from "lucide-react";

// Dados mock específicos para Setor Administrativo
const documentosPorTipo = [
  { tipo: 'Contratos', quantidade: 245, pendentes: 12 },
  { tipo: 'Comprovantes', quantidade: 189, pendentes: 8 },
  { tipo: 'Procurações', quantidade: 156, pendentes: 5 },
  { tipo: 'Laudos', quantidade: 134, pendentes: 15 },
  { tipo: 'Outros', quantidade: 98, pendentes: 3 },
];

const atividadesRecentes = [
  { acao: 'Novo cliente adicionado', cliente: 'Maria Silva', timestamp: '10:30' },
  { acao: 'Documento anexado', cliente: 'José Santos', timestamp: '09:45' },
  { acao: 'Chargeback criado', cliente: 'Ana Costa', timestamp: '09:15' },
  { acao: 'Cliente editado', cliente: 'Pedro Lima', timestamp: '08:50' },
];

export default function SetorAdministrativoDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard - Setor Administrativo" 
        subtitle="Gestão de clientes, documentos e processos administrativos" 
      />
      
      {/* Métricas Administrativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          value="1.247"
          label="Total de Clientes"
          trend={{
            value: "+8.2%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="822"
          label="Documentos Ativos"
          trend={{
            value: "+12.5%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="43"
          label="Documentos Pendentes"
          trend={{
            value: "-15.3%",
            isPositive: true
          }}
        />
        
        <MetricCard
          value="7"
          label="Chargebacks Ativos"
          trend={{
            value: "-22.1%",
            isPositive: true
          }}
        />
      </div>

      {/* Ações Rápidas */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ações Administrativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center gap-2">
              <Users className="w-6 h-6" />
              <span>Adicionar Cliente</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <FileText className="w-6 h-6" />
              <span>Gerar Documento</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Gerenciar Chargebacks</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <Archive className="w-6 h-6" />
              <span>Arquivo Geral</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Atividades Recentes */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atividadesRecentes.map((atividade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{atividade.acao}</p>
                  <p className="text-sm text-muted-foreground">Cliente: {atividade.cliente}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{atividade.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status dos Documentos */}
      <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Status de Documentos por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentosPorTipo.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{doc.tipo}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.quantidade} documentos • {doc.pendentes} pendentes
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">{doc.quantidade}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  {doc.pendentes > 0 && (
                    <div className="text-right">
                      <p className="text-lg font-semibold text-destructive">{doc.pendentes}</p>
                      <p className="text-xs text-muted-foreground">Pendentes</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Documentos */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Documentos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={documentosPorTipo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="tipo" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="quantidade" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Total"
                  />
                  <Bar 
                    dataKey="pendentes" 
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                    name="Pendentes"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}