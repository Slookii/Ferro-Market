import { Star } from "lucide-react";

const TESTIMONIALS = [
    {
        id: 1,
        name: "María Gonzalez",
        role: "Cliente Frecuente",
        content: "Excelente atención y productos de primera calidad. Compré un juego de sábanas y toallas, llegaron rapidísimo. ¡Súper recomendado!",
        rating: 5,
        location: "La Rioja Capital"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        role: "Comprador Verificado",
        content: "Muy buenos precios en la sección de minimarket. La web es muy fácil de usar y el pedido por WhatsApp es súper práctico.",
        rating: 5,
        location: "Aimogasta"
    },
    {
        id: 3,
        name: "Ana Laura Torres",
        role: "Cliente Nueva",
        content: "Me encantaron los productos de perfumería. Tienen mucha variedad y las descripciones son muy claras. Volveré a comprar.",
        rating: 5,
        location: "Chilecito"
    }
];

export const Testimonials = () => {
    return (
        <section className="bg-emerald-50 py-16 rounded-3xl my-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        La satisfacción de nuestros clientes es nuestra prioridad. Descubre por qué nos eligen.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex gap-1 mb-4 text-emerald-500">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
