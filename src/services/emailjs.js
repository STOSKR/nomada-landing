import emailjs from '@emailjs/browser';

// IDs de servicio y plantilla (vendrán de variables de entorno)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Inicializar EmailJS
const initEmailJS = () => {
    if (PUBLIC_KEY) {
        emailjs.init(PUBLIC_KEY);
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
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

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

export const sendContactEmail = async (formData) => {
    try {
        // Validar datos del formulario
        if (!formData.from_name || !formData.from_email || !formData.message) {
            return {
                success: false,
                error: 'Por favor, completa todos los campos requeridos.'
            };
        }

        // Añadir fecha actual al formulario
        const enhancedFormData = {
            ...formData,
            date: new Date().toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // 2. Enviar respuesta automática al usuario
        const autoReply = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
            enhancedFormData,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        // Verificar que ambos correos se enviaron correctamente
        if (teamNotification.status === 200 && autoReply.status === 200) {
            return {
                success: true,
                message: 'Tu mensaje ha sido enviado correctamente. Pronto nos pondremos en contacto contigo.'
            };
        } else {
            return {
                success: false,
                error: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
            };
        }
    } catch (error) {
        console.error('Error sending contact email:', error);
        return {
            success: false,
            error: 'Error de comunicación con el servidor. Por favor, inténtalo de nuevo más tarde.'
        };
    }
};

export default {
    sendWelcomeEmail,
    sendContactEmail
}; 