
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/Button";

export const ThankYouPage = () => {
    return (
        <div className="text-center py-20 px-4 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
                <CheckCircle size={48} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Muchas Gracias!</h1>
            <p className="text-xl text-gray-600 mb-8">
                Si ya enviaste el mensaje de WhatsApp, tu pedido está en proceso.
                <br />
                Nos comunicaremos contigo a la brevedad para confirmar los detalles y el pago.
            </p>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 mb-8 text-left">
                <h3 className="font-bold text-emerald-900 mb-2">¿Qué sigue ahora?</h3>
                <ul className="list-disc list-inside text-emerald-800 space-y-2">
                    <li>El equipo de Ferro-Market revisará el stock de tu pedido.</li>
                    <li>Te responderemos por WhatsApp para coordinar el pago (Efectivo/Transferencia).</li>
                    <li>Coordinaremos la entrega o el retiro por el local.</li>
                </ul>
            </div>

            <Link to="/">
                <Button variant="outline">Volver a la tienda</Button>
            </Link>
        </div>
    );
};
