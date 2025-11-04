import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";
import { Client } from "@/types";
import { EditObservationsModal } from "./EditObservationsModal";

interface ClientDetailCardProps {
  clients: Client[];
  onUpdateClient: (clientId: string, updates: Partial<Client>) => void;
}

export function ClientDetailCard({ 
  clients, 
  onUpdateClient
}: ClientDetailCardProps) {
  const [observacoesMap, setObservacoesMap] = useState<Record<string, string>>(
    clients.reduce((acc, client) => ({ ...acc, [client.id]: client.observacoes || "" }), {})
  );
  const [activeClientId, setActiveClientId] = useState<string | null>(null);

  const handleFieldUpdate = (clientId: string, field: string, value: string) => {
    onUpdateClient(clientId, { [field]: value });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleSaveObservations = (clientId: string, newObservations: string) => {
    setObservacoesMap(prev => ({ ...prev, [clientId]: newObservations }));
    handleFieldUpdate(clientId, "observacoes", newObservations);
  };

  const openObservationsModal = (clientId: string) => {
    setActiveClientId(clientId);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/95 border border-gray-200">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome do cliente</TableHead>
                <TableHead className="whitespace-nowrap">CPF</TableHead>
                <TableHead className="whitespace-nowrap">Senha do GOV</TableHead>
                <TableHead className="whitespace-nowrap">Data da Solicitação</TableHead>
                <TableHead className="whitespace-nowrap">Data do Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Valor do Reembolso</TableHead>
                <TableHead className="whitespace-nowrap">Nome do Consultor</TableHead>
                <TableHead className="whitespace-nowrap">Procuração Inicial</TableHead>
                <TableHead className="whitespace-nowrap">Selfie Anexada</TableHead>
                <TableHead className="whitespace-nowrap">Observações do Setor</TableHead>
                <TableHead className="whitespace-nowrap">Seguro</TableHead>
                <TableHead className="whitespace-nowrap">Banco</TableHead>
                <TableHead className="whitespace-nowrap">Seguradora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, index) => {
                const observacoes = observacoesMap[client.id] || "";
                return (
                  <TableRow 
                    key={client.id}
                    className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
                  >
                    <TableCell className="whitespace-nowrap">{client.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{client.cpf}</TableCell>
                    <TableCell className="whitespace-nowrap">{client.senhaGov || "Não informado"}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {client.dataSolicitacao 
                        ? new Date(client.dataSolicitacao).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {client.dataReembolso 
                        ? new Date(client.dataReembolso).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {client.valorReembolso 
                        ? new Intl.NumberFormat("pt-BR", { 
                            style: "currency", 
                            currency: "BRL" 
                          }).format(client.valorReembolso)
                        : "Não informado"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{client.nomeConsultor || "Não informado"}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Select
                        value={client.procuracaoInicial || "nao"}
                        onValueChange={(value) => handleFieldUpdate(client.id, "procuracaoInicial", value)}
                      >
                        <SelectTrigger className="w-full min-w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Select
                        value={client.selfieAnexada || "nao"}
                        onValueChange={(value) => handleFieldUpdate(client.id, "selfieAnexada", value)}
                      >
                        <SelectTrigger className="w-full min-w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="cursor-pointer hover:text-primary transition-colors"
                              onClick={() => openObservationsModal(client.id)}
                            >
                              {truncateText(observacoes, 50) || "Clique para adicionar..."}
                            </div>
                          </TooltipTrigger>
                          {observacoes && observacoes.length > 50 && (
                            <TooltipContent 
                              side="top" 
                              className="max-w-md p-4 bg-popover text-popover-foreground border shadow-lg z-50"
                            >
                              <p className="whitespace-pre-wrap">{observacoes}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Select
                        value={client.seguro || "nao"}
                        onValueChange={(value) => handleFieldUpdate(client.id, "seguro", value)}
                      >
                        <SelectTrigger className="w-full min-w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{client.banco || "Não informado"}</TableCell>
                    <TableCell className="whitespace-nowrap">{client.seguradora || "Não informado"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {activeClientId && (
        <EditObservationsModal
          open={activeClientId !== null}
          onOpenChange={(open) => !open && setActiveClientId(null)}
          currentObservations={observacoesMap[activeClientId] || ""}
          onSave={(obs) => handleSaveObservations(activeClientId, obs)}
        />
      )}
    </Card>
  );
}