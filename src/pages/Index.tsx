import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PixPaymentModal } from "@/components/PixPaymentModal";
import { CustomerDataModal } from "@/components/CustomerDataModal";
import { 
  Check, 
  X, 
  MessageCircle, 
  Shield, 
  FileCheck, 
  Clock, 
  ArrowRight,
  Award,
  Users,
  Star,
  ChevronRight
} from "lucide-react";

// Configurações editáveis
const CONFIG = {
  WHATSAPP_NUMBER: "5511999999999", // Alterar para seu número com DDI
  VIDEO_URL: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Alterar para seu vídeo
  PRECO_ESSENCIAL: "125",
  PRECO_PRO: "313",
  PRECO_BUSINESS: "467",
  CNPJ: "00.000.000/0001-00",
  RAZAO_SOCIAL: "Sua Empresa LTDA",
  EMAIL: "contato@suaempresa.com.br"
};

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState<'pro' | 'business' | null>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'business' | null>(null);
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [pixData, setPixData] = useState<{
    qrCode: string;
    pixKey: string;
    amount: number;
  } | null>(null);

  const whatsappLink = (plan = "") => {
    const message = plan 
      ? `Quero%20o%20${plan}%20MEI` 
      : "Quero%20abrir%20meu%20MEI";
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
  };

  const handleOpenCustomerModal = (plan: 'pro' | 'business') => {
    setSelectedPlan(plan);
    setCustomerModalOpen(true);
  };

  const handlePayment = async (customerData: {
    name: string;
    cellphone: string;
    email: string;
    taxId: string;
  }) => {
    if (!selectedPlan) return;
    
    setLoadingPayment(selectedPlan);
    
    try {
      const planAmounts = {
        pro: 31300,
        business: 46700
      };

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          plan: selectedPlan,
          customer: customerData
        }
      });

      if (error) throw error;

      if (data?.success && data?.qrCode && data?.pixKey) {
        setPixData({
          qrCode: data.qrCode,
          pixKey: data.pixKey,
          amount: planAmounts[selectedPlan]
        });
        setCustomerModalOpen(false);
        setPixModalOpen(true);
      } else {
        throw new Error(data?.error || 'Erro ao criar pagamento');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Erro ao processar pagamento. Tente novamente ou entre em contato via WhatsApp.');
    } finally {
      setLoadingPayment(null);
    }
  };

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Designer Freelancer",
      text: "Processo super rápido! Em 2 dias já estava emitindo nota fiscal. O suporte foi excelente.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      text: "Melhor investimento que fiz. O calendário de DAS e as orientações me salvaram de muita dor de cabeça.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Consultora",
      text: "Profissionalismo do início ao fim. Recomendo demais, principalmente o plano Pro!",
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: "Quais documentos preciso para abrir o MEI?",
      answer: "Você precisa de RG, CPF, comprovante de endereço recente e ter uma ideia da atividade que vai exercer. Vamos te ajudar a escolher o CNAE correto na conversa inicial."
    },
    {
      question: "Em quanto tempo meu MEI fica pronto?",
      answer: "O processo varia de 24 a 48 horas úteis, dependendo da liberação da prefeitura do seu município. Em alguns casos pode ser instantâneo."
    },
    {
      question: "Posso emitir nota fiscal logo após a abertura?",
      answer: "Sim! No plano Pro e Business, te ajudamos na primeira emissão de nota fiscal e configuração do sistema da sua cidade/estado."
    },
    {
      question: "Qual é o limite de faturamento do MEI?",
      answer: "O limite anual é de R$ 81.000,00 (cerca de R$ 6.750,00 por mês). Se ultrapassar, você precisa migrar para ME ou outro regime."
    },
    {
      question: "Posso ter carteira assinada e ser MEI ao mesmo tempo?",
      answer: "Sim! Você pode ser CLT e MEI simultaneamente, desde que sua atividade como MEI não conflite com seu emprego."
    },
    {
      question: "O que é o DAS e quando devo pagar?",
      answer: "O DAS é o boleto mensal de impostos do MEI (a partir de R$ 67,00). Deve ser pago até o dia 20 de cada mês. Te enviamos um calendário completo!"
    },
    {
      question: "Preciso de contador sendo MEI?",
      answer: "Não é obrigatório, mas recomendamos para organização. Nosso serviço já inclui as orientações principais para você começar certo."
    },
    {
      question: "O que acontece se eu não pagar o DAS?",
      answer: "Você acumula multa e juros, e pode ter problemas para emitir notas ou certidões. Importante manter em dia!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Sticky */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MEI Fácil</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Como funciona
            </a>
            <a href="#planos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Planos
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
          <Button variant="whatsapp" size="sm" asChild>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <Badge className="w-fit" variant="secondary">
                <Award className="h-3 w-3 mr-1" />
                Especialista em MEI
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Abra seu CNPJ MEI em poucas horas, sem burocracia
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Eu cuido de tudo: cadastro, CNAE, emissão de CCMEI e orientações de nota fiscal. Comece a faturar legalmente hoje mesmo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild className="group">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Falar no WhatsApp agora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href="#planos">
                    Comparar planos
                    <ChevronRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Atendimento especializado
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileCheck className="h-5 w-5 text-secondary" />
                  Pagamento seguro
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-info" />
                  Conforme LGPD
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
                <iframe
                  src={CONFIG.VIDEO_URL}
                  title="Como funciona a abertura do MEI"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provas Rápidas */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Abertura em até 24-48h úteis</h3>
                    <p className="text-sm text-muted-foreground">Dependendo do município, pode ser ainda mais rápido</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <FileCheck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Passo a passo para nota fiscal e DAS</h3>
                    <p className="text-sm text-muted-foreground">Você não fica perdido após a abertura</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Apoio na escolha de CNAE e emissão do CCMEI</h3>
                    <p className="text-sm text-muted-foreground">Orientação completa do início ao fim</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Processo
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simples, rápido e sem burocracia. Você foca no seu negócio, eu cuido do resto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Conversa inicial",
                description: "Validamos seus dados e entendemos sua atividade pelo WhatsApp"
              },
              {
                step: "02",
                title: "Abertura e CNAE",
                description: "Fazemos toda a abertura do MEI e escolhemos o CNAE adequado"
              },
              {
                step: "03",
                title: "CCMEI e orientações",
                description: "Emissão do certificado e orientações sobre obrigações fiscais"
              },
              {
                step: "04",
                title: "Kit completo",
                description: "Entrega de acessos, guia de nota fiscal e calendário DAS"
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-primary transition-colors">
                <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5">
                  {item.step}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos - Ancoragem de Preço */}
      <section id="planos" className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Planos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todos os planos incluem abertura do MEI e orientação inicial. O prazo depende das liberações do governo local.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Plano Essencial */}
            <Card className="relative border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Essencial MEI</CardTitle>
                <CardDescription>Para quem só quer abrir e começar</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">R$ {CONFIG.PRECO_ESSENCIAL}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">à vista</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Abertura do MEI (CCMEI)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Definição de CNAE</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Orientações iniciais</span>
                  </li>
                  <li className="flex items-center gap-2 opacity-50">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">Suporte por 7 dias</span>
                  </li>
                  <li className="flex items-center gap-2 opacity-50">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">Sem emissão de NF assistida</span>
                  </li>
                  <li className="flex items-center gap-2 opacity-50">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">Sem calendário DAS</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <a href={whatsappLink("Essencial")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Quero o Essencial
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Plano Pro - RECOMENDADO */}
            <Card className="relative border-2 border-primary shadow-2xl scale-105 lg:scale-110 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground shadow-lg">
                  <Star className="h-3 w-3 mr-1" />
                  Mais escolhido
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro MEI</CardTitle>
                <CardDescription>Para começar certo e sem dor de cabeça</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">R$ {CONFIG.PRECO_PRO}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">à vista</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Tudo do Essencial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Emissão de 1ª Nota Fiscal assistida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Checklist de obrigações + calendário DAS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Suporte por 30 dias no WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Ajuste/validação de CNAE</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="hero"
                  onClick={() => handleOpenCustomerModal('pro')}
                  disabled={loadingPayment !== null}
                >
                  Fechar no Pro
                </Button>
              </CardContent>
            </Card>

            {/* Plano Business */}
            <Card className="relative border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Business MEI</CardTitle>
                <CardDescription>Para quem quer padronizar e escalar</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">R$ {CONFIG.PRECO_BUSINESS}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">à vista</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Tudo do Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Abertura de conta PJ (orientada)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Config. de emissão de NF (municipal/estadual)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Guia de proposta comercial + modelo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Suporte por 60 dias</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => handleOpenCustomerModal('business')}
                  disabled={loadingPayment !== null}
                >
                  Quero o Business
                </Button>
              </CardContent>
            </Card>

            {/* Plano Enterprise */}
            <Card className="relative border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise / PJ</CardTitle>
                <CardDescription>Para Ltda/Simples e demandas com equipe</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">Sob consulta</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">valores personalizados</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Planejamento tributário inicial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Contrato social e registro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Integrações e rotinas fiscais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Contabilidade parceira</span>
                  </li>
                </ul>
                <Button className="w-full" variant="secondary" asChild>
                  <a href={whatsappLink("Enterprise")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Falar com especialista
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              💡 Teste grátis não se aplica. Todos os valores são à vista e únicos (sem mensalidade).
            </p>
          </div>
        </div>
      </section>

      {/* Bônus & Garantia */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-secondary">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Bônus Limitado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Checklist MEI 2025</p>
                    <p className="text-sm text-muted-foreground">Todas as obrigações mensais e anuais</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Modelo de proposta comercial</p>
                    <p className="text-sm text-muted-foreground">Template editável para seus clientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Garantia Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  Se não conseguirmos protocolar sua abertura por motivo técnico nosso, <span className="font-bold">devolvemos 100% do valor pago</span>. Sem perguntas, sem burocracia.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Você não corre nenhum risco. Estamos confiantes na qualidade do nosso serviço.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="h-3 w-3 mr-1" />
              Depoimentos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre abertura de MEI
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-primary via-primary-light to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Pronto para emitir nota como MEI?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Não perca mais tempo com burocracia. Fale comigo agora e comece a faturar legalmente.
          </p>
          <Button variant="hero" size="xl" asChild className="bg-accent hover:bg-accent-hover shadow-2xl">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Quero abrir meu MEI agora
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">MEI Fácil</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Facilitando a abertura de MEI desde 2020. Mais de 500 empresas abertas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Planos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#planos" className="hover:text-foreground transition-colors">Essencial</a></li>
                <li><a href="#planos" className="hover:text-foreground transition-colors">Pro (Recomendado)</a></li>
                <li><a href="#planos" className="hover:text-foreground transition-colors">Business</a></li>
                <li><a href="#planos" className="hover:text-foreground transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: {CONFIG.EMAIL}</li>
                <li>CNPJ: {CONFIG.CNPJ}</li>
                <li>{CONFIG.RAZAO_SOCIAL}</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 MEI Fácil. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacidade (LGPD)</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Dados do Cliente */}
      <CustomerDataModal
        open={customerModalOpen}
        onOpenChange={setCustomerModalOpen}
        onSubmit={handlePayment}
        plan={selectedPlan || 'pro'}
        loading={loadingPayment !== null}
      />

      {/* Modal de Pagamento PIX */}
      <PixPaymentModal 
        open={pixModalOpen}
        onOpenChange={setPixModalOpen}
        qrCodeBase64={pixData?.qrCode}
        pixCode={pixData?.pixKey}
        amount={pixData?.amount || 0}
      />

      {/* Botão Flutuante WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary hover:bg-secondary-light text-secondary-foreground rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 shadow-secondary/50"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Index;
