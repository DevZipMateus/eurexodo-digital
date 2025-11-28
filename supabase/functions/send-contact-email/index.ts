import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const smtpClient = new SMTPClient({
  connection: {
    hostname: "smtp.hostinger.com",
    port: 465,
    tls: true,
    auth: {
      username: Deno.env.get("EMAIL_USER") || "",
      password: Deno.env.get("EMAIL_PASS") || "",
    },
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendEmailRequest {
  nome: string;
  email: string;
  mensagem: string;
  destinatario?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método não permitido" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { nome, email, mensagem, destinatario }: SendEmailRequest = await req.json();

    if (!nome || !email || !mensagem) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const toAddress = destinatario || "administrativo@exodocontabil.com";

    const html = `
      <h2>📩 Novo contato pelo site</h2>
      <p><b>Nome:</b> ${nome}</p>
      <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
      <p><b>Mensagem:</b></p>
      <p>${(mensagem || "").replace(/\n/g, "<br>")}</p>
    `;

    try {
      await smtpClient.send({
        from: `Formulário do Site <${Deno.env.get("EMAIL_USER")}>`,
        to: toAddress,
        subject: `Novo contato de ${nome} pelo site`,
        html,
        replyTo: email,
      });

      console.log("Email enviado com sucesso via SMTP Hostinger");
    } catch (smtpError) {
      console.error("Erro ao enviar e-mail (SMTP):", smtpError);
      return new Response(
        JSON.stringify({ error: "Falha ao enviar o e-mail." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ message: "✅ Email enviado com sucesso!" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Erro na função send-contact-email:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno ao processar a solicitação." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
