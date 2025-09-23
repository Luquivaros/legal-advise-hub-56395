import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ArrowRight, Users, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Interface do novo cliente
interface NewClient {
  id: string;
  name: string;
  phone: string;
  origem: string;
  tipo: string;
  dataCadastro: string;
  selected: boolean;
}

export default function SupervisorComercialClients() {
  // Estados para busca
  const [repiqueSearchTerm, setRepiqueSearchTerm] = useState('');
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [showConsultorModal, setShowConsultorModal] = useState(false);
  const [selectedConsultor, setSelectedConsultor] = useState('');

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

  // Estado para novos clientes
  const [newClients, setNewClients] = useState<NewClient[]>([
    {
      id: "1",
      name: "Carlos Oliveira",
      phone: "(11) 77777-7777",
      origem: "Facebook",
      tipo: "Financiamento",
      dataCadastro: "23/09/2024",
      selected: false
    },
    {
      id: "2",
      name: "Empresa XYZ Ltda",
      phone: "(11) 66666-6666",
      origem: "Google",
      tipo: "Empréstimo",
      dataCadastro: "22/09/2024",
      selected: false
    }
  ]);

  const repiqueSelectedCount = repiqueClients.filter(c => c.selected).length;
  const newSelectedCount = newClients.filter(c => c.selected).length;

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
    setShowConsultorModal(true);
  };

  // Função de busca
  const handleRepiqueSearch = () => {
    console.log("Buscar repiques:", repiqueSearchTerm);
  };

  // Funções para novos clientes
  const handleSelectNewClient = (clientId: string) => {
    setNewClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, selected: !client.selected }
          : client
      )
    );
  };

  const handleSelectAllNew = () => {
    const allSelected = newClients.every(c => c.selected);
    setNewClients(prev =>
      prev.map(client => ({ ...client, selected: !allSelected }))
    );
  };

  const handleMoveNewToNegotiations = () => {
    const selectedClients = newClients.filter(c => c.selected);
    if (selectedClients.length === 0) {
      toast.error("Selecione pelo menos um cliente");
      return;
    }
    setShowConsultorModal(true);
  };

  const handleConfirmSend = () => {
    if (!selectedConsultor) {
      toast.error("Selecione um consultor");
      return;
    }
    const selectedRepiqueClients = repiqueClients.filter(c => c.selected);
    const selectedNewClients = newClients.filter(c => c.selected);
    
    if (selectedRepiqueClients.length > 0) {
      setRepiqueClients(prev => prev.filter(c => !c.selected));
    }
    if (selectedNewClients.length > 0) {
      setNewClients(prev => prev.filter(c => !c.selected));
    }
    
    const totalClients = selectedRepiqueClients.length + selectedNewClients.length;
    toast.success(`${totalClients} cliente(s) enviado(s) para ${selectedConsultor}`);
    setShowConsultorModal(false);
    setSelectedConsultor('');
  };

  const handleNewSearch = () => {
    console.log("Buscar novos clientes:", newSearchTerm);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes" 
        subtitle="Gerencie repiques e acompanhe clientes em prospecção" 
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
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Enviar {repiqueSelectedCount} para...
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

      {/* Card Novos Clientes */}
      <Card className="bg-gradient-to-br from-card to-card/50 border border-gray-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-orange-500" />
              Novos Clientes
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input 
                  placeholder="Buscar por nome do cliente..."
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                  value={newSearchTerm}
                  onChange={(e) => setNewSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewSearch()}
                />
                <Button
                  onClick={handleNewSearch}
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

              {newSelectedCount > 0 && (
                <Button 
                  onClick={handleMoveNewToNegotiations}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Enviar {newSelectedCount} para...
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
                      checked={newClients.length > 0 && newClients.every(c => c.selected)} 
                      onCheckedChange={handleSelectAllNew} 
                    />
                  </TableHead>
                  <TableHead>Nome do Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newClients.map((client) => (
                  <TableRow key={client.id} className={client.selected ? "bg-primary/5" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={client.selected} 
                        onCheckedChange={() => handleSelectNewClient(client.id)} 
                      />
                    </TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{client.origem}</TableCell>
                    <TableCell>{client.tipo}</TableCell>
                    <TableCell className="text-muted-foreground">{client.dataCadastro}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>

        <Dialog open={showConsultorModal} onOpenChange={setShowConsultorModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Selecionar Consultor</DialogTitle>
              <DialogDescription>
                Escolha o consultor que receberá os {newSelectedCount} clientes selecionados.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Select value={selectedConsultor} onValueChange={setSelectedConsultor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um consultor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ana-costa">Ana Costa - Consultor Comercial</SelectItem>
                  <SelectItem value="pedro-lima">Pedro Lima - Consultor Comercial</SelectItem>
                  <SelectItem value="carlos-santos">Carlos Santos - Consultor Jurídico</SelectItem>
                  <SelectItem value="maria-silva">Maria Silva - Supervisora Comercial</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowConsultorModal(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleConfirmSend}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70"
                >
                  Enviar Clientes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}