import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ArrowRight, Users, Search } from "lucide-react";
import { toast } from "sonner";

// Interface do cliente protocolado
interface ProtocolClient {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  lastMovements: string;
  history: string;
  suggestedProduct: string;
  selected: boolean;
}

export default function ConsultorJuridicoClients() {
  // Estados para busca
  const [protocolSearchTerm, setProtocolSearchTerm] = useState('');

  // Estado para clientes protocolados
  const [protocolClients, setProtocolClients] = useState<ProtocolClient[]>([
    {
      id: "1",
      name: "João Silva",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      lastMovements: "Última ligação em 15/12/2024. Cliente interessado em renegociação.",
      history: "Cliente desde 2020. Histórico de pagamentos em atraso. Demonstra interesse em acordo.",
      suggestedProduct: "Acordo 70% desconto",
      selected: false
    },
    {
      id: "2",
      name: "Maria Santos",
      phone: "(11) 88888-8888",
      cpf: "987.654.321-00",
      lastMovements: "Retornou ligação ontem. Aguardando proposta.",
      history: "Novo cliente. Primeira negociação em andamento.",
      suggestedProduct: "Parcelamento 6x",
      selected: false
    }
  ]);

  const protocolSelectedCount = protocolClients.filter(c => c.selected).length;

  // Funções para clientes protocolados
  const handleSelectProtocolClient = (clientId: string) => {
    setProtocolClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, selected: !client.selected }
          : client
      )
    );
  };

  const handleSelectAllProtocol = () => {
    const allSelected = protocolClients.every(c => c.selected);
    setProtocolClients(prev =>
      prev.map(client => ({ ...client, selected: !allSelected }))
    );
  };

  const handleMoveToNegotiations = () => {
    const selectedClients = protocolClients.filter(c => c.selected);
    if (selectedClients.length === 0) {
      toast.error("Selecione pelo menos um cliente");
      return;
    }
    setProtocolClients(prev => prev.filter(c => !c.selected));
    toast.success(`${selectedClients.length} cliente(s) movido(s) para negociações`);
  };

  // Função de busca
  const handleProtocolSearch = () => {
    // Implementar lógica de busca para clientes protocolados
    console.log("Buscar clientes protocolados:", protocolSearchTerm);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes - Consultor Jurídico" 
        subtitle="Gerencie clientes protocolados e mova para negociações" 
      />
      
      <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Lista de Clientes Protocolados
            </CardTitle>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input 
                  placeholder="Buscar por CPF ou nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={protocolSearchTerm}
                  onChange={(e) => setProtocolSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleProtocolSearch()}
                />
                <Button
                  onClick={handleProtocolSearch}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="flex items-center">
                      <Search className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold whitespace-nowrap truncate">
                        Buscar
                      </span>
                    </div>
                  </div>
                </Button>
              </div>

              {protocolSelectedCount > 0 && (
                <Button onClick={handleMoveToNegotiations}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Mover {protocolSelectedCount} para Negociações
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={protocolClients.length > 0 && protocolClients.every(c => c.selected)} 
                      onCheckedChange={handleSelectAllProtocol} 
                    />
                  </TableHead>
                  <TableHead>Nome do Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Últimas Movimentações</TableHead>
                  <TableHead>Histórico do Cliente</TableHead>
                  <TableHead>Produto Indicado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {protocolClients.map((client) => (
                  <TableRow key={client.id} className={client.selected ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={client.selected} 
                        onCheckedChange={() => handleSelectProtocolClient(client.id)} 
                      />
                    </TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{client.cpf}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-primary hover:underline cursor-pointer text-left">
                            Ver movimentações
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Últimas Movimentações</h4>
                            <p className="text-sm text-muted-foreground">{client.lastMovements}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-primary hover:underline cursor-pointer text-left">
                            Ver histórico
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Histórico do Cliente</h4>
                            <p className="text-sm text-muted-foreground">{client.history}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>{client.suggestedProduct}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}