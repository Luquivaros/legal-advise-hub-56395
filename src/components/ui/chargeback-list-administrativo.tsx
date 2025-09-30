import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Shield, Upload } from 'lucide-react';
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
  
  // Chargeback info
  const [paymentMethod, setPaymentMethod] = useState('');
  const [chargebackReason, setChargebackReason] = useState('');
  const [deadline, setDeadline] = useState('');
  
  // Client data
  const [clientAddress, setClientAddress] = useState('');
  const [clientHistory, setClientHistory] = useState('');
  
  // Defense context
  const [defenseContext, setDefenseContext] = useState('');
  
  // Documents
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSaveDefense = () => {
    if (!paymentMethod || !chargebackReason || !defenseContext.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Defesa criada",
      description: `Defesa criada com sucesso para ${selectedChargeback?.client.name}`,
    });
    
    // Reset all fields
    setIsDefenseModalOpen(false);
    setPaymentMethod('');
    setChargebackReason('');
    setDeadline('');
    setClientAddress('');
    setClientHistory('');
    setDefenseContext('');
    setSelectedFiles([]);
    setSelectedChargeback(null);
  };

  const handleCloseModal = () => {
    setIsDefenseModalOpen(false);
    setPaymentMethod('');
    setChargebackReason('');
    setDeadline('');
    setClientAddress('');
    setClientHistory('');
    setDefenseContext('');
    setSelectedFiles([]);
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Defesa de Chargeback</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Informações do Chargeback */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Informações do Chargeback</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Método *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">Pix</SelectItem>
                      <SelectItem value="fictorpay">FictorPay</SelectItem>
                      <SelectItem value="mercado-pago">Mercado Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargeback-reason">Motivo *</Label>
                  <Select value={chargebackReason} onValueChange={setChargebackReason}>
                    <SelectTrigger id="chargeback-reason">
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fraude">Suspeita de Fraude</SelectItem>
                      <SelectItem value="desacordo">Desacordo Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input 
                    value={selectedChargeback ? formatCurrency(selectedChargeback.amount) : ''} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Prazo para Envio</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Dados do Cliente</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input 
                    value={selectedChargeback?.client.name || ''} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input 
                    value={selectedChargeback?.client.email || ''} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-address">Endereço</Label>
                  <Input
                    id="client-address"
                    placeholder="Digite o endereço do cliente"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input 
                    value={selectedChargeback?.client.phone || ''} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input 
                    value={selectedChargeback?.client.cpf || ''} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-history">Histórico do Cliente</Label>
                <Textarea
                  id="client-history"
                  placeholder="Adicione informações sobre o histórico do cliente..."
                  value={clientHistory}
                  onChange={(e) => setClientHistory(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Contexto da Defesa */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contexto da Defesa</h3>
              <div className="space-y-2">
                <Label htmlFor="defense-context">Contexto *</Label>
                <Textarea
                  id="defense-context"
                  placeholder="Descreva o contexto e argumentos da defesa..."
                  value={defenseContext}
                  onChange={(e) => setDefenseContext(e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            {/* Anexar Documentos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Anexar Documento</h3>
              <div className="space-y-2">
                <Label htmlFor="documents">Documentos</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {selectedFiles.length > 0 && (
                  <div className="text-sm text-muted-foreground mt-2">
                    {selectedFiles.length} arquivo(s) selecionado(s)
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleCloseModal}>
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