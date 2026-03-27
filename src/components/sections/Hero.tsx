import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ProcessExplanationModal } from "@/components/ProcessExplanationModal";
import DotGrid from "@/components/DotGrid";
import { whatsappLink } from "@/config";
import {
    Check,
    CheckCircle,
    ArrowRight,
    Star,
    Building2,
    TrendingUp,
    ShieldCheck,
    FileSignature,
    Users,
    ScrollText,
    Banknote,
    Clock,
    UserCheck,
} from "lucide-react";

/* ——— Slides ——— */
const slides = [
    {
        id: "mei",
        badge: "MEI",
        title: "Abertura de",
        highlight: "MEI",
        description: "Formalize o seu negócio de forma rápida e prática. Tenha o seu CNPJ, direitos previdenciários e realize emissão de notas fiscais com baixo custo fixo mensal.",
        ctaText: "Abrir MEI",
        ctaLink: "/checkout?plan=pro",
        card: {
            icon: Building2,
            label: "FATURAMENTO ANUAL",
            value: "81K",
            status: "Acesso Rápido",
            progress: 100,
            items: [
                { label: "Vantagem 01", value: "Contribuição ao INSS", icon: CheckCircle },
                { label: "Vantagem 02", value: "Emissão de Notas Fiscais", icon: CheckCircle },
                { label: "Vantagem 03", value: "Conformidade Legal", icon: CheckCircle },
            ],
            finalTitle: "100% Legal",
            finalSubtitle: "Comece certo.",
        },
    },
    {
        id: "me",
        badge: "CRESCIMENTO DO SEU NEGÓCIO",
        title: "Abertura de Empresa",
        highlight: "Simplificada",
        description: "Para quem precisa desenquadrar o seu MEI ou iniciar uma nova empresa. Formalize o seu negócio como Microempresa (ME) ou Empresa de Pequeno Porte (EPP) com regime tributário otimizado.",
        ctaText: "Abrir ME/EPP",
        ctaLink: "/checkout?plan=enterprise",
        card: {
            icon: TrendingUp,
            label: "FATURAMENTO ANUAL",
            value: "Até R$ 4,8 Milhões",
            status: "Expansão",
            progress: 100,
            items: [
                { label: "Vantagem 01", value: "Limite de Faturamento Ampliado", icon: CheckCircle },
                { label: "Vantagem 02", value: "Formalização do Negócio", icon: CheckCircle },
                { label: "Vantagem 03", value: "Regime Tributário Simplificado", icon: CheckCircle },
            ],
            finalTitle: "Expansão",
            finalSubtitle: "Sem limites.",
        },
    },
    {
        id: "holding",
        badge: "ORGANIZAÇÃO DO SEU PATRIMÔNIO",
        title: "Abertura de",
        highlight: "Holding",
        description: "Converse com um especialista e defina o melhor modelo conforme a sua necessidade. Proteja os seus bens e garanta o futuro da sua família com eficiência tributária.",
        ctaText: "Falar com Especialista",
        ctaLink: "whatsapp",
        card: {
            icon: ShieldCheck,
            label: "STATUS",
            value: "Patrimônio Organizado",
            status: "Blindagem",
            progress: 100,
            items: [
                { label: "Vantagem 01", value: "Organize participações societárias garantindo eficiência tributária", icon: CheckCircle },
                { label: "Vantagem 02", value: "Proteção patrimonial e redução de impostos no recebimento de aluguéis", icon: CheckCircle },
                { label: "Vantagem 03", value: "Planejamento sucessório sem necessidade de inventário", icon: CheckCircle },
            ],
            finalTitle: "Legado",
            finalSubtitle: "Bens protegidos.",
        },
    }
];

const SLIDE_INTERVAL_MS = 10000;

/* ——— Status Icon ——— */
const StatusIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
    >
        <Icon className="w-6 h-6 text-emerald-600" />
    </motion.div>
);

/* ——— Main Hero ——— */
export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const [explanationModalOpen, setExplanationModalOpen] = useState(false);
    const [selectedFlow, setSelectedFlow] = useState<string>("mei");
    const prefersReducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];
    const CardIcon = slide.card.icon;

    const handleCtaClick = (e: React.MouseEvent, link: string, id: string) => {
        e.preventDefault();
        if (link === "whatsapp") {
            window.open(whatsappLink(), "_blank");
            return;
        }
        setSelectedFlow(id);
        setExplanationModalOpen(true);
    };

    const handleProceed = () => {
        setExplanationModalOpen(false);
        if (selectedFlow === "consultancy") {
            navigate("/contato");
        } else {
            window.location.href = "/#planos";
        }
    };

    return (
        <section className="relative pt-44 sm:pt-48 pb-20 lg:pt-52 lg:pb-28 overflow-hidden bg-brand-gold" aria-label="Carrossel de serviços">
            {/* Gold background (fills left side naturally) */}
            <div className="absolute inset-0 bg-brand-gold" />

            {/* White curve (right side) with interactive DotGrid */}
            <div className="absolute top-0 right-0 h-full w-full lg:w-[45%] bg-white rounded-l-[80px] lg:rounded-l-[160px] z-0 overflow-hidden shadow-[-20px_0_100px_-15px_rgba(0,0,0,0.1)] border-l border-white/10">
                <DotGrid
                    dotSize={4}
                    gap={18}
                    baseColor="#e2e8f0"
                    activeColor="#001D6E"
                    proximity={100}
                    shockRadius={200}
                    shockStrength={4}
                    resistance={800}
                    returnDuration={1.5}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1920px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ═══ Left: Text on gold background ═══ */}
                    <div className="relative min-h-[420px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={prefersReducedMotion ? undefined : { opacity: 0, x: 30 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col gap-5"
                            >
                                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-navy/50">Contabilidade Digital</span>

                                <Badge className="w-fit bg-brand-navy text-brand-gold border-none px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-brand-navy/10">
                                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                                    {slide.badge}
                                </Badge>

                                <h1 className={`font-black tracking-tight text-brand-navy leading-[0.95] mb-4 ${slide.id === 'me' ? 'text-[2.5rem] sm:text-[3.5rem] md:text-5xl lg:text-6xl xl:text-[4.5rem]' : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl'}`}>
                                    {slide.id === "me" ? (
                                        <>
                                            Abertura de <br className="hidden sm:block" /> <span className="whitespace-nowrap">Empresa <span className="relative text-white drop-shadow-sm">
                                                {slide.highlight}
                                                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-navy/15 rounded-full -z-10" />
                                            </span></span>
                                        </>
                                    ) : (
                                        <>
                                            {slide.title}{" "}
                                            <span className="relative text-white drop-shadow-sm">
                                                {slide.highlight}
                                                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-navy/15 rounded-full -z-10" />
                                            </span>
                                        </>
                                    )}
                                </h1>

                                <p className="text-lg lg:text-xl text-brand-navy/75 max-w-lg leading-relaxed [text-wrap:balance] lg:min-h-[140px] md:min-h-[110px]">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-base font-bold rounded-2xl bg-brand-navy hover:bg-brand-navy/90 text-brand-gold shadow-xl shadow-brand-navy/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] animate-glow-gold group/cta"
                                        asChild
                                    >
                                        <Link to={slide.ctaLink} onClick={(e) => handleCtaClick(e, slide.ctaLink, slide.id)}>
                                            {slide.ctaText}
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-base font-bold rounded-2xl bg-white hover:bg-slate-50 text-brand-navy shadow-xl border border-brand-navy/10 transition-all duration-300 hover:scale-[1.03]"
                                        asChild
                                    >
                                        <a href="#planos">Ver Planos</a>
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Trust bar (always visible, outside AnimatePresence) */}
                        <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-brand-navy/70 bg-brand-navy/[0.06] rounded-2xl px-5 py-3">
                            <div className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4" />
                                <span className="font-semibold">5.000+ CNPJs</span>
                            </div>
                            <span className="w-px h-4 bg-brand-navy/15 hidden sm:block" />
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-brand-navy text-brand-navy" />
                                <span className="font-semibold">4.9/5 satisfação</span>
                            </div>
                            <span className="w-px h-4 bg-brand-navy/15 hidden sm:block" />
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">CNPJ em 48h</span>
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex gap-2.5 mt-6">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === currentSlide
                                            ? "w-8 bg-brand-navy"
                                            : "w-2 bg-brand-navy/20 hover:bg-brand-navy/40"
                                    }`}
                                    aria-label={`Ir para slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ═══ Right: Premium card on white background ═══ */}
                    <div className="relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full max-w-[620px] lg:translate-x-12"
                            >
                                {/* Soft glow behind card */}
                                <div className="absolute -inset-10 bg-brand-gold/15 rounded-[3rem] blur-[80px] pointer-events-none opacity-50" />

                                {/* Card with Glassmorphism */}
                                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,29,110,0.25),0_0_1px_1px_rgba(0,29,110,0.05)] border border-white/40 overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                                    {/* Premium Gold accent strip with animated glow */}
                                    <div className="h-2 w-full bg-brand-gold relative overflow-hidden">
                                        <motion.div 
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full"
                                        />
                                    </div>

                                    <div className="p-8 lg:p-10">
                                        {/* Card header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center shadow-lg shadow-brand-navy/20">
                                                    <CardIcon className="w-6 h-6 text-brand-gold" />
                                                </div>
                                                <div>
                                                    <div className="text-[11px] font-bold uppercase tracking-widest text-brand-navy/45">{slide.card.label}</div>
                                                    <div className="text-xl font-extrabold text-brand-navy tracking-tight leading-none mt-0.5">{slide.card.value}</div>
                                                </div>
                                            </div>
                                            <StatusIcon icon={CheckCircle} />
                                        </div>

                                        {/* Status badge */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-bold text-emerald-600">{slide.card.status}</span>
                                        </div>

                                        {/* Checklist with refined cards */}
                                        <div className="flex flex-col gap-3 lg:gap-4 mb-8">
                                            {slide.card.items.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.35 + i * 0.15, duration: 0.45 }}
                                                    className="bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-5 lg:px-6 lg:py-6 border border-white/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between"
                                                >
                                                    <div className="flex items-start gap-3 mr-4 lg:min-h-[44px]">
                                                        <span className="text-[11px] font-black text-brand-navy/20 mt-0.5 select-none lg:mt-1.5">{String(i + 1).padStart(2, "0")}</span>
                                                        <div className="text-[13px] md:text-sm lg:text-[15px] font-bold text-brand-navy flex items-center gap-2.5 leading-snug">
                                                            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500 shrink-0" />
                                                            <span>{item.value}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 self-center">
                                                        <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-600 stroke-[3]" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Bottom bar */}
                                        <div className="bg-brand-navy rounded-2xl p-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                                                <Check className="w-5 h-5 text-brand-gold" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-brand-gold font-bold text-sm leading-tight">{slide.card.finalTitle}</div>
                                                <div className="text-brand-gold/60 text-xs">{slide.card.finalSubtitle}</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-brand-gold/40 shrink-0" />
                                        </div>
                                    </div>
                                </div>
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
