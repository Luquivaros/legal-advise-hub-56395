import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { ClientCard } from '@/components/ui/client-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, User, Loader2, Users, Phone, Clock, TrendingUp } from 'lucide-react';

export default function ConsultorJuridicoNegotiations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data para demonstrar o carrossel
  const clients = [
    {
      name: "Maria Silva Santos",
      cpf: "123.456.789-00",
      phone: "(11) 99999-9999"
    },
    {
      name: "João Pereira Lima",
      cpf: "987.654.321-00",
      phone: "(11) 88888-8888"
    },
    {
      name: "Ana Costa Rodrigues",
      cpf: "456.789.123-00",
      phone: "(11) 77777-7777"
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    // Simular busca
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Análises Jurídicas" 
        subtitle="Conduza análises contratuais e avalie juros abusivos" 
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
                onKeyPress={handleKeyPress}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-light to-orange-lighter text-white hover:from-orange-light-hover hover:to-orange-light active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70 shadow-lg hover:shadow-xl"
              >
                <div className="relative">
                  {/* Loading animation */}
                  <div className={`flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${isSearching ? 'opacity-100' : 'opacity-0'}`}>
                    <Loader2 className="w-full h-full animate-spin" />
                  </div>

                  <div className={`flex items-center transition-all ${isSearching ? 'opacity-0' : 'opacity-100'}`}>
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
            {clients.map((client, index) => (
              <CarouselItem key={index} className="pl-1">
                <ClientCard client={client} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
        </Carousel>
      </div>

      {/* Card de Projeções e Performance */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Projeção do Dia
          </CardTitle>
          <p className="text-sm text-muted-foreground">Análises e projeções do dia</p>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Grid de métricas principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Clientes em Negociação */}
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Negociações</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-trend-up rounded-full"></div>
                    <span className="text-xs text-trend-up font-medium">+3 desde ontem</span>
                  </div>
                </div>
              </div>

              {/* Ligações Realizadas */}
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ligações</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-light rounded-full"></div>
                    <span className="text-xs text-orange-light font-medium">+ 1 desde ontem</span>
                  </div>
                </div>
              </div>

              {/* Valor Previsto */}
              <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
                {/* Glassmorphism texture overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/25 rounded-lg backdrop-blur-md border border-white/30 shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white drop-shadow-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white/95 uppercase tracking-wide drop-shadow-sm">Previsto Hoje</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white drop-shadow-lg">R$ 45.780</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-white/70 rounded-full shadow-sm"></div>
                      <span className="text-xs text-white/90 font-medium drop-shadow-sm">Meta do dia: R$ 50.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horários de Trabalho */}
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Horários</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">09:00 - 12:00</p>
                  <p className="text-sm font-semibold text-foreground">14:00 - 18:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Card de Ranking do Setor */}
      <Card className="bg-gradient-to-br from-card to-card/95 border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Ranking do Setor Jurídico
          </CardTitle>
          <p className="text-sm text-muted-foreground">Performance dos consultores do setor</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 1º Colocado - Destacado */}
            <div className="relative bg-gradient-to-r from-primary to-orange-light rounded-xl p-4 border border-white/20 backdrop-blur-lg overflow-hidden">
              {/* Glassmorphism texture overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                    <span className="text-sm font-bold text-white drop-shadow-sm">1°</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white drop-shadow-sm">Ana Beatriz Silva</h3>
                    <p className="text-xs text-white/90 drop-shadow-sm">Consultor Jurídico Sênior</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white drop-shadow-lg">18</p>
                      <p className="text-xs text-white/90 font-medium drop-shadow-sm">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white drop-shadow-lg">R$ 125.400</p>
                      <p className="text-xs text-white/90 font-medium drop-shadow-sm">Valor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demais colocações */}
            {[
              { pos: '2°', name: 'Carlos Eduardo Santos', sales: 15, value: 98750 },
              { pos: '3°', name: 'Marina Costa Lima', sales: 12, value: 87600 },
              { pos: '4°', name: 'Roberto Silva Oliveira', sales: 10, value: 75200 },
              { pos: '5°', name: 'Juliana Pereira Santos', sales: 8, value: 62300 }
            ].map((consultant, index) => (
              <div key={index} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border bg-gradient-to-r from-white/10 to-muted/10 transition-colors hover:from-white/15 hover:to-muted/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center border border-border/30">
                      <span className="text-sm font-semibold text-muted-foreground">{consultant.pos}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{consultant.name}</h3>
                      <p className="text-xs text-muted-foreground">Consultor Jurídico</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground">{consultant.sales}</p>
                        <p className="text-xs text-muted-foreground font-medium">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-semibold text-foreground">R$ {consultant.value.toLocaleString('pt-BR')}</p>
                        <p className="text-xs text-muted-foreground font-medium">Valor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}