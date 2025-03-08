import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const JoinNow = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.3 });

  // Validación de email simple
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    setError('');

    try {
      // En un entorno real, aquí enviarías el email al backend
      // Simulamos una petición con un timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Aquí se enviaría el email a nomada.contact@gmail.com
      console.log(`Nuevo early adopter registrado: ${email}`);

      // Animación de éxito
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
          ) : (
            <SuccessMessage className="success-message">
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>¡Gracias por unirte!</SuccessTitle>
              <SuccessText>
                Te hemos añadido a nuestra lista de early adopters. Pronto recibirás un correo de confirmación desde nomada.contact@gmail.com con más información sobre el lanzamiento.
              </SuccessText>
            </SuccessMessage>
          )}
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
  background-color: var(--background);
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const JoinContainer = styled.div`
  padding: 4rem;
  background: rgba(248, 249, 250, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  border: 1px solid rgba(123, 179, 213, 0.1);
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 2.5rem;
  }
`;

const JoinTextContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(247, 202, 201, 0.2);
  color: var(--secondary);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  color: var(--text-light);
  line-height: 1.6;
`;

const Form = styled.form`
  width: 100%;
  margin-top: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: white;
  border: 1px solid rgba(123, 179, 213, 0.2);
  border-radius: 50px;
  
  &:focus {
    border-color: var(--primary);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 25px;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 25px;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: -0.5rem;
`;

const PrivacyText = styled.p`
  font-size: 0.85rem;
  color: var(--text-light);
  opacity: 0.7;
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

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.span`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: var(--text-light);
`;

const StatDivider = styled.div`
  width: 1px;
  height: 50px;
  background: rgba(123, 179, 213, 0.2);
  
  @media (max-width: 480px) {
    display: none;
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

export default JoinNow; 