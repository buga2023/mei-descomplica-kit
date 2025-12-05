import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ProcessExplanationModal } from "@/components/ProcessExplanationModal";
import {
    Check,
    CheckCircle,
    ArrowRight,
    Star,
    Building2,
    TrendingUp,
    FileCheck,
    ShieldCheck,
    FileSignature,
    Users,
    ScrollText,
    Banknote
} from "lucide-react";

const slides = [
    {
        id: "mei",
        badge: "Formalização Rápida",
        title: <>Abertura de <span className="text-white">MEI</span></>,
        description: "Formalize seu negócio em minutos. Tenha CNPJ, direitos previdenciários e emissão de notas fiscais com baixo custo fixo mensal.",
        ctaText: "Abrir MEI",
        ctaLink: "/checkout?plan=pro",
        card: {
            icon: Building2,
            status: "CNPJ Ativo",
            label: "Faturamento Mensal",
            value: "Até R$ 6.750",
            progress: 75,
            items: [
                { label: "INSS", value: "Garantido", icon: CheckCircle },
                { label: "Nota Fiscal", value: "Liberada", icon: CheckCircle }
            ],
            finalTitle: "100% Legal",
            finalSubtitle: "Comece certo."
        }
    },
    {
        id: "me",
        badge: "Crescimento",
        title: <>Abertura de Empresa <span className="text-white">Simplificada</span></>,
        description: "Para quem faturou acima do teto do MEI. Transforme seu negócio em Microempresa (ME) ou EPP com regime tributário otimizado.",
        ctaText: "Abrir ME/EPP",
        ctaLink: "/checkout?plan=business",
        card: {
            icon: TrendingUp,
            status: "Em Crescimento",
            label: "Faturamento Anual",
            value: "Até R$ 360k+",
            progress: 90,
            items: [
                { label: "Impostos", value: "Simples", icon: CheckCircle },
                { label: "Funcionários", value: "Ilimitados", icon: CheckCircle }
            ],
            finalTitle: "Expansão",
            finalSubtitle: "Sem limites."
        }
    },
    {
        id: "consultancy",
        badge: "Proteção Patrimonial",
        title: <>Abertura de <span className="text-white">Holding</span></>,
        description: "Blindagem patrimonial e planejamento sucessório. Proteja seus bens e garanta o futuro da sua família com eficiência tributária.",
        ctaText: "Falar com Especialista",
        ctaLink: "/contato",
        card: {
            icon: ShieldCheck,
            status: "Patrimônio",
            label: "Segurança Jurídica",
            value: "Blindada",
            progress: 100,
            items: [
                { label: "Sucessão", value: "Planejada", icon: CheckCircle },
                { label: "Impostos", value: "Reduzidos", icon: CheckCircle }
            ],
            finalTitle: "Legado",
            finalSubtitle: "Bens protegidos."
        }
    },
    {
        id: "consultancy",
        badge: "Atualização Cadastral",
        title: <>Alteração <span className="text-white">Contratual</span></>,
        description: "Mudança de endereço, saída de sócios, aumento de capital ou alteração de atividade. Atualizamos seu contrato social com agilidade.",
        ctaText: "Alterar Contrato",
        ctaLink: "/contato",
        card: {
            icon: FileSignature,
            status: "Contrato",
            label: "Status Legal",
            value: "Atualizado",
            progress: 85,
            items: [
                { label: "Junta Comercial", value: "Ok", icon: CheckCircle },
                { label: "Receita", value: "Ok", icon: CheckCircle }
            ],
            finalTitle: "Em Dia",
            finalSubtitle: "Dados corretos."
        }
    },
    {
        id: "consultancy",
        badge: "Governança",
        title: <>Organização <span className="text-white">Societária</span></>,
        description: "Estruture acordos de sócios e regras de governança corporativa para garantir a longevidade, harmonia e profissionalismo do negócio.",
        ctaText: "Organizar Sociedade",
        ctaLink: "/contato",
        card: {
            icon: Users,
            status: "Sociedade",
            label: "Acordo de Sócios",
            value: "Definido",
            progress: 95,
            items: [
                { label: "Conflitos", value: "Prevenidos", icon: CheckCircle },
                { label: "Papéis", value: "Claros", icon: CheckCircle }
            ],
            finalTitle: "Harmonia",
            finalSubtitle: "Foco no negócio."
        }
    },
    {
        id: "consultancy",
        badge: "Conformidade",
        title: <>Regularização de <span className="text-white">Alvarás</span></>,
        description: "Mantenha sua empresa legalizada. Regularizamos alvarás de funcionamento, licenças sanitárias e corpo de bombeiros.",
        ctaText: "Regularizar Alvará",
        ctaLink: "/contato",
        card: {
            icon: ScrollText,
            status: "Licenças",
            label: "Funcionamento",
            value: "Autorizado",
            progress: 100,
            items: [
                { label: "Prefeitura", value: "Regular", icon: CheckCircle },
                { label: "Vigilância", value: "Regular", icon: CheckCircle }
            ],
            finalTitle: "Segurança",
            finalSubtitle: "Sem interdições."
        }
    },
    {
        id: "regularize",
        badge: "Limpa Nome",
        title: <>Regularização de <span className="text-white">Débitos</span></>,
        description: "Negocie dívidas tributárias, parcele débitos com a Receita Federal e recupere o crédito da sua empresa.",
        ctaText: "Negociar Dívidas",
        ctaLink: "/checkout?plan=regularize",
        card: {
            icon: Banknote,
            status: "Financeiro",
            label: "Situação Fiscal",
            value: "Regularizada",
            progress: 60,
            items: [
                { label: "CND", value: "Emitida", icon: CheckCircle },
                { label: "Parcelamento", value: "Ativo", icon: CheckCircle }
            ],
            finalTitle: "Crédito",
            finalSubtitle: "Recuperado."
        }
    }
];

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const [explanationModalOpen, setExplanationModalOpen] = useState(false);
    const [selectedFlow, setSelectedFlow] = useState<string>('mei');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    const handleCtaClick = (e: React.MouseEvent, link: string, id: string) => {
        e.preventDefault();
        setSelectedFlow(id);
        setExplanationModalOpen(true);
    };

    const handleProceed = () => {
        setExplanationModalOpen(false);
        const isConsultancy = selectedFlow === 'consultancy';

        if (isConsultancy) {
            navigate("/contato");
        } else {
            // Redirect to the Plans section
            window.location.href = "/#planos";
        }
    };

    return (
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-gold">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-brand-gold"></div>

            {/* White Curve Shape (Right Side) */}
            <div className="absolute top-0 right-0 h-full w-[90%] lg:w-[38%] bg-white rounded-l-[100px] lg:rounded-l-[200px] z-0"></div>

            {/* Decorative Pattern/Blur on the white part */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 mix-blend-multiply"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative min-h-[400px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-8"
                            >
                                <Badge className="w-fit bg-brand-navy text-brand-gold border-none px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-brand-navy/10">
                                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                                    {slide.badge}
                                </Badge>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-brand-navy leading-[1.1]">
                                    {slide.title}
                                </h1>
                                <p className="text-xl text-brand-navy/80 max-w-xl leading-relaxed">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-brand-navy hover:bg-brand-navy/90 text-brand-gold shadow-xl shadow-brand-navy/20 transition-all hover:scale-105" asChild>
                                        <Link
                                            to={slide.ctaLink}
                                            onClick={(e) => handleCtaClick(e, slide.ctaLink, slide.id)}
                                        >
                                            {slide.ctaText}
                                            <ArrowRight className="ml-2 h-6 w-6" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-2xl border-brand-navy/20 bg-white text-brand-gold hover:bg-slate-50 hover:text-brand-gold hover:border-brand-navy/40" asChild>
                                        <a href="#planos">Ver Planos</a>
                                    </Button>
                                </div>

                                <div className="flex items-center gap-4 mt-8 text-sm text-slate-400">
                                    <div className="flex flex-col">
                                        <div className="flex text-brand-navy/60">
                                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-brand-navy" />)}
                                        </div>
                                        <span className="font-medium text-brand-navy/60">4.9/5 de satisfação</span>
                                    </div>
                                </div>

                                {/* Navigation Dots */}
                                <div className="flex gap-3 mt-4">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                                ? "w-8 bg-brand-navy"
                                                : "w-2 bg-brand-navy/20 hover:bg-brand-navy/40"
                                                }`}
                                            aria-label={`Ir para slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="relative lg:h-[600px] flex items-center justify-end lg:pr-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-md"
                            >
                                {/* Abstract Dashboard / Card Visual */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative w-full aspect-[4/5] bg-white rounded-[2.5rem] shadow-2xl p-8 border-4 border-brand-gold overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50/50 to-transparent opacity-50"></div>

                                    {/* Floating Elements */}
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                                                <slide.card.icon className="text-accent-foreground w-8 h-8" />
                                            </div>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">{slide.card.status}</Badge>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <div className="text-brand-navy/70 text-sm font-medium">{slide.card.label}</div>
                                                <div className="text-5xl font-bold text-brand-navy tracking-tight">{slide.card.value}</div>
                                                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-brand-navy rounded-full shadow-[0_0_20px_rgba(0,29,110,0.3)] transition-all duration-1000"
                                                        style={{ width: `${slide.card.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {slide.card.items.map((item, index) => (
                                                    <div key={index} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                                        <div className="text-brand-navy/70 text-xs mb-2 font-medium uppercase tracking-wider">{item.label}</div>
                                                        <div className="text-brand-navy font-bold flex items-center gap-2 text-lg">
                                                            {item.icon && <item.icon className="w-5 h-5 text-emerald-600" />} {item.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-brand-navy rounded-2xl p-1">
                                            <div className="bg-brand-navy rounded-xl p-4 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                                                    <Check className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="text-brand-gold font-bold text-lg">{slide.card.finalTitle}</div>
                                                    <div className="text-brand-gold/80 text-sm">{slide.card.finalSubtitle}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <ProcessExplanationModal
                open={explanationModalOpen}
                onOpenChange={setExplanationModalOpen}
                type={selectedFlow}
                onProceed={handleProceed}
            />
        </section>
    );
};
