import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
    {
        icon: ShieldCheck,
        title: "Contribuição do INSS Garantida",
        stat: "100%",
        statLabel: "dos direitos previdenciários",
        description: "Como MEI, você contribui com uma alíquota reduzida e garante seus direitos previdenciários: aposentadoria, auxílio-doença e salário-maternidade."
    },
    {
        icon: FileText,
        title: "Emissão de Nota Fiscal",
        stat: "∞",
        statLabel: "notas fiscais por mês",
        description: "Profissionalize seu negócio e feche contratos com outras empresas e órgãos públicos emitindo notas fiscais de serviço ou produto."
    },
    {
        icon: Scale,
        title: "Conformidade Legal",
        stat: "0",
        statLabel: "tributos federais",
        description: "Opere 100% dentro da lei, com CNPJ ativo, isenção de tributos federais e toda a segurança jurídica que sua empresa precisa para crescer."
    }
];

export const CnpjBenefits = () => {
    return (
        <section className="py-section-y bg-gradient-to-b from-brand-navy via-brand-navy to-[#001050]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-14"
                >
                    {/* Decorative gold line */}
                    <div className="w-16 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />
                    <h2 className="section-heading text-white mb-4">
                        3 Vantagens de Abrir Seu MEI
                    </h2>
                    <p className="text-brand-gold/80 text-xl">
                        Tudo o que você precisa para formalizar seu negócio com segurança.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="bg-white/5 border border-brand-gold/30 rounded-3xl p-10 hover:border-brand-gold hover:bg-white/10 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-300 flex flex-col gap-6"
                        >
                            {/* Icon container */}
                            <div className="w-16 h-16 rounded-2xl bg-brand-gold/15 flex items-center justify-center">
                                <item.icon className="w-8 h-8 text-brand-gold" />
                            </div>

                            <h3 className="text-lg font-bold text-white uppercase tracking-wide leading-tight">
                                {item.title}
                            </h3>

                            {/* Stat highlight */}
                            <div>
                                <span className="text-3xl font-bold text-brand-gold">{item.stat}</span>
                                <span className="block text-sm text-white/50 mt-1">{item.statLabel}</span>
                            </div>

                            <p className="text-white/70 leading-relaxed text-base">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-14"
                >
                    <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-navy shadow-xl transition-all hover:scale-105 animate-glow-gold" asChild>
                        <a href="#planos">
                            Abrir meu MEI agora
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
