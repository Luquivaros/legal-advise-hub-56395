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

// Interface do novo cliente
interface NewClient {
  id: string;
  name: string;
  document: string;
  phone: string;
  status: string;
  valorPago: string;
  comercialConsultant: string;
  selected: boolean;
}

export default function SupervisorJuridicoClients() {
  // Estados para busca
  const [protocolSearchTerm, setProtocolSearchTerm] = useState('');
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [showConsultorModal, setShowConsultorModal] = useState(false);
  const [selectedConsultor, setSelectedConsultor] = useState('');
  const [modalType, setModalType] = useState<'protocol' | 'new'>('protocol');

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

  // Estado para novos clientes
  const [newClients, setNewClients] = useState<NewClient[]>([
    {
      id: "1",
      name: "Carlos Oliveira",
      document: "456.789.123-00",
      phone: "(11) 77777-7777",
      status: "À vista",
      valorPago: "R$ 15.000,00",
      comercialConsultant: "Ana Costa",
      selected: false
    },
    {
      id: "2",
      name: "Empresa XYZ Ltda",
      document: "12.345.678/0001-90",
      phone: "(11) 66666-6666",
      status: "Parcelado",
      valorPago: "R$ 8.500,00",
      comercialConsultant: "Pedro Lima",
      selected: false
    }
  ]);

  const protocolSelectedCount = protocolClients.filter(c => c.selected).length;
  const newSelectedCount = newClients.filter(c => c.selected).length;

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
    setModalType('protocol');
    setShowConsultorModal(true);
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
    setModalType('new');
    setShowConsultorModal(true);
  };

  const handleConfirmSend = () => {
    if (!selectedConsultor) {
      toast.error("Selecione um consultor");
      return;
    }
    
    if (modalType === 'protocol') {
      const selectedClients = protocolClients.filter(c => c.selected);
      setProtocolClients(prev => prev.filter(c => !c.selected));
      toast.success(`${selectedClients.length} cliente(s) enviado(s) para ${selectedConsultor}`);
    } else {
      const selectedClients = newClients.filter(c => c.selected);
      setNewClients(prev => prev.filter(c => !c.selected));
      toast.success(`${selectedClients.length} cliente(s) enviado(s) para ${selectedConsultor}`);
    }
    
    setShowConsultorModal(false);
    setSelectedConsultor('');
  };

  // Funções de busca
  const handleProtocolSearch = () => {
    console.log("Buscar clientes protocolados:", protocolSearchTerm);
  };

  const handleNewSearch = () => {
    console.log("Buscar novos clientes:", newSearchTerm);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes - Supervisor Jurídico" 
        subtitle="Gerencie clientes protocolados e novos clientes" 
      />
      
      {/* Lista de Clientes Protocolados */}
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
                <Button 
                  onClick={handleMoveToNegotiations}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Enviar {protocolSelectedCount} para...
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

      {/* Lista de Novos Clientes */}
      <Card className="bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-orange-500" />
              Novos Clientes
            </CardTitle>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
                <Input 
                  placeholder="Buscar por CPF ou nome do cliente..."
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
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor Pago</TableHead>
                  <TableHead>Consultor Comercial</TableHead>
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
                    <TableCell className="text-muted-foreground">{client.document}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.status}</TableCell>
                    <TableCell className="font-medium text-green-600">{client.valorPago}</TableCell>
                    <TableCell>{client.comercialConsultant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Modal de seleção de consultor */}
      <Dialog open={showConsultorModal} onOpenChange={setShowConsultorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar Consultor</DialogTitle>
            <DialogDescription>
              Escolha o consultor que receberá os {modalType === 'protocol' ? protocolSelectedCount : newSelectedCount} clientes selecionados.
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
    </div>
  );
}