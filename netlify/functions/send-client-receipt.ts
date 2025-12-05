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
        const { name, email, plan, amount } = await req.json();

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'gustavossantos2905@gmail.com',
            subject: `Pagamento Confirmado - MEI Descomplica`,
            html: `
                <h2>Pagamento Confirmado!</h2>
                <p>Olá, <strong>${name}</strong>!</p>
                <p>Seu pagamento para o plano <strong>${plan}</strong> no valor de <strong>R$ ${amount}</strong> foi confirmado com sucesso.</p>
                <p>Em breve entraremos em contato via WhatsApp para dar continuidade ao seu processo.</p>
                <hr>
                <p>Obrigado por confiar na MEI Descomplica.</p>
            `
        });

        if (error) {
            console.error("Resend API Error (Client Receipt):", error);
            return new Response(JSON.stringify({ error: 'Failed to send client receipt', details: error }), {
                status: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }

        return new Response(JSON.stringify({ message: 'Client receipt sent successfully', data }), {
            status: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });

    } catch (error) {
        console.error("Internal Server Error (Client Receipt):", error);
        return new Response(JSON.stringify({ error: 'Internal server error', details: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
    }
};
