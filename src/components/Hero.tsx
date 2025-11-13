import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.5)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Êxodo Gestão Contábil
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary mb-8 animate-fade-in font-light">
            Soluções contábeis estratégicas para o crescimento do seu negócio
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in">
            Mais que contabilidade, uma parceria na gestão do seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary text-accent hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Agende uma consultoria
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="bg-white/10 text-white border-white/60 hover:bg-white hover:text-accent hover:border-white backdrop-blur-sm transition-all duration-300"
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
