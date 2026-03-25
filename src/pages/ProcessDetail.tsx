import { useParams, Link, useNavigate } from "react-router-dom";
import { processSteps } from "../data/processSteps";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ProcessDetail = () => {
    const { stepId } = useParams();
    const navigate = useNavigate();
    const step = processSteps[stepId as keyof typeof processSteps];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stepId]);

    if (!step) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-brand-navy">
                <h1 className="text-3xl font-bold mb-4">Passo não encontrado</h1>
                <Button onClick={() => navigate("/")}>Voltar para o início</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-gold/30">
            {/* Header / Nav */}
            <header className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/90 backdrop-blur-md h-20 flex items-center">
                <div className="container flex items-center justify-between">
                    <Link to="/" className="inline-flex items-center text-slate-600 hover:text-brand-gold transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Link>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                        Como Funciona
                    </div>
                </div>
            </header>

            <main className="container pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Content Section */}
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <div className="text-brand-gold font-bold mb-2 flex items-center gap-2">
                                    <span className="bg-brand-gold/20 text-brand-navy px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                        Passo {step.id} de 4
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold text-brand-navy mb-6">{step.title}</h1>

                                <div
                                    className="prose prose-lg prose-slate max-w-none 
                                    prose-p:text-slate-600 prose-p:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: step.content }}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="sticky top-32 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
                                <h3 className="font-bold text-brand-navy">Navegação</h3>

                                <div className="space-y-3">
                                    {step.nextStep ? (
                                        <Button className="w-full h-12 bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold shadow-lg shadow-brand-navy/20" asChild>
                                            <Link to={`/como-funciona/${step.nextStep}`}>
                                                Próximo Passo <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button className="w-full h-12 bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold shadow-lg shadow-brand-navy/20" asChild>
                                            <Link to="/checkout?plan=pro">
                                                IR PARA O PAGAMENTO <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    )}

                                    {step.prevStep && (
                                        <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:bg-slate-50" asChild>
                                            <Link to={`/como-funciona/${step.prevStep}`}>
                                                Passo Anterior
                                            </Link>
                                        </Button>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 text-center">
                                        Assista ao vídeo abaixo para entender todos os detalhes desta etapa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="relative aspect-video w-full bg-brand-navy rounded-2xl overflow-hidden shadow-2xl shadow-brand-navy/20 border border-white/10 group">
                        <iframe
                            width="100%"
                            height="100%"
                            src={step.videoUrl}
                            title={step.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ProcessDetail;
