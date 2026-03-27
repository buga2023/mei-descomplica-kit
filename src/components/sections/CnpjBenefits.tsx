import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const highlights = [
    {
        icon: ShieldCheck,
        title: "Contribuição do INSS Garantida",
        stat: "100%",
        statLabel: "dos direitos previdenciários",
        description: "Como MEI, você contribui com uma alíquota reduzida e garante seus direitos previdenciários: aposentadoria, auxílio-doença e salário-maternidade.",
        benefits: ["Aposentadoria por idade", "Auxílio-doença", "Salário-maternidade"],
    },
    {
        icon: FileText,
        title: "Emissão de Nota Fiscal",
        stat: "∞",
        statLabel: "notas fiscais por mês",
        description: "Profissionalize seu negócio e feche contratos com outras empresas e órgãos públicos emitindo notas fiscais de serviço ou produto.",
        benefits: ["NFS-e e NF-e", "Contratos com PJ", "Licitações públicas"],
    },
    {
        icon: Scale,
        title: "Conformidade Legal",
        stat: "0",
        statLabel: "tributos federais",
        description: "Opere 100% dentro da lei, com CNPJ ativo, isenção de tributos federais e toda a segurança jurídica que sua empresa precisa para crescer.",
        benefits: ["CNPJ ativo", "Isento de IR e CSLL", "Segurança jurídica"],
    }
];

export const CnpjBenefits = () => {
    const navigate = useNavigate();

    const handleCta = () => {
        navigate("/");
        setTimeout(() => {
            const el = document.getElementById("planos");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <section className="py-section-y bg-gradient-to-b from-brand-navy via-brand-navy to-[#001050] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Vantagens exclusivas</span>
                    </div>

                    <h2 className="section-heading text-white mb-5">
                        3 Vantagens de Abrir Seu MEI
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
                        Tudo o que você precisa para formalizar seu negócio com segurança e começar a crescer.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                            className="group bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-brand-gold/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-brand-gold/[0.08] transition-all duration-500 flex flex-col"
                        >
                            {/* Icon + number */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300">
                                    <item.icon className="w-7 h-7 text-brand-gold" />
                                </div>
                                <span className="text-5xl font-black text-white/[0.06] select-none">{String(index + 1).padStart(2, "0")}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white leading-tight mb-2">
                                {item.title}
                            </h3>

                            {/* Stat highlight */}
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-black text-brand-gold">{item.stat}</span>
                                <span className="text-sm text-white/40">{item.statLabel}</span>
                            </div>

                            <p className="text-white/55 leading-relaxed text-[15px] mb-6 flex-1">
                                {item.description}
                            </p>

                            {/* Mini checklist */}
                            <div className="flex flex-col gap-2 pt-5 border-t border-white/[0.06]">
                                {item.benefits.map((b, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                                        <CheckCircle className="w-3.5 h-3.5 text-brand-gold/60 shrink-0" />
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <Button
                        size="lg"
                        onClick={handleCta}
                        className="h-16 px-10 text-lg font-bold rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-navy shadow-xl shadow-brand-gold/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] animate-glow-gold group/cta"
                    >
                        Abrir meu MEI agora
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Button>
                    <p className="text-white/30 text-sm mt-4">Processo 100% online — CNPJ em até 48h</p>
                </motion.div>
            </div>
        </section>
    );
};
