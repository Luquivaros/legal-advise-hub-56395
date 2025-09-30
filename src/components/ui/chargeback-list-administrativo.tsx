import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Filter, Shield } from 'lucide-react';
import { Chargeback } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

type FilterStatus = 'all' | 'resolved' | 'lost';

interface ChargebackListAdministrativoProps {
  chargebacks: Chargeback[];
  loading?: boolean;
  title?: string;
}

// Mapeamento de IDs para nomes de consultores
const consultorNames: { [key: string]: string } = {
  '1': 'João Silva',
  '2': 'João Pedro',
  '3': 'Carlos Oliveira',
  '4': 'Ana Costa',
  '5': 'Rafael Lima',
  '6': 'Sofia Almeida',
  '7': 'Pedro Santos',
  '8': 'Miguel Torres',
  '9': 'Laura Martins',
  '10': 'Laura Martins'
};

export default function ChargebackListAdministrativo({ chargebacks, loading = false, title = "Lista de Chargebacks" }: ChargebackListAdministrativoProps) {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);
  const [selectedChargeback, setSelectedChargeback] = useState<Chargeback | null>(null);
  const [defenseDescription, setDefenseDescription] = useState('');

  const filteredChargebacks = chargebacks.filter(chargeback => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'resolved') return chargeback.status === 'resolved';
    if (filterStatus === 'lost') return chargeback.status === 'lost';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
            <span className="mr-1">↗</span>
            Revertido
          </Badge>
        );
      case 'lost':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
            <span className="mr-1">↘</span>
            Cancelado
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConsultorName = (consultorId: string) => {
    return consultorNames[consultorId] || `Consultor ${consultorId}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleCreateDefense = (chargeback: Chargeback) => {
    setSelectedChargeback(chargeback);
    setIsDefenseModalOpen(true);
  };

  const handleSaveDefense = () => {
    if (!defenseDescription.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, descreva a defesa.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Defesa criada",
      description: `Defesa criada com sucesso para ${selectedChargeback?.client.name}`,
    });
    
    setIsDefenseModalOpen(false);
    setDefenseDescription('');
    setSelectedChargeback(null);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-xl font-semibold text-foreground">
                {title}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70' : 'hover:bg-accent hover:text-accent-foreground'}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === 'lost' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('lost')}
                className={filterStatus === 'lost' ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70' : 'hover:bg-accent hover:text-accent-foreground'}
              >
                Cancelados
              </Button>
              <Button
                variant={filterStatus === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('resolved')}
                className={filterStatus === 'resolved' ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70' : 'hover:bg-accent hover:text-accent-foreground'}
              >
                Revertidos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">Carregando chargebacks...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/50">
                    <TableHead className="text-muted-foreground font-medium py-3">Cliente</TableHead>
                    <TableHead className="text-muted-foreground font-medium py-3">Consultor</TableHead>
                    <TableHead className="text-muted-foreground font-medium py-3">Valor</TableHead>
                    <TableHead className="text-muted-foreground font-medium py-3">Data</TableHead>
                    <TableHead className="text-muted-foreground font-medium py-3">Status</TableHead>
                    <TableHead className="text-muted-foreground font-medium py-3">Defesa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChargebacks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum chargeback encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChargebacks.map((chargeback) => (
                      <TableRow key={chargeback.id} className="hover:bg-muted/30 transition-colors border-b border-border/30">
                        <TableCell className="font-medium text-foreground py-4">
                          {chargeback.client.name}
                        </TableCell>
                        <TableCell className="text-foreground font-medium py-4">
                          {getConsultorName(chargeback.client.assignedConsultant)}
                        </TableCell>
                        <TableCell className={`font-semibold py-4 ${
                          chargeback.status === 'resolved' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(chargeback.amount)}
                        </TableCell>
                        <TableCell className="text-foreground py-4">
                          {format(new Date(chargeback.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="py-4">
                          {getStatusBadge(chargeback.status)}
                        </TableCell>
                        <TableCell className="py-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleCreateDefense(chargeback)}
                            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Criar Defesa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDefenseModalOpen} onOpenChange={setIsDefenseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Defesa de Chargeback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Cliente</Label>
              <p className="text-sm text-muted-foreground mt-1">{selectedChargeback?.client.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Valor</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedChargeback && formatCurrency(selectedChargeback.amount)}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defense-description">Descrição da Defesa</Label>
              <Textarea
                id="defense-description"
                placeholder="Descreva os argumentos e evidências da defesa..."
                value={defenseDescription}
                onChange={(e) => setDefenseDescription(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsDefenseModalOpen(false);
              setDefenseDescription('');
              setSelectedChargeback(null);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDefense}>
              Criar Defesa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}