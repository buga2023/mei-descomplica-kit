import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const steps = [
    {
        id: "preenchimento",
        number: "01",
        title: "Preencha o Formulário",
        desc: "Informe seus dados básicos em nosso formulário seguro. Leva menos de 2 minutos para completar.",
        link: "/como-funciona/preenchimento"
    },
    {
        id: "analise",
        number: "02",
        title: "Efetue o Pagamento",
        desc: "Realize o pagamento via pix ou cartão de crédito com total segurança.",
        link: "/como-funciona/analise"
    },
    {
        id: "recebimento",
        number: "03",
        title: "Receba seu CNPJ",
        desc: "Nossa equipe processa seu pedido junto à Receita Federal e você recebe seu CNPJ em até dois dias úteis.",
        link: "/como-funciona/recebimento"
    },
    {
        id: "beneficios",
        number: "04",
        title: "Aproveite os Benefícios",
        desc: "Aproveite todos os benefícios exclusivos de ser MEI com a nossa assessoria especializada.",
        link: "/como-funciona/beneficios"
    }
];

export const HowItWorks = () => {
    return (
        <section id="como-funciona" className="py-section-y bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="section-heading text-brand-navy mb-3">
                        Como Funciona a Abertura MEI
                    </h2>
                    <p className="text-brand-gold font-bold text-lg uppercase tracking-wider mb-4">
                        Abertura de MEI Simplificado
                    </p>
                    <p className="section-subheading text-brand-navy/70">Simplificamos a burocracia para você focar no que importa: seu negócio.</p>
                </motion.div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Connector line (desktop only) */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-brand-gold/40 z-0" />

                    {steps.map((step, i) => (
                        <Link to={step.link} key={step.id} className="block h-full relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className="h-full group rounded-3xl bg-white/80 backdrop-blur-sm border border-brand-gold/20 hover:border-brand-gold hover:shadow-2xl hover:shadow-brand-gold/20 transition-all duration-300 relative overflow-hidden flex flex-col"
                            >
                                {/* Gold accent bar */}
                                <div className="h-1 w-full bg-gradient-to-r from-brand-gold to-brand-gold/50" />

                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Number badge */}
                                    <div className="w-14 h-14 rounded-2xl bg-brand-navy text-brand-gold font-black text-xl flex items-center justify-center mb-6 shrink-0 shadow-lg shadow-brand-navy/20">
                                        {step.number}
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Check className="w-5 h-5 text-brand-gold shrink-0" />
                                        <h3 className="text-lg font-bold text-brand-navy leading-tight">{step.title}</h3>
                                    </div>

                                    <p className="text-brand-navy/70 leading-relaxed text-base flex-grow">{step.desc}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
