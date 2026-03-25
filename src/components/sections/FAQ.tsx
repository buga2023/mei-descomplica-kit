import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Lock, Shield, Award } from "lucide-react";

export const FAQ = () => {
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

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <section id="faq" className="py-section-y bg-slate-50 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-brand-gold/10 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-brand-navy/5 pointer-events-none" />

            <div className="container max-w-4xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div {...fadeInUp}>
                        <h2 className="section-heading text-brand-navy mb-6">Dúvidas Frequentes</h2>
                        <p className="text-brand-navy/70 mb-8 text-lg">
                            Entenda tudo sobre o processo de abertura e regularização do seu MEI.
                        </p>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                    <Lock className="w-7 h-7 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy text-lg">Dados Seguros</h3>
                                    <p className="text-slate-500">Seus dados são protegidos e criptografados.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Shield className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy text-lg">Garantia de Entrega</h3>
                                    <p className="text-slate-500">CNPJ entregue ou seu dinheiro de volta.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                                    <Award className="w-7 h-7 text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy text-lg">5.000+ Clientes</h3>
                                    <p className="text-slate-500">Nota 4.9/5 de satisfação comprovada.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm data-[state=open]:border-l-4 data-[state=open]:border-l-brand-gold transition-all"
                                >
                                    <AccordionTrigger className="text-brand-navy font-bold hover:no-underline hover:text-brand-gold text-left">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 text-base leading-relaxed">
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
