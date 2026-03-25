import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { TOAST_MESSAGES } from "@/config";

interface PixPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeBase64?: string;
  pixCode?: string;
  amount: number;
  pixId: string;
}

export const PixPaymentModal = ({ 
  open, 
  onOpenChange, 
  qrCodeBase64, 
  pixCode,
  amount,
  pixId 
}: PixPaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCopyPixCode = async () => {
    if (!pixCode) return;
    
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success(TOAST_MESSAGES.PIX_COPIED);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error(TOAST_MESSAGES.COPY_ERROR);
    }
  };

  const handleCheckPayment = async () => {
    if (!pixId) return;
    
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-payment', {
        body: { pixId }
      });

      if (error) throw error;

      if (data?.success) {
        if (data.status === 'COMPLETED') {
          toast.success("Pagamento confirmado! Você receberá as instruções por WhatsApp.");
          onOpenChange(false);
        } else if (data.status === 'PENDING') {
          toast.info("Pagamento ainda não identificado. Por favor, tente novamente em alguns instantes.");
        } else {
          toast.error("Status do pagamento: " + data.status);
        }
      } else {
        throw new Error(data?.error || 'Erro ao verificar pagamento');
      }
    } catch (error) {
      console.error('Error checking payment:', error);
      toast.error("Erro ao verificar pagamento. Tente novamente.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagamento via PIX</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie o código PIX abaixo para realizar o pagamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Valor */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Valor a pagar</p>
            <p className="text-3xl font-bold text-foreground">
              R$ {(amount / 100).toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* QR Code */}
          {qrCodeBase64 && (
            <div className="flex justify-center">
              <img 
                src={qrCodeBase64} 
                alt="QR Code PIX" 
                className="w-64 h-64 border-2 border-border rounded-lg"
              />
            </div>
          )}

          {/* Código PIX */}
          {pixCode && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Código PIX Copia e Cola:</p>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md overflow-hidden">
                  <p className="text-xs font-mono break-all text-muted-foreground">
                    {pixCode}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyPixCode}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-secondary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">Instruções:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Abra o app do seu banco</li>
              <li>Escolha pagar com PIX</li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme o pagamento</li>
            </ol>
          </div>

          <Button 
            onClick={handleCheckPayment} 
            disabled={checking}
            className="w-full"
          >
            {checking ? "Verificando..." : "Já efetuei o pagamento"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Após a confirmação do pagamento, você receberá as instruções por WhatsApp
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
