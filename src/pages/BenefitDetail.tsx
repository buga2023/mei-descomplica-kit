import { useParams, Link, useNavigate } from "react-router-dom";
import { benefitsData } from "../data/benefitsData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const BenefitDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const benefit = benefitsData[slug as keyof typeof benefitsData];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!benefit) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
                <h1 className="text-3xl font-bold mb-4">Benefício não encontrado</h1>
                <Button onClick={() => navigate("/")}>Voltar para o início</Button>
            </div>
        );
    }

    const Icon = benefit.icon;

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-500/30">
            {/* Header */}
            <header className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/30 via-slate-900 to-slate-900"></div>
                <div className="container relative z-10">
                    <Link to="/" className="inline-flex items-center text-slate-400 hover:text-amber-400 transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para o início
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-8 items-start md:items-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Icon className="w-10 h-10 text-slate-900" />
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
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-strong:text-slate-900 prose-strong:font-bold"
                                dangerouslySetInnerHTML={{ __html: benefit.content }}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800">
                                <h3 className="text-2xl font-bold text-white mb-6">Comece Agora</h3>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-amber-500" /> Processo 100% Online
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-amber-500" /> Rápido e Seguro
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-amber-500" /> Suporte Especializado
                                    </li>
                                </ul>
                                <Button className="w-full h-14 text-lg font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-105" asChild>
                                    <Link to="/checkout?plan=pro">
                                        Abrir MEI Agora
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                                <h4 className="font-bold text-slate-900 mb-2">Precisa de ajuda?</h4>
                                <p className="text-slate-600 mb-4">Nossa equipe está pronta para tirar suas dúvidas.</p>
                                <Button variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-100 font-bold" asChild>
                                    <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
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
