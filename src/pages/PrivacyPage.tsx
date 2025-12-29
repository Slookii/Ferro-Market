import { SEO } from "../components/SEO";

export const PrivacyPage = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <SEO title="Política de Privacidad" />
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
            <div className="prose prose-emerald max-w-none text-gray-600 dark:text-gray-300">
                <p>Última actualización: {new Date().toLocaleDateString()}</p>

                <h3>1. Información que recopilamos</h3>
                <p>Recopilamos información que usted nos proporciona directamente cuando realiza una compra, se registra para una cuenta, se suscribe a nuestro boletín informativo o se comunica con nosotros.</p>

                <h3>2. Cómo usamos su información</h3>
                <p>Usamos la información que recopilamos para procesar sus pedidos, proporcionarle servicio al cliente, enviarle actualizaciones sobre su pedido y enviarle comunicaciones de marketing (si ha optado por recibirlas).</p>

                <h3>3. Compartir información</h3>
                <p>No vendemos, intercambiamos ni transferimos a terceros su información de identificación personal. Esto no incluye a terceros de confianza que nos ayudan a operar nuestro sitio web, llevar a cabo nuestro negocio o brindarle servicios.</p>

                <h3>4. Seguridad de los datos</h3>
                <p>Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando realiza un pedido o ingresa, envía o accede a su información personal.</p>

                <h3>5. Cookies</h3>
                <p>Utilizamos cookies para ayudar a recordar y procesar los artículos en su carrito de compras y entender y guardar sus preferencias para futuras visitas.</p>

                <h3>6. Cambios a esta política</h3>
                <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos cualquier cambio publicando la nueva política en esta página.</p>
            </div>
        </div>
    );
};
