import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ChevronRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { CnpjBenefits } from "@/components/sections/CnpjBenefits";
import { Header } from "@/components/sections/Header";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/data/processSteps";

const stepKeys = Object.keys(processSteps) as (keyof typeof processSteps)[];

const BenefitsDetail = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-brand-navy selection:bg-brand-gold/30">
            <Header />

            {/* Hero header */}
            <div className="bg-brand-navy pt-24 pb-12 relative overflow-hidden">
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
                        <span className="text-brand-gold font-medium">Benefícios</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/20 flex items-center justify-center">
                                <Gift className="w-7 h-7 text-brand-gold" />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-brand-gold/60 mb-1">
                                    Passo 4 de 4
                                </div>
                                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                    Aproveite os Benefícios
                                </h1>
                            </div>
                        </div>

                        <p className="text-white/45 text-lg max-w-2xl leading-relaxed mb-8">
                            Conheça todas as vantagens exclusivas de ser MEI com a nossa assessoria especializada.
                        </p>

                        {/* Progress bar */}
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="h-full bg-brand-gold rounded-full"
                                />
                            </div>
                            <span className="text-xs font-bold text-white/30">4/4</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Benefits content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <CnpjBenefits />
            </motion.div>

            {/* Footer navigation */}
            <div className="bg-[#001050] py-10 border-t border-white/[0.04]">
                <div className="container max-w-5xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/como-funciona/recebimento")}
                            className="border-white/10 text-white/40 hover:text-white hover:bg-white/[0.04] rounded-xl h-11 group"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Passo Anterior
                        </Button>

                        {/* Mini steps */}
                        <div className="flex items-center gap-1.5">
                            {stepKeys.map((key, i) => (
                                <Link
                                    key={key}
                                    to={key === "beneficios" ? "/como-funciona/beneficios" : `/como-funciona/${key}`}
                                    className={`w-8 h-1.5 rounded-full transition-colors duration-300 ${
                                        key === "beneficios"
                                            ? "bg-brand-gold"
                                            : "bg-white/10 hover:bg-white/20"
                                    }`}
                                />
                            ))}
                        </div>

                        <Link
                            to="/"
                            className="text-white/35 hover:text-brand-gold transition-colors text-sm font-medium flex items-center gap-1.5"
                        >
                            <Home className="w-3.5 h-3.5" />
                            Voltar ao início
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsDetail;
