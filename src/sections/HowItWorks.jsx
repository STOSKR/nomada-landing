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
                y: -5,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
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
                  className="step-connector"
                />
              )}
            </StepItem>
          ))}
        </StepsContainer>

        <CallToAction
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <CTAText>¿Listo para comenzar tu viaje?</CTAText>
          <CTAButton onClick={() => document.querySelector('#join').scrollIntoView({ behavior: 'smooth' })}>
            Únete ahora
          </CTAButton>
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
  padding: 6rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f5fa;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 800px;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(127, 179, 213, 0.2);
  color: #5a8db6;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3rem);
  margin-bottom: 1.5rem;
  color: #444;
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
  flex-direction: row;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 3rem;
    padding: 0 1.5rem;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  flex: 1;
  max-width: 260px;
  
  @media (max-width: 992px) {
    max-width: 100%;
    align-items: flex-start;
    text-align: left;
    flex-direction: row;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

const StepNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: #7FB3D5;
  line-height: 1;
  margin-bottom: 1.5rem;
  
  @media (max-width: 992px) {
    margin-bottom: 0;
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 45%;
  right: -3rem;
  width: 2rem;
  height: 2px;
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  z-index: 1;
  
  @media (max-width: 992px) {
    display: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 2px solid #F7CAC9;
    border-top: 2px solid #F7CAC9;
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
  color: #444;
`;

const CTAButton = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  color: white;
  font-weight: 600;
  border-radius: 50px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
    rgba(127, 179, 213, 0.1) 0%,
    rgba(247, 202, 201, 0.05) 50%,
    transparent 80%
  );
  filter: blur(100px);
  z-index: 0;
`;

export default HowItWorks; 