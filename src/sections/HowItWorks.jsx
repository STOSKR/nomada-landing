import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Datos de pasos
const stepsData = [
    {
        id: 1,
        number: '01',
        title: 'Regístrate',
        description: 'Crea tu cuenta de Nómada para acceder a todas las funcionalidades de la plataforma.',
    },
    {
        id: 2,
        number: '02',
        title: 'Explora',
        description: 'Descubre rutas, destinos y experiencias compartidas por otros viajeros y aventureros.',
    },
    {
        id: 3,
        number: '03',
        title: 'Planifica',
        description: 'Crea tu propia ruta personalizada o sigue una de las recomendadas por la comunidad.',
    },
    {
        id: 4,
        number: '04',
        title: 'Comparte',
        description: 'Comparte tus experiencias, fotos y consejos con la comunidad para inspirar a otros viajeros.',
    },
];

const HowItWorks = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Variantes para animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const lineVariants = {
        hidden: { scaleY: 0, originY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -50 },
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
        <HowItWorksSection id="how-it-works" ref={ref}>
            <ContentContainer>
                <TextContainer
                    as={motion.div}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <SectionTag>Cómo funciona</SectionTag>
                    <SectionTitle>Comienza tu <TitleGradient>aventura</TitleGradient></SectionTitle>
                    <SectionDescription>
                        Descubre cómo Nómada transforma la forma de viajar y conectar con otros aventureros
                        en 4 sencillos pasos.
                    </SectionDescription>
                </TextContainer>

                <StepsContainer
                    as={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {stepsData.map((step, index) => (
                        <StepItem
                            key={step.id}
                            as={motion.div}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <StepNumber>{step.number}</StepNumber>
                            <StepContent>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </StepContent>

                            {index < stepsData.length - 1 && (
                                <StepConnector
                                    as={motion.div}
                                    variants={lineVariants}
                                />
                            )}
                        </StepItem>
                    ))}
                </StepsContainer>

                <CallToAction
                    as={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <CTAText>¿Listo para comenzar tu viaje?</CTAText>
                    <CTAButton>Únete ahora</CTAButton>
                </CallToAction>
            </ContentContainer>

            {/* Elementos decorativos */}
            <BackgroundDecoration
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            />
        </HowItWorksSection>
    );
};

// Estilos
const HowItWorksSection = styled.section`
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const TextContainer = styled.div`
  max-width: 700px;
  margin: 0 auto 5rem;
  text-align: center;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(35, 217, 151, 0.1);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
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
  max-width: 600px;
  margin: 0 auto;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StepNumber = styled.div`
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  flex-shrink: 0;
  width: 100px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    width: auto;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 100%;
  left: 50px;
  width: 2px;
  height: 2rem;
  background: linear-gradient(to bottom, var(--primary), var(--secondary));
  transform-origin: top;
  
  @media (max-width: 768px) {
    left: 1.5rem;
  }
`;

const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5rem;
  gap: 2rem;
`;

const CTAText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CTAButton = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  border-radius: 50px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 70%;
  height: 70%;
  background: radial-gradient(
    ellipse at center,
    rgba(35, 217, 151, 0.1) 0%,
    rgba(240, 84, 84, 0.05) 50%,
    transparent 80%
  );
  filter: blur(100px);
  z-index: 0;
`;

export default HowItWorks; 