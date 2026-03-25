import { CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/config";
import pejotizeLogo from "@/assets/pejotize-logo.png";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer role="contentinfo">
            {/* Pre-footer CTA */}
            <div className="bg-brand-gold py-16">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                        Pronto para formalizar seu negócio?
                    </h2>
                    <p className="text-brand-navy/70 text-lg mb-8 max-w-xl mx-auto">
                        Junte-se a mais de 5.000 empreendedores que já abriram seu CNPJ com a Pejotize.
                    </p>
                    <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl bg-brand-navy hover:bg-brand-navy/90 text-brand-gold shadow-xl transition-all hover:scale-105" asChild>
                        <a href="#planos">
                            Começar Agora
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Main footer */}
            <div className="bg-brand-navy text-slate-300 border-t border-white/10 relative">
                {/* Gold decorative line */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

                <div className="container py-16">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <img src={pejotizeLogo} alt="Pejotize" className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
                            <p className="text-base max-w-sm leading-relaxed text-slate-400">
                                Simplificando a jornada do empreendedor brasileiro. Abra seu MEI com segurança, rapidez e tecnologia.
                            </p>
                            {/* Social links */}
                            <div className="flex gap-3 mt-6">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                                    <Instagram className="w-5 h-5 text-slate-400 hover:text-brand-gold" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                                    <Facebook className="w-5 h-5 text-slate-400 hover:text-brand-gold" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5 text-slate-400 hover:text-brand-gold" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-lg">Links Úteis</h4>
                            <ul className="space-y-4 text-base">
                                <li><a href="#como-funciona" className="hover:text-brand-gold transition-colors">Como funciona</a></li>
                                <li><a href="#planos" className="hover:text-brand-gold transition-colors">Planos</a></li>
                                <li><a href="#faq" className="hover:text-brand-gold transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-lg">Contato</h4>
                            <ul className="space-y-4 text-base">
                                <li>{CONFIG.EMAIL}</li>
                                <li>WhatsApp: {CONFIG.WHATSAPP_NUMBER}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} Pejotize. Todos os direitos reservados.</p>
                        <div className="flex gap-8 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
