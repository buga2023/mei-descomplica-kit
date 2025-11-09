import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  plan: 'pro' | 'business';
  customer?: {
    name: string;
    cellphone: string;
    email: string;
    taxId: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating PIX QR Code for Abacate Pay...');
    
    const { plan, customer } = await req.json() as PaymentRequest;
    
    // Define os valores de acordo com o plano
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
      throw new Error('Plano inválido');
    }

    console.log(`Creating billing for plan: ${plan}, amount: ${selectedPlan.amount}`);

    // Criar cobrança no Abacate Pay
    const abacatePayApiKey = Deno.env.get('ABACATE_PAY_API_KEY');
    
    if (!abacatePayApiKey) {
      throw new Error('ABACATE_PAY_API_KEY não configurada');
    }

    const pixData = {
      amount: selectedPlan.amount,
      expiresIn: 3600, // 1 hora
      description: selectedPlan.description,
      ...(customer && { customer }),
      metadata: {
        externalId: `mei-${plan}-${Date.now()}`
      }
    };

    console.log('Calling Abacate Pay PIX API...');
    
    const response = await fetch('https://api.abacatepay.com/v1/pixQrCode/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${abacatePayApiKey}`
      },
      body: JSON.stringify(pixData)
    });

    const responseData = await response.json();
    
    console.log('Abacate Pay response:', responseData);

    if (!response.ok || responseData.error) {
      console.error('Abacate Pay error:', responseData);
      throw new Error(responseData.error || 'Erro ao criar cobrança');
    }

    // Retornar os dados do QR Code PIX
    return new Response(
      JSON.stringify({
        success: true,
        qrCode: responseData.data.brCodeBase64,
        pixCode: responseData.data.brCode,
        pixId: responseData.data.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error creating payment:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro ao processar pagamento';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
