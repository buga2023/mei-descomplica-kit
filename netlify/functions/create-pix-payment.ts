import { Resend } from 'resend';

const ALLOWED_ORIGIN = 'https://pejotize.netlify.app';

const corsHeaders = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const { plan, customer } = await req.json();

        const planDetails: Record<string, { amount: number; description: string }> = {
            pro: {
                amount: 31300,
                description: 'Pro MEI - Abertura MEI Completa'
            },
            business: {
                amount: 46700,
                description: 'Business MEI - Abertura MEI Premium'
            }
        };

        const selectedPlan = planDetails[plan];

        if (!selectedPlan) {
            return new Response(JSON.stringify({ error: 'Plano inválido' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            });
        }

        const pixData = {
            amount: selectedPlan.amount,
            expiresIn: 3600,
            description: selectedPlan.description,
            customer: customer,
            metadata: {
                externalId: `mei-${plan}-${Date.now()}`
            }
        };

        const response = await fetch('https://api.abacatepay.com/v1/pixQrCode/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.ABACATE_PAY_API_KEY}`
            },
            body: JSON.stringify(pixData)
        });

        const responseData = await response.json();

        if (!response.ok || responseData.error) {
            console.error('Abacate Pay error:', responseData);
            return new Response(JSON.stringify({ error: 'Erro ao criar cobrança' }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            qrCode: responseData.data.brCodeBase64,
            pixCode: responseData.data.brCode,
            pixId: responseData.data.id
        }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });

    } catch (error) {
        console.error('Error creating Pix payment:', error);
        return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders }
        });
    }
};
