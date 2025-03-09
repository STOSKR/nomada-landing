/**
 * Servicio para manejar operaciones con localStorage como alternativa a Firestore
 * Esto puede ser útil cuando hay problemas con las conexiones a Firestore
 */

const STORAGE_KEY = 'nomada_subscribers';

/**
 * Guardar un suscriptor en localStorage
 * @param {Object} subscriber - Datos del suscriptor (email, fecha de creación, etc.)
 * @returns {Object} El suscriptor con un ID generado
 */
export const saveSubscriber = (subscriber) => {
    try {
        // Generar un ID único
        const id = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Obtener la lista actual
        const subscribers = getAllSubscribers();

        // Añadir el nuevo suscriptor con ID
        const newSubscriber = {
            id,
            ...subscriber,
            createdAt: new Date().toISOString(), // Guardar la fecha como string
            source: 'localStorage' // Marcar como almacenado localmente
        };

        // Añadir a la lista
        subscribers.push(newSubscriber);

        // Guardar la lista actualizada
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));

        return newSubscriber;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return null;
    }
};

/**
 * Obtener todos los suscriptores de localStorage
 * @returns {Array} Lista de suscriptores
 */
export const getAllSubscribers = () => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return [];
    }
};

/**
 * Verificar si un email ya existe
 * @param {string} email - El email a verificar
 * @returns {boolean} true si el email ya existe
 */
export const emailExists = (email) => {
    const subscribers = getAllSubscribers();
    return subscribers.some(sub => sub.email === email);
};

/**
 * Eliminar un suscriptor por su ID
 * @param {string} id - El ID del suscriptor a eliminar
 * @returns {boolean} true si se eliminó correctamente
 */
export const removeSubscriber = (id) => {
    try {
        // Obtener la lista actual
        const subscribers = getAllSubscribers();

        // Filtrar el suscriptor a eliminar
        const updatedSubscribers = subscribers.filter(sub => sub.id !== id);

        // Si son iguales, no se encontró el suscriptor
        if (subscribers.length === updatedSubscribers.length) {
            return false;
        }

        // Guardar la lista actualizada
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubscribers));

        return true;
    } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
        return false;
    }
};

export default {
    saveSubscriber,
    getAllSubscribers,
    emailExists,
    removeSubscriber
}; 