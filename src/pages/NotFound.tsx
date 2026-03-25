import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-brand-navy">404</h1>
        <p className="mb-6 text-xl text-brand-navy/70">Página não encontrada</p>
        <a href="/" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 font-bold text-brand-gold transition-all hover:bg-brand-navy/90 hover:scale-105">
          Voltar para o início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
