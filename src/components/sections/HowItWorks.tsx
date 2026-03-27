import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, CreditCard, FileCheck2, PartyPopper } from "lucide-react";

const steps = [
    {
        id: "preenchimento",
        number: "01",
        title: "Preencha o Formulário",
        desc: "Informe seus dados básicos em nosso formulário seguro. Leva menos de 2 minutos.",
        link: "/como-funciona/preenchimento",
        icon: ClipboardList,
    },
    {
        id: "analise",
        number: "02",
        title: "Efetue o Pagamento",
        desc: "Realize o pagamento via PIX com total segurança e confirmação instantânea.",
        link: "/como-funciona/analise",
        icon: CreditCard,
    },
    {
        id: "recebimento",
        number: "03",
        title: "Receba seu CNPJ",
        desc: "Nossa equipe processa junto à Receita Federal. CNPJ em até 2 dias úteis.",
        link: "/como-funciona/recebimento",
        icon: FileCheck2,
    },
    {
        id: "beneficios",
        number: "04",
        title: "Aproveite os Benefícios",
        desc: "Emita notas fiscais, contribua ao INSS e cresça com assessoria especializada.",
        link: "/como-funciona/beneficios",
        icon: PartyPopper,
    }
];

export const HowItWorks = () => {
    return (
        <section id="como-funciona" className="py-section-y bg-gradient-to-b from-white to-slate-50/80 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.04] border border-brand-navy/[0.08] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/50">Processo simplificado</span>
                    </div>

                    <h2 className="section-heading text-brand-navy mb-5">
                        Como Funciona
                    </h2>
                    <p className="text-lg text-brand-navy/45 leading-relaxed">
                        4 passos simples para formalizar seu negócio. Sem burocracia, sem complicação.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line (desktop) */}
                    <div className="hidden lg:block absolute top-[3.5rem] left-[calc(12.5%+1.75rem)] right-[calc(12.5%+1.75rem)] z-0">
                        <div className="w-full h-px bg-gradient-to-r from-brand-gold/40 via-brand-gold/20 to-brand-gold/40" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <Link to={step.link} key={step.id} className="block group">
                                    <motion.div
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.45 }}
                                        className="h-full relative"
                                    >
                                        <div className="h-full flex flex-col rounded-2xl bg-white border border-slate-200/70 hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-gold/[0.06] transition-all duration-400 p-7">
                                            {/* Number + Icon row */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center shadow-lg shadow-brand-navy/15 relative z-10">
                                                    <span className="text-brand-gold font-display font-extrabold text-lg">{step.number}</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-brand-gold/[0.06] flex items-center justify-center group-hover:bg-brand-gold/15 transition-colors duration-300">
                                                    <Icon className="w-5 h-5 text-brand-navy/30 group-hover:text-brand-gold transition-colors duration-300" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="font-display text-[15px] font-extrabold text-brand-navy mb-2 leading-snug tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-[13px] text-brand-navy/40 leading-relaxed flex-1">
                                                {step.desc}
                                            </p>

                                            {/* CTA */}
                                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-brand-navy/25 group-hover:text-brand-gold transition-colors duration-300">
                                                <span className="text-xs font-bold uppercase tracking-wider">Ver detalhes</span>
                                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
