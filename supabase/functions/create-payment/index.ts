import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  plan: 'pro' | 'business';
  customerEmail?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating payment for Abacate Pay...');
    
    const { plan, customerEmail } = await req.json() as PaymentRequest;
    
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

    const billingData = {
      frequency: 'ONE_TIME',
      methods: ['PIX', 'CARD'],
      amount: selectedPlan.amount,
      ...(customerEmail && {
        customer: {
          email: customerEmail
        }
      }),
      products: [
        {
          externalId: `mei-${plan}`,
          name: selectedPlan.description,
          description: selectedPlan.description,
          quantity: 1,
          price: selectedPlan.amount
        }
      ]
    };

    console.log('Calling Abacate Pay API...');
    
    const response = await fetch('https://api.abacatepay.com/v1/billing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${abacatePayApiKey}`
      },
      body: JSON.stringify(billingData)
    });

    const responseData = await response.json();
    
    console.log('Abacate Pay response:', responseData);

    if (!response.ok || responseData.error) {
      console.error('Abacate Pay error:', responseData);
      throw new Error(responseData.error || 'Erro ao criar cobrança');
    }

    // Retornar a URL de pagamento
    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: responseData.data.url,
        billingId: responseData.data.id
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
