import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { whatsappLink } from "@/config";
import pejotizeLogo from "@/assets/pejotize-logo.png";
import { Menu, X, Users, HeadphonesIcon, Star } from "lucide-react";

const serviceGroups = [
    {
        heading: "Abertura de Empresas:",
        items: ["Abertura de MEI", "Abertura de Empresa Simplificada", "Abertura de Holding"],
    },
    {
        heading: "Gestão Societária:",
        items: ["Alteração Contratual de Empresas", "Organização Societária"],
    },
    {
        heading: "Regularização:",
        items: ["Regularização de Alvarás e Licenças", "Regularização de Débitos"],
    },
];

const navLinkClass = "group inline-flex h-10 w-max items-center justify-center text-[13px] font-bold uppercase tracking-wider text-brand-navy/80 hover:text-brand-navy transition-all duration-300 rounded-full px-4 py-2";

const dropdownItemClass = "block select-none rounded-lg p-3 text-sm font-medium leading-tight text-slate-700 no-underline outline-none transition-all duration-300 hover:text-brand-navy hover:translate-x-1 hover:bg-brand-gold/10 focus-visible:bg-brand-gold/10 focus-visible:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out border-b ${scrolled ? "bg-white shadow-lg shadow-black/5 border-slate-200/80" : "bg-white/95 border-slate-200/30 shadow-none"}`}>
            {/* Trust Bar removida */}

            {/* Main Nav */}
            <nav
                aria-label="Navegação principal"
                className="w-full px-6 md:px-10 lg:px-16 xl:px-24 flex h-20 items-center justify-between mx-auto"
            >
                <div className="flex items-center gap-4 lg:gap-8">
                    <a href="/" aria-label="Pejotize - Página inicial">
                        <img src={pejotizeLogo} alt="Pejotize" className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 ease-out hover:scale-110 hover:rotate-1" />
                    </a>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-[13px] font-bold uppercase tracking-wider text-brand-navy/80 hover:text-brand-navy bg-transparent data-[state=open]:text-brand-navy transition-all duration-300 rounded-full px-4 py-2">
                                    SERVIÇOS
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[600px] grid-cols-3 gap-8 p-8 md:w-[700px] lg:w-[900px] bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                                        {serviceGroups.map((group) => (
                                            <div key={group.heading} className="space-y-4">
                                                <h4 className="font-bold text-brand-navy text-base mb-4 pb-2 border-b-2 border-brand-gold">{group.heading}</h4>
                                                <ul className="space-y-3">
                                                    {group.items.map((item) => (
                                                        <li key={item}>
                                                            <NavigationMenuLink asChild>
                                                                <a href="#beneficios" className={dropdownItemClass}>{item}</a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="#planos" className={navLinkClass}>PLANOS</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="#como-funciona" className={navLinkClass}>COMO FUNCIONA</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-3">
                    <Button className="hidden sm:inline-flex bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-sm rounded-full px-6 py-5 shadow-lg shadow-brand-navy/20 hover:shadow-brand-navy/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-glow-gold" asChild>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                            Falar com Especialista
                        </a>
                    </Button>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-6 space-y-4">
                        <a href="#beneficios" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-navy hover:bg-brand-gold/10 rounded-xl transition-colors">
                            Serviços
                        </a>
                        <a href="#planos" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-navy hover:bg-brand-gold/10 rounded-xl transition-colors">
                            Planos
                        </a>
                        <a href="#como-funciona" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-navy hover:bg-brand-gold/10 rounded-xl transition-colors">
                            Como Funciona
                        </a>
                        <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-navy hover:bg-brand-gold/10 rounded-xl transition-colors">
                            FAQ
                        </a>
                        <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-sm rounded-full py-5 shadow-lg" asChild>
                            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                                Falar com Especialista
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};
