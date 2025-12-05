import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentModal } from "@/components/PaymentModal";

import { CONFIG } from "@/config";

const Checkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planParam = searchParams.get("plan");

    const [open, setOpen] = useState(true);

    // Determine plan and amount based on URL param
    const plan = (planParam === 'business' ? 'business' : 'pro') as 'pro' | 'business';
    const amount = plan === 'business' ? CONFIG.PRECO_BUSINESS : CONFIG.PRECO_PRO;

    const handleClose = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>

            <PaymentModal
                open={open}
                onOpenChange={handleClose}
                plan={plan}
                amount={amount}
            />
        </div>
    );
};

export default Checkout;
