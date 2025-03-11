import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
// Solo importar el servicio de emailjs
import { sendWelcomeEmail } from '../services/emailjs';
import * as localStorageService from '../services/localStorageService';

const JoinNow = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(!db);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [subscribersCount, setSubscribersCount] = useState(0);

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.3 });

  // Obtener el conteo de suscriptores
  useEffect(() => {
    const getSubscribersCount = async () => {
      if (db) {
        try {
          const subscribersRef = collection(db, "subscribers");
          const querySnapshot = await getDocs(subscribersRef);
          setSubscribersCount(querySnapshot.size);
        } catch (error) {
          console.error("Error al obtener el conteo de suscriptores:", error);
        }
      }
    };

    getSubscribersCount();
  }, []);

  // Función para mostrar el panel de administración
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  // Función para alternar entre Firestore y localStorage
  const toggleStorage = () => {
    // Solo permitir alternar a Firestore si db está disponible
    if (!db && !useLocalStorage) {
      return;
    }
    setUseLocalStorage(!useLocalStorage);
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
      let existsInFirestore = false;

      // Verificar si el email existe en Firestore (si está disponible)
      if (db && !useLocalStorage) {
        const subscribersRef = collection(db, "subscribers");
        const q = query(subscribersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        existsInFirestore = !querySnapshot.empty;
      }

      // Verificar si el email existe localmente
      const existsInLocalStorage = localStorageService.emailExists(email);

      // Si existe en localStorage pero no en Firestore, eliminar la entrada antigua en localStorage
      if (existsInLocalStorage && !existsInFirestore && db && !useLocalStorage) {
        // Obtener todos los suscriptores del localStorage
        const localSubs = localStorageService.getAllSubscribers();
        // Encontrar y eliminar el suscriptor con el mismo email
        const subToRemove = localSubs.find(sub => sub.email === email);
        if (subToRemove && subToRemove.id) {
          localStorageService.removeSubscriber(subToRemove.id);
        }
      }
      // Si existe en ambos lugares, no permitir el registro
      else if ((existsInLocalStorage && useLocalStorage) || existsInFirestore) {
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
          // Añadir nuevo suscriptor a Firestore
          const docRef = await addDoc(collection(db, "subscribers"), {
            email: email,
            createdAt: new Date(),
            status: "active"
          });

          subscriberSaved = true;

          // Guardar también en localStorage como respaldo
          localStorageService.saveSubscriber({ email, status: "active" });
        } catch (firestoreError) {
          // Si falla Firestore, usar localStorage
          const newSubscriber = localStorageService.saveSubscriber({ email, status: "active" });
          subscriberSaved = !!newSubscriber;
        }
      }

      if (!subscriberSaved) {
        throw new Error("No se pudo guardar el suscriptor");
      }

      // Enviar correo electrónico
      const emailResult = await sendWelcomeEmail(email);

      if (emailResult.success) {
        setEmailSent(true);
      } else {
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
          <span>Hemos enviado un correo de confirmación a tu dirección de email.
            Por favor, revisa tu bandeja de entrada (y la carpeta de spam)
            para confirmar tu suscripción.</span>
        ) : (
          <span>
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
          </span>
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

  // Barra de carga con imagen y mensaje
  const ProgressBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
    background: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
  `;

  const ProgressBar = styled.div`
    height: 20px;
    background: linear-gradient(to right, #7FB3D5, #F7CAC9);
    width: ${({ daysRemaining }) => (100 - daysRemaining / 30 * 100)}%;
    transition: width 0.5s ease;
  `;

  const TravelerImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  `;

  const ProgressMessage = styled.span`
    font-size: 1rem;
    color: #444;
  `;

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
            <StatValue>{subscribersCount || 1}</StatValue>
            <StatLabel>Exploradores registrados</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>6 de abril</StatValue>
            <StatLabel>Fecha de lanzamiento</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatValue>100%</StatValue>
            <StatLabel>Gratis en fase Beta</StatLabel>
          </StatItem>
        </StatsContainer>
      </ContentContainer>
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
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  color: #333;
  background: white;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #666;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const PrivacyText = styled.p`
  font-size: 0.9rem;
  color: #333;
  text-align: center;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const SuccessIcon = styled.span`
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ResetButton = styled.button`
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 4rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 3rem;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 768px) {
    padding: 2rem;
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const StatValue = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: #444;
  display: block;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: #666;
`;

const StatDivider = styled.div`
  width: 2px;
  height: 60px;
  background-color: rgba(123, 179, 213, 0.2);
  
  @media (max-width: 768px) {
    width: 80%;
    height: 2px;
  }
`;

export default JoinNow;