import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NegotiationService } from '@/api/services/negotiationService';
import { Negotiation, NegotiationFilters } from '@/types';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { CommercialClientCard } from '@/components/ui/commercial-client-card';
import { 
  Plus, 
  Search, 
  Calculator, 
  Send, 
  Eye,
  Filter,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProjectionCardTemplate from '@/components/templates/ProjectionCardTemplate';
import RankingCardTemplate from '@/components/templates/RankingCardTemplate';

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800', 
  'calculated': 'bg-purple-100 text-purple-800',
  'proposal-sent': 'bg-orange-100 text-orange-800',
  'contracted': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'chargeback': 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  'pending': 'Pendente',
  'in-progress': 'Em Andamento', 
  'calculated': 'Calculado',
  'proposal-sent': 'Proposta Enviada',
  'contracted': 'Contratado',
  'cancelled': 'Cancelado',
  'chargeback': 'Chargeback'
};

export default function ConsultorComercialNegotiations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<NegotiationFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadNegotiations();
  }, [filters]);

  const loadNegotiations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await NegotiationService.getNegotiations(
        user.id,
        user.role,
        { ...filters, search: searchTerm }
      );
      
      if (response.success && response.data) {
        setNegotiations(response.data.data);
      } else {
        toast({
          title: "Erro",
          description: response.error || "Erro ao carregar negociações",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro interno do sistema",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      setFilters(prev => ({ ...prev, status: undefined }));
    } else {
      setFilters(prev => ({ ...prev, status: [status as any] }));
    }
  };

  const formatCurrency = (value?: number) => {
    if (!value) return 'Não definido';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Minhas Negociações" 
        subtitle="Gerencie suas negociações e propostas comerciais" 
      />

      {/* Card com Título e Search Bar */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Ficha do Cliente
            </CardTitle>
            
            {/* Search Bar */}
            <div className="relative bg-background w-full md:w-auto md:min-w-sm md:max-w-md flex flex-col md:flex-row items-center justify-center border border-border py-2 px-2 rounded-2xl gap-2 focus-within:border-primary/50 transition-colors">
              <Input 
                id="search-bar"
                placeholder="Buscar por CPF ou nome do cliente..."
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-background border-0 focus-visible:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-light to-orange-lighter text-white hover:from-orange-light-hover hover:to-orange-light active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all shadow-lg hover:shadow-xl"
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
          </div>
        </CardHeader>
      </Card>

      {/* Carrossel de Fichas dos Clientes */}
      <div className="relative w-full max-w-5xl mx-auto px-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {negotiations.map((negotiation, index) => (
              <CarouselItem key={index} className="pl-1">
                <CommercialClientCard 
                  client={{
                    name: negotiation.client.name,
                    cpf: negotiation.client.cpf,
                    phone: negotiation.client.phone,
                    contractType: negotiation.client.contractType,
                    source: negotiation.client.source
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
        </Carousel>
      </div>

      {/* Projeção do Dia */}
      <ProjectionCardTemplate />

      {/* Ranking do Setor Comercial */}
      <RankingCardTemplate />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Carregando negociações...</div>
        </div>
      )}
    </div>
  );
}