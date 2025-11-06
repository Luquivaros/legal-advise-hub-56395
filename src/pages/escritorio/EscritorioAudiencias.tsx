import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Users, Calendar, CheckCircle2, Download, X, Check, FileText, Clock, Mail, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockClientes = [
  {
    id: "1",
    nome: "João Silva Santos",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
    email: "joao.silva@email.com",
    dataAudiencia: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
    ]
  },
  {
    id: "2",
    nome: "Maria Oliveira Costa",
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
    endereco: "Av. Paulista, 1000 - São Paulo/SP",
    email: "maria.oliveira@email.com",
    dataAudiencia: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
    ]
  },
  {
    id: "3",
    nome: "Pedro Henrique Alves",
    cpf: "456.789.123-00",
    rg: "45.678.912-3",
    endereco: "Rua Augusta, 500 - São Paulo/SP",
    email: "pedro.alves@email.com",
    dataAudiencia: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
    ]
  }
];

type ClienteStatus = 'solicitacao' | 'pendente' | 'agendada' | 'finalizada';

interface ClienteExtended {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  email: string;
  dataAudiencia: string;
  status: ClienteStatus;
  prazoRetorno?: string;
  observacoes?: string;
  documentos: Array<{ id: string; nome: string; verificado: boolean }>;
}

export default function EscritorioAudiencias() {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<ClienteExtended[]>(
    mockClientes.map(c => ({ ...c, status: 'solicitacao' as ClienteStatus }))
  );
  const [verificarModalOpen, setVerificarModalOpen] = useState<{ clienteId: string; docId: string; tipo: 'ok' | 'x' } | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState<string>("");
  const [aceitarModalOpen, setAceitarModalOpen] = useState<string | null>(null);
  const [recusarModalOpen, setRecusarModalOpen] = useState<string | null>(null);
  const [prazoRetorno, setPrazoRetorno] = useState<string>("");
  const [observacoesRejeicao, setObservacoesRejeicao] = useState<string>("");
  
  // Estados para modais de Pendências
  const [observacoesModalOpen, setObservacoesModalOpen] = useState<string | null>(null);
  const [observacoesPendencia, setObservacoesPendencia] = useState<string>("");
  const [redefinirPrazoModalOpen, setRedefinirPrazoModalOpen] = useState<string | null>(null);
  const [novoPrazo, setNovoPrazo] = useState<string>("");
  const [motivoMudanca, setMotivoMudanca] = useState<string>("");
  const [confirmarAudienciaModalOpen, setConfirmarAudienciaModalOpen] = useState<string | null>(null);
  const [dataAudiencia, setDataAudiencia] = useState<string>("");
  
  // Estados para modais de Audiências Agendadas
  const [lembreteModalOpen, setLembreteModalOpen] = useState<string | null>(null);
  const [mensagemLembrete, setMensagemLembrete] = useState<string>("");
  const [finalizarModalOpen, setFinalizarModalOpen] = useState<string | null>(null);
  const [observacoesFinalizacao, setObservacoesFinalizacao] = useState<string>("");

  const clientesSolicitacao = clientes.filter(c => c.status === 'solicitacao');
  const clientesPendentes = clientes.filter(c => c.status === 'pendente');
  const clientesAgendadas = clientes.filter(c => c.status === 'agendada');
  const clientesFinalizadas = clientes.filter(c => c.status === 'finalizada');

  const handleAbrirModalVerificacao = (clienteId: string, docId: string, tipo: 'ok' | 'x') => {
    setVerificarModalOpen({ clienteId, docId, tipo });
    setMotivoRejeicao("");
  };

  const handleConfirmarVerificacao = () => {
    if (!verificarModalOpen) return;
    
    if (verificarModalOpen.tipo === 'x' && !motivoRejeicao) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione o motivo da rejeição.",
        variant: "destructive"
      });
      return;
    }

    const { clienteId, docId, tipo } = verificarModalOpen;
    
    setClientes(prev => prev.map(cliente => {
      if (cliente.id === clienteId) {
        return {
          ...cliente,
          documentos: cliente.documentos.map(doc => 
            doc.id === docId ? { ...doc, verificado: tipo === 'ok' } : doc
          )
        };
      }
      return cliente;
    }));
    
    toast({
      title: tipo === 'ok' ? "Documento aprovado" : "Documento rejeitado",
      description: tipo === 'ok' 
        ? "Documento verificado com sucesso." 
        : `Documento rejeitado: ${motivoRejeicao}`,
    });
    
    setVerificarModalOpen(null);
    setMotivoRejeicao("");
  };

  const handleDownloadDocumento = (nomeDoc: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${nomeDoc}...`,
    });
  };

  const handleAceitarSolicitacao = () => {
    if (!aceitarModalOpen) return;
    
    if (!prazoRetorno || parseInt(prazoRetorno) <= 0) {
      toast({
        title: "Atenção",
        description: "Por favor, informe um prazo válido.",
        variant: "destructive"
      });
      return;
    }

    setClientes(prev => prev.map(cliente => 
      cliente.id === aceitarModalOpen 
        ? { ...cliente, status: 'pendente' as ClienteStatus, prazoRetorno }
        : cliente
    ));

    toast({
      title: "Solicitação aceita",
      description: `Prazo de retorno: ${prazoRetorno} dias`,
    });
    
    setAceitarModalOpen(null);
    setPrazoRetorno("");
  };

  const handleRecusarSolicitacao = () => {
    if (!recusarModalOpen) return;

    setClientes(prev => prev.filter(cliente => cliente.id !== recusarModalOpen));

    toast({
      title: "Solicitação recusada",
      description: observacoesRejeicao ? "Observações registradas." : "Solicitação recusada.",
    });
    
    setRecusarModalOpen(null);
    setObservacoesRejeicao("");
  };

  const handleSalvarObservacoes = () => {
    if (!observacoesModalOpen) return;

    setClientes(prev => prev.map(cliente => 
      cliente.id === observacoesModalOpen 
        ? { ...cliente, observacoes: observacoesPendencia }
        : cliente
    ));

    toast({
      title: "Observações salvas",
      description: "As observações foram registradas com sucesso.",
    });
    
    setObservacoesModalOpen(null);
    setObservacoesPendencia("");
  };

  const handleRedefinirPrazo = () => {
    if (!redefinirPrazoModalOpen) return;
    
    if (!novoPrazo || parseInt(novoPrazo) <= 0 || !motivoMudanca) {
      toast({
        title: "Atenção",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setClientes(prev => prev.map(cliente => 
      cliente.id === redefinirPrazoModalOpen 
        ? { ...cliente, prazoRetorno: novoPrazo }
        : cliente
    ));

    toast({
      title: "Prazo redefinido",
      description: `Novo prazo: ${novoPrazo} dias. Motivo: ${motivoMudanca}`,
    });
    
    setRedefinirPrazoModalOpen(null);
    setNovoPrazo("");
    setMotivoMudanca("");
  };

  const handleConfirmarAudiencia = () => {
    if (!confirmarAudienciaModalOpen) return;
    
    if (!dataAudiencia) {
      toast({
        title: "Atenção",
        description: "Por favor, informe a data da audiência.",
        variant: "destructive"
      });
      return;
    }

    setClientes(prev => prev.map(cliente => 
      cliente.id === confirmarAudienciaModalOpen 
        ? { ...cliente, status: 'agendada' as ClienteStatus, dataAudiencia }
        : cliente
    ));

    toast({
      title: "Audiência confirmada",
      description: `Data da audiência: ${new Date(dataAudiencia).toLocaleDateString('pt-BR')}`,
    });
    
    setConfirmarAudienciaModalOpen(null);
    setDataAudiencia("");
  };

  const handleEnviarLembrete = () => {
    if (!lembreteModalOpen) return;
    
    if (!mensagemLembrete) {
      toast({
        title: "Atenção",
        description: "Por favor, escreva uma mensagem.",
        variant: "destructive"
      });
      return;
    }

    const cliente = clientes.find(c => c.id === lembreteModalOpen);

    toast({
      title: "Lembrete enviado",
      description: `E-mail enviado para ${cliente?.email}`,
    });
    
    setLembreteModalOpen(null);
    setMensagemLembrete("");
  };

  const handleFinalizarAudiencia = () => {
    if (!finalizarModalOpen) return;

    setClientes(prev => prev.map(cliente => 
      cliente.id === finalizarModalOpen 
        ? { ...cliente, status: 'finalizada' as ClienteStatus, observacoes: observacoesFinalizacao }
        : cliente
    ));

    toast({
      title: "Audiência finalizada",
      description: "A audiência foi finalizada com sucesso.",
    });
    
    setFinalizarModalOpen(null);
    setObservacoesFinalizacao("");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Audiências" 
        subtitle="Gerenciamento de audiências e documentação dos clientes" 
      />

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-black">
              <Users className="w-5 h-5 text-orange-500" />
              Clientes Recebidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">12</p>
            <p className="text-sm text-gray-400 mt-1">Neste mês</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-black">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              Audiências Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{clientesFinalizadas.length}</p>
            <p className="text-sm text-gray-400 mt-1">Concluídas</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-black">
              <Calendar className="w-5 h-5 text-orange-500" />
              Audiências Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{clientesPendentes.length}</p>
            <p className="text-sm text-gray-400 mt-1">Aguardando agendamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Card de Solicitações */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Solicitações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {clientesSolicitacao.map((cliente, index) => (
              <AccordionItem 
                key={cliente.id} 
                value={cliente.id} 
                className={`border-0 ${index !== clientesSolicitacao.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <AccordionTrigger className="hover:no-underline hover:scale-[1.01] transition-transform duration-150 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{cliente.nome}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 pb-4">
                  {/* Informações do Cliente */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm mb-3">Informações do Cliente</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">CPF:</span>
                        <p className="font-medium">{cliente.cpf}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RG:</span>
                        <p className="font-medium">{cliente.rg}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Endereço:</span>
                        <p className="font-medium">{cliente.endereco}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">E-mail:</span>
                        <p className="font-medium">{cliente.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documentos */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Documentos Necessários</h4>
                    <div className="space-y-2">
                      {cliente.documentos.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between bg-background border rounded-lg p-3">
                          <span className="text-sm font-medium">{doc.nome}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAbrirModalVerificacao(cliente.id, doc.id, 'ok')}
                              className="h-8"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Ok
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAbrirModalVerificacao(cliente.id, doc.id, 'x')}
                              className="h-8"
                            >
                              <X className="w-4 h-4 mr-1" />
                              X
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownloadDocumento(doc.nome)}
                              className="h-8"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3">
                    <Button 
                      variant="default" 
                      className="flex-1"
                      onClick={() => setAceitarModalOpen(cliente.id)}
                    >
                      Aceitar Solicitação
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => setRecusarModalOpen(cliente.id)}
                    >
                      Recusar Solicitação
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Card de Pendências */}
      {clientesPendentes.length > 0 && (
        <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Pendências
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {clientesPendentes.map((cliente, index) => (
                <AccordionItem 
                  key={cliente.id} 
                  value={cliente.id} 
                  className={`border-0 ${index !== clientesPendentes.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <AccordionTrigger className="hover:no-underline hover:scale-[1.01] transition-transform duration-150 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cliente.nome}</span>
                      {cliente.prazoRetorno && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                          Prazo: {cliente.prazoRetorno} dias
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4 pb-4">
                    {/* Informações do Cliente */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-sm mb-3">Informações do Cliente</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">CPF:</span>
                          <p className="font-medium">{cliente.cpf}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">RG:</span>
                          <p className="font-medium">{cliente.rg}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Endereço:</span>
                          <p className="font-medium">{cliente.endereco}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">E-mail:</span>
                          <p className="font-medium">{cliente.email}</p>
                        </div>
                      </div>
                      {cliente.observacoes && (
                        <div className="col-span-2 mt-3 pt-3 border-t">
                          <span className="text-muted-foreground">Observações:</span>
                          <p className="font-medium mt-1">{cliente.observacoes}</p>
                        </div>
                      )}
                    </div>

                    {/* Documentos */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3">Documentos Necessários</h4>
                      <div className="space-y-2">
                        {cliente.documentos.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between bg-background border rounded-lg p-3">
                            <span className="text-sm font-medium">{doc.nome}</span>
                            <div className="flex items-center gap-2">
                              {doc.verificado ? (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                  Verificado
                                </span>
                              ) : (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  Pendente
                                </span>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownloadDocumento(doc.nome)}
                                className="h-8"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setObservacoesModalOpen(cliente.id);
                          setObservacoesPendencia(cliente.observacoes || "");
                        }}
                      >
                        Observações do Escritório
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setRedefinirPrazoModalOpen(cliente.id)}
                      >
                        Redefinir Prazo
                      </Button>
                      <Button 
                        variant="default"
                        onClick={() => setConfirmarAudienciaModalOpen(cliente.id)}
                      >
                        Confirmar Audiência
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Card de Audiências Agendadas */}
      {clientesAgendadas.length > 0 && (
        <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Audiências Agendadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {clientesAgendadas.map((cliente, index) => (
                <AccordionItem 
                  key={cliente.id} 
                  value={cliente.id} 
                  className={`border-0 ${index !== clientesAgendadas.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <AccordionTrigger className="hover:no-underline hover:scale-[1.01] transition-transform duration-150 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cliente.nome}</span>
                      {cliente.dataAudiencia && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {new Date(cliente.dataAudiencia).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4 pb-4">
                    {/* Informações do Cliente */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-sm mb-3">Informações do Cliente</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">CPF:</span>
                          <p className="font-medium">{cliente.cpf}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">RG:</span>
                          <p className="font-medium">{cliente.rg}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Endereço:</span>
                          <p className="font-medium">{cliente.endereco}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">E-mail:</span>
                          <p className="font-medium">{cliente.email}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Data da Audiência:</span>
                          <p className="font-medium">{new Date(cliente.dataAudiencia).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Documentos */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3">Documentos Necessários</h4>
                      <div className="space-y-2">
                        {cliente.documentos.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between bg-background border rounded-lg p-3">
                            <span className="text-sm font-medium">{doc.nome}</span>
                            <div className="flex items-center gap-2">
                              {doc.verificado ? (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                  Verificado
                                </span>
                              ) : (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  Pendente
                                </span>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownloadDocumento(doc.nome)}
                                className="h-8"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => setLembreteModalOpen(cliente.id)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Enviar Lembrete
                      </Button>
                      <Button 
                        variant="default"
                        onClick={() => setFinalizarModalOpen(cliente.id)}
                      >
                        Audiência Finalizada
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Modal de Verificação de Documento */}
      <Dialog open={!!verificarModalOpen} onOpenChange={(open) => !open && setVerificarModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {verificarModalOpen?.tipo === 'ok' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {verificarModalOpen?.tipo === 'x' && (
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo da Rejeição *</Label>
                <Select value={motivoRejeicao} onValueChange={setMotivoRejeicao}>
                  <SelectTrigger id="motivo">
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Documento Errado">Documento Errado</SelectItem>
                    <SelectItem value="Documento corrompido">Documento corrompido</SelectItem>
                    <SelectItem value="Documento Ilegível">Documento Ilegível</SelectItem>
                    <SelectItem value="Documento Falso">Documento Falso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {verificarModalOpen?.tipo === 'ok' 
                ? 'Deseja confirmar que este documento está correto?' 
                : 'Deseja confirmar a rejeição deste documento?'}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setVerificarModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleConfirmarVerificacao}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Aceitar Solicitação */}
      <Dialog open={!!aceitarModalOpen} onOpenChange={(open) => !open && setAceitarModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Aceitar Solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo para Retorno (dias) *</Label>
              <Input
                id="prazo"
                type="number"
                min="1"
                placeholder="Ex: 30"
                value={prazoRetorno}
                onChange={(e) => setPrazoRetorno(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setAceitarModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleAceitarSolicitacao}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Recusar Solicitação */}
      <Dialog open={!!recusarModalOpen} onOpenChange={(open) => !open && setRecusarModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Recusar Solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações do Escritório</Label>
              <Textarea
                id="observacoes"
                placeholder="Digite aqui as observações sobre a recusa (opcional)..."
                value={observacoesRejeicao}
                onChange={(e) => setObservacoesRejeicao(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setRecusarModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                className="flex-1"
                onClick={handleRecusarSolicitacao}
              >
                Confirmar Recusa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Observações do Escritório (Pendências) */}
      <Dialog open={!!observacoesModalOpen} onOpenChange={(open) => !open && setObservacoesModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Observações do Escritório</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="observacoes-pendencia">Observações</Label>
              <Textarea
                id="observacoes-pendencia"
                placeholder="Digite aqui as observações importantes sobre a solicitação..."
                value={observacoesPendencia}
                onChange={(e) => setObservacoesPendencia(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setObservacoesModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSalvarObservacoes}
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Redefinir Prazo */}
      <Dialog open={!!redefinirPrazoModalOpen} onOpenChange={(open) => !open && setRedefinirPrazoModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Redefinir Prazo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="novo-prazo">Novo Prazo (dias) *</Label>
              <Input
                id="novo-prazo"
                type="number"
                min="1"
                placeholder="Ex: 30"
                value={novoPrazo}
                onChange={(e) => setNovoPrazo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivo-mudanca">Motivo da Mudança *</Label>
              <Textarea
                id="motivo-mudanca"
                placeholder="Explique o motivo da mudança de prazo..."
                value={motivoMudanca}
                onChange={(e) => setMotivoMudanca(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setRedefinirPrazoModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleRedefinirPrazo}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmar Audiência */}
      <Dialog open={!!confirmarAudienciaModalOpen} onOpenChange={(open) => !open && setConfirmarAudienciaModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirmar Audiência</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="data-audiencia">Data da Audiência *</Label>
              <Input
                id="data-audiencia"
                type="date"
                value={dataAudiencia}
                onChange={(e) => setDataAudiencia(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento-audiencia">Anexar Documento (opcional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="documento-audiencia"
                  type="file"
                  className="cursor-pointer"
                />
                <Upload className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setConfirmarAudienciaModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleConfirmarAudiencia}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Enviar Lembrete */}
      <Dialog open={!!lembreteModalOpen} onOpenChange={(open) => !open && setLembreteModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enviar Lembrete por E-mail</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mensagem-lembrete">Mensagem *</Label>
              <Textarea
                id="mensagem-lembrete"
                placeholder="Digite a mensagem que será enviada ao cliente..."
                value={mensagemLembrete}
                onChange={(e) => setMensagemLembrete(e.target.value)}
                rows={5}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setLembreteModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleEnviarLembrete}
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Finalizar Audiência */}
      <Dialog open={!!finalizarModalOpen} onOpenChange={(open) => !open && setFinalizarModalOpen(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Finalizar Audiência</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="observacoes-finalizacao">Observações do Escritório</Label>
              <Textarea
                id="observacoes-finalizacao"
                placeholder="Digite as observações finais (opcional)..."
                value={observacoesFinalizacao}
                onChange={(e) => setObservacoesFinalizacao(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ata-audiencia">Anexar Ata da Audiência *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ata-audiencia"
                  type="file"
                  className="cursor-pointer"
                  required
                />
                <Upload className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Campo obrigatório</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setFinalizarModalOpen(null)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleFinalizarAudiencia}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
