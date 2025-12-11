import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };
  return <header className="fixed top-0 left-0 right-0 z-50 shadow-md transition-all duration-300" style={{
    backgroundColor: 'hsl(var(--header-bg))'
  }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src="/logo.png?v=2" alt="Êxodo Gestão Contábil" className="h-32" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("inicio")} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Início
            </button>
            <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Sobre
            </button>
            <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Serviços
            </button>
            <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Contato
            </button>
          </nav>

          <div className="hidden md:block">
            <Button onClick={() => scrollToSection("contato")} className="bg-primary/10 text-primary border border-primary/60 hover:bg-primary hover:text-accent-foreground hover:border-primary transition-all duration-300">
              Fale conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("inicio")} className="text-foreground hover:text-primary transition-colors duration-300 text-left font-medium">
                Início
              </button>
              <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors duration-300 text-left font-medium">
                Sobre
              </button>
              <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors duration-300 text-left font-medium">
                Serviços
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors duration-300 text-left font-medium">
                Contato
              </button>
              <Button onClick={() => scrollToSection("contato")} className="bg-primary/10 text-primary border border-primary/60 hover:bg-primary hover:text-accent-foreground hover:border-primary transition-all duration-300 w-full">
                Fale conosco
              </Button>
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;