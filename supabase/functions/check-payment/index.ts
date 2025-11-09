import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckPaymentRequest {
  pixId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Checking payment status...');
    
    const { pixId } = await req.json() as CheckPaymentRequest;
    
    if (!pixId) {
      throw new Error('pixId é obrigatório');
    }

    const abacatePayApiKey = Deno.env.get('ABACATE_PAY_API_KEY');
    
    if (!abacatePayApiKey) {
      throw new Error('ABACATE_PAY_API_KEY não configurada');
    }

    console.log(`Checking payment for pixId: ${pixId}`);
    
    const response = await fetch(`https://api.abacatepay.com/v1/pixQrCode/check/${pixId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${abacatePayApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();
    
    console.log('Abacate Pay check response:', responseData);

    if (!response.ok || responseData.error) {
      console.error('Abacate Pay error:', responseData);
      throw new Error(responseData.error || 'Erro ao verificar pagamento');
    }

    // Retornar os dados do status do pagamento
    return new Response(
      JSON.stringify({
        success: true,
        status: responseData.data.status,
        expiresAt: responseData.data.expiresAt
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error checking payment:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro ao verificar pagamento';
    
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
