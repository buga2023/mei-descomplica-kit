export const CONFIG = {
    WHATSAPP_NUMBER: "5511999999999",
    PRECO_ESSENCIAL: "125",
    PRECO_PRO: "313",
    PRECO_BUSINESS: "467",
    EMAIL: "contato@suaempresa.com.br",
    // Coloque aqui o seu código PIX Copia e Cola gerado no app do seu banco
    PIX_CODE: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-42661417400052040000530398654041.005802BR5913Pejotize Ltda6008Sao Paulo62070503***6304E2CA",
    EMAILJS: {
        SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    }
};

export const TOAST_MESSAGES = {
    PIX_COPIED: "Código PIX copiado!",
    PAYMENT_CONFIRMED: "Pagamento confirmado!",
    PAYMENT_PENDING: "Pagamento ainda não identificado. Tente novamente em alguns instantes.",
    DATA_SENT: "Dados enviados com sucesso!",
    DATA_SEND_ERROR: "Não foi possível enviar o email, mas vamos prosseguir.",
    QR_GENERATED: "QR Code gerado com sucesso!",
    QR_ERROR: "Erro ao gerar QR Code. Tente novamente.",
    FIELDS_REQUIRED: "Por favor, preencha todos os campos.",
    COPY_ERROR: "Erro ao copiar código",
};

export function whatsappLink(message = "Quero abrir meu MEI") {
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
