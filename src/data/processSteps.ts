import { FileText, Cpu, CheckCircle, Gift } from "lucide-react";

export const processSteps = {
  "preenchimento": {
    id: 1,
    title: "Preencha o formulário",
    icon: FileText,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad7K2sW2_s8f8B8_", // Placeholder video
    description: "Informe seus dados básicos em nosso formulário seguro. Leva menos de 2 minutos.",
    content: `
      <p>O primeiro passo para regularizar seu negócio é fornecer as informações essenciais. Nosso formulário foi desenhado para ser simples, intuitivo e rápido. Você só precisa ter em mãos seus documentos pessoais (RG, CPF) e o endereço onde o negócio funcionará (pode ser sua própria casa).</p>
      
      <p>Nesta etapa, nossa plataforma já realiza uma validação preliminar dos dados para evitar erros comuns que poderiam travar o processo na Receita Federal. Tudo é feito em um ambiente criptografado de ponta a ponta, garantindo a total segurança e confidencialidade das suas informações pessoais.</p>
    `,
    nextStep: "analise",
    prevStep: null
  },
  "analise": {
    id: 2,
    title: "Análise Inteligente",
    icon: Cpu,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad7K2sW2_s8f8B8_", // Placeholder video
    description: "Nossa tecnologia valida suas informações e seleciona o melhor CNAE para sua atividade.",
    content: `
      <p>Após o envio dos dados, nossa Inteligência Artificial entra em ação. Ela cruza as informações da sua atividade com o banco de dados de CNAEs (Classificação Nacional de Atividades Econômicas) permitidos para MEI. Isso garante que você seja enquadrado na categoria correta, evitando multas e problemas fiscais no futuro.</p>
      
      <p>Além da classificação, o sistema verifica pendências prévias no seu CPF que poderiam impedir a abertura do CNPJ. Caso seja detectada alguma inconsistência, nossa equipe de especialistas é alertada imediatamente para analisar o caso e orientar você sobre como resolver a situação antes de prosseguir com o registro.</p>
    `,
    nextStep: "recebimento",
    prevStep: "preenchimento"
  },
  "recebimento": {
    id: 3,
    title: "Receba seu CNPJ",
    icon: CheckCircle,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad7K2sW2_s8f8B8_", // Placeholder video
    description: "Seu CNPJ, CCMEI e guias são entregues diretamente no seu WhatsApp e E-mail.",
    content: `
      <p>Com tudo aprovado, o processo de registro é finalizado junto aos órgãos governamentais. Em questão de minutos, seu CNPJ é gerado e sua empresa passa a existir oficialmente. Nós compilamos toda a documentação necessária: o Certificado da Condição de Microempreendedor Individual (CCMEI), o cartão CNPJ e as primeiras guias DAS.</p>
      
      <p>Você não precisa acessar sites complicados do governo para buscar esses documentos. Nós enviamos um "Kit MEI" completo e organizado diretamente para o seu WhatsApp e E-mail. Além disso, você recebe um guia de boas-vindas com orientações sobre como emitir notas fiscais e manter sua empresa em dia.</p>
    `,
    nextStep: "beneficios",
    prevStep: "analise"
  },
  "beneficios": {
    id: 4,
    title: "Benefícios",
    icon: Gift,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad7K2sW2_s8f8B8_", // Placeholder video
    description: "Aproveite todos os benefícios exclusivos de ser MEI com a nossa assessoria especializada.",
    content: "", // Content will be rendered by CnpjBenefits component
    nextStep: null,
    prevStep: "recebimento"
  }
};
