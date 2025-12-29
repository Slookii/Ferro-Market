import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "./Button";

export const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup
        const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");

        if (!hasSeenPopup) {
            // Show popup after 3 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Mark as seen so it doesn't show again
        localStorage.setItem("hasSeenWelcomePopup", "true");
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert("¡Gracias por suscribirte! Tu código es: BIENVENIDO10");
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Popup Content */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col md:flex-row">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-slate-700 transition z-10"
                >
                    <X size={20} className="text-gray-600 dark:text-white" />
                </button>

                {/* Image Side (Hidden on mobile) */}
                <div className="hidden md:block w-2/5 bg-emerald-600 relative">
                    <img
                        src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1000"
                        alt="Shopping"
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-white text-center">
                        <h3 className="font-bold text-2xl tracking-tight leading-tight">
                            ¡Bienvenido a <br />Ferro-Market!
                        </h3>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                    <div className="text-center md:text-left mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Obtén 10% OFF!</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Suscríbete a nuestro boletín y recibe un cupón de descuento para tu primera compra.
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            ¡Quiero mi descuento!
                        </Button>
                    </form>

                    <button
                        onClick={handleClose}
                        className="mt-4 text-xs text-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
                    >
                        No gracias, prefiero pagar precio completo
                    </button>
                </div>
            </div>
        </div>
    );
};
