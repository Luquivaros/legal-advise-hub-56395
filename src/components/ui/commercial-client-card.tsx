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
import { User, Phone, CreditCard, Trash2, CheckCircle2, CalendarIcon, DollarSign, Clock, MapPin, AlertTriangle, Calculator } from 'lucide-react';

interface RevisionalCalculationData {
  cpf: string;
  financeira: string;
  modeloVeiculo: string;
  valorFinanciado: number;
  valorEntrada: number;
  numeroMeses: number;
  valorParcela: number;
  qtPagas: number;
  qtAtrasadas: number;
}

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
  const [isCalculationOpen, setIsCalculationOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'total' | 'partial'>('total');
  const [entryValue, setEntryValue] = useState('');
  const [paymentDate, setPaymentDate] = useState<Date>();
  const [calculationData, setCalculationData] = useState<RevisionalCalculationData>({
    cpf: client.cpf || '',
    financeira: '',
    modeloVeiculo: '',
    valorFinanciado: 0,
    valorEntrada: 0,
    numeroMeses: 0,
    valorParcela: 0,
    qtPagas: 0,
    qtAtrasadas: 0,
  });

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

  const calculateRevisionalValues = () => {
    const mesesRestantes = calculationData.numeroMeses - calculationData.qtPagas;
    const reducaoPorParcela = calculationData.valorParcela * 0.3;
    const valorParcelaCorrigido = calculationData.valorParcela - reducaoPorParcela;
    const valorEstorno = reducaoPorParcela * calculationData.qtPagas;
    const reducaoTotal = reducaoPorParcela * mesesRestantes;

    return {
      mesesRestantes,
      valorParcelaCorrigido,
      reducaoPorParcela,
      valorEstorno,
      reducaoTotal,
    };
  };

  const revisionalCalculations = calculateRevisionalValues();

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

        {/* Botão de Cálculo Revisional */}
        <div className="flex justify-center pt-4 border-t border-border/30">
          <Dialog open={isCalculationOpen} onOpenChange={setIsCalculationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-light to-orange-lighter text-white hover:from-orange-light-hover hover:to-orange-light w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-300">
                <Calculator className="w-4 h-4 mr-2" />
                Cálculo Revisional
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-background/95">
              <DialogHeader className="border-b border-border/50 pb-4">
                <DialogTitle className="text-2xl font-bold text-center text-foreground">
                  Cálculo Revisional - Financiamento
                </DialogTitle>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Análise de redução de parcelas e valores de financiamento
                </p>
              </DialogHeader>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 py-6">
                {/* Seção de Entrada de Dados */}
                <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Dados do Financiamento
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Insira as informações do contrato de financiamento
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dados do Cliente e Veículo */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground border-b border-border/30 pb-2">
                        Informações do Cliente e Veículo
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            CPF
                          </Label>
                          <Input
                            type="text"
                            placeholder="000.000.000-00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.cpf}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              cpf: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Financeira
                          </Label>
                          <Input
                            type="text"
                            placeholder="Nome da financeira"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.financeira}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              financeira: e.target.value
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Modelo do Veículo
                          </Label>
                          <Input
                            type="text"
                            placeholder="Ex: Honda Civic 2020"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.modeloVeiculo}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              modeloVeiculo: e.target.value
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Valores do Financiamento */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground border-b border-border/30 pb-2">
                        Valores do Contrato
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Valor Financiado
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.valorFinanciado || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              valorFinanciado: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Valor de Entrada
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.valorEntrada || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              valorEntrada: Number(e.target.value)
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Informações das Parcelas */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground border-b border-border/30 pb-2">
                        Parcelas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Nº de Meses (Total)
                          </Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.numeroMeses || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              numeroMeses: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Valor da Parcela
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.valorParcela || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              valorParcela: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Qt. Pagas
                          </Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.qtPagas || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              qtPagas: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Qt. Atrasadas
                          </Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.qtAtrasadas || ''}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              qtAtrasadas: Number(e.target.value)
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Seção de Resultados */}
                <Card className="bg-gradient-to-br from-primary/5 to-orange-light/5 shadow-lg border border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calculator className="w-5 h-5 text-primary" />
                      Resultados da Análise
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Cálculos automáticos de redução e economia
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Cards de Resultados */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Meses Restantes */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              Nº de Meses Restantes
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                              {revisionalCalculations.mesesRestantes}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-primary/40" />
                        </div>
                      </div>

                      {/* Valor da Parcela Corrigido */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              Valor da Parcela Corrigido
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              R$ {revisionalCalculations.valorParcelaCorrigido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Redução de 30% aplicada
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-600/40" />
                        </div>
                      </div>

                      {/* Redução por Parcela */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              Redução por Parcela
                            </p>
                            <p className="text-2xl font-bold text-orange-600">
                              R$ {revisionalCalculations.reducaoPorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-orange-600/40" />
                        </div>
                      </div>

                      {/* Valor de Estorno */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              Valor de Estorno
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                              R$ {revisionalCalculations.valorEstorno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Total das parcelas já pagas
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-blue-600/40" />
                        </div>
                      </div>

                      {/* Redução Total */}
                      <div className="bg-gradient-to-br from-primary/10 to-orange-light/10 rounded-xl p-4 border-2 border-primary/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-primary mb-1 font-semibold">
                              Redução Total
                            </p>
                            <p className="text-3xl font-bold text-primary">
                              R$ {revisionalCalculations.reducaoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Economia nos meses restantes
                            </p>
                          </div>
                          <DollarSign className="w-10 h-10 text-primary/40" />
                        </div>
                      </div>
                    </div>

                    {/* Resumo Total */}
                    <div className="bg-gradient-to-r from-primary to-orange-light rounded-xl p-6 text-white">
                      <h4 className="font-semibold mb-3">Resumo do Benefício</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="opacity-90">Economia Mensal:</span>
                          <span className="font-bold">
                            R$ {revisionalCalculations.reducaoPorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-90">Valor a Receber:</span>
                          <span className="font-bold">
                            R$ {revisionalCalculations.valorEstorno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-white/30">
                          <span className="opacity-90">Total de Economia:</span>
                          <span className="font-bold text-lg">
                            R$ {(revisionalCalculations.valorEstorno + revisionalCalculations.reducaoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
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