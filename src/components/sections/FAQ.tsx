import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Lock, Shield, Award, HelpCircle } from "lucide-react";

const faqItems = [
    {
        question: "Preciso de contador sendo MEI?",
        answer: "Não é obrigatório por lei, mas ter assessoria especializada garante que você não pague multas e aproveite todos os benefícios previdenciários corretamente."
    },
    {
        question: "Quanto custa para abrir o MEI?",
        answer: "O governo não cobra taxa de abertura. Nossos planos cobram pela assessoria, análise de dados, escolha correta do CNAE e suporte para emissão de notas."
    },
    {
        question: "Em quanto tempo fica pronto?",
        answer: "Geralmente em 24 a 48 horas úteis. Em muitos municípios, o CNPJ sai na hora, dependendo apenas da validação da prefeitura."
    },
    {
        question: "Posso ter carteira assinada e ser MEI?",
        answer: "Sim! Você pode manter seu emprego CLT e ter seu CNPJ MEI para atividades extras, sem problemas."
    }
];

const trustItems = [
    {
        icon: Lock,
        title: "Dados Seguros",
        description: "Criptografia de ponta a ponta.",
        color: "bg-emerald-500/[0.08]",
        iconColor: "text-emerald-600",
    },
    {
        icon: Shield,
        title: "Garantia de Entrega",
        description: "CNPJ entregue ou reembolso.",
        color: "bg-blue-500/[0.08]",
        iconColor: "text-blue-600",
    },
    {
        icon: Award,
        title: "5.000+ Clientes",
        description: "Nota 4.9/5 de satisfação.",
        color: "bg-brand-gold/[0.08]",
        iconColor: "text-brand-gold",
    },
];

export const FAQ = () => {
    return (
        <section id="faq" className="py-section-y bg-slate-50/70 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-gold/[0.02] blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-navy/[0.02] blur-[80px] pointer-events-none" />

            <div className="container max-w-5xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.04] border border-brand-navy/[0.08] mb-6">
                        <HelpCircle className="w-3.5 h-3.5 text-brand-navy/40" />
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/45">Tire suas dúvidas</span>
                    </div>
                    <h2 className="section-heading text-brand-navy mb-4">Dúvidas Frequentes</h2>
                    <p className="text-lg text-brand-navy/40 max-w-lg mx-auto">
                        Tudo o que você precisa saber sobre a abertura do seu MEI.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left — Trust cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 space-y-3"
                    >
                        {trustItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-200/60 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-sm font-extrabold text-brand-navy leading-none">{item.title}</h3>
                                        <p className="text-xs text-brand-navy/40 mt-1">{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Right — Accordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="md:col-span-3"
                    >
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-white border border-slate-200/60 rounded-2xl px-6 data-[state=open]:border-brand-gold/30 data-[state=open]:shadow-md data-[state=open]:shadow-brand-gold/[0.04] transition-all duration-300"
                                >
                                    <AccordionTrigger className="font-display text-brand-navy font-extrabold text-[15px] hover:no-underline hover:text-brand-gold text-left py-5 tracking-tight">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-brand-navy/50 text-sm leading-relaxed pb-5">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
