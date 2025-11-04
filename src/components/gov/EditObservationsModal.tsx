import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditObservationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentObservations: string;
  onSave: (observations: string) => void;
}

export function EditObservationsModal({
  open,
  onOpenChange,
  currentObservations,
  onSave,
}: EditObservationsModalProps) {
  const [observations, setObservations] = useState(currentObservations);

  useEffect(() => {
    setObservations(currentObservations);
  }, [currentObservations, open]);

  const handleSave = () => {
    onSave(observations);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Observações do Setor</DialogTitle>
          <DialogDescription>
            Visualize ou edite as observações do setor abaixo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Digite as observações do setor..."
              className="min-h-[200px] resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}