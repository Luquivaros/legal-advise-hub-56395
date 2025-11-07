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

interface ChargebackModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string | null;
}

export function ChargebackModal({ isOpen, onClose, clientId }: ChargebackModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [chargebackValue, setChargebackValue] = useState("");
  const [consultant, setConsultant] = useState("");
  const [allegation, setAllegation] = useState("");

  const handleSubmit = () => {
    if (!paymentMethod || !orderDate || !chargebackValue || !consultant || !allegation) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // TODO: Implementar criação do chargeback
    console.log("Criar chargeback:", {
      clientId,
      paymentMethod,
      orderDate,
      chargebackValue,
      consultant,
      allegation,
    });
    toast.success("Chargeback enviado com sucesso!");

    // Limpar campos
    setPaymentMethod("");
    setOrderDate("");
    setChargebackValue("");
    setConsultant("");
    setAllegation("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar ChargeBack</DialogTitle>
          <DialogDescription>
            Preencha as informações para registrar o chargeback.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FictorPay">FictorPay</SelectItem>
                <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                <SelectItem value="Pix">Pix</SelectItem>
                <SelectItem value="Boleto">Boleto</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderDate">Data do Pedido</Label>
            <Input
              id="orderDate"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chargebackValue">Valor do ChargeBack</Label>
            <Input
              id="chargebackValue"
              type="text"
              placeholder="R$ 0,00"
              value={chargebackValue}
              onChange={(e) => setChargebackValue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultant">Nome do Consultor</Label>
            <Input
              id="consultant"
              type="text"
              placeholder="Digite o nome do consultor"
              value={consultant}
              onChange={(e) => setConsultant(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allegation">Alegação</Label>
            <Select value={allegation} onValueChange={setAllegation}>
              <SelectTrigger id="allegation">
                <SelectValue placeholder="Selecione a alegação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desacordo Comercial">Desacordo Comercial</SelectItem>
                <SelectItem value="Suspeita de Fraude">Suspeita de Fraude</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Enviar ChargeBack
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
