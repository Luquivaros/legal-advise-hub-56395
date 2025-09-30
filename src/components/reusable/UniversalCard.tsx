import { useState, ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, LucideIcon } from "lucide-react";

/* ============================================================================
 * INTERFACES
 * ============================================================================ */

interface AccordionSection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: ReactNode;
  onEdit?: () => void;
  editButtonLabel?: string;
}

interface CardAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  icon?: LucideIcon;
  isLoading?: boolean;
}

interface UniversalCardProps {
  // Header Props
  title: string;
  subtitle?: string;
  headerIcon?: LucideIcon;
  
  // Action Props
  actions?: CardAction[];
  
  // Content Props
  sections?: AccordionSection[];
  children?: ReactNode;
  
  // Style Props
  className?: string;
  variant?: "default" | "elevated" | "flat";
}

/* ============================================================================
 * COMPONENTE PRINCIPAL
 * ============================================================================ */

export function UniversalCard({
  title,
  subtitle,
  headerIcon: HeaderIcon,
  actions = [],
  sections = [],
  children,
  className = "",
  variant = "default"
}: UniversalCardProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Variantes de estilo do card
  const cardVariants = {
    default: "bg-gradient-to-br from-card to-card/95 border border-gray-200",
    elevated: "bg-gradient-to-br from-card to-card/95 border border-gray-200 shadow-lg",
    flat: "bg-card border border-border"
  };

  const handleSectionToggle = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <Card className={`${cardVariants[variant]} ${className}`}>
      {/* ========== HEADER SECTION ========== */}
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Título e Subtítulo */}
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap-2">
              {HeaderIcon && <HeaderIcon className="w-5 h-5 text-primary" />}
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Action Buttons */}
          {actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action, index) => {
                const ActionIcon = action.icon;
                return (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    onClick={action.onClick}
                    disabled={action.isLoading}
                    className={
                      action.variant === "default" 
                        ? "px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 active:scale-95 duration-100 will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
                        : ""
                    }
                  >
                    {ActionIcon && <ActionIcon className="w-4 h-4 mr-2" />}
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </CardHeader>

      {/* ========== CONTENT SECTION ========== */}
      <CardContent>
        {/* Accordion Sections */}
        {sections.length > 0 && (
          <Accordion type="multiple" value={openSections} onValueChange={setOpenSections} className="w-full">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <AccordionItem key={section.id} value={section.id} className="border-border/50">
                  <AccordionTrigger 
                    className="hover:no-underline hover:scale-[1.01] transition-transform duration-200"
                    onClick={() => handleSectionToggle(section.id)}
                  >
                    <div className="flex items-center gap-2">
                      <SectionIcon className="w-4 h-4" />
                      <span>{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    {/* Section Header com Botão Editar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">{section.title}</span>
                      {section.onEdit && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={section.onEdit}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Section Content */}
                    <div className="text-sm text-muted-foreground">
                      {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}

        {/* Custom Children Content */}
        {children}
      </CardContent>
    </Card>
  );
}

/* ============================================================================
 * COMPONENTES AUXILIARES PARA CONTEÚDO
 * ============================================================================ */

// 1. Lista de Documentos
export function DocumentList({ 
  documents 
}: { 
  documents: Array<{ id: string; name: string; uploadedAt: string }> 
}) {
  if (!documents || documents.length === 0) {
    return <p>Nenhum documento anexado</p>;
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
          <span>{doc.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      ))}
    </div>
  );
}

// 2. Grid de Dados
export function DataGrid({ 
  data 
}: { 
  data: Array<{ label: string; value: string }> 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item, index) => (
        <div key={index}>
          <span className="font-medium">{item.label}:</span>
          <p className="text-muted-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// 3. Lista de Notas/Histórico
export function NotesList({ 
  notes 
}: { 
  notes: Array<{ id: string; content: string; createdBy: string; createdAt: string }> 
}) {
  if (!notes || notes.length === 0) {
    return <p>Nenhum histórico disponível</p>;
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="p-3 rounded-md bg-muted/50 border-l-4 border-primary/30">
          <p className="mb-1">{note.content}</p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Por: {note.createdBy}</span>
            <span>{new Date(note.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
