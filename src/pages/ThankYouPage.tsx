import { Link, useLocation } from "react-router-dom";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "../components/Button";
import { formatPrice } from "../utils/format";

export const ThankYouPage = () => {
    const location = useLocation();
    const state = location.state as { orderId: string; formData: any; items: any[]; total: number } | null;

    if (!state) {
        return (
            <div className="text-center py-20 px-4 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Muchas Gracias!</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Tu pedido ha sido registrado correctamente.
                </p>
                <Link to="/">
                    <Button variant="outline">Volver a la tienda</Button>
                </Link>
            </div>
        );
    }

    const { orderId, formData, items, total } = state;

    const handleWhatsAppClick = () => {
        const itemsList = items
            .map((item) => `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
            .join("\n");

        const message = `*Pedido Web #${orderId.slice(-6)}* 
    
*Cliente:* ${formData.name}
*Tel:* ${formData.phone}

*Pedido:*
${itemsList}

*Total:* ${formatPrice(total)}

*Entrega:* ${formData.deliveryMethod}
*Dirección:* ${formData.address} (${formData.zone})

*Comentarios:* ${formData.comments}

_Enviado desde la web_`;

        const encodedMessage = encodeURIComponent(message);
        const adminPhone = "543804808109";
        window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className="text-center py-20 px-4 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
                <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Recibido!</h1>
            <p className="text-gray-500 mb-6">Tu número de orden es: <span className="font-bold text-gray-900">#{orderId}</span></p>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 text-left space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2">Resumen</h3>
                <p className="text-sm">Hola <span className="font-semibold">{formData.name}</span>, hemos guardado tu pedido.</p>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                    <p className="font-semibold mb-1">⚠️ Importante:</p>
                    <p>El pedido <strong>no está pagado aún</strong>. Para acelerar el proceso, envíanos el detalle por WhatsApp para coordinar el pago y envío.</p>
                </div>

                <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
                >
                    <MessageCircle size={20} /> Enviar detalle a WhatsApp
                </Button>
            </div>

            <Link to="/">
                <Button variant="outline">Volver a la tienda</Button>
            </Link>
        </div>
    );
};
