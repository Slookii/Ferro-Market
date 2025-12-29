import { Truck, ShieldCheck, Heart } from "lucide-react";
import { SEO } from "../components/SEO";

export const AboutPage = () => {
    return (
        <div className="animate-fade-in">
            <SEO title="Quiénes Somos" description="Conoce más sobre Ferro-Market, tu tienda online de confianza en La Rioja." />

            {/* Hero Section */}
            <section className="bg-emerald-900 text-white py-20 rounded-2xl mb-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestra Historia</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        De un emprendimiento local a tu tienda online favorita.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="order-2 md:order-1">
                    <img
                        src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000"
                        alt="Equipo trabajando"
                        className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500"
                    />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Más que una tienda, una comunidad</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        Ferro-Market nació con un objetivo simple: acercar productos de calidad a los hogares de La Rioja con la calidez de siempre, pero con la comodidad de la tecnología moderna.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        Aunque pronto abriremos las puertas de nuestro local físico para recibirte con un abrazo, hoy estamos orgullosos de poder atenderte digitalmente con la misma dedicación y cariño.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-800">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                        <Heart size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pasión por el Servicio</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Cada pedido es preparado con cuidado. Nos importa que tu experiencia sea perfecta desde el clic hasta la entrega.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-800">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                        <Truck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Rapidez y Confianza</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Entendemos el valor de tu tiempo. Por eso nos esforzamos en que nuestros envíos sean ágiles y seguros.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-800">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Calidad Garantizada</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Seleccionamos cuidadosamente cada producto de nuestro catálogo para asegurar que lleves solo lo mejor a tu hogar.
                    </p>
                </div>
            </div>
        </div>
    );
};
