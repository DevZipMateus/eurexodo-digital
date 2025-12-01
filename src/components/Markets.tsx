import { Store, Briefcase, Building2, Heart, Sprout, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Markets = () => {
  const markets = [
    { icon: Store, title: "Comércio e varejo" },
    { icon: Briefcase, title: "Prestadores de serviços" },
    { icon: Building2, title: "Construção civil" },
    { icon: Heart, title: "Saúde, estética e bem-estar" },
    { icon: Sprout, title: "Agronegócio e cooperativas" },
    { icon: User, title: "Profissionais liberais e autônomos" },
  ];

  return (
    <section id="mercados" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            Mercados que atuamos
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          
          <div className="max-w-4xl mx-auto space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Atendemos empresas dos mais diversos segmentos, com foco em pequenas e médias empresas 
              dos regimes Simples Nacional, Lucro Presumido e Lucro Real.
            </p>
            <p>
              Nosso portfólio abrange negócios que buscam organização financeira, eficiência 
              tributária e crescimento sustentável, com destaque para setores:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {markets.map((market, index) => {
            const Icon = market.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-accent leading-tight">
                    {market.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Com uma abordagem consultiva e próxima, a Êxodo oferece soluções personalizadas para 
            cada modelo de negócio, garantindo decisões seguras e resultados reais.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Markets;
