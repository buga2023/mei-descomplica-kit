import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const customerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  cellphone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  taxId: z.string().min(11, "CPF inválido").max(14, "CPF inválido")
});

type CustomerData = z.infer<typeof customerSchema>;

interface CustomerDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CustomerData) => void;
  plan: 'pro' | 'business';
  loading?: boolean;
}

export const CustomerDataModal = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  plan,
  loading = false
}: CustomerDataModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema)
  });

  const handleFormSubmit = (data: CustomerData) => {
    onSubmit(data);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  const planNames = {
    pro: 'Pro MEI',
    business: 'Business MEI'
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Compra - {planNames[plan]}</DialogTitle>
          <DialogDescription>
            Preencha seus dados para gerar o QR Code PIX
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="João da Silva"
              {...register("name")}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellphone">Telefone</Label>
            <Input
              id="cellphone"
              placeholder="(11) 99999-9999"
              {...register("cellphone")}
              disabled={loading}
            />
            {errors.cellphone && (
              <p className="text-sm text-destructive">{errors.cellphone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@exemplo.com"
              {...register("email")}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId">CPF</Label>
            <Input
              id="taxId"
              placeholder="000.000.000-00"
              {...register("taxId")}
              disabled={loading}
            />
            {errors.taxId && (
              <p className="text-sm text-destructive">{errors.taxId.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Gerando QR Code..." : "Criar QR Code PIX"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
