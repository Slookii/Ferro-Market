import emailjs from '@emailjs/browser';
import type { Order } from '../types';
import { formatPrice } from '../utils/format';

// EmailJS Configuration
const SERVICE_ID = "service_zpb2e4l";
const TEMPLATE_ID = "v9bxuac";
const PUBLIC_KEY = "WChg_nopMaXyJnMqEv6XU";

export const emailService = {
    sendOrderConfirmation: async (order: Order) => {
        alert("DEBUG: 1. Entrando a servicio de email");
        console.log("DEBUG: Params", { service: SERVICE_ID, template: TEMPLATE_ID, key: PUBLIC_KEY });
        try {
            const templateParams = {
                to_name: "Brandon", // Your name (admin)
                from_name: order.customer.name,
                message: `
Hola Brandon, ¡Tienes un Nuevo Pedido! 🎉

ID: #${order.id || 'N/A'}
Cliente: ${order.customer.name}
Teléfono: ${order.customer.phone}
Total: ${formatPrice(order.total)}

Detalles de entrega:
Método: ${order.customer.deliveryMethod}
Zona: ${order.customer.zone}
Dirección: ${order.customer.address}

Productos (${order.items.length}):
${order.items.map(item => `- ${item.quantity}x ${item.name}`).join('\n')}

Comentarios: ${order.customer.comments || 'Ninguno'}
                `,
                reply_to: order.customer.phone // Or email if we had it
            };

            console.log("Sending email with params:", templateParams);
            const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            console.log("Email sent successfully!", response.status, response.text);
        } catch (error) {
            console.error("FAILED to send email notification:", error);
            // We don't throw error to avoid blocking the user flow
        }
    }
};
