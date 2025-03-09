const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configurar nodemailer con tu cuenta de Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nomadapp.contact@gmail.com',
        pass: 'hnfq iyiy zody rzfy' // Contraseña de aplicación proporcionada
    }
});

// Función para enviar un correo cuando se crea un nuevo suscriptor
exports.sendWelcomeEmail = functions.firestore
    .document('subscribers/{subscriberId}')
    .onCreate(async (snap, context) => {
        const newUser = snap.data();
        const email = newUser.email;

        try {
            // Plantilla de correo electrónico
            const mailOptions = {
                from: '"Nómada" <nomadapp.contact@gmail.com>',
                to: email,
                subject: '¡Bienvenido a la comunidad Nómada!',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #444;">
            <h1 style="color: #7FB3D5; text-align: center;">¡Bienvenido a Nómada!</h1>
            <p>Hola,</p>
            <p>Gracias por unirte a nuestra comunidad de viajeros. Estamos muy emocionados de tenerte con nosotros.</p>
            <p>Como early adopter, serás de los primeros en probar nuestra plataforma cuando esté disponible y recibirás actualizaciones exclusivas sobre nuestro lanzamiento.</p>
            <p>¡Prepárate para descubrir el mundo sin límites!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://nomada-landing.vercel.app" style="background: linear-gradient(to right, #7FB3D5, #F7CAC9); color: white; text-decoration: none; padding: 12px 25px; border-radius: 50px; font-weight: bold;">Visitar Nómada</a>
            </div>
            <p style="color: #777; font-size: 0.9em;">Si no te has registrado en Nómada, puedes ignorar este correo.</p>
          </div>
        `
            };

            // Enviar el correo
            await transporter.sendMail(mailOptions);

            console.log('Correo enviado a:', email);
            return null;
        } catch (error) {
            console.error('Error al enviar correo:', error);
            return null;
        }
    });

// También creamos una función para eliminar suscriptores
exports.deleteSubscriber = functions.https.onCall(async (data, context) => {
    const { subscriberId } = data;

    try {
        await admin.firestore().collection('subscribers').doc(subscriberId).delete();
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar suscriptor:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar suscriptor');
    }
}); 