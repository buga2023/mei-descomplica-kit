import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (req.method !== 'POST') {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { name, email, whatsapp, plan, amount } = await req.json();

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
                <p><strong>Valor:</strong> R$ ${amount}</p>
                <hr>
                <p>Este email foi enviado via Resend.</p>
            `
        });

        if (error) {
            console.error("Resend API Error:", error);
            return new Response(JSON.stringify({ error: 'Failed to send email', details: error }), {
                status: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully', data }), {
            status: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error', details: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
    }
};
