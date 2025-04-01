import { analytics } from '../firebase/config';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';

/**
 * Registra un evento en Firebase Analytics
 * @param {string} eventName - Nombre del evento a registrar
 * @param {object} eventParams - Parámetros opcionales del evento
 * @returns {boolean} - true si se registró correctamente, false en caso contrario
 */
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (!analytics) {
      console.warn('Firebase Analytics no está disponible');
      return false;
    }

    console.log(`Registrando evento en Analytics: ${eventName}`, eventParams);
    logEvent(analytics, eventName, eventParams);
    return true;
  } catch (error) {
    console.error('Error al registrar evento en Firebase Analytics:', error);
    return false;
  }
};

/**
 * Registra el evento de vista de página
 * @param {string} pageName - Nombre de la página vista
 * @returns {boolean} - true si se registró correctamente, false en caso contrario
 */
export const trackPageView = (pageName) => {
  console.log(`Registrando vista de página: ${pageName}`);
  return trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

/**
 * Establece un ID de usuario para Firebase Analytics
 * @param {string} userId - ID del usuario
 * @returns {boolean} - true si se estableció correctamente, false en caso contrario
 */
export const setAnalyticsUserId = (userId) => {
  try {
    if (!analytics) {
      console.warn('Firebase Analytics no está disponible');
      return false;
    }

    console.log(`Estableciendo ID de usuario en Analytics: ${userId}`);
    setUserId(analytics, userId);
    return true;
  } catch (error) {
    console.error('Error al establecer ID de usuario en Firebase Analytics:', error);
    return false;
  }
};

/**
 * Establece propiedades de usuario para Firebase Analytics
 * @param {object} properties - Propiedades del usuario a establecer
 * @returns {boolean} - true si se estableció correctamente, false en caso contrario
 */
export const setAnalyticsUserProperties = (properties) => {
  try {
    if (!analytics) {
      console.warn('Firebase Analytics no está disponible');
      return false;
    }

    console.log('Estableciendo propiedades de usuario en Analytics:', properties);
    setUserProperties(analytics, properties);
    return true;
  } catch (error) {
    console.error('Error al establecer propiedades de usuario en Firebase Analytics:', error);
    return false;
  }
};

/**
 * Obtiene el objeto analytics
 * @returns {object|null} - Objeto analytics o null si no está disponible
 */
export const getAnalytics = () => {
  return analytics;
};

export default {
  trackEvent,
  trackPageView,
  setAnalyticsUserId,
  setAnalyticsUserProperties,
  getAnalytics
}; 