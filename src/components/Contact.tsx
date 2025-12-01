import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    nomeEmpresa: "",
    telefone: "",
    email: "",
    cidade: "",
    regimeTributario: "",
    servicos: [] as string[],
    outroServico: "",
    outroServicoMarcado: false,
    necessidade: "",
    numeroColaboradores: "",
    faturamento: "",
    comoConheceu: "",
    outroComoConheceu: "",
    outroComoConheceuMarcado: false,
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
          mensagem: formData.mensagem || "",
          enviarConfirmacao: true,
        },
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Recebemos sua mensagem e entraremos em contato em breve. Enviamos um email de confirmação para você.",
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
        outroServicoMarcado: false,
        necessidade: "",
        numeroColaboradores: "",
        faturamento: "",
        comoConheceu: "",
        outroComoConheceu: "",
        outroComoConheceuMarcado: false,
        mensagem: "",
        lgpdAutorizado: false,
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">Entre em contato</h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Estamos prontos para ser seu parceiro na gestão contábil. Entre em contato e descubra
            como podemos ajudar seu negócio a crescer.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      <RadioGroupItem value="Simples Nacional" id="simples-contact" />
                      <Label htmlFor="simples-contact" className="font-normal cursor-pointer">
                        Simples Nacional
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lucro Presumido" id="presumido-contact" />
                      <Label htmlFor="presumido-contact" className="font-normal cursor-pointer">
                        Lucro Presumido
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lucro Real" id="real-contact" />
                      <Label htmlFor="real-contact" className="font-normal cursor-pointer">
                        Lucro Real
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ainda não sei / Preciso de ajuda" id="naosabe-contact" />
                      <Label htmlFor="naosabe-contact" className="font-normal cursor-pointer">
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
                          id={`servico-${servico}`}
                          checked={formData.servicos.includes(servico)}
                          onCheckedChange={(checked) => handleServicoChange(servico, checked as boolean)}
                        />
                        <Label htmlFor={`servico-${servico}`} className="font-normal cursor-pointer">
                          {servico}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-start space-x-2 mt-2">
                      <Checkbox
                        id="servico-outro"
                        checked={formData.outroServicoMarcado}
                        onCheckedChange={(checked) => {
                          setFormData({ 
                            ...formData, 
                            outroServicoMarcado: checked as boolean,
                            outroServico: checked ? formData.outroServico : ""
                          });
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor="servico-outro" className="font-normal cursor-pointer">
                          Outro
                        </Label>
                        {formData.outroServicoMarcado && (
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
                        <RadioGroupItem value={opcao} id={`colab-${opcao}`} />
                        <Label htmlFor={`colab-${opcao}`} className="font-normal cursor-pointer">
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
                        <RadioGroupItem value={opcao} id={`fat-${opcao}`} />
                        <Label htmlFor={`fat-${opcao}`} className="font-normal cursor-pointer">
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
                        <RadioGroupItem value={opcao} id={`conheceu-${opcao}`} />
                        <Label htmlFor={`conheceu-${opcao}`} className="font-normal cursor-pointer">
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
                    rows={4}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="lgpd"
                    checked={formData.lgpdAutorizado}
                    onCheckedChange={(checked) => setFormData({ ...formData, lgpdAutorizado: checked as boolean })}
                    required
                  />
                  <Label htmlFor="lgpd" className="font-normal text-sm leading-relaxed cursor-pointer">
                    Autorizo o uso dos meus dados para contato e envio de informações relacionadas aos serviços da Êxodo Gestão Contábil, conforme a LGPD. *
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-accent hover:bg-primary/90"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
