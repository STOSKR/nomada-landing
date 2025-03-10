import { init, send } from '@emailjs/browser';

// IDs de servicio y plantilla (vendrán de variables de entorno)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Inicializar EmailJS
const initEmailJS = () => {
    if (PUBLIC_KEY) {
        init(PUBLIC_KEY);
        return true;
    }
    return false;
};

// Inicializar al cargar el módulo
const isInitialized = initEmailJS();

/**
 * Envía un correo de bienvenida utilizando EmailJS
 * @param {string} toEmail - Email del destinatario
 * @returns {Promise} - Promesa con el resultado del envío
 */
export const sendWelcomeEmail = async (toEmail) => {
    try {
        // Si no se ha inicializado correctamente
        if (!isInitialized) {
            return {
                success: false,
                error: 'El servicio de correo no está configurado correctamente.'
            };
        }

        // Preparar los parámetros para la plantilla
        const templateParams = {
            to_email: toEmail,
            to_name: toEmail.split('@')[0],
            message: 'Gracias por unirte a Nomada App. Estamos muy emocionados de que estés interesado en nuestra aplicación.',
            app_name: 'Nomada App',
            sign: 'El equipo de Nomada'
        };

        // Enviar el correo
        const response = await send(SERVICE_ID, TEMPLATE_ID, templateParams);

        if (response.status === 200) {
            return { success: true };
        } else {
            return {
                success: false,
                error: 'Error al enviar el correo.'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error de comunicación con el servidor'
        };
    }
};

export default {
    sendWelcomeEmail
}; 