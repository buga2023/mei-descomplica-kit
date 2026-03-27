import { useParams, Link, useNavigate } from "react-router-dom";
import { processSteps } from "../data/processSteps";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { Header } from "@/components/sections/Header";

const stepKeys = Object.keys(processSteps) as (keyof typeof processSteps)[];

const ProcessDetail = () => {
    const { stepId } = useParams();
    const navigate = useNavigate();
    const step = processSteps[stepId as keyof typeof processSteps];
    const sanitizedContent = useMemo(() => step ? DOMPurify.sanitize(step.content) : '', [step]);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setVideoLoaded(false);
    }, [stepId]);

    if (!step) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-brand-navy">
                <h1 className="font-display text-3xl font-extrabold mb-4">Passo não encontrado</h1>
                <Button onClick={() => navigate("/")}>Voltar para o início</Button>
            </div>
        );
    }

    const Icon = step.icon;
    const currentIndex = stepKeys.indexOf(stepId as keyof typeof processSteps);
    const progress = ((step.id) / 4) * 100;

    return (
        <div className="min-h-screen bg-white selection:bg-brand-gold/30">
            <Header />

            {/* Hero header */}
            <div className="bg-brand-navy pt-24 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/[0.06] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

                <div className="container relative z-10 max-w-5xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-8 text-sm">
                        <Link to="/" className="text-white/35 hover:text-brand-gold transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" />
                            <span>Início</span>
                        </Link>
                        <ChevronRight className="w-3 h-3 text-white/20" />
                        <span className="text-white/35">Como Funciona</span>
                        <ChevronRight className="w-3 h-3 text-white/20" />
                        <span className="text-brand-gold font-medium">{step.title}</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Step indicator */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/20 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-brand-gold" />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-brand-gold/60 mb-1">
                                    Passo {step.id} de 4
                                </div>
                                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                    {step.title}
                                </h1>
                            </div>
                        </div>

                        <p className="text-white/45 text-lg max-w-2xl leading-relaxed mb-8">
                            {step.description}
                        </p>

                        {/* Progress bar */}
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="h-full bg-brand-gold rounded-full"
                                />
                            </div>
                            <span className="text-xs font-bold text-white/30">{step.id}/4</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <main className="container max-w-5xl py-12 lg:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Main content */}
                        <div className="lg:col-span-2">
                            {sanitizedContent && (
                                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-100 shadow-sm mb-8">
                                    <div
                                        className="prose prose-lg prose-slate max-w-none
                                            prose-p:text-brand-navy/55 prose-p:leading-relaxed prose-p:text-[15px]
                                            prose-headings:font-display prose-headings:text-brand-navy prose-headings:font-extrabold"
                                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                                    />
                                </div>
                            )}

                            {/* Video */}
                            {step.videoUrl && (
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                                    {!videoLoaded && (
                                        <button
                                            onClick={() => setVideoLoaded(true)}
                                            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-brand-navy group cursor-pointer"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                                                <Play className="w-7 h-7 text-brand-gold ml-1" />
                                            </div>
                                            <span className="text-white/50 text-sm font-medium">Assistir vídeo explicativo</span>
                                        </button>
                                    )}
                                    {videoLoaded && (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`${step.videoUrl}&autoplay=1`}
                                            title={step.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-5">
                                {/* Navigation card */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                    <h3 className="font-display text-sm font-extrabold text-brand-navy mb-4 uppercase tracking-wider">Navegação</h3>

                                    <div className="space-y-2.5">
                                        {step.nextStep ? (
                                            <Button className="w-full h-12 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold shadow-md shadow-brand-navy/15 group/btn" asChild>
                                                <Link to={`/como-funciona/${step.nextStep}`}>
                                                    Próximo Passo
                                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button className="w-full h-12 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold shadow-md shadow-brand-gold/20 group/btn" asChild>
                                                <Link to="/checkout?plan=pro">
                                                    Abrir meu MEI
                                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                                                </Link>
                                            </Button>
                                        )}

                                        {step.prevStep && (
                                            <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-brand-navy/50 hover:text-brand-navy hover:bg-slate-50 text-sm" asChild>
                                                <Link to={`/como-funciona/${step.prevStep}`}>
                                                    <ArrowLeft className="mr-2 w-3.5 h-3.5" />
                                                    Passo Anterior
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Steps overview */}
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <h3 className="font-display text-xs font-extrabold text-brand-navy/40 mb-4 uppercase tracking-wider">Todos os passos</h3>
                                    <div className="space-y-2">
                                        {stepKeys.map((key, i) => {
                                            const s = processSteps[key];
                                            const isCurrent = key === stepId;
                                            const isPast = i < currentIndex;
                                            return (
                                                <Link
                                                    key={key}
                                                    to={`/como-funciona/${key}`}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                                        isCurrent
                                                            ? "bg-brand-gold/10 text-brand-navy font-bold"
                                                            : isPast
                                                                ? "text-brand-navy/30 hover:text-brand-navy/60 hover:bg-white"
                                                                : "text-brand-navy/40 hover:text-brand-navy/60 hover:bg-white"
                                                    }`}
                                                >
                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                                        isCurrent
                                                            ? "bg-brand-navy text-brand-gold"
                                                            : isPast
                                                                ? "bg-brand-gold/15 text-brand-gold"
                                                                : "bg-slate-200/60 text-slate-400"
                                                    }`}>
                                                        {String(s.id).padStart(2, "0")}
                                                    </div>
                                                    <span className="truncate">{s.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ProcessDetail;
