import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlanDetailsModal, PlanData } from "@/components/PlanDetailsModal";
import { CONFIG } from "@/config";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

export const Pricing = () => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedDetailPlan, setSelectedDetailPlan] = useState<PlanData | null>(null);

    const handleOpenDetails = (plan: PlanData) => {
        if (plan.id === "personalizado") {
            window.location.href = "/contato";
            return;
        }
        setSelectedDetailPlan(plan);
        setDetailsModalOpen(true);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <section id="planos" className="py-24 bg-white">
            <div className="container">
                <motion.div {...fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Planos Transparentes</h2>
                    <p className="text-slate-600 text-xl">Escolha o nível de suporte ideal para o seu momento.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[90rem] mx-auto items-start">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            {...fadeInUp}
                            transition={{ delay: 0.1 * (index + 1) }}
                            className="relative"
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <Badge className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy px-4 py-1 text-sm font-bold shadow-lg border-none">Mais Popular</Badge>
                                </div>
                            )}
                            <Card className="rounded-3xl overflow-hidden transition-all border-brand-gold shadow-xl hover:shadow-2xl bg-white relative h-full flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
                                <CardHeader className="p-10 pb-6">
                                    <CardTitle className="text-2xl font-bold text-slate-900">{plan.title}</CardTitle>
                                    <CardDescription className="text-base">{plan.description}</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-4xl font-bold text-brand-navy">
                                            {plan.price.startsWith("R$") ? plan.price : `R$ ${plan.price}`}
                                        </span>
                                        <span className="text-slate-500 text-sm">/único</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 pt-6 flex-1 flex flex-col justify-between">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                                                    <Check className="w-4 h-4 text-brand-navy" />
                                                </div>
                                                <span className="font-medium text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className="w-full h-14 rounded-xl text-lg font-bold transition-all bg-brand-navy hover:bg-brand-navy/90 text-brand-gold shadow-lg shadow-brand-navy/20"
                                        onClick={() => handleOpenDetails(plan)}
                                    >
                                        CONTRATAR AGORA
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <PlanDetailsModal
                open={detailsModalOpen}
                onOpenChange={setDetailsModalOpen}
                plan={selectedDetailPlan}
            />
        </section>
    );
};
