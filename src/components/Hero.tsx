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
      className="relative min-h-[100svh] flex items-center justify-center pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.5)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
              Êxodo Gestão Contábil
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mb-6 sm:mb-8 animate-fade-in font-light px-4">
              Soluções contábeis estratégicas para o crescimento do seu negócio
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-in px-4">
              Mais que contabilidade, uma parceria na gestão do seu negócio
            </p>
            <div className="flex justify-center animate-fade-in px-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary text-accent hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto text-sm sm:text-base"
              >
                Agende uma consultoria
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
