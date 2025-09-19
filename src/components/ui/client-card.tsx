import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calculator, User, Phone, CreditCard, Trash2, CheckCircle2, CalendarIcon, DollarSign, AlertTriangle, Clock } from 'lucide-react';

interface ClientCardProps {
  client: {
    name: string;
    cpf: string;
    phone?: string;
  };
}

interface CalculationFormData {
  originalInstallment: number;
  currentInstallment: number;
  paidInstallments: number;
  remainingInstallments: number;
  contractFees: number;
  reportValue: number;
  certificateValue: number;
  platformInterest: number;
  totalToCharge: number;
}

export function ClientCard({ client }: ClientCardProps) {
  const [chargeValue, setChargeValue] = useState('');
  const [service, setService] = useState('');
  const [callTime, setCallTime] = useState('');
  const [observations, setObservations] = useState('');
  const [isCalculationOpen, setIsCalculationOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'total' | 'partial'>('total');
  const [entryValue, setEntryValue] = useState('');
  const [paymentDate, setPaymentDate] = useState<Date>();
  const [calculationData, setCalculationData] = useState<CalculationFormData>({
    originalInstallment: 0,
    currentInstallment: 0,
    paidInstallments: 0,
    remainingInstallments: 0,
    contractFees: 0,
    reportValue: 0,
    certificateValue: 0,
    platformInterest: 0,
    totalToCharge: 0,
  });

  const calculateValues = () => {
    const discountPerInstallment = calculationData.originalInstallment - calculationData.currentInstallment;
    const refund = calculationData.paidInstallments * discountPerInstallment;
    const totalSavings = discountPerInstallment * calculationData.remainingInstallments;
    const feesRefund = calculationData.contractFees * 2;
    const totalRefund = feesRefund + refund;
    const causeValue = totalRefund + totalSavings;
    const chargeValue = calculationData.reportValue + calculationData.certificateValue;
    const chargeWithInterest = chargeValue + calculationData.platformInterest;

    return {
      discountPerInstallment,
      refund,
      totalSavings,
      feesRefund,
      totalRefund,
      causeValue,
      chargeValue,
      chargeWithInterest,
    };
  };

  const calculations = calculateValues();

  const handleRemoveClient = () => {
    // Implementar lógica de remoção
    console.log('Cliente removido da negociação');
    setIsRemoveDialogOpen(false);
    // Aqui você pode chamar uma API ou atualizar o estado global
  };

  const handleAgreementClosed = () => {
    // Implementar lógica de acordo fechado
    const agreementData = {
      paymentType,
      entryValue: paymentType === 'partial' ? entryValue : chargeValue,
      paymentDate: paymentType === 'partial' ? paymentDate : null,
      totalValue: chargeValue,
      client
    };
    
    console.log('Acordo fechado:', agreementData);
    setIsAgreementOpen(false);
    
    // Reset form
    setPaymentType('total');
    setEntryValue('');
    setPaymentDate(undefined);
    
    // Aqui você pode chamar uma API ou atualizar o estado global
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">
          Informações do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações do Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Nome</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              {client.name}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>CPF</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              {client.cpf}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Telefone</Label>
            <div className="p-2 bg-muted rounded-md flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {client.phone || 'Não informado'}
            </div>
          </div>
        </div>

        {/* Botões Accordion */}
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="historico">
            <AccordionTrigger className="text-primary hover:text-primary hover:no-underline [&>svg]:text-primary uppercase">HISTÓRICO</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Histórico de pagamentos e interações:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Contrato iniciado em 01/01/2024</li>
                  <li>• Última parcela paga: 15/08/2024</li>
                  <li>• Total pago até agora: R$ 2.450,00</li>
                  <li>• Status: Em dia</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="movimentacoes">
            <AccordionTrigger className="text-primary hover:text-primary hover:no-underline [&>svg]:text-primary uppercase">MOVIMENTAÇÕES</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Últimas movimentações processuais:</p>
                <ul className="space-y-1 text-sm">
                  <li>• 20/08/2024 - Audiência de conciliação marcada</li>
                  <li>• 15/08/2024 - Contestação protocolada</li>
                  <li>• 10/08/2024 - Citação realizada</li>
                  <li>• 05/08/2024 - Processo distribuído</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="servico">
            <AccordionTrigger className="text-primary hover:text-primary hover:no-underline [&>svg]:text-primary uppercase">SERVIÇO</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Serviço indicado baseado nas movimentações:</p>
                <div className="bg-primary/10 p-3 rounded-md">
                  <p className="font-medium">Análise de Juros Abusivos</p>
                  <p className="text-sm text-muted-foreground">
                    Recomendado laudo técnico para análise de taxas contratuais
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Inputs Horizontais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="charge-value" className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Valor a ser cobrado</Label>
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
            <Label htmlFor="service" className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Serviço</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="bg-background/80 border border-border/50 focus:border-primary/50">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laudo">Laudo</SelectItem>
                <SelectItem value="certidao">Certidão</SelectItem>
                <SelectItem value="audiencia">Audiência</SelectItem>
                <SelectItem value="quitacao">Quitação</SelectItem>
                <SelectItem value="titulo-abertura">Título de Abertura</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="call-time" className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Horário da ligação</Label>
            <Select value={callTime} onValueChange={setCallTime}>
              <SelectTrigger className="bg-background/80 border border-border/50 focus:border-primary/50">
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8:00">8h00</SelectItem>
                <SelectItem value="8:30">8h30</SelectItem>
                <SelectItem value="9:00">9h00</SelectItem>
                <SelectItem value="9:30">9h30</SelectItem>
                <SelectItem value="10:00">10h00</SelectItem>
                <SelectItem value="10:30">10h30</SelectItem>
                <SelectItem value="11:00">11h00</SelectItem>
                <SelectItem value="11:30">11h30</SelectItem>
                <SelectItem value="12:00">12h00</SelectItem>
                <SelectItem value="12:30">12h30</SelectItem>
                <SelectItem value="13:00">13h00</SelectItem>
                <SelectItem value="13:30">13h30</SelectItem>
                <SelectItem value="14:00">14h00</SelectItem>
                <SelectItem value="14:30">14h30</SelectItem>
                <SelectItem value="15:00">15h00</SelectItem>
                <SelectItem value="15:30">15h30</SelectItem>
                <SelectItem value="16:00">16h00</SelectItem>
                <SelectItem value="16:30">16h30</SelectItem>
                <SelectItem value="17:00">17h00</SelectItem>
                <SelectItem value="17:30">17h30</SelectItem>
                <SelectItem value="18:00">18h00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campo de Observações */}
        <div>
          <Label htmlFor="observations" className="text-xs font-medium uppercase tracking-wide" style={{ color: 'hsl(0, 0%, 45%)' }}>Observações</Label>
          <Textarea
            id="observations"
            placeholder="Descreva como foi a última interação com o cliente..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="min-h-[100px] bg-background/80 border border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Botão de Cálculo */}
        <div className="flex justify-center">
          <Dialog open={isCalculationOpen} onOpenChange={setIsCalculationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-light to-orange-lighter text-white hover:from-orange-light-hover hover:to-orange-light w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-300">
                <Calculator className="w-4 h-4 mr-2" />
                Cálculo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-background/95">
              <DialogHeader className="border-b border-border/50 pb-4">
                <DialogTitle className="text-2xl font-bold text-center text-foreground">
                  Cálculos Revisionais
                </DialogTitle>
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Análise detalhada de contratos e cálculos de juros abusivos
                </p>
              </DialogHeader>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 py-6">
                {/* Seção de Entrada de Dados */}
                <Card className="bg-gradient-to-br from-card to-card/95 shadow-lg border border-border/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Dados do Contrato
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Insira as informações contratuais para análise
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Grid de Inputs - Dados Básicos */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground border-b border-border/30 pb-2">
                        Informações das Parcelas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Parcela Original
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.originalInstallment}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              originalInstallment: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Parcela Atual
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.currentInstallment}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              currentInstallment: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Parcelas Pagas
                          </Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.paidInstallments}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              paidInstallments: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Parcelas Restantes
                          </Label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.remainingInstallments}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              remainingInstallments: Number(e.target.value)
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Taxas e Valores */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground border-b border-border/30 pb-2">
                        Taxas e Custos
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Taxas do Contrato
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.contractFees}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              contractFees: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Juros da Plataforma
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.platformInterest}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              platformInterest: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Valor do Laudo
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.reportValue}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              reportValue: Number(e.target.value)
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Valor da Certidão
                          </Label>
                          <Input
                            type="number"
                            placeholder="R$ 0,00"
                            className="bg-background/80 border border-border/50 focus:border-primary/50"
                            value={calculationData.certificateValue}
                            onChange={(e) => setCalculationData({
                              ...calculationData,
                              certificateValue: Number(e.target.value)
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
                      Cálculos automáticos baseados nos dados inseridos
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Cards de Resultados */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Desconto por Parcela */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Desconto por Parcela
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {calculations.discountPerInstallment.toFixed(2)}
                            </p>
                          </div>
                          <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Reembolso */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Reembolso Total
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {calculations.refund.toFixed(2)}
                            </p>
                          </div>
                          <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Economia Total */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Economia Total
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {calculations.totalSavings.toFixed(2)}
                            </p>
                          </div>
                          <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Reembolso de Taxas */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Reembolso de Taxas
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {calculations.feesRefund.toFixed(2)}
                            </p>
                          </div>
                          <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Valor da Causa */}
                      <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Valor da Causa
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {calculations.causeValue.toFixed(2)}
                            </p>
                          </div>
                          <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        </div>
                      </div>

                      {/* Resultado Final Destacado */}
                      <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-6 border border-white/20 shadow-2xl backdrop-blur-lg overflow-hidden mt-4">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 text-center">
                          <p className="text-xs font-medium text-white/90 uppercase tracking-wide drop-shadow-sm mb-2">
                            Valor Final a Cobrar
                          </p>
                          <p className="text-3xl font-bold text-white drop-shadow-lg">
                            R$ {calculations.chargeWithInterest.toFixed(2)}
                          </p>
                          <p className="text-xs text-white/80 font-medium drop-shadow-sm mt-1">
                            Incluindo juros da plataforma
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                <Button 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setIsCalculationOpen(false)}
                >
                  Voltar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-orange-light text-white hover:from-primary/90 hover:to-orange-light/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    setChargeValue(calculations.chargeWithInterest.toFixed(2));
                    setIsCalculationOpen(false);
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Aplicar Valor Calculado
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Botões Finais */}
        <div className="flex gap-4 justify-center">
          <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 flex-1 max-w-[200px] border-primary text-primary hover:bg-primary/5 hover:text-primary">
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