import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { sendWelcomeEmail } from '../services/sendgrid';
import * as localStorageService from '../services/localStorageService';

const JoinNow = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [useLocalStorage, setUseLocalStorage] = useState(!db); // Usar localStorage por defecto si db no está disponible
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.3 });

  // Cargar suscriptores al inicio (solo una vez, sin listener)
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        if (!showAdmin) return; // No cargar si no se muestra el panel de admin

        setLoading(true);

        if (useLocalStorage || !db) {
          // Usar localStorage como fuente de datos
          const localSubscribers = localStorageService.getAllSubscribers();
          setSubscribers(localSubscribers);
        } else {
          // Intentar cargar desde Firestore
          try {
            // Usar getDocs en lugar de onSnapshot para evitar listeners
            const querySnapshot = await getDocs(collection(db, "subscribers"));
            const subscribersList = [];
            querySnapshot.forEach((doc) => {
              subscribersList.push({
                id: doc.id,
                ...doc.data()
              });
            });
            setSubscribers(subscribersList);
          } catch (firestoreError) {
            console.error("Error al cargar desde Firestore, usando localStorage como respaldo:", firestoreError);
            setUseLocalStorage(true);
            const localSubscribers = localStorageService.getAllSubscribers();
            setSubscribers(localSubscribers);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar suscriptores:", error);
        setLoading(false);
      }
    };

    if (showAdmin) {
      fetchSubscribers();
    }
  }, [showAdmin, useLocalStorage]);

  // Función para mostrar el panel de administración
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  // Función para alternar entre Firestore y localStorage
  const toggleStorage = () => {
    // Solo permitir alternar a Firestore si db está disponible
    if (!db && !useLocalStorage) {
      console.warn("Firebase Firestore no está disponible. Usando localStorage.");
      return;
    }
    setUseLocalStorage(!useLocalStorage);
  };

  // Función para eliminar un suscriptor
  const removeSubscriber = async (subscriberId) => {
    try {
      setLoading(true);

      if (useLocalStorage || !db || subscriberId.startsWith('local_')) {
        // Eliminar del localStorage
        localStorageService.removeSubscriber(subscriberId);

        // Actualizar la lista localmente
        const updatedSubscribers = subscribers.filter(sub => sub.id !== subscriberId);
        setSubscribers(updatedSubscribers);
      } else {
        // Eliminar de Firestore
        try {
          await deleteDoc(doc(db, "subscribers", subscriberId));

          // Actualizar la lista localmente sin necesidad de volver a consultar Firestore
          const updatedSubscribers = subscribers.filter(sub => sub.id !== subscriberId);
          setSubscribers(updatedSubscribers);
        } catch (firestoreError) {
          console.error("Error al eliminar de Firestore:", firestoreError);
          setError('No se pudo eliminar el suscriptor de Firestore. Intenta nuevamente más tarde.');
        }
      }

      console.log("Suscriptor eliminado correctamente");
      setLoading(false);
    } catch (error) {
      console.error("Error al eliminar suscriptor:", error);
      setLoading(false);
    }
  };

  // Validación de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar estados de error y éxito
    setError('');
    setEmailSent(false);
    setEmailError('');

    // Validar email
    if (!email.trim()) {
      setError('Por favor, introduce tu email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }

    setLoading(true);

    try {
      // Verificar si el email existe localmente
      if (localStorageService.emailExists(email)) {
        setError('Este email ya está registrado.');
        setLoading(false);
        return;
      }

      let subscriberSaved = false;

      if (!db || useLocalStorage) {
        // Usar directamente localStorage si Firestore no está disponible
        const newSubscriber = localStorageService.saveSubscriber({ email, status: "active" });
        subscriberSaved = !!newSubscriber;
      } else {
        // Intentar guardar en Firestore primero
        try {
          // Verificar si el email ya existe en Firestore
          const subscribersRef = collection(db, "subscribers");
          const q = query(subscribersRef, where("email", "==", email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setError('Este email ya está registrado.');
            setLoading(false);
            return;
          }

          // Añadir nuevo suscriptor a Firestore
          const docRef = await addDoc(collection(db, "subscribers"), {
            email: email,
            createdAt: new Date(),
            status: "active"
          });

          console.log("Suscriptor registrado en Firestore con ID:", docRef.id);
          subscriberSaved = true;

          // Guardar también en localStorage como respaldo
          localStorageService.saveSubscriber({ email, status: "active" });
        } catch (firestoreError) {
          console.error("Error con Firestore, utilizando localStorage:", firestoreError);
          // Si falla Firestore, usar localStorage
          const newSubscriber = localStorageService.saveSubscriber({ email, status: "active" });
          subscriberSaved = !!newSubscriber;
        }
      }

      if (!subscriberSaved) {
        throw new Error("No se pudo guardar el suscriptor");
      }

      // Enviar correo electrónico con SendGrid
      console.log("Intentando enviar email a:", email);
      const emailResult = await sendWelcomeEmail(email);

      if (emailResult.success) {
        console.log("Email enviado correctamente");
        setEmailSent(true);
      } else {
        console.warn("Hubo un problema al enviar el email:", emailResult.error);
        setEmailError(`No se pudo enviar el email de confirmación: ${emailResult.error}`);
      }

      // Mostrar mensaje de éxito incluso si el email falló
      gsap.to(formRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setSubmitted(true);
          gsap.fromTo(
            '.success-message',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
    } catch (error) {
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  // Contenido del panel de éxito
  const renderSuccessMessage = () => (
    <SuccessMessage className="success-message">
      <SuccessIcon>✓</SuccessIcon>
      <SuccessTitle>¡Gracias por unirte!</SuccessTitle>
      <SuccessText>
        Has sido añadido a nuestra lista de early adopters.
        {emailSent ? (
          <p>Hemos enviado un correo de confirmación a tu dirección de email.
            Por favor, revisa tu bandeja de entrada (y la carpeta de spam)
            para confirmar tu suscripción.</p>
        ) : (
          <p>
            {emailError ? (
              <>
                <br />
                <span style={{ color: '#ff6b6b' }}>
                  {emailError}
                  <br />No te preocupes, tu suscripción se ha guardado correctamente.
                </span>
              </>
            ) : (
              "Tu suscripción ha sido guardada. Pronto recibirás noticias de nosotros."
            )}
          </p>
        )}
      </SuccessText>
      <ResetButton onClick={() => setSubmitted(false)}>
        Volver al formulario
      </ResetButton>
    </SuccessMessage>
  );

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <JoinSection id="join">
      <ContentContainer>
        <JoinContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          ref={formRef}
        >
          <JoinTextContainer>
            <SectionTag>Únete a Nómada</SectionTag>
            <SectionTitle>Sé parte de nuestra <TitleGradient>comunidad</TitleGradient></SectionTitle>
            <SectionDescription>
              Regístrate ahora para formar parte de nuestra lista de early adopters.
              Serás de los primeros en probar Nómada cuando esté disponible y recibirás
              noticias y actualizaciones exclusivas.
            </SectionDescription>
          </JoinTextContainer>

          {!submitted ? (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <EmailInput
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Unirme'}
                </SubmitButton>
              </InputGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <PrivacyText>
                Al unirte, aceptas nuestra política de privacidad y términos de servicio.
                No compartiremos tu información con terceros.
              </PrivacyText>
            </Form>
          ) : renderSuccessMessage()}
        </JoinContainer>

        {/* Stats y decoraciones */}
        <StatsContainer
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <StatItem>
            <StatValue>+500</StatValue>
            <StatLabel>Early adopters</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>14</StatValue>
            <StatLabel>Días para el lanzamiento</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>100%</StatValue>
            <StatLabel>Gratis por 30 días</StatLabel>
          </StatItem>
        </StatsContainer>

        {/* Panel de administración oculto - solo para desarrollo */}
        <AdminButton onClick={toggleAdmin}>
          {showAdmin ? "Ocultar Panel" : "Panel Admin (Dev)"}
        </AdminButton>

        {showAdmin && (
          <AdminPanel>
            <h3>Panel de Administración (Solo Desarrollo)</h3>
            <p>Total de suscriptores: {subscribers.length}</p>
            <SubscribersList>
              {subscribers.length > 0 ? (
                subscribers.map((sub, index) => (
                  <SubscriberItem key={index}>
                    <span>{sub.email}</span>
                    <RemoveButton onClick={() => removeSubscriber(sub.id)}>
                      Eliminar
                    </RemoveButton>
                  </SubscriberItem>
                ))
              ) : (
                <p>No hay suscriptores registrados</p>
              )}
            </SubscribersList>
            <p>
              <small>
                Nota: Este panel solo es visible en modo desarrollo. En producción,
                esta información estaría en una base de datos segura.
              </small>
            </p>
          </AdminPanel>
        )}
      </ContentContainer>

      {/* Elementos decorativos */}
      <BackgroundDecoration1
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      />
      <BackgroundDecoration2
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </JoinSection>
  );
};

// Estilos
const JoinSection = styled.section`
  position: relative;
  padding: 6rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #eff5fb;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 1rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const JoinContainer = styled.div`
  padding: 3rem;
  background: rgba(248, 249, 250, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(123, 179, 213, 0.1);
  width: 100%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const JoinTextContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(247, 202, 201, 0.2);
  color: #d07f7e;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 1.2rem;
  color: #444;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled.p`
  font-size: 1.05rem;
  color: #666;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  gap: 0.8rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 50px;
  padding: 0.3rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(123, 179, 213, 0.15);
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    border-radius: 15px;
    padding: 0.5rem;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.9rem 1.2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  border-radius: 50px;
  color: #444;
  
  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 12px;
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 1.8rem;
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 12px;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: -0.5rem;
`;

const PrivacyText = styled.p`
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  max-width: 450px;
  margin: 1rem auto 0;
  line-height: 1.5;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const SuccessTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text);
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 500px;
  line-height: 1.6;
`;

const ResetButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background: transparent;
  border: 1px solid #7FB3D5;
  color: #5a8db6;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(127, 179, 213, 0.1);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    padding: 1.5rem 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  text-align: center;
  flex: 1;
`;

const StatValue = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  color: #5a8db6;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 50px;
  background: rgba(123, 179, 213, 0.3);
  
  @media (max-width: 480px) {
    width: 80%;
    height: 1px;
  }
`;

const BackgroundDecoration1 = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0.1;
  z-index: 1;
  filter: blur(50px);
`;

const BackgroundDecoration2 = styled.div`
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--secondary) 0%, transparent 70%);
  opacity: 0.1;
  z-index: 1;
  filter: blur(60px);
`;

// Estilos para el panel de administración
const AdminButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 1000;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const AdminPanel = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  
  h3 {
    margin-top: 0;
    font-size: 1rem;
    color: #444;
  }
  
  p {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
  
  small {
    color: #777;
  }
`;

const SubscribersList = styled.div`
  margin: 1rem 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0.5rem;
`;

const SubscriberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    font-size: 0.85rem;
    color: #555;
  }
`;

const RemoveButton = styled.button`
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  color: #777;
  cursor: pointer;
  
  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

export default JoinNow; 