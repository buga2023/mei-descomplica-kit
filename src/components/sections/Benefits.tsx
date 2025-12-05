import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
    FileX
} from "lucide-react";

const services = [
    {
        id: "mei",
        title: "Abertura de MEI",
        description: "Formalize seu negócio em minutos com CNPJ, INSS e Nota Fiscal.",
        icon: Building2,
        type: "mei"
    },
    {
        id: "me",
        title: "Abertura de Empresa Simplificada",
        description: "Transforme seu negócio em ME/EPP com regime tributário otimizado.",
        icon: TrendingUp,
        type: "me"
    },
    {
        id: "holding",
        title: "Abertura de Holding",
        description: "Proteção patrimonial e planejamento sucessório para sua família.",
        icon: ShieldCheck,
        type: "consultancy"
    },
    {
        id: "alteracao",
        title: "Alteração Contratual de Empresas",
        description: "Atualize endereço, sócios ou atividades do seu contrato social.",
        icon: FileSignature,
        type: "consultancy"
    },
    {
        id: "societaria",
        title: "Organização Societária",
        description: "Estruture acordos e regras para garantir a harmonia entre sócios.",
        icon: Users,
        type: "consultancy"
    },
    {
        id: "alvaras",
        title: "Regularização de Alvarás e Licenças",
        description: "Mantenha sua empresa 100% legalizada com a prefeitura e bombeiros.",
        icon: ScrollText,
        type: "consultancy"
    },
    {
        id: "debitos",
        title: "Regularização de Débitos",
        description: "Negocie dívidas e parcele débitos para recuperar seu crédito.",
        icon: Banknote,
        type: "regularize"
    },
    {
        id: "baixa",
        title: "Encerramento de Empresa",
        description: "Encerre suas atividades de forma correta e evite dívidas futuras com o governo.",
        icon: FileX,
        type: "consultancy"
    }
];

export const Benefits = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("mei");
    const navigate = useNavigate();

    const handleServiceClick = (type: string) => {
        setSelectedType(type);
        setModalOpen(true);
    };

    const handleProceed = () => {
        setModalOpen(false);
        // Always redirect to the Plans section as requested
        window.location.href = "/#planos";
    };

    return (
        <section id="beneficios" className="py-24 bg-slate-50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                        Nossos Serviços
                    </h2>
                    <p className="text-brand-navy/70 text-xl">
                        Soluções completas para cada etapa do seu negócio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.08,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            onClick={() => handleServiceClick(service.type)}
                            className="bg-white rounded-3xl p-6 border-2 border-brand-gold cursor-pointer group flex flex-col justify-between min-h-[280px]"
                        >
                            <div className="flex-1">
                                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                                    <service.icon className="w-7 h-7 text-brand-gold group-hover:text-brand-navy transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-3 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-brand-navy/70 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <div className="mt-4 pt-4 flex items-center text-brand-gold font-bold text-sm group-hover:translate-x-2 transition-transform">
                                Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
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
