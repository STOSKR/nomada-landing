import sgMail from '@sendgrid/mail';

// Obtener la API Key desde las variables de entorno
// IMPORTANTE: Nunca coloques la API key directamente en el código
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY || '';

// Función para depuración (sin mostrar la API Key completa)
const debugSendGrid = () => {
    console.log('Diagnóstico de SendGrid:');
    console.log('- API Key configurada:', SENDGRID_API_KEY ? '✓ Sí' : '✗ No');
    console.log('- Longitud de API Key:', SENDGRID_API_KEY?.length || 0);
    console.log('- API Key comienza con "SG.":', SENDGRID_API_KEY?.startsWith('SG.') ? '✓ Sí' : '✗ No');
    // Solo mostramos los primeros caracteres para verificación, nunca la clave completa
    console.log('- Primeros caracteres de API Key:', SENDGRID_API_KEY ? SENDGRID_API_KEY.substring(0, 7) + '...' : 'No disponible');
};

/**
 * Envía un correo de bienvenida a un nuevo suscriptor
 * @param {string} toEmail - Email del destinatario
 * @returns {Promise} - Promesa con el resultado del envío
 */
export const sendWelcomeEmail = async (toEmail) => {
    // Mostrar diagnóstico en consola (sin mostrar la API key completa)
    debugSendGrid();

    // Verificar si tenemos una API key configurada
    if (!SENDGRID_API_KEY) {
        console.error('SendGrid API Key no encontrada en variables de entorno. Verifica tu archivo .env');
        return {
            success: false,
            error: 'SendGrid no está configurado. El correo no fue enviado.'
        };
    }

    try {
        // Inicializar la API con la clave de las variables de entorno
        sgMail.setApiKey(SENDGRID_API_KEY);

        const msg = {
            to: toEmail,
            from: 'nomadapp.contact@gmail.com', // Debe ser un remitente verificado en SendGrid
            subject: '¡Bienvenido a Nomada App!',
            text: `¡Gracias por unirte a la lista de espera de Nomada App! Estamos muy emocionados de que estés interesado en nuestra aplicación.`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <img src="https://tu-logo-url.com/logo.png" alt="Nomada App Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h1 style="color: #4A90E2;">¡Bienvenido a Nomada App!</h1>
          <p>¡Hola!</p>
          <p>¡Gracias por unirte a la lista de espera de Nomada App! Estamos muy emocionados de que estés interesado en nuestra aplicación.</p>
          <p>Te mantendremos informado sobre todas las novedades y te avisaremos cuando estemos listos para lanzar nuestra beta. Como parte de nuestros early adopters, tendrás acceso anticipado a todas nuestras funciones.</p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 14px;">¡Gracias por tu apoyo!</p>
            <p style="margin: 5px 0 0; color: #999; font-size: 14px;">El equipo de Nomada App</p>
          </div>
        </div>
      `,
        };

        console.log('Intentando enviar email a:', toEmail);
        const response = await sgMail.send(msg);
        console.log('Email enviado con éxito:', response[0].statusCode);
        return { success: true, statusCode: response[0].statusCode };
    } catch (error) {
        console.error('Error al enviar email:', error);

        // Determinar el tipo de error para dar mejor información
        let errorMessage = error.message || 'Error desconocido al enviar email';

        // Si hay un error de respuesta de SendGrid
        if (error.response) {
            console.error('Detalles del error SendGrid:', JSON.stringify(error.response.body || {}, null, 2));

            // Error de autenticación - API key inválida
            if (error.code === 401 || (error.response.statusCode === 401)) {
                errorMessage = 'Error de autenticación con SendGrid. API Key inválida o no autorizada.';
            }
            // Error de remitente no verificado
            else if (error.response.body && error.response.body.errors) {
                const senderErrors = error.response.body.errors.filter(e =>
                    e.message && e.message.includes('sender'));

                if (senderErrors.length > 0) {
                    errorMessage = 'El email remitente no está verificado en SendGrid. Verifica tu cuenta.';
                }
            }
        }

        return {
            success: false,
            error: errorMessage,
            // Si hay errores específicos de SendGrid, los incluimos
            response: error.response ? error.response.body : null
        };
    }
};

export default {
    sendWelcomeEmail,
    debugSendGrid
}; 