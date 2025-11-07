import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AttachDocumentModal } from "@/components/clients/AttachDocumentModal";
import { GenerateDocumentModal } from "@/components/clients/GenerateDocumentModal";
import { ChargebackModal } from "@/components/clients/ChargebackModal";

interface Client {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  status: string;
  origem: string;
  tipo_contrato: string;
  created_at: string;
}

export default function SetorAdministrativoClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isChargebackModalOpen, setIsChargebackModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      toast.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      lead_recebido: "Novo Lead",
      repique: "Repique",
      novo: "Novo Cliente",
      pre_processual: "Processual",
      protocolado: "Protocolado"
    };
    return statusMap[status] || status;
  };

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf.includes(searchTerm) ||
    client.telefone.includes(searchTerm)
  );

  const handleOpenAttachModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsAttachModalOpen(true);
  };

  const handleOpenGenerateModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsGenerateModalOpen(true);
  };

  const handleOpenChargebackModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsChargebackModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Clientes" 
          subtitle="Gerencie todos os leads e clientes" 
        />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes" 
        subtitle="Gerencie todos os leads e clientes" 
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Leads e Clientes</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredClients.map((client) => (
              <AccordionItem key={client.id} value={client.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-base">{client.nome}</span>
                    <span className="text-sm text-muted-foreground">
                      {getStatusLabel(client.status)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-4">
                    {/* Dados do Cliente */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Dados do Cliente</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">E-mail:</span>
                          <p className="font-medium">-</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CPF:</span>
                          <p className="font-medium">{client.cpf}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telefone 1:</span>
                          <p className="font-medium">{client.telefone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telefone 2:</span>
                          <p className="font-medium">-</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Endereço:</span>
                          <p className="font-medium">-</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tipo de Contrato:</span>
                          <p className="font-medium">{client.tipo_contrato}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Origem:</span>
                          <p className="font-medium">{client.origem}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Último contato:</span>
                          <p className="font-medium">-</p>
                        </div>
                      </div>
                    </div>

                    {/* Histórico do Cliente */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Histórico do Cliente</h4>
                      <p className="text-sm text-muted-foreground">
                        Ainda não há informações de histórico para este cliente.
                      </p>
                    </div>

                    {/* Movimentações */}
                    {client.status === "protocolado" && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Movimentações</h4>
                        <p className="text-sm text-muted-foreground">
                          Não há movimentações recentes registradas.
                        </p>
                      </div>
                    )}

                    {/* Serviço */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Serviço</h4>
                      <p className="text-sm text-muted-foreground">
                        Nenhum serviço foi indicado ainda.
                      </p>
                    </div>

                    {/* Documentos anexados */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Documentos anexados</h4>
                      <p className="text-sm text-muted-foreground">
                        Nenhum documento anexado.
                      </p>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={() => handleOpenAttachModal(client.id)}
                        variant="outline"
                      >
                        Anexar documentos
                      </Button>
                      <Button 
                        onClick={() => handleOpenGenerateModal(client.id)}
                        variant="outline"
                      >
                        Gerar Documento
                      </Button>
                      <Button 
                        onClick={() => handleOpenChargebackModal(client.id)}
                        variant="outline"
                      >
                        ChargeBack
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredClients.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum cliente encontrado.
            </p>
          )}
        </CardContent>
      </Card>

      <AttachDocumentModal
        isOpen={isAttachModalOpen}
        onClose={() => setIsAttachModalOpen(false)}
        clientId={selectedClientId}
      />

      <GenerateDocumentModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        clientId={selectedClientId}
      />

      <ChargebackModal
        isOpen={isChargebackModalOpen}
        onClose={() => setIsChargebackModalOpen(false)}
        clientId={selectedClientId}
      />
    </div>
  );
}
