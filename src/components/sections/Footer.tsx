import { CONFIG } from "@/config";
import pejotizeLogo from "@/assets/pejotize-logo.png";

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <img src={pejotizeLogo} alt="Pejotize" className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
                        <p className="text-base max-w-sm leading-relaxed text-slate-400">
                            Simplificando a jornada do empreendedor brasileiro. Abra seu MEI com segurança, rapidez e tecnologia.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Links Úteis</h4>
                        <ul className="space-y-4 text-base">
                            <li><a href="#como-funciona" className="hover:text-accent transition-colors">Como funciona</a></li>
                            <li><a href="#planos" className="hover:text-accent transition-colors">Planos</a></li>
                            <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
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
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; 2025 Pejotize. Todos os direitos reservados.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
