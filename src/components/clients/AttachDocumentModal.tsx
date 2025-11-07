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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AttachDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string | null;
}

const documentTypes = [
  "RG/CNH",
  "Procuração judicial",
  "Comprovante de residência",
  "Declaração de hipossuficiência",
  "Carteira de trabalho",
  "Holerites / Declaração de Rendimento",
  "Declaração de IR",
  "Extratos 90 dias",
  "Reclamação GOV",
  "Contrato do financiamento",
  "Documento do veículo",
  "Cálculo Revisional",
  "Laudo Financiamento",
  "Comprovante do pagamento da parcela do financiamento",
  "Procuração Inicial",
  "Comprovante de seguro",
  "Outros gastos fixos",
  "Questionário para o Titular",
];

export function AttachDocumentModal({ isOpen, onClose, clientId }: AttachDocumentModalProps) {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!selectedDocType || !selectedFile) {
      toast.error("Por favor, selecione o tipo de documento e o arquivo");
      return;
    }

    // TODO: Implementar upload do documento
    console.log("Anexar documento:", { clientId, selectedDocType, selectedFile });
    toast.success("Documento anexado com sucesso!");
    
    setSelectedDocType("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Anexar Documento</DialogTitle>
          <DialogDescription>
            Selecione o tipo de documento e faça o upload do arquivo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="docType">Tipo de Documento</Label>
            <Select value={selectedDocType} onValueChange={setSelectedDocType}>
              <SelectTrigger id="docType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Arquivo</Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Anexar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
