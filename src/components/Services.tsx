import {
  Calculator,
  FileText,
  Users,
  TrendingUp,
  Briefcase,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import serviceAccounting from "@/assets/nossos_servicos_contabilidade.png";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceGrowth from "@/assets/service-growth.jpg";
import serviceBpo from "@/assets/service-bpo.jpg";
import serviceFinancial from "@/assets/service-financial.jpg";
import serviceStartup from "@/assets/service-startup.jpg";

const Services = () => {
  const services = [
    {
      icon: Calculator,
      title: "Contabilidade completa",
      description:
        "Gestão fiscal, contábil e departamento pessoal com processos otimizados e conformidade total.",
      image: serviceAccounting,
    },
    {
      icon: TrendingUp,
      title: "Planejamento tributário",
      description:
        "Estratégias personalizadas para reduzir a carga tributária de forma legal e eficiente.",
      image: serviceGrowth,
    },
    {
      icon: FileText,
      title: "BPO financeiro",
      description:
        "Terceirização de processos financeiros com tecnologia e expertise para sua empresa.",
      image: serviceBpo,
    },
    {
      icon: Briefcase,
      title: "Consultoria empresarial",
      description:
        "Análises estratégicas e orientações para tomada de decisões assertivas no seu negócio.",
      image: serviceConsulting,
    },
    {
      icon: Users,
      title: "Consultoria financeira",
      description:
        "Planejamento e controle financeiro para garantir a saúde e crescimento da sua empresa.",
      image: serviceFinancial,
    },
    {
      icon: Building2,
      title: "Abertura de empresas",
      description:
        "Processo completo de abertura e regularização com agilidade e segurança jurídica.",
      image: serviceStartup,
    },
  ];

  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">Nossos serviços</h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Oferecemos soluções completas para que sua empresa cresça com segurança, eficiência e
            clareza nos resultados. Atuamos de forma consultiva e personalizada, entendendo a
            realidade de cada negócio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
