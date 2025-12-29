import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";

export const ContactPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Te contactaremos a la brevedad.");
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <SEO title="Contacto" description="Contáctanos en Ferro-Market. Estamos en Av. San Francisco Km 2 1/2, La Rioja, Capital." />
            {/* Header */}
            <div className="bg-emerald-800 text-white py-16 text-center rounded-2xl mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
                        Estamos aquí para ayudarte. Visítanos en nuestra tienda o envíanos un mensaje.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info & Form */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Información de Contacto</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Dirección</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Italia 530</p>
                                    <p className="text-gray-600 dark:text-gray-400">La Rioja, Capital</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Teléfono / WhatsApp</h3>
                                    <p className="text-gray-600 dark:text-gray-400">+54 380 480-8109</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-400">romerobrandon477@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Horarios de Atención</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Lunes a Viernes: 8:00 - 13:00 / 17:00 - 21:00</p>
                                    <p className="text-gray-600 dark:text-gray-400">Sábados: 9:00 - 13:00 / 17:00 - 21:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Envíanos un Mensaje</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="Juan Pérez" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="juan@ejemplo.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
                                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition h-32" placeholder="¿En qué podemos ayudarte?" required></textarea>
                            </div>
                            <Button type="submit" size="lg" className="w-full flex justify-center items-center gap-2">
                                <Send size={20} /> Enviar Mensaje
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Map */}
                <div className="h-full min-h-[400px] bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 sticky top-24">
                    <iframe
                        src="https://maps.google.com/maps?q=-29.4205275,-66.8503613&t=&z=17&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Ferro-Market"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
