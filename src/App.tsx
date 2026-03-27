import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BenefitDetail from "./pages/BenefitDetail";
import ProcessDetail from "./pages/ProcessDetail";
import BenefitsDetail from "./pages/BenefitsDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { DynamicBackground } from "./components/DynamicBackground";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <DynamicBackground />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/beneficios/:slug" element={<BenefitDetail />} />
        <Route path="/como-funciona/beneficios" element={<BenefitsDetail />} />
        <Route path="/como-funciona/:stepId" element={<ProcessDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
