import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Bug, Lightbulb, Star, Send, Clock, AlertTriangle } from "lucide-react";
import { FeedbackService } from "@/api/services/feedbackService";

// Schema de validação
const feedbackSchema = z.object({
  type: z.enum(["bug", "suggestion", "complaint", "compliment"], {
    required_error: "Selecione um tipo de feedback",
  }),
  subject: z.string().min(5, "O assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

// Tipos de feedback disponíveis
const feedbackTypes = [
  {
    id: "bug",
    label: "Reportar Bug",
    description: "Encontrei um problema no sistema",
    icon: Bug,
  },
  {
    id: "suggestion",
    label: "Sugestão de Melhoria",
    description: "Tenho uma ideia para melhorar o sistema",
    icon: Lightbulb,
  },
  {
    id: "complaint",
    label: "Reclamação",
    description: "Preciso reportar um problema ou insatisfação",
    icon: FileText,
  },
  {
    id: "compliment",
    label: "Elogio",
    description: "Quero elogiar o sistema ou atendimento",
    icon: Star,
  },
];

export default function Feedback() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const selectedType = watch("type");

  const onSubmit = async (data: FeedbackFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await FeedbackService.submitFeedback(user.id, {
        type: data.type,
        title: data.subject,
        description: data.message,
        priority: data.type === "bug" || data.type === "complaint" ? "high" : "medium",
      });

      if (response.success) {
        toast({
          title: "Feedback enviado com sucesso!",
          description: "Sua mensagem foi recebida e será analisada em breve.",
        });
        reset();
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar feedback",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Feedback" 
        subtitle="Sua opinião é muito importante para melhorarmos continuamente nosso sistema." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Principal - Formulário de Feedback */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-orange-500" />
                Enviar Feedback
              </CardTitle>
              <CardDescription>
                Sua opinião é muito importante para melhorarmos continuamente nosso sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Tipo de Feedback */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Tipo de Feedback</Label>
                  <RadioGroup
                    value={selectedType}
                    onValueChange={(value) => setValue("type", value as any)}
                    className="space-y-3"
                  >
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.id} className="flex items-center space-x-3">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Label htmlFor={type.id} className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg hover:bg-muted/50">
                            <Icon className="h-5 w-5 text-orange-500" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type.message}</p>
                  )}
                </div>

                {/* Email do Usuário */}
                <div className="space-y-2">
                  <Label htmlFor="email">Seu Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Assunto */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    placeholder="Descreva brevemente o assunto"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Mensagem <span className="text-muted-foreground">(Seja o mais detalhado possível)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua solicitação, problema ou sugestão em detalhes..."
                    rows={6}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* Botão de Envio */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Enviando..." : "Enviar Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Cards de Informações */}
        <div className="space-y-6">
          {/* Card Informações de Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Tempo de Resposta</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Normalmente respondemos em até 24 horas úteis.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Suporte Urgente</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Para questões urgentes, marque como "Reportar Bug" e descreva a urgência na mensagem.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card Dicas para um Bom Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Dicas para um Bom Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium text-orange-500">Para Bugs:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Descreva os passos para reproduzir o problema.
                </p>
              </div>

              <div>
                <span className="font-medium text-orange-500">Para Melhorias:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Explique como a funcionalidade atual poderia ser melhor.
                </p>
              </div>

              <div>
                <span className="font-medium text-orange-500">Para Suporte:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Inclua capturas de tela se possível.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}