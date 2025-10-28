import { ConversationsList } from "@/components/ConversationsList";
import { ChatArea } from "@/components/ChatArea";

export default function ConsultorJuridicoConversas() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      {/* Sidebar com conversas */}
      <div className="w-96 h-full shrink-0">
        <ConversationsList />
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col w-full">
        <ChatArea />
      </div>
    </div>
  );
}
