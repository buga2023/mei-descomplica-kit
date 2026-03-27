import { useState } from "react";
import { motion } from "framer-motion";
import { ProcessExplanationModal } from "@/components/ProcessExplanationModal";
import {
    Building2,
    TrendingUp,
    ShieldCheck,
    FileSignature,
    Users,
    ScrollText,
    Banknote,
    ArrowRight,
    FileX,
    Sparkles
} from "lucide-react";

const services = [
    {
        id: "mei",
        title: "Abertura de MEI",
        description: "Formalize seu negócio em minutos com CNPJ, INSS e Nota Fiscal.",
        icon: Building2,
        type: "mei",
        tag: "Popular",
        highlight: true,
    },
    {
        id: "me",
        title: "Abertura de Empresa Simplificada",
        description: "Transforme seu negócio em ME/EPP com regime tributário otimizado.",
        icon: TrendingUp,
        type: "me",
    },
    {
        id: "holding",
        title: "Abertura de Holding",
        description: "Proteção patrimonial e planejamento sucessório para sua família.",
        icon: ShieldCheck,
        type: "consultancy",
    },
    {
        id: "alteracao",
        title: "Alteração Contratual",
        description: "Atualize endereço, sócios ou atividades do seu contrato social.",
        icon: FileSignature,
        type: "consultancy",
    },
    {
        id: "societaria",
        title: "Organização Societária",
        description: "Estruture acordos e regras para garantir a harmonia entre sócios.",
        icon: Users,
        type: "consultancy",
    },
    {
        id: "alvaras",
        title: "Alvarás e Licenças",
        description: "Mantenha sua empresa 100% legalizada com a prefeitura e bombeiros.",
        icon: ScrollText,
        type: "consultancy",
    },
    {
        id: "debitos",
        title: "Regularização de Débitos",
        description: "Negocie dívidas e parcele débitos para recuperar seu crédito.",
        icon: Banknote,
        type: "regularize",
    },
    {
        id: "baixa",
        title: "Encerramento de Empresa",
        description: "Encerre suas atividades de forma correta e evite dívidas futuras.",
        icon: FileX,
        type: "consultancy",
    }
];

export const Benefits = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("mei");

    const handleServiceClick = (type: string) => {
        setSelectedType(type);
        setModalOpen(true);
    };

    const handleProceed = () => {
        setModalOpen(false);
        window.location.href = "/#planos";
    };

    return (
        <section id="beneficios" className="py-section-y bg-white relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.03] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-navy/[0.02] rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/[0.08] border border-brand-gold/15 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/50">Soluções completas</span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl font-extrabold text-brand-navy mb-5 tracking-tight">
                        Nossos Serviços
                    </h2>
                    <p className="text-lg text-brand-navy/45 leading-relaxed">
                        Tudo o que você precisa para cada etapa do seu negócio, do início ao crescimento.
                    </p>
                </motion.div>

                {/* Services grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const isHighlight = "highlight" in service && service.highlight;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06, duration: 0.45 }}
                                onClick={() => handleServiceClick(service.type)}
                                className="group relative cursor-pointer"
                            >
                                {/* Gold glow behind highlighted card */}
                                {isHighlight && (
                                    <div className="absolute -inset-1 bg-brand-gold/[0.12] rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                )}

                                <div className={`relative h-full flex flex-col rounded-2xl p-6 lg:p-7 transition-all duration-300
                                    ${isHighlight
                                        ? "bg-brand-navy border border-brand-gold/20 hover:border-brand-gold/50 shadow-lg shadow-brand-navy/20 hover:shadow-2xl hover:shadow-brand-gold/10"
                                        : "bg-white border border-slate-200/70 hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-gold/[0.06]"
                                    }`}
                                >
                                    {/* Tag */}
                                    {"tag" in service && service.tag && (
                                        <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                            isHighlight
                                                ? "text-brand-navy bg-brand-gold"
                                                : "text-brand-gold bg-brand-gold/[0.08]"
                                        }`}>
                                            {service.tag}
                                        </span>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                                        isHighlight
                                            ? "bg-brand-gold/15 group-hover:bg-brand-gold/25"
                                            : "bg-brand-navy/[0.04] group-hover:bg-brand-gold/10"
                                    }`}>
                                        <Icon className={`w-6 h-6 transition-colors duration-300 ${
                                            isHighlight
                                                ? "text-brand-gold"
                                                : "text-brand-navy/50 group-hover:text-brand-gold"
                                        }`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className={`font-display text-[15px] font-extrabold mb-2 leading-snug tracking-tight ${
                                        isHighlight ? "text-white" : "text-brand-navy"
                                    }`}>
                                        {service.title}
                                    </h3>
                                    <p className={`text-[13px] leading-relaxed flex-1 ${
                                        isHighlight ? "text-white/50" : "text-brand-navy/40"
                                    }`}>
                                        {service.description}
                                    </p>

                                    {/* CTA */}
                                    <div className={`mt-5 pt-4 border-t flex items-center gap-1.5 transition-colors duration-300 ${
                                        isHighlight
                                            ? "border-white/10 text-brand-gold/70 group-hover:text-brand-gold"
                                            : "border-slate-100 text-brand-navy/30 group-hover:text-brand-gold"
                                    }`}>
                                        <span className="text-xs font-bold uppercase tracking-wider">Saiba mais</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <ProcessExplanationModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                type={selectedType}
                onProceed={handleProceed}
            />
        </section>
    );
};
