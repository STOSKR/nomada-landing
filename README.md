# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Nómada Landing Page

Landing page para la aplicación Nómada, una plataforma para viajeros.

## Características

- Diseño moderno y responsive
- Formulario de suscripción
- Analíticas de visitas integradas

## Tecnologías

- React.js con Vite
- Styled Components
- Firebase (Firestore, Realtime Database, Analytics, Functions)
- GSAP para animaciones
- Three.js para efectos 3D

## Analíticas

El proyecto utiliza dos sistemas de analíticas:

### Vercel Analytics
- Integración simple a través del componente `<Analytics />` de Vercel
- Datos básicos de visitas
- No usa cookies

### Firebase Analytics
- Analíticas más detalladas de usuarios
- Seguimiento personalizado de eventos
- Almacenamiento de datos de visitas en Realtime Database

## Configuración de Firebase Analytics

Para habilitar Firebase Analytics:

1. Asegúrate de tener configurado correctamente tu archivo `.env` con las variables de Firebase:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_FIREBASE_DATABASE_URL=your-database-url
```

2. Implementa y utiliza los servicios de analíticas:

```javascript
// Para registrar visitas
import { registerVisit } from './services/analyticsService';

// Para eventos específicos de Firebase Analytics
import { trackEvent, trackPageView } from './services/firebaseAnalyticsService';

// Uso
registerVisit(); // Registra visita en Realtime Database
trackPageView('home'); // Registra vista de página en Firebase Analytics
trackEvent('button_click', { button_name: 'signup' }); // Registra evento personalizado
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
