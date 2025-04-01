import { analytics, database } from '../firebase/config';
import { ref, set, get, onValue, increment } from 'firebase/database';
import { logEvent } from 'firebase/analytics';

/**
 * Este servicio maneja el registro y lectura de estadísticas de visitas
 * utilizando Firebase Realtime Database. También registra eventos en Firebase Analytics.
 * 
 * La estructura de datos en Firebase Realtime Database es:
 * - statistics/
 *   - visits/
 *     - total: número total de visitas
 *     - daily/
 *       - YYYY-MM-DD: visitas por día
 *     - lastUpdated: timestamp de última actualización
 */

// Keys para localStorage (como fallback y control de sesión)
const LOCAL_STORAGE_KEYS = {
  TOTAL_VISITS: 'nomada_total_visits',
  DAILY_VISITS_PREFIX: 'nomada_daily_visits_',
  LAST_UPDATED: 'nomada_last_updated',
  VISIT_SESSION: 'nomada_visit_session',
  LAST_VISIT_TIME: 'nomada_last_visit_time',
  INIT_DATA_ADDED: 'nomada_init_data_added'
};

// Tiempo mínimo entre visitas del mismo usuario (en minutos)
const MIN_TIME_BETWEEN_VISITS = 30; // 30 minutos

// Genera datos de ejemplo para las fechas pasadas (solo para visualización inicial)
const generateSampleData = async () => {
  try {
    // Verificar si ya se han añadido datos de ejemplo anteriormente
    const initDataAdded = localStorage.getItem(LOCAL_STORAGE_KEYS.INIT_DATA_ADDED);
    if (initDataAdded === 'true') {
      return;
    }

    if (!database) {
      console.warn('No se pueden generar datos de ejemplo sin conexión a Firebase');
      return;
    }

    const now = new Date();
    const totalVisitsRef = ref(database, 'statistics/visits/total');
    const totalSnapshot = await get(totalVisitsRef);

    // Si ya hay más de 10 visitas, no generar datos de ejemplo
    if (totalSnapshot.exists() && totalSnapshot.val() > 10) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.INIT_DATA_ADDED, 'true');
      return;
    }

    // Generar datos para los días pasados
    for (let i = 1; i <= 20; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Valor aleatorio entre 1 y 4 para días antiguos
      const randomVisits = Math.floor(Math.random() * 4) + 1;

      const dailyVisitsRef = ref(database, 'statistics/visits/daily/' + dateStr);
      const snapshot = await get(dailyVisitsRef);

      // Solo agregar si no existe
      if (!snapshot.exists()) {
        await set(dailyVisitsRef, randomVisits);
      }
    }

    // Actualizar el total sumando todos los valores diarios
    let newTotal = 0;
    const dailyRef = ref(database, 'statistics/visits/daily');
    const dailySnapshot = await get(dailyRef);

    if (dailySnapshot.exists()) {
      const dailyData = dailySnapshot.val();
      Object.values(dailyData).forEach(count => {
        newTotal += count;
      });

      await set(totalVisitsRef, newTotal);
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.INIT_DATA_ADDED, 'true');
    console.log('Datos de ejemplo generados correctamente');
  } catch (error) {
    console.error('Error al generar datos de ejemplo:', error);
  }
};

// Función para comprobar si debemos contar una nueva visita
const shouldCountNewVisit = () => {
  try {
    const now = new Date();
    const sessionId = localStorage.getItem(LOCAL_STORAGE_KEYS.VISIT_SESSION);
    const lastVisitTime = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_VISIT_TIME);

    // Si no hay sessión previa, crear una nueva
    if (!sessionId) {
      const newSessionId = `session_${now.getTime()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(LOCAL_STORAGE_KEYS.VISIT_SESSION, newSessionId);
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_VISIT_TIME, now.toISOString());
      return true;
    }

    // Si hay una sesión, verificar el tiempo desde la última visita
    if (lastVisitTime) {
      const lastVisit = new Date(lastVisitTime);
      const diffMinutes = (now - lastVisit) / (1000 * 60);

      // Si ha pasado suficiente tiempo, actualizar la marca temporal y contar como nueva visita
      if (diffMinutes >= MIN_TIME_BETWEEN_VISITS) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_VISIT_TIME, now.toISOString());
        return true;
      }

      // Aún no ha pasado suficiente tiempo, no contar como nueva visita
      return false;
    }

    // Si por alguna razón falta el timestamp pero existe la sesión, actualizar y contar
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_VISIT_TIME, now.toISOString());
    return true;
  } catch (error) {
    console.error('Error al verificar sesión de visita:', error);
    return true; // En caso de error, contar la visita por defecto
  }
};

// Función para registrar visitas en tiempo real en la base de datos
export const registerVisit = async () => {
  // Generar datos de ejemplo si es necesario (solo para visualización inicial)
  await generateSampleData();

  // Primero verificar si debemos contar esta como una nueva visita
  if (!shouldCountNewVisit()) {
    return false; // No registrar visita si es una recarga o visita reciente
  }

  try {
    // Si no hay conexión a Firebase, usar localStorage
    if (!database) {
      console.warn('Firebase Database no está disponible para registrar visitas, usando localStorage');
      return registerVisitLocalStorage();
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Crear referencias a los datos que vamos a actualizar
    const totalVisitsRef = ref(database, 'statistics/visits/total');
    const dailyVisitsRef = ref(database, 'statistics/visits/daily/' + today);
    const lastUpdatedRef = ref(database, 'statistics/visits/lastUpdated');

    // Obtener datos actuales
    const totalSnapshot = await get(totalVisitsRef);
    const totalVisits = totalSnapshot.exists() ? totalSnapshot.val() : 0;

    // Actualizar datos
    await set(totalVisitsRef, totalVisits + 1);
    await set(dailyVisitsRef, increment(1));
    await set(lastUpdatedRef, now.toISOString());

    // Registrar evento en Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'page_visit');
    }

    return true;
  } catch (error) {
    console.error('Error al registrar visita:', error);
    // Si hay un error con Firebase, usar localStorage como fallback
    return registerVisitLocalStorage();
  }
};

// Función para registrar visitas usando localStorage como fallback
const registerVisitLocalStorage = () => {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Obtener valores actuales de localStorage
    const totalVisits = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
    const dailyVisitsKey = LOCAL_STORAGE_KEYS.DAILY_VISITS_PREFIX + today;
    const dailyVisits = parseInt(localStorage.getItem(dailyVisitsKey) || '0', 10);

    // Actualizar localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS, (totalVisits + 1).toString());
    localStorage.setItem(dailyVisitsKey, (dailyVisits + 1).toString());
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_UPDATED, now.toISOString());

    return true;
  } catch (error) {
    console.error('Error al usar localStorage como fallback:', error);
    return false;
  }
};

// Función para obtener conteo total de visitas
export const getTotalVisits = async () => {
  try {
    if (!database) {
      return getTotalVisitsLocalStorage();
    }

    const totalVisitsRef = ref(database, 'statistics/visits/total');
    const snapshot = await get(totalVisitsRef);
    return snapshot.exists() ? snapshot.val() : 0;
  } catch (error) {
    console.error('Error al obtener total de visitas:', error);
    return getTotalVisitsLocalStorage();
  }
};

// Función para obtener total de visitas desde localStorage
const getTotalVisitsLocalStorage = () => {
  try {
    return parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
  } catch (error) {
    console.error('Error al leer total de visitas desde localStorage:', error);
    return 0;
  }
};

// Función para obtener visitas de los últimos 7 días
export const getWeeklyVisits = async () => {
  try {
    if (!database) {
      console.warn('Firebase Database no está disponible para obtener visitas semanales, usando localStorage');
      return getWeeklyVisitsLocalStorage();
    }

    const now = new Date();
    let totalWeekly = 0;

    // Calcular fecha de hace 7 días
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dailyVisitsRef = ref(database, 'statistics/visits/daily/' + dateStr);
      const snapshot = await get(dailyVisitsRef);

      if (snapshot.exists()) {
        totalWeekly += snapshot.val();
      }
    }

    console.log('Visitas semanales obtenidas de Firebase:', totalWeekly);
    return totalWeekly;
  } catch (error) {
    console.error('Error al obtener visitas semanales:', error);
    return getWeeklyVisitsLocalStorage();
  }
};

// Función para obtener visitas semanales desde localStorage
const getWeeklyVisitsLocalStorage = () => {
  try {
    const now = new Date();
    let totalWeekly = 0;

    // Calcular fecha de hace 7 días
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dailyVisitsKey = LOCAL_STORAGE_KEYS.DAILY_VISITS_PREFIX + dateStr;
      const dailyVisits = parseInt(localStorage.getItem(dailyVisitsKey) || '0', 10);
      totalWeekly += dailyVisits;
    }

    return totalWeekly > 0 ? totalWeekly : 1; // Mínimo 1 visita (la actual)
  } catch (error) {
    console.error('Error al leer visitas semanales desde localStorage:', error);
    return 1; // Al menos una visita (la actual)
  }
};

// Función para obtener visitas de los últimos 30 días
export const getMonthlyVisits = async () => {
  try {
    if (!database) {
      console.warn('Firebase Database no está disponible para obtener visitas mensuales, usando localStorage');
      return getMonthlyVisitsLocalStorage();
    }

    const now = new Date();
    let totalMonthly = 0;

    // Calcular fecha de hace 30 días
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dailyVisitsRef = ref(database, 'statistics/visits/daily/' + dateStr);
      const snapshot = await get(dailyVisitsRef);

      if (snapshot.exists()) {
        totalMonthly += snapshot.val();
      }
    }

    console.log('Visitas mensuales obtenidas de Firebase:', totalMonthly);
    return totalMonthly;
  } catch (error) {
    console.error('Error al obtener visitas mensuales:', error);
    return getMonthlyVisitsLocalStorage();
  }
};

// Función para obtener visitas mensuales desde localStorage
const getMonthlyVisitsLocalStorage = () => {
  try {
    const now = new Date();
    let totalMonthly = 0;

    // Calcular fecha de hace 30 días
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dailyVisitsKey = LOCAL_STORAGE_KEYS.DAILY_VISITS_PREFIX + dateStr;
      const dailyVisits = parseInt(localStorage.getItem(dailyVisitsKey) || '0', 10);
      totalMonthly += dailyVisits;
    }

    return totalMonthly > 0 ? totalMonthly : 1; // Mínimo 1 visita (la actual)
  } catch (error) {
    console.error('Error al leer visitas mensuales desde localStorage:', error);
    return 1; // Al menos una visita (la actual)
  }
};

// Suscribirse a cambios en tiempo real
export const subscribeToVisitStats = (callback) => {
  if (!database) {
    // Devolver valor desde localStorage y configurar un intervalo para actualizar
    const localValue = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
    callback(localValue);

    // Actualizar cada 10 segundos (simulación de tiempo real)
    const intervalId = setInterval(() => {
      const updatedValue = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
      callback(updatedValue);
    }, 10000);

    // Función para cancelar la suscripción (eliminar el intervalo)
    return () => clearInterval(intervalId);
  }

  try {
    const totalVisitsRef = ref(database, 'statistics/visits/total');

    // Escuchar cambios en el total de visitas
    const unsubscribe = onValue(totalVisitsRef, (snapshot) => {
      const total = snapshot.exists() ? snapshot.val() : 0;
      callback(total);
    }, (error) => {
      console.error('Error en suscripción a estadísticas:', error);
      // Usar localStorage como alternativa
      const localValue = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
      callback(localValue);
    });

    // Retornar función para cancelar la suscripción
    return unsubscribe;
  } catch (error) {
    console.error('Error al suscribirse a estadísticas:', error);

    // Alternativa con localStorage
    const localValue = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_VISITS) || '0', 10);
    callback(localValue);

    return () => { }; // Función vacía como fallback
  }
}; 