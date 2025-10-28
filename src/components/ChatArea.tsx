import { useState } from "react";
import { Send, Paperclip, Smile, Mic, Zap, Plus, Edit2, Trash2, FileText, Image, Music, ChevronDown, Search, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [quickReplies, setQuickReplies] = useState([
    "Olá! Como posso ajudar?",
    "Obrigado pelo contato!",
    "Estou disponível agora.",
    "Vou verificar isso para você.",
    "Posso ajudar com mais alguma coisa?"
  ]);
  const [isQuickReplyDialogOpen, setIsQuickReplyDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [quickReplyText, setQuickReplyText] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
    "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
    "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
    "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
    "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
    "🤧", "🥵", "🥶", "😶‍🌫️", "😵", "🤯", "🤠", "🥳", "😎", "🤓",
    "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺",
    "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣",
    "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
    "👆", "👇", "☝️", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
    "❤️‍🔥", "❤️‍🩹", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟",
    "🎉", "🎊", "🎈", "🎁", "🏆", "🥇", "🥈", "🥉", "⭐", "🌟",
    "✅", "❌", "⚠️", "🔥", "💯", "💪", "🙏", "👀", "💡", "📱"
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Enviando:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddQuickReply = () => {
    setEditingIndex(null);
    setQuickReplyText("");
    setIsQuickReplyDialogOpen(true);
  };

  const handleEditQuickReply = (index: number, text: string) => {
    setEditingIndex(index);
    setQuickReplyText(text);
    setIsQuickReplyDialogOpen(true);
  };

  const handleDeleteQuickReply = (index: number) => {
    setQuickReplies(quickReplies.filter((_, i) => i !== index));
  };

  const handleSaveQuickReply = () => {
    if (!quickReplyText.trim()) return;

    if (editingIndex !== null) {
      const updated = [...quickReplies];
      updated[editingIndex] = quickReplyText;
      setQuickReplies(updated);
    } else {
      setQuickReplies([...quickReplies, quickReplyText]);
    }

    setIsQuickReplyDialogOpen(false);
    setQuickReplyText("");
    setEditingIndex(null);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(message + emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Profile Header */}
      <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" alt="Contato" />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            CS
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            +55 11 93207-0637
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" title="Buscar">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" title="Mais opções">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="text-center text-muted-foreground">
          Nenhuma mensagem ainda
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background w-full">
        <div className="relative w-full">
          <Textarea
            placeholder="Digite uma mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[44px] max-h-32 resize-none w-full pl-32 pr-24"
            rows={1}
          />
          
          {/* Botões à esquerda dentro do input */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Respostas rápidas"
                >
                  <Zap className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                {quickReplies.map((reply, index) => (
                  <div key={index} className="flex items-center gap-1 group">
                    <DropdownMenuItem
                      className="flex-1 min-w-0"
                      onClick={() => {
                        setMessage(reply);
                        handleSend();
                      }}
                    >
                      <span className="truncate max-w-[200px]">{reply}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 [&>svg.ml-auto]:hidden hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => handleEditQuickReply(index, reply)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteQuickReply(index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </div>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAddQuickReply}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar resposta rápida
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Anexar documento"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Documentos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Image className="h-4 w-4 mr-2" />
                  Fotos e Vídeos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Music className="h-4 w-4 mr-2" />
                  Áudio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Emoji"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2" align="start">
                <div className="grid grid-cols-10 gap-1">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-xl hover:bg-accent"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Botões à direita dentro do input */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {message.trim() ? (
              <Button
                onClick={handleSend}
                size="icon"
                className="h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                title="Áudio"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Dialog para adicionar/editar resposta rápida */}
      <Dialog open={isQuickReplyDialogOpen} onOpenChange={setIsQuickReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Editar resposta rápida" : "Nova resposta rápida"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quick-reply">Mensagem</Label>
              <Textarea
                id="quick-reply"
                value={quickReplyText}
                onChange={(e) => setQuickReplyText(e.target.value)}
                placeholder="Digite a mensagem rápida"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuickReplyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveQuickReply}>
              {editingIndex !== null ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
