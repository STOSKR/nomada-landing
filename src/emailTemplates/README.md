# Configuración de EmailJS para Nómada

Este directorio contiene los templates HTML para los correos electrónicos enviados a través de EmailJS.

## Templates disponibles

1. **contactTemplate.html**: Template para notificaciones al equipo cuando alguien envía un formulario de contacto.
2. **contactAutoReply.html**: Template para respuestas automáticas a los usuarios que envían un formulario de contacto.
3. **welcomeTemplate.html**: Template para correos de bienvenida a nuevos usuarios.

## Configuración en EmailJS

Para configurar estos templates en EmailJS, sigue estos pasos:

1. Inicia sesión en tu cuenta de [EmailJS](https://www.emailjs.com/).
2. Ve a la sección "Email Templates".
3. Crea un nuevo template para cada uno de los archivos HTML en este directorio.
4. Copia y pega el contenido HTML de cada archivo en el editor de EmailJS.
5. Configura los IDs de los templates en las variables de entorno:

```
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_TEMPLATE_ID=id_del_template_de_bienvenida
VITE_EMAILJS_CONTACT_TEMPLATE_ID=id_del_template_de_contacto
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=id_del_template_de_respuesta_automatica
```

## Variables de plantilla

### contactTemplate.html
- `{{from_name}}`: Nombre del remitente
- `{{from_email}}`: Email del remitente
- `{{date}}`: Fecha y hora del mensaje
- `{{message}}`: Contenido del mensaje

### contactAutoReply.html
- `{{from_name}}`: Nombre del remitente

### welcomeTemplate.html
- `{{to_name}}`: Nombre del destinatario
- `{{to_email}}`: Email del destinatario
- `{{message}}`: Mensaje personalizado
- `{{app_name}}`: Nombre de la aplicación
- `{{sign}}`: Firma del correo

## Pruebas

Para probar los templates, puedes usar la función de prueba de EmailJS o enviar correos de prueba desde tu aplicación utilizando las funciones en `src/services/emailjs.js`. 