import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface PlanData {
    id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    briefExplanation: string;
    recommended?: boolean;
}

interface PlanDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: PlanData | null;
}

export const PlanDetailsModal = ({ open, onOpenChange, plan }: PlanDetailsModalProps) => {
    if (!plan) return null;

    const isFree = plan.price === "0" || plan.price === "Grátis";

    // Dynamic Icon based on plan
    const PlanIcon = () => {
        if (plan.id === 'essencial') return <Zap className="w-full h-full text-brand-gold" />;
        if (plan.id === 'pro') return <Star className="w-full h-full text-brand-gold" />;
        return <Shield className="w-full h-full text-brand-gold" />;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0 bg-white border-none overflow-hidden shadow-2xl">

                {/* Dynamic Background Header */}
                <div className="relative bg-brand-navy h-56 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-brand-navy to-brand-navy"></div>

                    {/* Animated Abstract Geometric Shape */}
                    <motion.div
                        className="absolute w-72 h-72 bg-brand-gold/20 rounded-[3rem] blur-3xl"
                        animate={{
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.1, 0.9, 1.1, 1],
                            borderRadius: ["30%", "50%", "30%", "50%", "30%"]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Floating Icon Container */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl mb-4">
                            <div className="w-12 h-12">
                                <PlanIcon />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{plan.title}</h2>
                        <p className="text-blue-200 font-medium">{plan.description}</p>
                    </motion.div>

                    {plan.recommended && (
                        <div className="absolute top-4 right-4 bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                            Mais Popular
                        </div>
                    )}
                </div>

                <div className="px-8 py-8 bg-white relative z-10">
                    <div className="flex items-baseline justify-center mb-8 border-b border-slate-100 pb-8">
                        <span className="text-5xl font-bold text-brand-navy">
                            {isFree ? "Grátis" : `R$ ${plan.price}`}
                        </span>
                        {!isFree && <span className="text-slate-400 font-medium ml-2">/único</span>}
                    </div>

                    <div className="space-y-8">
                        <div className="prose prose-slate prose-lg max-w-none text-center">
                            <p className="text-brand-navy leading-relaxed font-medium">
                                {plan.briefExplanation}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <h4 className="font-bold text-brand-navy mb-4 text-xs uppercase tracking-wider text-center">
                                O que está incluso
                            </h4>
                            <ul className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (index * 0.05) }}
                                        className="flex items-start gap-3 text-slate-700 font-medium"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-brand-gold" />
                                        </div>
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky Bottom CTA */}
                <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <Button
                        className={`w-full h-16 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide ${isFree
                            ? "bg-slate-100 text-brand-navy hover:bg-slate-200"
                            : "bg-brand-gold hover:bg-brand-gold/90 text-brand-navy shadow-brand-gold/25"
                            }`}
                        asChild
                    >
                        <Link to={`/checkout?plan=${plan.id}`} className="flex items-center justify-center gap-2">
                            {isFree ? "Começar Grátis Agora" : "IR PARA O PAGAMENTO"}
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                    <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-medium">
                        {isFree
                            ? "Sem compromisso • Cancelamento grátis"
                            : "Garantia de 7 dias • Pagamento Seguro"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
