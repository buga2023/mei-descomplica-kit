import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FileText,
    Cpu,
    CheckCircle
} from "lucide-react";

export const HowItWorks = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <section id="como-funciona" className="py-24 bg-white">
            <div className="container">
                <motion.div
                    {...fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Como funciona o processo</h2>
                    <p className="text-slate-600 text-xl">Simplificamos a burocracia para você focar no que importa: seu negócio.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                        {
                            id: "preenchimento",
                            icon: FileText,
                            title: "1. Preencha o formulário",
                            desc: "Informe seus dados básicos em nosso formulário seguro. Leva menos de 2 minutos.",
                            link: "/como-funciona/preenchimento"
                        },
                        {
                            id: "analise",
                            icon: Cpu,
                            title: "2. Análise Inteligente",
                            desc: "Nossa tecnologia valida suas informações e seleciona o melhor CNAE para sua atividade.",
                            link: "/como-funciona/analise"
                        },
                        {
                            id: "recebimento",
                            icon: CheckCircle,
                            title: "3. Receba seu CNPJ",
                            desc: "Seu CNPJ, CCMEI e guias são entregues diretamente no seu WhatsApp e E-mail.",
                            link: "/como-funciona/recebimento"
                        },
                        {
                            id: "beneficios",
                            icon: CheckCircle,
                            title: "4. Benefícios",
                            desc: "Aproveite todos os benefícios exclusivos de ser MEI com a nossa assessoria especializada.",
                            link: "/como-funciona/beneficios"
                        }
                    ].map((step, i) => (
                        <Link to={step.link} key={i} className="block h-full">
                            <motion.div
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="h-full group p-8 rounded-3xl bg-slate-50 border border-amber-500/20 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden flex flex-col"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 relative z-10">
                                    <step.icon className="w-8 h-8 text-amber-400 group-hover:text-blue-950 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg relative z-10 flex-grow">{step.desc}</p>

                                {/* Play Icon Overlay */}
                                <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-0">
                                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-slate-900 border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
