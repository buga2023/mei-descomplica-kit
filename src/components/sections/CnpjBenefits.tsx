import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
    ShieldCheck,
    Banknote,
    FileText,
    Baby,
    HeartPulse,
    Building2,
    Gavel,
    Users,
    ScrollText
} from "lucide-react";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Aposentadoria",
        description: "Garanta seu futuro com aposentadoria por idade ou invalidez, pagando o INSS reduzido."
    },
    {
        icon: HeartPulse,
        title: "Auxílio-Doença",
        description: "Tenha segurança financeira em caso de problemas de saúde que impeçam seu trabalho."
    },
    {
        icon: Baby,
        title: "Salário-Maternidade",
        description: "Benefício garantido para as mamães empreendedoras se dedicarem aos seus bebês."
    },
    {
        icon: FileText,
        title: "Emissão de Nota Fiscal",
        description: "Profissionalize seu negócio e feche contratos com outras empresas e órgãos públicos."
    },
    {
        icon: Banknote,
        title: "Crédito Facilitado",
        description: "Acesso a linhas de crédito e empréstimos com taxas especiais para PJ."
    },
    {
        icon: Building2,
        title: "Venda para o Governo",
        description: "Participe de licitações e venda seus produtos ou serviços para a administração pública."
    },
    {
        icon: Gavel,
        title: "Isenção de Tributos",
        description: "Isenção de tributos federais (IR, PIS, COFINS, IPI, CSLL) com valor fixo mensal baixo."
    },
    {
        icon: Users,
        title: "Contratação de Funcionário",
        description: "Possibilidade de contratar um empregado com custo previdenciário reduzido."
    },
    {
        icon: ScrollText,
        title: "Dispensa de Alvará",
        description: "Para atividades de baixo risco, você pode começar a trabalhar imediatamente sem vistoria prévia."
    }
];

export const CnpjBenefits = () => {
    const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);

    return (
        <section className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                    Benefícios de ser MEI
                </h2>
                <p className="text-brand-navy/70 text-xl">
                    Além de formalizar seu negócio, você garante direitos previdenciários e vantagens exclusivas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedBenefit(benefit)}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold">
                            <benefit.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy mb-3">
                            {benefit.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {benefit.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            <Dialog open={!!selectedBenefit} onOpenChange={(open) => !open && setSelectedBenefit(null)}>
                <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl overflow-hidden">
                    <DialogHeader className="bg-brand-gold p-8 -mx-6 -mt-6 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="flex items-center gap-4 relative z-10">
                            {selectedBenefit && (
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-brand-navy backdrop-blur-sm">
                                    <selectedBenefit.icon className="w-6 h-6" />
                                </div>
                            )}
                            <DialogTitle className="text-2xl font-bold text-brand-navy">
                                {selectedBenefit?.title}
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="px-2 pb-6">
                        <DialogDescription className="text-lg text-slate-600 leading-relaxed">
                            {selectedBenefit?.description}
                        </DialogDescription>

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-sm text-slate-500 italic">
                                * Este benefício é garantido por lei para todos os MEIs que mantêm suas contribuições em dia.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};
