import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ConsultationFormProps {
  trigger: React.ReactNode;
}

const ConsultationForm = ({ trigger }: ConsultationFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nome: "",
    nomeEmpresa: "",
    telefone: "",
    email: "",
    cidade: "",
    regimeTributario: "",
    mensagem: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.nomeEmpresa || !formData.telefone || !formData.email || !formData.cidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome,
          nomeEmpresa: formData.nomeEmpresa,
          telefone: formData.telefone,
          email: formData.email,
          cidade: formData.cidade,
          regimeTributario: formData.regimeTributario || "Não informado",
          mensagem: formData.mensagem || "Solicitação de consultoria",
        },
      });

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve.",
      });

      setFormData({
        nome: "",
        nomeEmpresa: "",
        telefone: "",
        email: "",
        cidade: "",
        regimeTributario: "",
        mensagem: "",
      });
      
      setOpen(false);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent">Agende uma consultoria</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e nossa equipe entrará em contato.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeEmpresa">Nome da empresa *</Label>
            <Input
              id="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
              required
              placeholder="Nome da sua empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade e Estado *</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              required
              placeholder="Ex: Goianésia - GO"
            />
          </div>

          <div className="space-y-3">
            <Label>Qual o regime tributário atual da sua empresa?</Label>
            <RadioGroup
              value={formData.regimeTributario}
              onValueChange={(value) => setFormData({ ...formData, regimeTributario: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Simples Nacional" id="simples" />
                <Label htmlFor="simples" className="font-normal cursor-pointer">
                  Simples Nacional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lucro Presumido" id="presumido" />
                <Label htmlFor="presumido" className="font-normal cursor-pointer">
                  Lucro Presumido
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lucro Real" id="real" />
                <Label htmlFor="real" className="font-normal cursor-pointer">
                  Lucro Real
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ainda não sei / Preciso de ajuda" id="naosabe" />
                <Label htmlFor="naosabe" className="font-normal cursor-pointer">
                  Ainda não sei / Preciso de ajuda
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              placeholder="Conte-nos um pouco sobre sua necessidade..."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-accent hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar solicitação"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
