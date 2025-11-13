import { Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Sobre nós</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Oferecer soluções contábeis estratégicas e consultivas por meio de um planejamento
                tributário eficaz e uma gestão financeira estruturada. Nosso compromisso é
                transformar números em decisões inteligentes, promovendo segurança, transparência e
                inovação para nossos clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser referência em contabilidade consultiva no Brasil, reconhecida pela excelência
                no atendimento, pela proximidade com o cliente e pelo impacto positivo na saúde
                financeira das empresas que atendemos. Buscamos contribuir para o sucesso dos
                negócios através de soluções personalizadas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">Valores</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {values.map((value, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
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
