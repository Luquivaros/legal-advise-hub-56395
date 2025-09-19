import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { User, Phone, CreditCard, Trash2, CheckCircle2, CalendarIcon, DollarSign, Clock, MapPin, AlertTriangle } from 'lucide-react';

interface CommercialClientCardProps {
  client: {
    name: string;
    cpf: string;
    phone?: string;
    contractType?: string;
    source?: string;
  };
}

export function CommercialClientCard({ client }: CommercialClientCardProps) {
  const [observations, setObservations] = useState('');
  const [chargeValue, setChargeValue] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'total' | 'partial'>('total');
  const [entryValue, setEntryValue] = useState('');
  const [paymentDate, setPaymentDate] = useState<Date>();

  const contractTypes = [
    'Financiamento de Veículo',
    'Empréstimo Pessoal',
    'Financiamento de Imóvel',
    'Cartão de Crédito',
    'Crédito Consignado'
  ];

  const sources = [
    'Facebook',
    'Instagram', 
    'Google',
    'TV',
    'Indicação',
    'Outros'
  ];

  const timeSlots = [
    '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00'
  ];

  const handleRemoveClient = () => {
    console.log('Cliente removido da negociação');
    setIsRemoveDialogOpen(false);
  };

  const handleAgreementClosed = () => {
    const agreementData = {
      paymentType,
      entryValue: paymentType === 'partial' ? entryValue : chargeValue,
      paymentDate: paymentType === 'partial' ? paymentDate : null,
      totalValue: chargeValue,
      client,
      observations,
      scheduledTime
    };
    
    console.log('Acordo fechado:', agreementData);
    setIsAgreementOpen(false);
    
    // Reset form
    setPaymentType('total');
    setEntryValue('');
    setPaymentDate(undefined);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">
          Informações do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações Básicas do Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Nome</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              {client.name}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">CPF</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              {client.cpf}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Telefone</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {client.phone || 'Não informado'}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tipo</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              {client.contractType || 'Não informado'}
            </div>
          </div>
        </div>

        {/* Origem */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Origem</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {client.source || 'Não informado'}
            </div>
          </div>
        </div>

        {/* Inputs Editáveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="charge-value" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Valor a ser cobrado
            </Label>
            <Input
              id="charge-value"
              type="number"
              placeholder="R$ 0,00"
              value={chargeValue}
              onChange={(e) => setChargeValue(e.target.value)}
              className="bg-background/80 border border-border/50 focus:border-primary/50"
            />
          </div>
          <div>
            <Label htmlFor="scheduled-time" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Horário agendado
            </Label>
            <Select value={scheduledTime} onValueChange={setScheduledTime}>
              <SelectTrigger className="bg-background/80 border border-border/50 focus:border-primary/50">
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}h
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campo de Observações */}
        <div>
          <Label htmlFor="observations" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Observações
          </Label>
          <Textarea
            id="observations"
            placeholder="Descreva como foi a última interação com o cliente..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="min-h-[100px] bg-background/80 border border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-center">
          {/* Remover da Negociação */}
          <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1 max-w-[200px] border-primary text-primary hover:bg-primary/5 hover:text-primary"
              >
                <Trash2 className="w-4 h-4" />
                Remover da Negociação
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-br from-background to-background/95">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Confirmar Remoção
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Tem certeza que deseja remover <strong>{client.name}</strong> das negociações?
                  <br />
                  <span className="text-xs mt-2 block">CPF: {client.cpf}</span>
                  <br />
                  Esta ação não pode ser desfeita e todos os dados da negociação serão perdidos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRemoveClient}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Sim, Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Acordo Fechado */}
          <Dialog open={isAgreementOpen} onOpenChange={setIsAgreementOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-light to-orange-lighter text-white hover:from-orange-light-hover hover:to-orange-light flex items-center gap-2 flex-1 max-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle2 className="w-4 h-4" />
                Acordo Fechado
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-gradient-to-br from-background to-background/95">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Acordo Fechado
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Cliente: <strong>{client.name}</strong>
                </p>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Como foi o pagamento?</Label>
                  
                  <div className="space-y-3">
                    <div 
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                        paymentType === 'total' 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setPaymentType('total')}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all",
                        paymentType === 'total' 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground"
                      )}>
                        {paymentType === 'total' && (
                          <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Pagamento Total</p>
                        <p className="text-sm text-muted-foreground">Cliente pagou o valor completo</p>
                      </div>
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>

                    <div 
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all",
                        paymentType === 'partial' 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setPaymentType('partial')}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all",
                        paymentType === 'partial' 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground"
                      )}>
                        {paymentType === 'partial' && (
                          <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Apenas Entrada</p>
                        <p className="text-sm text-muted-foreground">Cliente pagou só a entrada</p>
                      </div>
                      <CalendarIcon className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>

                {paymentType === 'partial' && (
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <Label htmlFor="entry-value">Valor da Entrada Pago</Label>
                      <Input
                        id="entry-value"
                        type="number"
                        placeholder="R$ 0,00"
                        value={entryValue}
                        onChange={(e) => setEntryValue(e.target.value)}
                        className="bg-background/80 border border-border/50 focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Data para Pagamento do Restante</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-background/80 border border-border/50 hover:border-primary/50",
                              !paymentDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {paymentDate ? format(paymentDate, "dd/MM/yyyy") : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={paymentDate}
                            onSelect={setPaymentDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setIsAgreementOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAgreementClosed}
                  disabled={paymentType === 'partial' && (!entryValue || !paymentDate)}
                  className="flex-1 bg-gradient-to-r from-primary to-orange-light text-white hover:from-primary/90 hover:to-orange-light/90"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirmar Acordo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}