import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileCheck, Clock, Download, X, Check, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockClientes = [
  {
    id: "1",
    nome: "Ana Paula Ferreira",
    cpf: "321.654.987-00",
    rg: "32.165.498-7",
    endereco: "Rua dos Lírios, 456 - São Paulo/SP",
    email: "ana.ferreira@email.com",
    dataProtocolo: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
      { id: "d5", nome: "Petição Inicial", verificado: false },
    ]
  },
  {
    id: "2",
    nome: "Carlos Eduardo Mendes",
    cpf: "654.987.321-00",
    rg: "65.498.732-1",
    endereco: "Av. Brasil, 2000 - Rio de Janeiro/RJ",
    email: "carlos.mendes@email.com",
    dataProtocolo: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
      { id: "d5", nome: "Petição Inicial", verificado: false },
    ]
  },
  {
    id: "3",
    nome: "Juliana Santos Lima",
    cpf: "789.123.456-00",
    rg: "78.912.345-6",
    endereco: "Rua das Acácias, 789 - Belo Horizonte/MG",
    email: "juliana.lima@email.com",
    dataProtocolo: "",
    documentos: [
      { id: "d1", nome: "RG", verificado: false },
      { id: "d2", nome: "CPF", verificado: false },
      { id: "d3", nome: "Comprovante de Residência", verificado: false },
      { id: "d4", nome: "Contrato Bancário", verificado: false },
      { id: "d5", nome: "Petição Inicial", verificado: false },
    ]
  }
];

export default function EscritorioProcessual() {
  const { toast } = useToast();
  const [clientes, setClientes] = useState(mockClientes);
  const [observacoes, setObservacoes] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState<{ [key: string]: boolean }>({});
  const [verificarModalOpen, setVerificarModalOpen] = useState(false);
  const [documentoAtual, setDocumentoAtual] = useState<{ clienteId: string; docId: string; aprovado: boolean } | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [aceitarModalOpen, setAceitarModalOpen] = useState(false);
  const [recusarModalOpen, setRecusarModalOpen] = useState(false);
  const [clienteAtual, setClienteAtual] = useState<string>("");
  const [prazoRetorno, setPrazoRetorno] = useState("");
  const [observacoesRejeicao, setObservacoesRejeicao] = useState("");

  const handleAbrirModalVerificacao = (clienteId: string, docId: string, aprovado: boolean) => {
    setDocumentoAtual({ clienteId, docId, aprovado });
    setMotivoRejeicao("");
    setVerificarModalOpen(true);
  };

  const handleConfirmarVerificacao = () => {
    if (!documentoAtual) return;

    if (!documentoAtual.aprovado && !motivoRejeicao) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um motivo de rejeição.",
        variant: "destructive",
      });
      return;
    }

    setClientes(prev => prev.map(cliente => {
      if (cliente.id === documentoAtual.clienteId) {
        return {
          ...cliente,
          documentos: cliente.documentos.map(doc => 
            doc.id === documentoAtual.docId ? { ...doc, verificado: documentoAtual.aprovado } : doc
          )
        };
      }
      return cliente;
    }));
    
    toast({
      title: documentoAtual.aprovado ? "Documento aprovado" : "Documento rejeitado",
      description: documentoAtual.aprovado 
        ? "Documento verificado com sucesso." 
        : `Motivo: ${motivoRejeicao}`,
    });

    setVerificarModalOpen(false);
    setDocumentoAtual(null);
    setMotivoRejeicao("");
  };

  const handleDownloadDocumento = (nomeDoc: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${nomeDoc}...`,
    });
  };

  const handleSalvarObservacao = (clienteId: string) => {
    toast({
      title: "Observação salva",
      description: "A observação foi registrada com sucesso.",
    });
    setModalOpen(prev => ({ ...prev, [clienteId]: false }));
  };

  const handleDataChange = (clienteId: string, novaData: string) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === clienteId ? { ...cliente, dataProtocolo: novaData } : cliente
    ));
  };

  const handleAceitarSolicitacao = () => {
    if (!prazoRetorno) {
      toast({
        title: "Erro",
        description: "Por favor, informe o prazo para retorno.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Solicitação aceita",
      description: `Prazo de ${prazoRetorno} dias definido com sucesso.`,
    });

    setAceitarModalOpen(false);
    setClienteAtual("");
    setPrazoRetorno("");
  };

  const handleRecusarSolicitacao = () => {
    toast({
      title: "Solicitação recusada",
      description: "A solicitação foi recusada com sucesso.",
    });

    setRecusarModalOpen(false);
    setClienteAtual("");
    setObservacoesRejeicao("");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Processual" 
        subtitle="Gerenciamento de processos e documentação para protocolo" 
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
            <p className="text-3xl font-bold text-black">15</p>
            <p className="text-sm text-gray-400 mt-1">Para protocolo</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-black">
              <FileCheck className="w-5 h-5 text-orange-500" />
              Processos Protocolados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">10</p>
            <p className="text-sm text-gray-400 mt-1">Concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-black">
              <Clock className="w-5 h-5 text-orange-500" />
              Processos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">5</p>
            <p className="text-sm text-gray-400 mt-1">Aguardando protocolo</p>
          </CardContent>
        </Card>
      </div>

      {/* Card de Solicitações */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Solicitações de Protocolo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {clientes.map((cliente) => (
              <AccordionItem key={cliente.id} value={cliente.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger className="hover:no-underline hover:scale-[1.01] transition-transform duration-200 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{cliente.nome}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4 px-4 pb-4">
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
                    <h4 className="font-semibold text-sm mb-3">Documentos para Protocolo</h4>
                    <div className="space-y-2">
                      {cliente.documentos.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between bg-background border rounded-lg p-3">
                          <span className="text-sm font-medium">{doc.nome}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={doc.verificado ? "default" : "outline"}
                              onClick={() => handleAbrirModalVerificacao(cliente.id, doc.id, true)}
                              className="h-8"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAbrirModalVerificacao(cliente.id, doc.id, false)}
                              className="h-8"
                            >
                              <X className="w-4 h-4" />
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
                      className="flex-1" 
                      onClick={() => {
                        setClienteAtual(cliente.id);
                        setAceitarModalOpen(true);
                      }}
                    >
                      Aceitar Solicitação
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setClienteAtual(cliente.id);
                        setRecusarModalOpen(true);
                      }}
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
      <Dialog open={verificarModalOpen} onOpenChange={setVerificarModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {documentoAtual?.aprovado ? "Confirmar Aprovação" : "Confirmar Rejeição"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {documentoAtual?.aprovado ? (
              <p className="text-sm text-muted-foreground">
                Deseja confirmar que este documento está correto?
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-3">
                  Selecione o motivo da rejeição do documento:
                </p>
                <Select value={motivoRejeicao} onValueChange={setMotivoRejeicao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Documento Errado">Documento Errado</SelectItem>
                    <SelectItem value="Documento corrompido">Documento corrompido</SelectItem>
                    <SelectItem value="Documento Ilegível">Documento Ilegível</SelectItem>
                    <SelectItem value="Documento Falso">Documento Falso</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setVerificarModalOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleConfirmarVerificacao} className="flex-1">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Aceitar Solicitação */}
      <Dialog open={aceitarModalOpen} onOpenChange={setAceitarModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Aceitar Solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Prazo para Retorno (dias) *
              </label>
              <Input
                type="number"
                placeholder="Ex: 15"
                value={prazoRetorno}
                onChange={(e) => setPrazoRetorno(e.target.value)}
                min="1"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setAceitarModalOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleAceitarSolicitacao} className="flex-1">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Recusar Solicitação */}
      <Dialog open={recusarModalOpen} onOpenChange={setRecusarModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Recusar Solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Observações do Escritório
              </label>
              <Textarea
                placeholder="Digite as observações sobre a recusa (opcional)..."
                value={observacoesRejeicao}
                onChange={(e) => setObservacoesRejeicao(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setRecusarModalOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleRecusarSolicitacao} className="flex-1">
                Confirmar Recusa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
