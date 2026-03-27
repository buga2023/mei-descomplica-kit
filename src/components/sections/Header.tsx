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
import { Menu, X, Building2, FileSignature, ShieldCheck, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

const serviceGroups = [
    {
        heading: "Abertura de Empresas",
        description: "Comece do jeito certo",
        icon: Building2,
        items: [
            { label: "Abertura de MEI", desc: "Faturamento até R$ 81K/ano" },
            { label: "Abertura de Empresa Simplificada", desc: "ME ou EPP com regime otimizado" },
            { label: "Abertura de Holding", desc: "Proteção patrimonial e sucessória" },
        ],
    },
    {
        heading: "Gestão Societária",
        description: "Ajuste sua estrutura",
        icon: FileSignature,
        items: [
            { label: "Alteração Contratual de Empresas", desc: "Atualize seu contrato social" },
            { label: "Organização Societária", desc: "Estruture participações e cotas" },
        ],
    },
    {
        heading: "Regularização",
        description: "Fique em dia",
        icon: ShieldCheck,
        items: [
            { label: "Regularização de Alvarás e Licenças", desc: "Licenças e autorizações" },
            { label: "Regularização de Débitos", desc: "Negocie pendências fiscais" },
        ],
    },
];

const navLinkClass = "group inline-flex h-10 w-max items-center justify-center text-[13px] font-bold uppercase tracking-wider text-brand-navy/80 hover:text-brand-gold transition-all duration-300 rounded-full px-4 py-2 hover:bg-brand-gold/[0.06]";

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out border-b ${scrolled ? "bg-white/98 shadow-lg shadow-black/[0.04] border-slate-200/80 backdrop-blur-xl" : "bg-white/95 backdrop-blur-md border-transparent shadow-none"}`}>
            <nav
                aria-label="Navegação principal"
                className="w-full px-4 md:px-6 lg:px-8 max-w-[1920px] flex h-14 md:h-16 items-center justify-between mx-auto"
            >
                {/* Logo + Nav */}
                <div className="flex items-center gap-6 lg:gap-10">
                    <a href="/" aria-label="Pejotize - Página inicial" className="shrink-0">
                        <img src={pejotizeLogo} alt="Pejotize" className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 ease-out hover:scale-105" />
                    </a>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-1">
                            {/* Serviços dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-[13px] font-bold uppercase tracking-wider text-brand-navy/80 bg-transparent data-[state=open]:text-brand-gold data-[state=open]:bg-brand-gold/[0.06] transition-all duration-300 rounded-full px-4 py-2 hover:text-brand-gold hover:bg-brand-gold/[0.06]">
                                    SERVIÇOS
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[640px] grid-cols-3 gap-0 p-2 md:w-[720px] lg:w-[840px]">
                                        {serviceGroups.map((group) => {
                                            const Icon = group.icon;
                                            return (
                                                <div key={group.heading} className="p-4 rounded-2xl hover:bg-brand-gold/[0.04] transition-colors duration-300">
                                                    {/* Group header */}
                                                    <div className="flex items-center gap-2.5 mb-4">
                                                        <div className="w-8 h-8 rounded-xl bg-brand-navy/[0.06] flex items-center justify-center">
                                                            <Icon className="w-4 h-4 text-brand-navy/60" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-brand-navy text-sm leading-none">{group.heading}</h4>
                                                            <p className="text-[11px] text-slate-400 mt-0.5">{group.description}</p>
                                                        </div>
                                                    </div>
                                                    {/* Items */}
                                                    <ul className="space-y-1">
                                                        {group.items.map((item) => (
                                                            <li key={item.label}>
                                                                <NavigationMenuLink asChild>
                                                                    <a
                                                                        href="#beneficios"
                                                                        className="group/item flex items-start gap-2.5 rounded-xl p-2.5 text-sm leading-tight text-slate-600 no-underline outline-none transition-all duration-200 hover:bg-brand-gold/[0.10] focus-visible:bg-brand-gold/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                                                                    >
                                                                        <ChevronRight className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                                                                        <div className="-ml-5 group-hover/item:ml-0 transition-all duration-200">
                                                                            <span className="font-semibold text-brand-navy/90 text-[13px] block">{item.label}</span>
                                                                            <span className="text-[11px] text-slate-400 leading-tight">{item.desc}</span>
                                                                        </div>
                                                                    </a>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Bottom CTA bar inside dropdown */}
                                    <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50/50">
                                        <span className="text-xs text-slate-400">Não sabe qual serviço escolher?</span>
                                        <a
                                            href={whatsappLink()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            Fale com um especialista
                                            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </a>
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

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <Button className="hidden sm:inline-flex bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-sm rounded-full px-6 py-5 shadow-lg shadow-brand-navy/15 hover:shadow-brand-navy/30 transition-all duration-500 hover:scale-[1.03] group/btn animate-glow-gold" asChild>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                            Falar com Especialista
                            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </a>
                    </Button>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-brand-gold/[0.08] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={mobileOpen}
                    >
                        <div className="relative w-6 h-6">
                            <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
                            <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="border-t border-slate-100 bg-white/98 backdrop-blur-xl">
                    <div className="px-4 py-5 space-y-1">
                        {/* Mobile service groups */}
                        {serviceGroups.map((group) => {
                            const Icon = group.icon;
                            return (
                                <div key={group.heading} className="py-2">
                                    <div className="flex items-center gap-2 px-3 mb-1.5">
                                        <Icon className="w-3.5 h-3.5 text-brand-navy/40" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40">{group.heading}</span>
                                    </div>
                                    {group.items.map((item) => (
                                        <a
                                            key={item.label}
                                            href="#beneficios"
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-2.5 px-3 text-sm font-semibold text-slate-700 hover:text-brand-gold hover:bg-brand-gold/[0.08] rounded-xl transition-all duration-200 active:scale-[0.98]"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            );
                        })}

                        <div className="h-px bg-slate-100 my-2" />

                        <a href="#planos" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-gold hover:bg-brand-gold/[0.08] rounded-xl transition-all duration-200">
                            Planos
                        </a>
                        <a href="#como-funciona" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-gold hover:bg-brand-gold/[0.08] rounded-xl transition-all duration-200">
                            Como Funciona
                        </a>
                        <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-brand-gold hover:bg-brand-gold/[0.08] rounded-xl transition-all duration-200">
                            FAQ
                        </a>

                        <div className="pt-3">
                            <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-sm rounded-full py-5 shadow-lg" asChild>
                                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                                    Falar com Especialista
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
