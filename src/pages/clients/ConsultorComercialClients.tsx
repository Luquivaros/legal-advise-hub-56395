import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";
import { toast } from "sonner";

// Interface do repique
interface RepiqueClient {
  id: string;
  name: string;
  phone: string;
  lastContact: string;
  origin: string;
  observation: string;
  selected: boolean;
}

export default function ConsultorComercialClients() {
  // Estados para busca
  const [repiqueSearchTerm, setRepiqueSearchTerm] = useState('');

  // Estado para repiques
  const [repiqueClients, setRepiqueClients] = useState<RepiqueClient[]>([
    {
      id: "1",
      name: "João Silva",
      phone: "(11) 99999-9999",
      lastContact: "15/12/2024 - 14:30",
      origin: "Repique",
      observation: "Cliente interessado em renegociação. Aguardando retorno da proposta.",
      selected: false
    },
    {
      id: "2",
      name: "Maria Santos",
      phone: "(11) 88888-8888",
      lastContact: "14/12/2024 - 16:45",
      origin: "Repique",
      observation: "Primeira abordagem realizada. Cliente demonstrou interesse.",
      selected: false
    },
    {
      id: "3",
      name: "Carlos Oliveira",
      phone: "(11) 77777-7777",
      lastContact: "13/12/2024 - 10:15",
      origin: "Repique",
      observation: "Cliente solicitou nova proposta com condições diferenciadas.",
      selected: false
    },
    {
      id: "4",
      name: "Ana Costa",
      phone: "(11) 66666-6666",
      lastContact: "12/12/2024 - 15:20",
      origin: "Repique",
      observation: "Interessada em parcelamento. Aguardando análise de crédito.",
      selected: false
    }
  ]);

  const repiqueSelectedCount = repiqueClients.filter(c => c.selected).length;

  // Funções para repiques
  const handleSelectRepiqueClient = (clientId: string) => {
    setRepiqueClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, selected: !client.selected }
          : client
      )
    );
  };

  const handleSelectAllRepique = () => {
    const allSelected = repiqueClients.every(c => c.selected);
    setRepiqueClients(prev =>
      prev.map(client => ({ ...client, selected: !allSelected }))
    );
  };

  const handleMoveToNegotiations = () => {
    const selectedClients = repiqueClients.filter(c => c.selected);
    if (selectedClients.length === 0) {
      toast.error("Selecione pelo menos um cliente");
      return;
    }
    
    // Para consultor comercial, move direto para suas negociações
    setRepiqueClients(prev => prev.filter(c => !c.selected));
    toast.success(`${selectedClients.length} cliente(s) movido(s) para suas negociações`);
  };

  // Função de busca
  const handleRepiqueSearch = () => {
    console.log("Buscar repiques:", repiqueSearchTerm);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes" 
        subtitle="Gerencie seus repiques e clientes em prospecção" 
      />

      <Card className="bg-gradient-to-br from-card to-card/50 border border-gray-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Repiques
            </CardTitle>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input 
                  placeholder="Buscar por nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={repiqueSearchTerm}
                  onChange={(e) => setRepiqueSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleRepiqueSearch()}
                />
                <Button
                  onClick={handleRepiqueSearch}
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

              {repiqueSelectedCount > 0 && (
                <Button 
                  onClick={handleMoveToNegotiations}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Mover {repiqueSelectedCount} para Negociações
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
                      checked={repiqueClients.length > 0 && repiqueClients.every(c => c.selected)} 
                      onCheckedChange={handleSelectAllRepique} 
                    />
                  </TableHead>
                  <TableHead>Nome do Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Último Contato</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Observação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repiqueClients.map((client) => (
                  <TableRow key={client.id} className={client.selected ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={client.selected} 
                        onCheckedChange={() => handleSelectRepiqueClient(client.id)} 
                      />
                    </TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{client.lastContact}</TableCell>
                    <TableCell>{client.origin}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-primary hover:underline cursor-pointer text-left">
                            Ver observação
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Observação</h4>
                            <p className="text-sm text-muted-foreground">{client.observation}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
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