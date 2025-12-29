import { SEO } from "../components/SEO";

export const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <SEO title="Términos y Condiciones" />
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Términos y Condiciones</h1>
            <div className="prose prose-emerald max-w-none text-gray-600 dark:text-gray-300">
                <p>Última actualización: {new Date().toLocaleDateString()}</p>

                <h3>1. Introducción</h3>
                <p>Bienvenido a Ferro-Market. Al acceder a nuestro sitio web, aceptas estar sujeto a estos términos y condiciones, a todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de las leyes locales aplicables.</p>

                <h3>2. Licencia de uso</h3>
                <p>Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Ferro-Market solo para visualización transitoria personal y no comercial.</p>

                <h3>3. Descargo de responsabilidad</h3>
                <p>Los materiales en el sitio web de Ferro-Market se proporcionan "tal cual". Ferro-Market no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las otras garantías.</p>

                <h3>4. Limitaciones</h3>
                <p>En ningún caso Ferro-Market o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web de Ferro-Market.</p>

                <h3>5. Precios y Pagos</h3>
                <p>Todos los precios están en pesos argentinos. Nos reservamos el derecho de cambiar los precios en cualquier momento sin previo aviso. Los pagos se procesan de forma segura.</p>

                <h3>6. Contacto</h3>
                <p>Si tienes alguna pregunta sobre estos términos, por favor contáctanos a través de nuestra página de contacto.</p>
            </div>
        </div>
    );
};
