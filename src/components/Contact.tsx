import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const subject = `Contato de ${values.name}`;
    const body = `Nome: ${values.name}%0D%0AEmail: ${values.email}%0D%0ATelefone: ${values.phone}%0D%0A%0D%0AMensagem:%0D%0A${values.message}`;
    const mailtoLink = `mailto:administrativo@exodocontabil.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Abrindo seu cliente de email",
      description: "Complete o envio no seu aplicativo de email.",
    });
  };

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4">Entre em contato</h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Estamos prontos para ser seu parceiro na gestão contábil. Entre em contato e descubra
            como podemos ajudar seu negócio a crescer.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(62) 98888-8888" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Como podemos ajudar?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-accent hover:bg-primary/90"
                    size="lg"
                  >
                    Enviar mensagem
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">Telefone</h3>
              <a
                href="https://wa.me/5562982330667"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                (62) 8233-0667
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">E-mail</h3>
              <a
                href="mailto:administrativo@exodocontabil.com"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300 break-all"
              >
                administrativo@exodocontabil.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">Endereço</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Rua 23, nº 110 A, Bairro São Cristótão
                <br />
                Goianésia - GO
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">Horário</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                08:00 - 12:00
                <br />
                14:00 - 18:00
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 sm:mb-3">Instagram</h3>
              <a
                href="https://www.instagram.com/exodo.gestaocontabil?igsh=NTMwN2g3bWN6cWFo&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                @exodo.gestaocontabil
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 sm:mt-12 px-4">
          <Button
            size="lg"
            asChild
            className="bg-primary text-accent hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto text-sm sm:text-base"
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
