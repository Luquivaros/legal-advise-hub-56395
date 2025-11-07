import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface GenerateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string | null;
}

const generateDocTypes = [
  "Procuração e Hipo",
  "Homologação",
  "Citação",
  "Termo de Ciência",
  "Termo GOV",
  "Ata de Negociação",
  "Ata de Solicitação",
  "Termo de Responsabilidade",
  "Demonstrativo Homologação",
  "Protocolo de Negociação",
  "Termo de Abertura de Liminar",
];

export function GenerateDocumentModal({ isOpen, onClose, clientId }: GenerateDocumentModalProps) {
  const [selectedDocType, setSelectedDocType] = useState("");

  const handleSubmit = () => {
    if (!selectedDocType) {
      toast.error("Por favor, selecione o tipo de documento");
      return;
    }

    // TODO: Implementar geração do documento
    console.log("Gerar documento:", { clientId, selectedDocType });
    toast.success("Documento gerado com sucesso!");
    
    setSelectedDocType("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerar Documento</DialogTitle>
          <DialogDescription>
            Selecione o tipo de documento que deseja gerar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="genDocType">Tipo de Documento</Label>
            <Select value={selectedDocType} onValueChange={setSelectedDocType}>
              <SelectTrigger id="genDocType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {generateDocTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Gerar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
