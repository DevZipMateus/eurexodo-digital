import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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
    servicos: [] as string[],
    outroServico: "",
    necessidade: "",
    numeroColaboradores: "",
    faturamento: "",
    comoConheceu: "",
    outroComoConheceu: "",
    mensagem: "",
    lgpdAutorizado: false,
  });

  const handleServicoChange = (servico: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, servicos: [...formData.servicos, servico] });
    } else {
      setFormData({ ...formData, servicos: formData.servicos.filter(s => s !== servico) });
    }
  };

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

    if (!formData.lgpdAutorizado) {
      toast({
        title: "Autorização LGPD",
        description: "Você precisa autorizar o uso dos seus dados conforme a LGPD.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const servicosSelecionados = [...formData.servicos];
      if (formData.outroServico) {
        servicosSelecionados.push(`Outro: ${formData.outroServico}`);
      }

      const comoConheceuFinal = formData.comoConheceu === "Outro" && formData.outroComoConheceu
        ? `Outro: ${formData.outroComoConheceu}`
        : formData.comoConheceu;

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome,
          nomeEmpresa: formData.nomeEmpresa,
          telefone: formData.telefone,
          email: formData.email,
          cidade: formData.cidade,
          regimeTributario: formData.regimeTributario || "Não informado",
          servicos: servicosSelecionados.join(", ") || "Não informado",
          necessidade: formData.necessidade || "Não informado",
          numeroColaboradores: formData.numeroColaboradores || "Não informado",
          faturamento: formData.faturamento || "Não informado",
          comoConheceu: comoConheceuFinal || "Não informado",
          mensagem: formData.mensagem || "Solicitação de consultoria",
          enviarConfirmacao: true,
        },
      });

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve. Enviamos um email de confirmação para você.",
      });

      setFormData({
        nome: "",
        nomeEmpresa: "",
        telefone: "",
        email: "",
        cidade: "",
        regimeTributario: "",
        servicos: [],
        outroServico: "",
        necessidade: "",
        numeroColaboradores: "",
        faturamento: "",
        comoConheceu: "",
        outroComoConheceu: "",
        mensagem: "",
        lgpdAutorizado: false,
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
                <Label htmlFor="simples" className="font-normal cursor-pointer text-sm">
                  Simples Nacional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lucro Presumido" id="presumido" />
                <Label htmlFor="presumido" className="font-normal cursor-pointer text-sm">
                  Lucro Presumido
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lucro Real" id="real" />
                <Label htmlFor="real" className="font-normal cursor-pointer text-sm">
                  Lucro Real
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ainda não sei / Preciso de ajuda" id="naosabe" />
                <Label htmlFor="naosabe" className="font-normal cursor-pointer text-sm">
                  Ainda não sei / Preciso de ajuda
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Qual serviço você procura?</Label>
            <div className="space-y-2">
              {[
                "Contabilidade completa",
                "Planejamento tributário",
                "BPO Financeiro",
                "Consultoria Empresarial / Financeira",
                "Abertura de empresa / Legalização da empresa",
              ].map((servico) => (
                <div key={servico} className="flex items-center space-x-2">
                  <Checkbox
                    id={`servico-dialog-${servico}`}
                    checked={formData.servicos.includes(servico)}
                    onCheckedChange={(checked) => handleServicoChange(servico, checked as boolean)}
                  />
                  <Label htmlFor={`servico-dialog-${servico}`} className="font-normal cursor-pointer text-sm">
                    {servico}
                  </Label>
                </div>
              ))}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="servico-outro-dialog"
                  checked={!!formData.outroServico}
                  onCheckedChange={(checked) => {
                    if (!checked) setFormData({ ...formData, outroServico: "" });
                  }}
                />
                <div className="flex-1">
                  <Label htmlFor="servico-outro-dialog" className="font-normal cursor-pointer text-sm">
                    Outro
                  </Label>
                  {(formData.outroServico || formData.servicos.length > 0) && (
                    <Input
                      placeholder="Especifique o serviço"
                      value={formData.outroServico}
                      onChange={(e) => setFormData({ ...formData, outroServico: e.target.value })}
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="necessidade">Qual é a principal necessidade da sua empresa hoje?</Label>
            <Textarea
              id="necessidade"
              value={formData.necessidade}
              onChange={(e) => setFormData({ ...formData, necessidade: e.target.value })}
              placeholder="Descreva sua principal necessidade..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Número de colaboradores</Label>
            <RadioGroup
              value={formData.numeroColaboradores}
              onValueChange={(value) => setFormData({ ...formData, numeroColaboradores: value })}
            >
              {[
                "Apenas eu (autônomo ou MEI migrando)",
                "1 a 5 colaboradores",
                "6 a 20 colaboradores",
                "21 a 50 colaboradores",
                "Acima de 50 colaboradores",
              ].map((opcao) => (
                <div key={opcao} className="flex items-center space-x-2">
                  <RadioGroupItem value={opcao} id={`colab-dialog-${opcao}`} />
                  <Label htmlFor={`colab-dialog-${opcao}`} className="font-normal cursor-pointer text-sm">
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Faixa de faturamento mensal</Label>
            <RadioGroup
              value={formData.faturamento}
              onValueChange={(value) => setFormData({ ...formData, faturamento: value })}
            >
              {[
                "Até R$ 50 mil",
                "De R$ 50 mil a R$ 200 mil",
                "De R$ 200 mil a R$ 500 mil",
                "Acima de R$ 500 mil",
                "Prefiro não informar",
              ].map((opcao) => (
                <div key={opcao} className="flex items-center space-x-2">
                  <RadioGroupItem value={opcao} id={`fat-dialog-${opcao}`} />
                  <Label htmlFor={`fat-dialog-${opcao}`} className="font-normal cursor-pointer text-sm">
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Como você conheceu a Êxodo?</Label>
            <RadioGroup
              value={formData.comoConheceu}
              onValueChange={(value) => setFormData({ ...formData, comoConheceu: value })}
            >
              {[
                "Instagram",
                "Google",
                "Indicação de cliente",
                "Evento / Palestra",
                "Outro",
              ].map((opcao) => (
                <div key={opcao} className="flex items-center space-x-2">
                  <RadioGroupItem value={opcao} id={`conheceu-dialog-${opcao}`} />
                  <Label htmlFor={`conheceu-dialog-${opcao}`} className="font-normal cursor-pointer text-sm">
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {formData.comoConheceu === "Outro" && (
              <Input
                placeholder="Especifique como nos conheceu"
                value={formData.outroComoConheceu}
                onChange={(e) => setFormData({ ...formData, outroComoConheceu: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              placeholder="Alguma informação adicional..."
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="lgpd-dialog"
              checked={formData.lgpdAutorizado}
              onCheckedChange={(checked) => setFormData({ ...formData, lgpdAutorizado: checked as boolean })}
              required
            />
            <Label htmlFor="lgpd-dialog" className="font-normal text-xs leading-relaxed cursor-pointer">
              Autorizo o uso dos meus dados para contato e envio de informações relacionadas aos serviços da Êxodo Gestão Contábil, conforme a LGPD. *
            </Label>
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
