import { useState } from "react";
import { Search, MessageSquare, ChevronDown, Pin, Mail, MailOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isPinned?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Ana Silva",
    lastMessage: "Obrigada pelo atendimento!",
    timestamp: "10:30",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "2",
    name: "Carlos Souza",
    lastMessage: "Quando vai chegar meu pedido?",
    timestamp: "09:15",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "3",
    name: "Mariana Costa",
    lastMessage: "Perfeito, vou aguardar",
    timestamp: "Ontem",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    lastMessage: "Preciso de ajuda com o pagamento",
    timestamp: "Ontem",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "5",
    name: "Julia Santos",
    lastMessage: "Muito obrigada!",
    timestamp: "15/01",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "6",
    name: "Roberto Lima",
    lastMessage: "Como faço para trocar o produto?",
    timestamp: "15/01",
    unreadCount: 2,
    isOnline: true,
  },
];

export const ConversationsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("2");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [conversations, setConversations] = useState(mockConversations);

  const filteredConversations = conversations
    .filter((conv) => {
      const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || conv.unreadCount > 0;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // Pinned conversations always come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const handleMarkAsUnread = (id: string) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, unreadCount: conv.unreadCount > 0 ? 0 : 1 } : conv
    ));
  };

  const handlePinConversation = (id: string) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, isPinned: !conv.isPinned } : conv
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-full flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-sidebar-foreground">Conversas</h2>
          <p className="text-xs text-muted-foreground">
            {filteredConversations.length} ativas
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-border focus-visible:ring-primary"
          />
        </div>
        
        {/* Filter */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex-1"
          >
            Tudo
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className="flex-1"
          >
            Não lidas
          </Button>
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
              className={cn(
                "group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all hover:bg-sidebar-accent",
                selectedId === conversation.id && "bg-sidebar-accent"
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(conversation.name)}
                  </AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-primary" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {conversation.isPinned && (
                      <Pin className="h-3.5 w-3.5 text-primary shrink-0 fill-primary" />
                    )}
                    <span className="font-semibold text-sidebar-foreground truncate">
                      {conversation.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {conversation.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    {conversation.unreadCount > 0 && (
                      <Badge className="h-5 min-w-5 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground hover:bg-primary">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsUnread(conversation.id);
                          }}
                        >
                          {conversation.unreadCount > 0 ? (
                            <>
                              <MailOpen className="h-4 w-4 mr-2" />
                              Marcar como lida
                            </>
                          ) : (
                            <>
                              <Mail className="h-4 w-4 mr-2" />
                              Marcar como não lida
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinConversation(conversation.id);
                          }}
                        >
                          <Pin className="h-4 w-4 mr-2" />
                          {conversation.isPinned ? "Desafixar conversa" : "Fixar conversa"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
