import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Search, Home } from "lucide-react";
import { SEO } from "../components/SEO";

export const NotFoundPage = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 animate-fade-in">
            <SEO title="Página no encontrada" />

            <div className="relative mb-8">
                <div className="text-9xl font-bold text-gray-100 dark:text-slate-800 select-none">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="text-emerald-500 w-24 h-24 rotate-12" strokeWidth={1.5} />
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Ups! Te perdiste en los pasillos
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
                La página que buscas no existe o se ha movido de estante. Regresemos a la entrada principal.
            </p>

            <Link to="/">
                <Button size="lg" className="flex items-center gap-2">
                    <Home size={20} /> Volver al Inicio
                </Button>
            </Link>
        </div>
    );
};
