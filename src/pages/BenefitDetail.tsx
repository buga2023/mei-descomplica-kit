import { useParams, Link, useNavigate } from "react-router-dom";
import { benefitsData } from "../data/benefitsData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { whatsappLink } from "@/config";
import DOMPurify from "dompurify";

const BenefitDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const benefit = benefitsData[slug as keyof typeof benefitsData];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!benefit) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-brand-navy">
                <h1 className="text-3xl font-bold mb-4">Benefício não encontrado</h1>
                <Button onClick={() => navigate("/")}>Voltar para o início</Button>
            </div>
        );
    }

    const Icon = benefit.icon;
    const sanitizedContent = useMemo(() => DOMPurify.sanitize(benefit.content), [benefit.content]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-gold/30">
            {/* Header */}
            <header className="bg-brand-navy pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/30 via-brand-navy to-brand-navy"></div>
                <div className="container relative z-10">
                    <Link to="/" className="inline-flex items-center text-slate-400 hover:text-brand-gold transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para o início
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-8 items-start md:items-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-brand-gold flex items-center justify-center shadow-lg shadow-brand-gold/20">
                            <Icon className="w-10 h-10 text-brand-navy" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {benefit.title}
                            </h1>
                            <p className="text-xl text-slate-300 max-w-2xl">
                                {benefit.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Content */}
            <main className="container py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid lg:grid-cols-3 gap-12"
                >
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                            <div
                                className="prose prose-lg prose-slate max-w-none 
                prose-headings:text-brand-navy prose-headings:font-bold
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-strong:text-brand-navy prose-strong:font-bold"
                                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-brand-navy rounded-3xl p-8 shadow-xl border border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-6">Comece Agora</h3>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-brand-gold" /> Processo 100% Online
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-brand-gold" /> Rápido e Seguro
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-brand-gold" /> Suporte Especializado
                                    </li>
                                </ul>
                                <Button className="w-full h-14 text-lg font-bold bg-brand-gold hover:bg-brand-gold/90 text-brand-navy shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-all hover:scale-105" asChild>
                                    <Link to="/checkout?plan=pro">
                                        Abrir MEI Agora
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-brand-gold/10 rounded-3xl p-8 border border-brand-gold/20">
                                <h4 className="font-bold text-brand-navy mb-2">Precisa de ajuda?</h4>
                                <p className="text-slate-600 mb-4">Nossa equipe está pronta para tirar suas dúvidas.</p>
                                <Button variant="outline" className="w-full border-brand-gold text-brand-navy hover:bg-brand-gold/10 font-bold" asChild>
                                    <a href={whatsappLink("Preciso de ajuda com meu MEI")} target="_blank" rel="noopener noreferrer">
                                        Falar no WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default BenefitDetail;
