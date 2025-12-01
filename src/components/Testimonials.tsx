import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Gostaria de parabenizar a equipe da Êxodo Gestão Contábil pelo profissionalismo e clareza inigualáveis na orientação da gestão financeira da minha empresa e de contabilidade. Agradeço pela orientação especializada que tem sido fundamental para evitar decisões impulsivas e otimizar meus recursos. Obrigada pela parceria e pelo excelente trabalho que tem realizado em nossa empresa!",
      author: "Luciene Monteiro",
      company: "Distribuidora Monteiro",
    },
    {
      text: "Sou cliente há mais de 02 anos da Êxodo, e posso afirmar que entregam um trabalho de excelência, trazendo resultados positivos para empresa, com atendimento personalizado e suporte de toda a sua equipe sempre que preciso. Empresa que transmite seriedade, responsabilidade e competência com seu cliente! Parabéns! Que possamos trabalhar juntos por muitos e muitos anos.",
      author: "Sinara Bosi",
      company: "Loja Marezia",
    },
    {
      text: "A Contabilidade da Êxodo é composta por uma equipe que me atende sempre muito rápido e com muita excelência em tudo! Indico com certeza para quem está precisando!",
      author: "Lidiane Carla",
      company: "Nossa Escrita",
    },
  ];

  return (
    <section id="depoimentos" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Confira os depoimentos de quem já confia em nosso trabalho e conhece de perto a qualidade
            dos nossos serviços.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-accent text-base sm:text-lg">{testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
