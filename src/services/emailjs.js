import emailjs from '@emailjs/browser';

// Inicializar EmailJS
const initEmailJS = () => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
    if (publicKey) {
        console.log('Inicializando EmailJS con clave pública');
        emailjs.init(publicKey);
        return true;
    }
    console.log('No se pudo inicializar EmailJS: Clave pública no disponible');
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
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

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

        // Si no se ha inicializado correctamente
        if (!isInitialized) {
            return {
                success: false,
                error: 'El servicio de correo no está configurado correctamente.'
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

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log('Service ID:', serviceId);
        console.log('Contact Template ID:', contactTemplateId);
        console.log('Public Key (primeros 4 caracteres):', publicKey ? publicKey.substring(0, 4) + '...' : 'undefined');

        if (!serviceId || !contactTemplateId || !publicKey) {
            console.error('Faltan variables de entorno necesarias para EmailJS');
            return {
                success: false,
                error: 'Configuración de correo incompleta. Contacta al administrador.'
            };
        }

        // Enviar notificación al equipo (único correo que se enviará)
        const response = await emailjs.send(
            serviceId,
            contactTemplateId,
            enhancedFormData,
            publicKey
        );

        // Verificar que el correo se envió correctamente
        if (response.status === 200) {
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