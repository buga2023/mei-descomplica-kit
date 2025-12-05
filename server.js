import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
    const { name, email, whatsapp, plan, amount } = req.body;

    try {
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
            return res.status(400).json({ error: 'Failed to send email', details: error });
        }

        console.log("Email sent successfully:", data);
        res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});

app.post('/api/send-client-receipt', async (req, res) => {
    const { name, email, plan, amount } = req.body;

    try {
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
            return res.status(400).json({ error: 'Failed to send client receipt', details: error });
        }

        console.log("Client receipt sent successfully:", data);
        res.status(200).json({ message: 'Client receipt sent successfully', data });
    } catch (error) {
        console.error("Internal Server Error (Client Receipt):", error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});

app.post('/api/create-pix-payment', async (req, res) => {
    const { plan, customer } = req.body;

    try {
        const planDetails = {
            pro: {
                amount: 31300, // R$ 313,00 em centavos
                description: 'Pro MEI - Abertura MEI Completa'
            },
            business: {
                amount: 46700, // R$ 467,00 em centavos
                description: 'Business MEI - Abertura MEI Premium'
            }
        };

        const selectedPlan = planDetails[plan];

        if (!selectedPlan) {
            return res.status(400).json({ error: 'Plano inválido' });
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
            return res.status(400).json({ error: responseData.error || 'Erro ao criar cobrança' });
        }

        res.status(200).json({
            success: true,
            qrCode: responseData.data.brCodeBase64,
            pixCode: responseData.data.brCode,
            pixId: responseData.data.id
        });

    } catch (error) {
        console.error('Error creating Pix payment:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
