


import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const SocialIcon = ({ href, path, label }: { href: string; path: string; label: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label={label}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white group-hover:text-emerald-400 transition-colors"
        >
            <path d={path} />
        </svg>
    </a>
);

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                            Ferro-Market
                        </h3>
                        <p className="text-slate-400 max-w-sm">
                            Su tienda de confianza en La Rioja. Calidad y cercanía en cada pedido.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 items-center">
                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Aceptamos:</span>
                            <div className="flex gap-2">
                                {/* Simple CSS-only Card placeholders to avoid imports for now or use SVGs */}
                                <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-blue-600 flex items-center gap-1" title="Mercado Pago">
                                    <span>MP</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-blue-800 flex items-center gap-1" title="Visa">
                                    <span>VISA</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-red-600 flex items-center gap-1" title="Mastercard">
                                    <span>MC</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-emerald-700 flex items-center gap-1" title="Efectivo">
                                    <span>$</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
                            <li><Link to="/categoria/todos" className="hover:text-emerald-400 transition-colors">Productos</Link></li>
                            <li><Link to="/contacto" className="hover:text-emerald-400 transition-colors">Contacto</Link></li>
                            <li><Link to="/privacidad" className="hover:text-emerald-400 transition-colors">Política de Privacidad</Link></li>
                            <li><Link to="/terminos" className="hover:text-emerald-400 transition-colors">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Instagram */}
                        <SocialIcon
                            href="https://instagram.com/ferromarket_larioja"
                            label="Instagram"
                            path="M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Zm-4 15a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm4-11h.01"
                        />

                        {/* Facebook */}
                        <SocialIcon
                            href="https://facebook.com/ferromarket.lr"
                            label="Facebook"
                            path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                        />

                        {/* TikTok */}
                        <a
                            href="https://tiktok.com/@ferromarket"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                            aria-label="TikTok"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white group-hover:text-emerald-400 transition-colors"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>

                        {/* Google Maps */}
                        <SocialIcon
                            href="https://maps.app.goo.gl/RyVSNDQSisVzV9gs7"
                            label="Ubicación"
                            path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Ferro-Market. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs flex justify-center items-center gap-1">
                        Desarrollado por <a href="mailto:romerobrandon477@gmail.com" className="text-emerald-500 hover:underline">Brandon Romero</a>
                        <Link to="/admin" className="opacity-30 hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:text-emerald-500" title="Admin">
                            <Lock size={14} />
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};
