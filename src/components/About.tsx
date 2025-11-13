import { Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/about-office.jpg";

const About = () => {
  const values = [
    "Excelência",
    "Parceria",
    "Ética",
    "Honestidade",
    "Inovação",
    "Resultados",
  ];

  return (
    <section id="sobre" className="py-12 sm:py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">Sobre nós</h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Imagem do escritório */}
        <div className="mb-12 sm:mb-16 max-w-5xl mx-auto">
          <img
            src={aboutImage}
            alt="Escritório Êxodo Gestão Contábil"
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-xl sm:rounded-2xl shadow-xl"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">Missão</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Oferecer soluções contábeis estratégicas e consultivas por meio de um planejamento
                tributário eficaz e uma gestão financeira estruturada. Nosso compromisso é
                transformar números em decisões inteligentes, promovendo segurança, transparência e
                inovação para nossos clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">Visão</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Ser referência em contabilidade consultiva no Brasil, reconhecida pela excelência
                no atendimento, pela proximidade com o cliente e pelo impacto positivo na saúde
                financeira das empresas que atendemos. Buscamos contribuir para o sucesso dos
                negócios através de soluções personalizadas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">Valores</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {values.map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium"
                  >
                    ✓ {value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
