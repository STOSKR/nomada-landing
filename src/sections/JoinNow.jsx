import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const JoinNow = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const formRef = useRef(null);
    const isInView = useInView(formRef, { once: false, amount: 0.3 });

    // Validación de email simple
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
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

        // Simulación de envío exitoso
        setError('');

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
                        <JoinForm onSubmit={handleSubmit}>
                            <EmailInputContainer>
                                <EmailInput
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <SubmitButton type="submit">
                                    Unirme
                                </SubmitButton>
                            </EmailInputContainer>
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                            <PrivacyText>
                                Al unirte, aceptas nuestra política de privacidad y términos de servicio.
                                No compartiremos tu información con terceros.
                            </PrivacyText>
                        </JoinForm>
                    ) : (
                        <SuccessMessage className="success-message">
                            <SuccessIcon>✓</SuccessIcon>
                            <SuccessTitle>¡Gracias por unirte!</SuccessTitle>
                            <SuccessText>
                                Te hemos añadido a nuestra lista. Te contactaremos cuando Nómada esté listo.
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
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8rem 0;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const JoinContainer = styled.div`
  padding: 4rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 2.5rem;
  }
`;

const JoinTextContainer = styled.div`
  max-width: 600px;
  margin-bottom: 3rem;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(240, 84, 84, 0.1);
  color: var(--secondary);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  color: var(--text-secondary);
  line-height: 1.6;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const EmailInputContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 50px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 480px) {
    flex-direction: column;
    border-radius: 20px;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  background: transparent;
  color: var(--text);
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  padding: 1.2rem 3rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 480px) {
    border-radius: 0;
    padding: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #FF6B6B;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-left: 1rem;
`;

const PrivacyText = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.7;
  line-height: 1.5;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
`;

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SuccessTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.span`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const StatDivider = styled.div`
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
  }
`;

const BackgroundDecoration1 = styled.div`
  position: absolute;
  top: 20%;
  right: 5%;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle at center,
    rgba(35, 217, 151, 0.3) 0%,
    transparent 70%
  );
  filter: blur(50px);
  z-index: 1;
`;

const BackgroundDecoration2 = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle at center,
    rgba(240, 84, 84, 0.3) 0%,
    transparent 70%
  );
  filter: blur(70px);
  z-index: 1;
`;

export default JoinNow; 