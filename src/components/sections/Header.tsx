import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CONFIG } from "@/config";
import pejotizeLogo from "@/assets/pejotize-logo.png";

export const Header = () => {
    const whatsappLink = () => {
        const message = "Quero%20abrir%20meu%20MEI";
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/90 backdrop-blur-md transition-all duration-500 ease-in-out">
            <div className="w-full px-4 md:px-8 lg:px-12 flex h-28 items-center justify-between max-w-[1920px] mx-auto">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2">
                        {/* LOGO AUMENTADA E MAIS PRO CANTO */}
                        <img src={pejotizeLogo} alt="Pejotize" className="h-20 md:h-24 w-auto object-contain transition-transform duration-500 ease-out hover:scale-110 hover:rotate-1" />
                    </div>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-4">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-lg font-medium text-slate-600 hover:text-brand-navy bg-transparent hover:bg-slate-50 focus:bg-slate-50 data-[active]:bg-slate-50 data-[state=open]:bg-slate-50 data-[state=open]:text-brand-navy transition-all duration-500 rounded-full px-6 py-2.5">
                                    Serviços
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[600px] grid-cols-3 gap-8 p-8 md:w-[700px] lg:w-[900px] bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-brand-navy text-base mb-4 pb-2 border-b-2 border-brand-gold">Abertura de Empresas:</h4>
                                            <ul className="space-y-3">
                                                {[
                                                    "Abertura de MEI",
                                                    "Abertura de Empresa Simplificada",
                                                    "Abertura de Holding"
                                                ].map((item) => (
                                                    <li key={item}>
                                                        <NavigationMenuLink asChild>
                                                            <a
                                                                href="#beneficios"
                                                                className="block select-none rounded-lg p-3 text-sm font-medium leading-tight text-slate-700 no-underline outline-none transition-all duration-300 hover:text-brand-navy hover:translate-x-1 hover:bg-brand-gold/10 focus:bg-brand-gold/10 focus:text-brand-navy"
                                                            >
                                                                {item}
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-brand-navy text-base mb-4 pb-2 border-b-2 border-brand-gold">Gestão Societária:</h4>
                                            <ul className="space-y-3">
                                                {[
                                                    "Alteração Contratual de Empresas",
                                                    "Organização Societária"
                                                ].map((item) => (
                                                    <li key={item}>
                                                        <NavigationMenuLink asChild>
                                                            <a
                                                                href="#beneficios"
                                                                className="block select-none rounded-lg p-3 text-sm font-medium leading-tight text-slate-700 no-underline outline-none transition-all duration-300 hover:text-brand-navy hover:translate-x-1 hover:bg-brand-gold/10 focus:bg-brand-gold/10 focus:text-brand-navy"
                                                            >
                                                                {item}
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-brand-navy text-base mb-4 pb-2 border-b-2 border-brand-gold">Regularização:</h4>
                                            <ul className="space-y-3">
                                                {[
                                                    "Regularização de Alvarás e Licenças",
                                                    "Regularização de Débitos"
                                                ].map((item) => (
                                                    <li key={item}>
                                                        <NavigationMenuLink asChild>
                                                            <a
                                                                href="#beneficios"
                                                                className="block select-none rounded-lg p-3 text-sm font-medium leading-tight text-slate-700 no-underline outline-none transition-all duration-300 hover:text-brand-navy hover:translate-x-1 hover:bg-brand-gold/10 focus:bg-brand-gold/10 focus:text-brand-navy"
                                                            >
                                                                {item}
                                                            </a>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="#planos" className="group inline-flex h-10 w-max items-center justify-center text-lg font-medium text-slate-600 hover:text-brand-navy bg-transparent hover:bg-slate-50 focus:bg-slate-50 transition-all duration-500 rounded-full px-6 py-2.5">
                                        Planos
                                    </a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="#como-funciona" className="group inline-flex h-10 w-max items-center justify-center text-lg font-medium text-slate-600 hover:text-brand-navy bg-transparent hover:bg-slate-50 focus:bg-slate-50 transition-all duration-500 rounded-full px-6 py-2.5">
                                        Como funciona
                                    </a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <Button className="bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-lg rounded-full px-10 py-7 shadow-lg shadow-brand-navy/20 hover:shadow-brand-navy/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1" asChild>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                        Falar com Especialista
                    </a>
                </Button>
            </div>
        </header>
    );
};
