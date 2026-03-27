import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CreditCard, Check, FileCheck, CheckCircle } from "lucide-react";

interface ProcessExplanationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: string;
    onProceed: () => void;
}

const content = {
    mei: {
        title: "Como funciona a Abertura MEI",
        description: "Abra seu CNPJ MEI de forma rápida e segura em 3 passos simples.",
        steps: [
            { icon: FileText, title: "Preencha seus dados", text: "Informe seus dados pessoais e do negócio no nosso formulário inteligente e seguro. É rápido e intuitivo." },
            { icon: CreditCard, title: "Realize o pagamento", text: "Efetue o pagamento via PIX ou cartão de crédito com total segurança." },
            { icon: Check, title: "Receba o seu CNPJ", text: "Nossa equipe processa a sua solicitação junto à Receita Federal e você recebe o seu CNPJ em até dois dias úteis." }
        ]
    },
    me: {
        title: "Abertura de Microempresa (ME)",
        description: "Transforme seu negócio em uma ME com suporte contábil completo.",
        steps: [
            { icon: FileText, title: "Envio de Documentos", text: "Preencha o nosso formulário e envie os documentos necessários através da nossa plataforma digital." },
            { icon: FileText, title: "Contrato Social", text: "Os nossos especialistas elaboram o Contrato Social personalizado para o seu modelo de negócio." },
            { icon: Check, title: "Registro Completo", text: "Cuidamos de todo o processo na Junta Comercial, Receita Federal e Prefeitura Municipal. Você recebe a empresa pronta." }
        ]
    },
    regularize: {
        title: "Regularização de CNPJ",
        description: "Resolva pendências e evite o cancelamento do seu CNPJ MEI.",
        steps: [
            { icon: FileText, title: "Análise de Pendências", text: "Realizamos uma varredura completa no seu CNPJ para identificar todas as declarações (DASN) e impostos (DAS) em atraso." },
            { icon: CreditCard, title: "Parcelamento", text: "Geramos os boletos atualizados ou realizamos o parcelamento da dívida em até 60x para facilitar o pagamento." },
            { icon: Check, title: "CNPJ Regular", text: "Após o processamento, seu CNPJ volta à situação regular, evitando o cancelamento e permitindo a emissão de notas." }
        ]
    },
    consultancy: {
        title: "Fale com um Especialista",
        description: "Soluções personalizadas para o seu negócio.",
        steps: [
            { icon: FileText, title: "Diagnóstico", text: "Agende uma conversa com nossos especialistas para entendermos a fundo a necessidade e o momento da sua empresa." },
            { icon: FileCheck, title: "Planejamento", text: "Desenvolvemos uma estratégia jurídica e contábil sob medida, focada em segurança e eficiência tributária." },
            { icon: CheckCircle, title: "Execução", text: "Implementamos as mudanças contratuais e societárias com agilidade e total conformidade legal." }
        ]
    }
};

export const ProcessExplanationModal = ({ open, onOpenChange, type, onProceed }: ProcessExplanationModalProps) => {
    const data = content[type as keyof typeof content] || content.consultancy;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-brand-navy border-none shadow-2xl shadow-black/40 overflow-hidden p-0 gap-0 rounded-2xl">
                {/* Header */}
                <DialogHeader className="relative px-8 pt-8 pb-6">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/[0.08] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/15 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/70">Como funciona</span>
                        </div>
                        <DialogTitle className="font-display text-2xl font-extrabold text-white tracking-tight">
                            {data.title}
                        </DialogTitle>
                        <DialogDescription className="text-white/40 text-sm mt-2 leading-relaxed">
                            {data.description}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Steps */}
                <div className="px-8 py-8 space-y-6 relative">
                    {/* Connecting line */}
                    <div className="absolute left-[3.25rem] top-12 bottom-12 w-px bg-gradient-to-b from-brand-gold/30 via-brand-gold/10 to-transparent pointer-events-none" />

                    {data.steps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                            <div key={index} className="flex gap-4 items-start relative group">
                                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors duration-300 relative z-10">
                                    <StepIcon className="w-5 h-5 text-brand-gold" />
                                </div>
                                <div className="pt-0.5 flex-1 min-w-0">
                                    <h4 className="font-display text-sm font-extrabold text-white mb-1 tracking-tight">{step.title}</h4>
                                    <p className="text-[13px] text-white/35 leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-8 pb-8 pt-2">
                    <Button
                        onClick={onProceed}
                        className="w-full h-13 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold text-sm shadow-lg shadow-brand-gold/20 rounded-xl group"
                    >
                        Continuar
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                    <p className="text-center text-white/20 text-xs mt-3">Você será redirecionado para os planos</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
