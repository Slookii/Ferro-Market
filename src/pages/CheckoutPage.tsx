import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { Button } from "../components/Button";
import { MessageCircle, MapPin, Truck, User, Phone } from "lucide-react";

export const CheckoutPage = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        zone: "",
        address: "",
        deliveryMethod: "coordinar", // coordinar
        comments: "",
    });

    if (items.length === 0) {
        navigate("/");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.phone) {
            alert("Por favor complete nombre y teléfono.");
            return;
        }

        const itemsList = items
            .map((item) => `- ${item.name} (${item.category}) x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
            .join("\n");

        const message = `*Nuevo pedido desde la web de Ferro-Market*
    
*Cliente:* ${formData.name}
*WhatsApp:* ${formData.phone}

*Productos:*
${itemsList}

*Total aproximado:* ${formatPrice(cartTotal)}

*Datos de entrega:*
Zona/Barrio: ${formData.zone || "-"}
Dirección: ${formData.address || "-"}
Entrega: ${formData.deliveryMethod === "coordinar" ? "A coordinar por WhatsApp" : formData.deliveryMethod}

*Comentarios:*
${formData.comments || "-"}

_Este pedido todavía no está pagado. Vamos a contactarnos con usted para coordinar._`;

        const encodedMessage = encodeURIComponent(message);
        const adminPhone = "543804808109";
        const url = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

        // Validar si el usuario está seguro o simplemente redireccionar
        window.open(url, "_blank");

        // Limpiar carrito y redireccionar a gracias
        clearCart();
        navigate("/gracias");
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Pedido</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Formulario */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <User size={20} /> Sus Datos
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de WhatsApp *</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Ej: 3804..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Truck size={20} /> Envío / Retiro
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Barrio / Zona</label>
                                <input
                                    type="text"
                                    name="zone"
                                    value={formData.zone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Ej: Centro, Barrio Vargas..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        placeholder="Calle y número"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preferencia de Entrega</label>
                                <select
                                    name="deliveryMethod"
                                    value={formData.deliveryMethod}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                                >
                                    <option value="coordinar">A coordinar por WhatsApp</option>
                                    <option value="retiro">Retiro en local</option>
                                    <option value="envio">Envío a domicilio (costo aparte)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios Adicionales</label>
                                <textarea
                                    name="comments"
                                    rows={3}
                                    value={formData.comments}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Alguna aclaración sobre el pedido..."
                                />
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-6 flex items-center justify-center gap-2">
                            <MessageCircle size={20} /> Realizar Pedido por WhatsApp
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Se abrirá WhatsApp para enviar el detalle del pedido.
                        </p>
                    </form>
                </div>

                {/* Resumen */}
                <div className="bg-gray-50 p-6 rounded-xl h-fit sticky top-24 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de Compra</h3>
                    <ul className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    {item.quantity} x {item.name}
                                </span>
                                <span className="font-medium text-gray-900">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total Aproximado</span>
                        <span className="text-2xl font-bold text-emerald-700">{formatPrice(cartTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
