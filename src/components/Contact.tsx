import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Entre em contato</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para ser seu parceiro na gestão contábil. Entre em contato e descubra
            como podemos ajudar seu negócio a crescer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Telefone</h3>
              <a
                href="https://wa.me/5562982330667"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                (62) 8233-0667
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">E-mail</h3>
              <a
                href="mailto:administrativo@exodocontabil.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 break-all"
              >
                administrativo@exodocontabil.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Endereço</h3>
              <p className="text-muted-foreground">
                Rua 23, nº 110 A, Bairro São Cristótão
                <br />
                Goianésia - GO
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Horário</h3>
              <p className="text-muted-foreground">
                08:00 - 12:00
                <br />
                14:00 - 18:00
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-3">Instagram</h3>
              <a
                href="https://www.instagram.com/exodo.gestaocontabil?igsh=NTMwN2g3bWN6cWFo&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                @exodo.gestaocontabil
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            asChild
            className="bg-primary text-accent hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <a href="https://wa.me/5562982330667" target="_blank" rel="noopener noreferrer">
              Fale conosco pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
