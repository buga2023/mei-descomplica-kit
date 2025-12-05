import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
    Lock,
    Shield
} from "lucide-react";

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
        <section id="faq" className="py-24 bg-slate-50">
            <div className="container max-w-4xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Dúvidas Frequentes</h2>
                        <p className="text-slate-600 mb-8 text-lg">
                            Entenda tudo sobre o processo de abertura e regularização do seu MEI.
                        </p>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                                    <Lock className="w-7 h-7 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Dados Seguros</h3>
                                    <p className="text-slate-500">Seus dados são protegidos e criptografados.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Garantia de Entrega</h3>
                                    <p className="text-slate-500">CNPJ entregue ou seu dinheiro de volta.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqItems.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm">
                                    <AccordionTrigger className="text-slate-900 font-bold hover:no-underline hover:text-primary text-left">
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
