# Configuración de plantillas de EmailJS para Nómada

## Problema común: "The recipients address is empty"

Si estás recibiendo el error "The recipients address is empty" (La dirección del destinatario está vacía), significa que EmailJS no está reconociendo correctamente la dirección de correo del destinatario.

## Solución:

1. Inicia sesión en tu cuenta de [EmailJS](https://dashboard.emailjs.com/)

2. Selecciona el servicio que estás utilizando (service_qg7bhob)

3. Entra en la plantilla que estás utilizando (template_ewo708i)

4. Asegúrate de que tu plantilla tenga configurado correctamente el campo "To email":
   - En la pestaña de configuración de la plantilla, debería aparecer un campo "To email"
   - Haz clic en él y selecciona la opción "Variable"
   - En el campo de variable, escribe `{{to_email}}` para que coincida con el parámetro que estamos enviando

5. Alternativa: si prefieres, puedes usar una dirección fija para pruebas, introduciéndola directamente en el campo "To email"

6. Guarda los cambios en la plantilla

## Parámetros que enviamos en nuestro código:

En el código estamos enviando los siguientes parámetros a la plantilla:

```javascript
templateParams = {
    to_email: toEmail,         // ← La dirección de correo del destinatario
    to_name: toEmail.split('@')[0],
    message: 'Gracias por unirte a Nómada...',
    app_name: 'Nómada',
    sign: 'El equipo de Nómada',
    reply_to: toEmail,
    from_name: 'Nómada',
    recipient: toEmail,
    email: toEmail
}
```

Uno de estos parámetros debe ser utilizado en la configuración "To email" de la plantilla en EmailJS.

## Verificación adicional:

También asegúrate de que:

1. La plantilla existe y está activa
2. El servicio de correo está configurado correctamente
3. Tienes suficientes créditos en tu cuenta de EmailJS para enviar correos 