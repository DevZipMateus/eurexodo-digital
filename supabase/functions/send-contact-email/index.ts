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
  nomeEmpresa?: string;
  telefone?: string;
  email: string;
  cidade?: string;
  regimeTributario?: string;
  servicos?: string;
  necessidade?: string;
  numeroColaboradores?: string;
  faturamento?: string;
  comoConheceu?: string;
  mensagem: string;
  destinatario?: string;
  enviarConfirmacao?: boolean;
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
    const { 
      nome, 
      nomeEmpresa, 
      telefone, 
      email, 
      cidade, 
      regimeTributario,
      servicos,
      necessidade,
      numeroColaboradores,
      faturamento,
      comoConheceu,
      mensagem, 
      destinatario,
      enviarConfirmacao = false
    }: SendEmailRequest = await req.json();

    if (!nome || !email) {
      return new Response(
        JSON.stringify({ error: "Nome e email são obrigatórios." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const toAddress = destinatario || "administrativo@exodocontabil.com";

    // Email para a empresa
    let htmlEmpresa = `
      <h2>📩 Novo contato pelo site</h2>
      <p><b>Nome:</b> ${nome}</p>
    `;
    
    if (nomeEmpresa) {
      htmlEmpresa += `<p><b>Nome da Empresa:</b> ${nomeEmpresa}</p>`;
    }
    
    if (telefone) {
      htmlEmpresa += `<p><b>Telefone/WhatsApp:</b> ${telefone}</p>`;
    }
    
    htmlEmpresa += `<p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>`;
    
    if (cidade) {
      htmlEmpresa += `<p><b>Cidade e Estado:</b> ${cidade}</p>`;
    }
    
    if (regimeTributario) {
      htmlEmpresa += `<p><b>Regime Tributário:</b> ${regimeTributario}</p>`;
    }
    
    if (servicos) {
      htmlEmpresa += `<p><b>Serviços de Interesse:</b> ${servicos}</p>`;
    }
    
    if (necessidade) {
      htmlEmpresa += `<p><b>Principal Necessidade:</b> ${necessidade}</p>`;
    }
    
    if (numeroColaboradores) {
      htmlEmpresa += `<p><b>Número de Colaboradores:</b> ${numeroColaboradores}</p>`;
    }
    
    if (faturamento) {
      htmlEmpresa += `<p><b>Faixa de Faturamento:</b> ${faturamento}</p>`;
    }
    
    if (comoConheceu) {
      htmlEmpresa += `<p><b>Como Conheceu:</b> ${comoConheceu}</p>`;
    }
    
    if (mensagem) {
      htmlEmpresa += `
        <p><b>Mensagem:</b></p>
        <p>${(mensagem || "").replace(/\n/g, "<br>")}</p>
      `;
    }

    const emailUser = Deno.env.get("EMAIL_USER") || "";
    
    if (!emailUser) {
      console.error("EMAIL_USER não configurado");
      return new Response(
        JSON.stringify({ error: "Configuração de email não disponível." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    try {
      // Enviar email para a empresa
      await smtpClient.send({
        from: emailUser,
        to: toAddress,
        subject: `Novo contato de ${nome} pelo site`,
        html: htmlEmpresa,
        replyTo: email,
      });

      console.log("Email enviado com sucesso para a empresa via SMTP Hostinger");

      // Enviar email de confirmação para o cliente
      if (enviarConfirmacao) {
        const htmlCliente = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">Obrigado por entrar em contato com a Êxodo Gestão Contábil!</h2>
            <p>Olá, ${nome}!</p>
            <p>Recebemos sua mensagem e nossa equipe retornará em breve.</p>
            <p>Estamos ansiosos para ajudar ${nomeEmpresa || "sua empresa"} a crescer com soluções contábeis estratégicas.</p>
            <br>
            <p><b>Atenciosamente,</b></p>
            <p>Equipe Êxodo Gestão Contábil</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              <b>Êxodo Gestão Contábil</b><br>
              Telefone: (62) 9 8233-0667<br>
              Email: administrativo@exodocontabil.com<br>
              Instagram: @exodo.gestaocontabil
            </p>
          </div>
        `;

        await smtpClient.send({
          from: emailUser,
          to: email,
          subject: "Recebemos seu contato - Êxodo Gestão Contábil",
          html: htmlCliente,
        });

        console.log("Email de confirmação enviado para o cliente via SMTP Hostinger");
      }
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
