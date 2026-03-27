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

export default async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { name, email, whatsapp, plan } = await req.json();

        const serverAmount = PLAN_AMOUNTS[plan] || 'N/A';

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'gustavossantos2905@gmail.com',
            subject: `Novo Lead: ${name} - Plano ${plan}`,
            html: `
                <h2>Novo Lead Capturado</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                <p><strong>Plano Escolhido:</strong> ${plan}</p>
                <p><strong>Valor:</strong> R$ ${serverAmount}</p>
                <hr>
                <p>Este email foi enviado via Resend.</p>
            `
        });

        if (error) {
            console.error("Resend API Error:", error);
            return new Response(JSON.stringify({ error: 'Falha ao enviar email' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully', data }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });
    }
};
