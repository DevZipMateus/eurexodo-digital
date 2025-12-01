import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "O que significa contabilidade consultiva?",
      answer:
        "A contabilidade consultiva vai além das obrigações fiscais e acessórias. Ela oferece análises, relatórios e orientações estratégicas que ajudam o empresário a entender os resultados do seu negócio e a tomar decisões mais assertivas. É uma parceria contínua com foco no crescimento da empresa.",
    },
    {
      question: "O que é o BPO Financeiro e como ele pode ajudar minha empresa?",
      answer:
        "O BPO Financeiro (Business Process Outsourcing) é a terceirização das rotinas financeiras da sua empresa. Cuidamos de contas a pagar e receber, fluxo de caixa, conciliações bancárias e relatórios gerenciais, permitindo que você tenha mais tempo para focar no crescimento do seu negócio.",
    },
    {
      question: "A Êxodo faz abertura e regularização de empresas?",
      answer:
        "Sim! Cuidamos de todo o processo de abertura, alteração, baixa e regularização de empresas, garantindo conformidade legal, rapidez e tranquilidade para o empreendedor.",
    },
    {
      question: "A Êxodo trabalha apenas com empresas de Goianésia-GO?",
      answer:
        "Não. Atendemos clientes de todo o Brasil, com processos 100% digitais e seguros. A tecnologia permite que façamos uma contabilidade ágil, transparente e sem fronteiras.",
    },
    {
      question: "As informações da minha empresa ficam seguras com a Êxodo?",
      answer:
        "Sim. Utilizamos sistemas contábeis e financeiros seguros e integrados, garantindo sigilo, conformidade com a LGPD e proteção total dos dados de nossos clientes.",
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            Perguntas frequentes
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-none shadow-md rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 transition-colors">
                  <span className="text-base sm:text-lg font-semibold text-accent pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
