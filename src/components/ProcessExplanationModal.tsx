import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, FileText, CreditCard, Check, FileCheck } from "lucide-react";

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
            {
                icon: FileText,
                title: "Preencha seus dados",
                text: "Informe seus dados pessoais e do negócio no nosso formulário inteligente e seguro. É rápido e intuitivo."
            },
            {
                icon: CreditCard,
                title: "Realize o pagamento",
                text: "Efetue o pagamento da taxa única de serviço via PIX ou Cartão de Crédito com total segurança."
            },
            {
                icon: Check,
                title: "Receba seu CNPJ",
                text: "Nossa equipe processa seu pedido junto ao governo e você recebe o CNPJ e CCMEI no seu e-mail em minutos."
            }
        ]
    },
    me: {
        title: "Abertura de Microempresa (ME)",
        description: "Transforme seu negócio em uma ME com suporte contábil completo.",
        steps: [
            {
                icon: FileText,
                title: "Envio de Documentos",
                text: "Faça o upload dos documentos necessários (RG, CPF, Comprovante de Residência) através da nossa plataforma digital."
            },
            {
                icon: FileText,
                title: "Contrato Social",
                text: "Nossos contadores especializados elaboram o Contrato Social personalizado para o seu modelo de negócio."
            },
            {
                icon: Check,
                title: "Registro Completo",
                text: "Cuidamos de todo o processo na Junta Comercial, Receita Federal e Prefeitura. Você recebe a empresa pronta."
            }
        ]
    },
    regularize: {
        title: "Regularização de CNPJ",
        description: "Resolva pendências e evite o cancelamento do seu CNPJ MEI.",
        steps: [
            {
                icon: FileText,
                title: "Análise de Pendências",
                text: "Realizamos uma varredura completa no seu CNPJ para identificar todas as declarações (DASN) e impostos (DAS) em atraso."
            },
            {
                icon: CreditCard,
                title: "Parcelamento",
                text: "Geramos os boletos atualizados ou realizamos o parcelamento da dívida em até 60x para facilitar o pagamento."
            },
            {
                icon: Check,
                title: "CNPJ Regular",
                text: "Após o processamento, seu CNPJ volta à situação regular, evitando o cancelamento e permitindo a emissão de notas."
            }
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
            <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl overflow-hidden">
                <DialogHeader className="bg-brand-gold p-8 -mx-6 -mt-6 mb-6 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                    <DialogTitle className="text-2xl font-bold text-brand-navy flex items-center gap-2 relative z-10">
                        {data.title}
                    </DialogTitle>
                    <DialogDescription className="text-brand-navy/80 font-medium relative z-10">
                        {data.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 relative px-2">
                    {/* Connecting Line */}
                    <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

                    {data.steps.map((step, index) => (
                        <div key={index} className="flex gap-5 items-start bg-white relative group">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border-2 border-brand-gold shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <step.icon className="w-5 h-5 text-brand-navy" />
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                                <h4 className="font-bold text-brand-navy text-base">{step.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter className="mt-8 pt-0">
                    <Button
                        onClick={onProceed}
                        className="w-full h-14 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold text-lg shadow-lg shadow-brand-navy/20 rounded-xl"
                    >
                        Continuar
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
