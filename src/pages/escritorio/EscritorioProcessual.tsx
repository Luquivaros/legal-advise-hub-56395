import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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

  const handleVerificarDocumento = (clienteId: string, docId: string) => {
    setClientes(prev => prev.map(cliente => {
      if (cliente.id === clienteId) {
        return {
          ...cliente,
          documentos: cliente.documentos.map(doc => 
            doc.id === docId ? { ...doc, verificado: !doc.verificado } : doc
          )
        };
      }
      return cliente;
    }));
    
    toast({
      title: "Documento verificado",
      description: "Status do documento atualizado com sucesso.",
    });
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Processual" 
        subtitle="Gerenciamento de processos e documentação para protocolo" 
      />

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Users className="w-5 h-5" />
              Clientes Recebidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900">15</p>
            <p className="text-sm text-purple-600 mt-1">Para protocolo</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <FileCheck className="w-5 h-5" />
              Processos Protocolados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900">10</p>
            <p className="text-sm text-green-600 mt-1">Concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Clock className="w-5 h-5" />
              Processos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-900">5</p>
            <p className="text-sm text-amber-600 mt-1">Aguardando protocolo</p>
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
          <Accordion type="single" collapsible className="w-full space-y-2">
            {clientes.map((cliente) => (
              <AccordionItem key={cliente.id} value={cliente.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{cliente.nome}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
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
                              onClick={() => handleVerificarDocumento(cliente.id, doc.id)}
                              className="h-8"
                            >
                              {doc.verificado ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Verificado
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 mr-1" />
                                  Não verificado
                                </>
                              )}
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

                  {/* Data do Protocolo */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Data do Protocolo</label>
                    <Input
                      type="date"
                      value={cliente.dataProtocolo}
                      onChange={(e) => handleDataChange(cliente.id, e.target.value)}
                      className="max-w-xs"
                    />
                  </div>

                  {/* Observações do Escritório */}
                  <Dialog open={modalOpen[cliente.id]} onOpenChange={(open) => setModalOpen(prev => ({ ...prev, [cliente.id]: open }))}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Observações do Escritório
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Observações do Escritório - {cliente.nome}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Textarea
                          placeholder="Digite aqui as observações, comentários ou informações relevantes sobre este processo..."
                          value={observacoes[cliente.id] || ""}
                          onChange={(e) => setObservacoes(prev => ({ ...prev, [cliente.id]: e.target.value }))}
                          rows={6}
                        />
                        <Button onClick={() => handleSalvarObservacao(cliente.id)} className="w-full">
                          Salvar Observação
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
