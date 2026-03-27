export const CONFIG = {
    WHATSAPP_NUMBER: "5511999999999",
    PRECO_ESSENCIAL: "125",
    PRECO_PRO: "313",
    PRECO_BUSINESS: "467",
    EMAIL: "contato@suaempresa.com.br",
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
    PAYMENT_CHECKING: "Verificando pagamento...",
    PAYMENT_NOT_FOUND: "Pagamento ainda não identificado. Tente novamente em alguns instantes.",
    PAYMENT_CHECK_ERROR: "Erro ao verificar pagamento. Tente novamente.",
    INVALID_EMAIL: "Por favor, insira um e-mail válido.",
    INVALID_PHONE: "Por favor, insira um telefone válido (ex: 11999999999).",
    INVALID_CPF: "Por favor, insira um CPF válido (11 dígitos).",
};

export function whatsappLink(message = "Quero abrir meu MEI") {
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
