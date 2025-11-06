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
import { Users, Calendar, CheckCircle2, Download, X, Check, FileText } from "lucide-react";
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

export default function EscritorioAudiencias() {
  const { toast } = useToast();
  const [clientes, setClientes] = useState(mockClientes);
  const [verificarModalOpen, setVerificarModalOpen] = useState<{ clienteId: string; docId: string; tipo: 'ok' | 'x' } | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState<string>("");
  const [aceitarModalOpen, setAceitarModalOpen] = useState<string | null>(null);
  const [recusarModalOpen, setRecusarModalOpen] = useState<string | null>(null);
  const [prazoRetorno, setPrazoRetorno] = useState<string>("");
  const [observacoesRejeicao, setObservacoesRejeicao] = useState<string>("");

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

    toast({
      title: "Solicitação aceita",
      description: `Prazo de retorno: ${prazoRetorno} dias`,
    });
    
    setAceitarModalOpen(null);
    setPrazoRetorno("");
  };

  const handleRecusarSolicitacao = () => {
    if (!recusarModalOpen) return;

    toast({
      title: "Solicitação recusada",
      description: observacoesRejeicao ? "Observações registradas." : "Solicitação recusada.",
    });
    
    setRecusarModalOpen(null);
    setObservacoesRejeicao("");
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
            <p className="text-3xl font-bold text-black">8</p>
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
            <p className="text-3xl font-bold text-black">4</p>
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
            {clientes.map((cliente, index) => (
              <AccordionItem 
                key={cliente.id} 
                value={cliente.id} 
                className={`border-0 ${index !== clientes.length - 1 ? 'border-b border-gray-200' : ''}`}
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
    </div>
  );
}
