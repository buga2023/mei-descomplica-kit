import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, Loader2, QrCode, Copy, X, User, Mail, Phone, FileText } from "lucide-react";
import { TOAST_MESSAGES } from "@/config";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: 'pro' | 'business';
    amount: string;
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\d{10,11}$/.test(phone.replace(/\D/g, ''));
const validateCpf = (cpf: string) => {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11 && digits.length !== 14) return false;
    if (digits.length === 11 && /^(\d)\1{10}$/.test(digits)) return false;
    return true;
};

export const PaymentModal = ({ open, onOpenChange, plan, amount }: PaymentModalProps) => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
    const [pixData, setPixData] = useState<{ qrCode: string; pixCode: string; pixId: string } | null>(null);
    const [generatingPix, setGeneratingPix] = useState(false);
    const [checkingPayment, setCheckingPayment] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        taxId: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        if (!formData.name || formData.name.trim().length < 3) errors.name = "Nome deve ter pelo menos 3 caracteres";
        if (!validateEmail(formData.email)) errors.email = TOAST_MESSAGES.INVALID_EMAIL;
        if (!validatePhone(formData.whatsapp)) errors.phone = TOAST_MESSAGES.INVALID_PHONE;
        if (!validateCpf(formData.taxId)) errors.taxId = TOAST_MESSAGES.INVALID_CPF;
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        toast.info("Enviando seus dados...");

        try {
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    plan: plan,
                }),
            });

            if (response.ok) {
                toast.success(TOAST_MESSAGES.DATA_SENT);
                setStep('form');
            } else {
                throw new Error('Falha ao enviar email');
            }
        } catch (error) {
            toast.error(TOAST_MESSAGES.DATA_SEND_ERROR);
            setStep('form');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setStep('details');
            setLoading(false);
            setFormData({ name: '', email: '', whatsapp: '', taxId: '' });
            setFormErrors({});
            setPixData(null);
        }, 300);
    };

    const handleGeneratePix = async () => {
        setGeneratingPix(true);
        try {
            const response = await fetch('/.netlify/functions/create-pix-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan: plan,
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        cellphone: formData.whatsapp,
                        taxId: formData.taxId
                    }
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setPixData({
                    qrCode: data.qrCode,
                    pixCode: data.pixCode,
                    pixId: data.pixId
                });
                toast.success(TOAST_MESSAGES.QR_GENERATED);
            } else {
                throw new Error(data.error || 'Erro ao gerar Pix');
            }
        } catch {
            toast.error(TOAST_MESSAGES.QR_ERROR);
        } finally {
            setGeneratingPix(false);
        }
    };

    const handleCheckPayment = async () => {
        if (!pixData?.pixId) return;
        setCheckingPayment(true);
        toast.info(TOAST_MESSAGES.PAYMENT_CHECKING);

        try {
            const { data, error } = await supabase.functions.invoke('check-payment', {
                body: { pixId: pixData.pixId }
            });

            if (error) throw error;

            if (data?.status === 'COMPLETED') {
                setStep('success');
                toast.success(TOAST_MESSAGES.PAYMENT_CONFIRMED);
                fetch('/.netlify/functions/send-client-receipt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        plan: plan,
                    }),
                });
            } else {
                toast.warning(TOAST_MESSAGES.PAYMENT_NOT_FOUND);
            }
        } catch {
            toast.error(TOAST_MESSAGES.PAYMENT_CHECK_ERROR);
        } finally {
            setCheckingPayment(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md p-0 bg-white border-none overflow-hidden shadow-2xl">
                {/* Sticky Header */}
                <div className="bg-brand-navy p-6 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                            {step === 'details' ? (
                                <>Seus <span className="text-brand-gold">Dados</span></>
                            ) : step === 'form' ? (
                                <>Pagamento <span className="text-brand-gold">Seguro</span></>
                            ) : (
                                <><Check className="w-6 h-6 text-emerald-400" /> Sucesso</>
                            )}
                        </DialogTitle>
                        <DialogDescription className="text-blue-200/80 text-sm mt-1">
                            {step === 'details'
                                ? 'Preencha para continuar'
                                : step === 'form'
                                    ? `Plano ${plan === 'pro' ? 'Profissional' : 'Business'}`
                                    : 'Transação concluída'}
                        </DialogDescription>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Valor</div>
                        <div className="text-2xl font-bold text-white">R$ {amount}</div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-blue-300 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 'details' ? (
                        <form onSubmit={handleDetailsSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-slate-600 font-medium text-sm ml-1">Nome Completo</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="name"
                                        placeholder="Seu nome completo"
                                        required
                                        value={formData.name}
                                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: '' }); }}
                                        className={`pl-12 bg-slate-50 border-slate-200 text-brand-navy placeholder:text-slate-400 focus-visible:ring-brand-gold focus-visible:border-brand-gold h-12 ${formErrors.name ? 'border-red-400' : ''}`}
                                    />
                                </div>
                                {formErrors.name && <p className="text-xs text-red-500 ml-1">{formErrors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-slate-600 font-medium text-sm ml-1">E-mail</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: '' }); }}
                                        className={`pl-12 bg-slate-50 border-slate-200 text-brand-navy placeholder:text-slate-400 focus-visible:ring-brand-gold focus-visible:border-brand-gold h-12 ${formErrors.email ? 'border-red-400' : ''}`}
                                    />
                                </div>
                                {formErrors.email && <p className="text-xs text-red-500 ml-1">{formErrors.email}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="whatsapp" className="text-slate-600 font-medium text-sm ml-1">WhatsApp</Label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="whatsapp"
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        required
                                        value={formData.whatsapp}
                                        onChange={(e) => { setFormData({ ...formData, whatsapp: e.target.value }); setFormErrors({ ...formErrors, phone: '' }); }}
                                        className={`pl-12 bg-slate-50 border-slate-200 text-brand-navy placeholder:text-slate-400 focus-visible:ring-brand-gold focus-visible:border-brand-gold h-12 ${formErrors.phone ? 'border-red-400' : ''}`}
                                    />
                                </div>
                                {formErrors.phone && <p className="text-xs text-red-500 ml-1">{formErrors.phone}</p>}
                                <p className="text-xs text-slate-500 ml-1">Usaremos este número para contato sobre seu MEI.</p>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="taxId" className="text-slate-600 font-medium text-sm ml-1">CPF / CNPJ</Label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="taxId"
                                        placeholder="000.000.000-00"
                                        required
                                        value={formData.taxId}
                                        onChange={(e) => { setFormData({ ...formData, taxId: e.target.value }); setFormErrors({ ...formErrors, taxId: '' }); }}
                                        className={`pl-12 bg-slate-50 border-slate-200 text-brand-navy placeholder:text-slate-400 focus-visible:ring-brand-gold focus-visible:border-brand-gold h-12 ${formErrors.taxId ? 'border-red-400' : ''}`}
                                    />
                                </div>
                                {formErrors.taxId && <p className="text-xs text-red-500 ml-1">{formErrors.taxId}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg font-bold bg-brand-navy hover:bg-brand-navy/90 text-white mt-6 shadow-lg shadow-brand-navy/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                                Continuar para Pagamento
                            </Button>
                        </form>
                    ) : step === 'form' ? (
                        <div className="w-full">
                            <div className="bg-blue-900/10 p-3 mb-8 rounded-xl flex items-center justify-center gap-2 text-blue-950 font-bold">
                                <QrCode className="w-5 h-5" />
                                Pagamento via PIX
                            </div>

                            <div className="space-y-6">
                                {!pixData ? (
                                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-full">
                                            <QrCode className="w-12 h-12 text-brand-navy" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="font-bold text-lg text-brand-navy">Pagar com PIX</h3>
                                            <p className="text-slate-500 text-sm max-w-[250px]">
                                                Clique no botão abaixo para gerar seu código de pagamento exclusivo.
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleGeneratePix}
                                            disabled={generatingPix}
                                            className="w-full max-w-xs h-12 font-bold bg-brand-navy text-white hover:bg-brand-navy/90 mt-4"
                                        >
                                            {generatingPix ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Gerando QR Code...
                                                </>
                                            ) : (
                                                "Gerar QR Code PIX"
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-blue-50/50"></div>
                                            <div className="w-56 h-56 bg-white p-2 rounded-xl shadow-lg border-4 border-blue-900/10 flex items-center justify-center relative mb-4 z-10">
                                                <img src={pixData.qrCode} alt="QR Code PIX" className="w-full h-full object-contain" />
                                            </div>
                                            <p className="text-blue-950 font-bold text-sm bg-white px-4 py-1 rounded-full shadow-sm border border-blue-100 relative z-10 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                Aguardando Pagamento
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-600 font-medium text-sm ml-1">Copia e Cola</Label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Input
                                                        readOnly
                                                        value={pixData.pixCode}
                                                        className="bg-slate-50 border-slate-200 text-slate-500 font-mono text-xs h-12 pr-12"
                                                    />
                                                    <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(pixData.pixCode);
                                                        toast.success(TOAST_MESSAGES.PIX_COPIED);
                                                    }}
                                                    className="h-12 w-12 border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold shrink-0"
                                                >
                                                    <Copy className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={handleCheckPayment}
                                            disabled={checkingPayment}
                                            className="w-full h-12 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                                        >
                                            {checkingPayment ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Verificando...
                                                </>
                                            ) : (
                                                "Já fiz o pagamento"
                                            )}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                                <Check className="w-12 h-12 text-emerald-600 relative z-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-brand-navy">Pagamento Confirmado!</h3>
                                <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                                    Recebemos seu pagamento com sucesso. Verifique seu e-mail para os próximos passos.
                                </p>
                            </div>
                            <Button onClick={handleClose} className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-lg">
                                Voltar para o Início
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
