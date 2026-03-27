import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanDetailsModal, PlanData } from "@/components/PlanDetailsModal";
import { CONFIG } from "@/config";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Clock, Zap, ArrowRight, Star, Crown, Sparkles, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config";

const PLANS: PlanData[] = [
    {
        id: "essencial",
        title: "Essencial",
        price: CONFIG.PRECO_ESSENCIAL,
        description: "Para quem quer agilidade",
        briefExplanation: "Ideal para quem precisa apenas do CNPJ e das guias iniciais. Nós cuidamos de toda a burocracia de abertura para você começar a faturar rapidamente.",
        features: [
            "Abertura do MEI (CCMEI)",
            "Definição de CNAE",
            "Cartão CNPJ"
        ]
    },
    {
        id: "pro",
        title: "Profissional",
        price: CONFIG.PRECO_PRO,
        description: "O mais completo para começar",
        recommended: true,
        briefExplanation: "A escolha recomendada para quem quer segurança total. Inclui suporte prioritário, emissão da primeira nota fiscal e um calendário fiscal para você nunca perder prazos.",
        features: [
            "Tudo do Essencial",
            "Emissão de 1ª Nota Fiscal",
            "Calendário de Obrigações",
            "Suporte Prioritário (30 dias)"
        ]
    },
    {
        id: "business",
        title: "Business",
        price: CONFIG.PRECO_BUSINESS,
        description: "Gestão completa inicial",
        briefExplanation: "Gestão completa para o seu negócio. Além de tudo do plano Profissional, você conta com abertura de conta PJ e consultoria para crescimento sustentável.",
        features: [
            "Tudo do Pro",
            "Abertura de Conta PJ",
            "Modelo de Proposta Comercial",
            "Suporte Estendido (60 dias)"
        ]
    },
    {
        id: "personalizado",
        title: "Personalizado",
        price: "Sob Medida",
        description: "Para demandas específicas",
        briefExplanation: "Entre em contato, explique como podemos te ajudar e receba uma proposta feita à mão.",
        features: [
            "Análise Individual",
            "Soluções Customizadas",
            "Atendimento Exclusivo"
        ]
    }
];

const planIcons: Record<string, React.ElementType> = {
    essencial: Zap,
    pro: Star,
    business: Crown,
    personalizado: Sparkles,
};

export const Pricing = () => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedDetailPlan, setSelectedDetailPlan] = useState<PlanData | null>(null);

    const handleOpenDetails = (plan: PlanData) => {
        if (plan.id === "personalizado") {
            window.open(whatsappLink("Quero saber mais sobre o plano Personalizado"), "_blank");
            return;
        }
        setSelectedDetailPlan(plan);
        setDetailsModalOpen(true);
    };

    return (
        <section id="planos" className="py-section-y bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.04] border border-brand-navy/[0.08] mb-6">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-navy/50" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/50">Preços transparentes</span>
                    </div>
                    <h2 className="section-heading text-brand-navy mb-5">Planos Transparentes</h2>
                    <p className="text-lg text-brand-navy/50 leading-relaxed">
                        Escolha o nível de suporte ideal para o seu momento. Sem taxas escondidas.
                    </p>
                </motion.div>

                {/* Plans grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[90rem] mx-auto items-stretch">
                    {PLANS.map((plan, index) => {
                        const isRecommended = !!plan.recommended;
                        const isCustom = plan.id === "personalizado";
                        const Icon = planIcons[plan.id];

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 * (index + 1), duration: 0.5 }}
                                className={`relative group ${isRecommended ? "lg:-my-3 z-10" : ""}`}
                            >
                                {/* Recommended glow */}
                                {isRecommended && (
                                    <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-gold via-brand-gold/60 to-brand-gold/20 rounded-[2rem] blur-[1px]" />
                                )}

                                <div className={`relative h-full flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 ${
                                    isRecommended
                                        ? "bg-brand-navy text-white shadow-2xl shadow-brand-navy/20"
                                        : isCustom
                                            ? "bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 shadow-lg"
                                            : "bg-white border border-slate-200/80 shadow-lg hover:shadow-xl hover:border-brand-gold/30"
                                }`}>

                                    {/* Top badge */}
                                    {isRecommended && (
                                        <div className="absolute top-5 right-5 z-20">
                                            <Badge className="bg-brand-gold text-brand-navy px-3 py-1 text-[10px] font-bold shadow-lg border-none uppercase tracking-wider">
                                                Mais Popular
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Card body */}
                                    <div className="p-8 lg:p-9 flex-1 flex flex-col">
                                        {/* Icon + Title */}
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                                                isRecommended
                                                    ? "bg-brand-gold/20"
                                                    : "bg-brand-navy/[0.05]"
                                            }`}>
                                                <Icon className={`w-5 h-5 ${isRecommended ? "text-brand-gold" : "text-brand-navy/60"}`} />
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-bold leading-none ${isRecommended ? "text-white" : "text-brand-navy"}`}>
                                                    {plan.title}
                                                </h3>
                                                <p className={`text-xs mt-0.5 ${isRecommended ? "text-white/50" : "text-slate-400"}`}>
                                                    {plan.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-7">
                                            {isCustom ? (
                                                <div className="flex items-baseline gap-1">
                                                    <span className={`text-2xl font-black ${isRecommended ? "text-white" : "text-brand-navy"}`}>
                                                        Sob Medida
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-baseline gap-1">
                                                    <span className={`text-sm font-medium ${isRecommended ? "text-white/40" : "text-slate-400"}`}>R$</span>
                                                    <span className={`text-5xl font-black tracking-tight leading-none ${isRecommended ? "text-white" : "text-brand-navy"}`}>
                                                        {plan.price}
                                                    </span>
                                                    <span className={`text-sm font-medium ml-1 ${isRecommended ? "text-white/40" : "text-slate-400"}`}>/único</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Divider */}
                                        <div className={`h-px w-full mb-6 ${isRecommended ? "bg-white/10" : "bg-slate-100"}`} />

                                        {/* Features */}
                                        <ul className="space-y-3.5 flex-1 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                        isRecommended
                                                            ? "bg-brand-gold/20"
                                                            : "bg-brand-gold/10"
                                                    }`}>
                                                        <Check className={`w-3 h-3 ${isRecommended ? "text-brand-gold" : "text-brand-navy/70"}`} />
                                                    </div>
                                                    <span className={`text-sm font-medium leading-tight ${
                                                        isRecommended ? "text-white/80" : "text-brand-navy/65"
                                                    }`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Button
                                            onClick={() => handleOpenDetails(plan)}
                                            className={`w-full h-13 rounded-xl text-sm font-bold transition-all duration-300 group/btn ${
                                                isRecommended
                                                    ? "bg-brand-gold hover:bg-brand-gold/90 text-brand-navy shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-[1.02] active:scale-[0.98]"
                                                    : isCustom
                                                        ? "bg-brand-navy/[0.06] hover:bg-brand-navy/10 text-brand-navy border border-brand-navy/10"
                                                        : "bg-brand-navy hover:bg-brand-navy/90 text-white shadow-md shadow-brand-navy/10 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                            }`}
                                        >
                                            {isCustom ? (
                                                <>
                                                    <MessageCircle className="w-4 h-4 mr-1.5" />
                                                    Falar com Especialista
                                                </>
                                            ) : (
                                                <>
                                                    Contratar Agora
                                                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Footer guarantee */}
                                    <div className={`px-8 py-3 text-center border-t ${
                                        isRecommended
                                            ? "border-white/[0.06] bg-white/[0.03]"
                                            : "border-slate-100 bg-slate-50/50"
                                    }`}>
                                        <p className={`text-[11px] font-medium flex items-center justify-center gap-1.5 ${
                                            isRecommended ? "text-white/35" : "text-slate-400"
                                        }`}>
                                            <ShieldCheck className="w-3 h-3" />
                                            {isCustom ? "Proposta sem compromisso" : "Garantia de entrega ou reembolso"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Urgency banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-14 mx-auto max-w-xl"
                >
                    <div className="flex items-center justify-center gap-3 bg-brand-gold/[0.06] border border-brand-gold/15 rounded-2xl px-6 py-4 text-brand-navy">
                        <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                        <p className="text-sm font-medium text-brand-navy/70">
                            <Zap className="w-3.5 h-3.5 inline text-brand-gold mr-1" />
                            Oferta por tempo limitado — garanta o preço atual antes do reajuste.
                        </p>
                    </div>
                </motion.div>
            </div>

            <PlanDetailsModal
                open={detailsModalOpen}
                onOpenChange={setDetailsModalOpen}
                plan={selectedDetailPlan}
            />
        </section>
    );
};
