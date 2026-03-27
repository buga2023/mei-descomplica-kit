import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGIN = 'https://pejotize.netlify.app';

const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const PLAN_AMOUNTS: Record<string, string> = {
    pro: '313',
    business: '467',
};

const PLAN_NAMES: Record<string, string> = {
    pro: 'Profissional',
    business: 'Business',
};

export default async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { name, email, plan } = await req.json();

        const serverAmount = PLAN_AMOUNTS[plan] || 'N/A';
        const planName = PLAN_NAMES[plan] || plan;

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'gustavossantos2905@gmail.com',
            subject: `Pagamento Confirmado - MEI Descomplica`,
            html: `
                <h2>Pagamento Confirmado!</h2>
                <p>Olá, <strong>${name}</strong>!</p>
                <p>Seu pagamento para o plano <strong>${planName}</strong> no valor de <strong>R$ ${serverAmount}</strong> foi confirmado com sucesso.</p>
                <p>Em breve entraremos em contato via WhatsApp para dar continuidade ao seu processo.</p>
                <hr>
                <p>Obrigado por confiar na MEI Descomplica.</p>
            `
        });

        if (error) {
            console.error("Resend API Error (Client Receipt):", error);
            return new Response(JSON.stringify({ error: 'Falha ao enviar recibo' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            });
        }

        return new Response(JSON.stringify({ message: 'Client receipt sent successfully', data }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });

    } catch (error) {
        console.error("Internal Server Error (Client Receipt):", error);
        return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });
    }
};
