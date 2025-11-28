import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo e descrição */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src="/logo.png" alt="Êxodo Gestão Contábil" className="h-10 w-10 sm:h-12 sm:w-12" />
              <span className="font-bold text-lg sm:text-xl text-primary">Êxodo</span>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Mais que contabilidade, uma parceria na gestão do seu negócio.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Links rápidos</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#inicio"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Contato</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/5562982330667"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  (62) 8233-0667
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:administrativo@exodocontabil.com"
                  className="text-white/80 hover:text-primary transition-colors duration-300 break-all"
                >
                  administrativo@exodocontabil.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/exodo.gestaocontabil?igsh=NTMwN2g3bWN6cWFo&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  @exodo.gestaocontabil
                </a>
              </li>
            </ul>
          </div>

          {/* Horário e endereço */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Horário</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  08:00 - 12:00
                  <br />
                  14:00 - 18:00
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  Rua 23, nº 110 A
                  <br />
                  Bairro São Cristótão
                  <br />
                  Goianésia - GO
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/20 pt-4 sm:pt-6">
          <p className="text-center text-white/60 text-xs sm:text-sm">
            © {currentYear} Êxodo Gestão Contábil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
