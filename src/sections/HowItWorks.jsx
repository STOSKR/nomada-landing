import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react';
import inicioImage from '../assets/images/inicio.png';
import comunidadImage from '../assets/images/Comunidad.png';
import colaboracionImage from '../assets/images/Colaboraciones.png';
import crearImage from '../assets/images/Creara.png';
import personal1Image from '../assets/images/personal1.png';
import Descubrira from '../assets/images/Descubrira.png';
import Recomendaciones from '../assets/images/Recomendaciones.png';
import perfil from '../assets/images/perfil.png';
import enriquece from '../assets/images/enriquece.png';

const stepsData = [
  {
    id: 1,
    number: '01',
    title: 'Inicio rápido',
    description: 'Ingresa tu destino y obtén información esencial al instante, antes de crear tu itinerario.',
    image: inicioImage,
  },
  {
    id: 2,
    number: '02',
    title: 'Explora destinos',
    description: 'Descubre lugares fascinantes basados en tus gustos y preferencias personales.',
    image: Descubrira,
  },
  {
    id: 3,
    number: '03',
    title: 'Recomendaciones',
    description: 'Encuentra los destinos más populares que coinciden con tus intereses y descubre lugares únicos.',
    image: Recomendaciones,
  },
  {
    id: 5,
    number: '05',
    title: 'Reserva fácil',
    description: 'Accede a las mejores ofertas con nuestros socios para hacer tu viaje más accesible y personalizado.',
    image: colaboracionImage,
  },
  {
    id: 6,
    number: '06',
    title: 'Crea itinerarios',
    description: 'Descubre puntos de interés cercanos para hacer cada paso de tu aventura más memorable.',
    image: crearImage,
  },
  {
    id: 8,
    number: '08',
    title: 'Conecta redes',
    description: 'Integra tus perfiles de Instagram y Facebook para compartir tus viajes de forma única.',
    image: personal1Image,
  },
  {
    id: 9,
    number: '09',
    title: 'Enriquece recuerdos',
    description: 'Complementa tus fotos con reseñas, recomendaciones y datos curiosos de cada destino.',
    image: enriquece,
  },
  {
    id: 4,
    number: '04',
    title: 'Comparte',
    description: 'Inspira a otros viajeros con tus experiencias y aprovecha las recomendaciones de la comunidad.',
    image: comunidadImage,
  },
  {
    id: 7,
    number: '07',
    title: 'Tu historia',
    description: 'Visualiza tus viajes en una cronología, controla tu privacidad y gestiona tu grupo de viajeros.',
    image: perfil,
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

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
          <SectionTitle>Comienza tu <TitleGradient>aventura</TitleGradient></SectionTitle>
          <SectionDescription>
            Descubre cómo Nómada transforma la forma de viajar en unos sencillos pasos.
          </SectionDescription>
        </TextContainer>
        <Section ref={ref}>
            <Grid as={motion.div} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              {stepsData.filter(step => step.id !== 7).map((step, index) => (
                <motion.div key={step.id} variants={itemVariants} whileHover={{ y: -5 }}>
                  <CCard className="mb-3" style={{ margin: '10px', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CardContentWrapper isEven={index % 2 === 0}>
                      <CCardImage
                        orientation="top"
                        src={step.image}
                        style={{
                          width: '90%',
                          height: 'auto',
                          display: 'flex',
                          alignSelf: 'center',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          borderRadius: '15px',
                        }}
                      />
                      <CCardBody style={{ padding: '5px', width: '80%', margin: '5px', marginBottom: '20px' }}>
                        <CCardTitle style={{ fontSize: '1.3rem', textAlign: 'center' }}>{step.title}</CCardTitle>
                        <CCardText style={{ textAlign: 'center' }}>{step.description}</CCardText>
                      </CCardBody>
                    </CardContentWrapper>
                  </CCard>
                </motion.div>
              ))}
            </Grid>
          </Section>

          <Section2>
          <Grid2 as={motion.div} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {stepsData.filter(step => step.id === 7).map((step, index) => (
              <motion.div key={step.id} variants={itemVariants} whileHover={{ y: -5 }}>
                <CCard className="mb-3" style={{ margin: '10px', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <CardContentWrapper isEven={index % 2 === 0}>
                    <CCardImage
                      orientation="top"
                      src={step.image}
                      style={{
                        width: '90%',
                        height: 'auto',
                        display: 'flex',
                        alignSelf: 'center',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        borderRadius: '15px',
                      }}
                    />
                    <CCardBody style={{ padding: '5px', width: '80%', margin: '5px', marginBottom: '20px' }}>
                      <CCardTitle style={{ fontSize: '1.3rem', textAlign: 'center' }}>{step.title}</CCardTitle>
                      <CCardText style={{ textAlign: 'center' }}>{step.description}</CCardText>
                    </CCardBody>
                  </CardContentWrapper>
                </CCard>
              </motion.div>
            ))}
          </Grid2>
          </Section2>

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

      <BackgroundDecoration
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </HowItWorksSection>
  );
};


const Section = styled.section`
  padding: 2rem 2rem;
  display: flex;
  align-self: center;
  width: 80%;
  max-width: 1600px;
`;
const Section2 = styled.section`
  display: flex;
  align-self: center;
  width: 70%;
  max-width: 900px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #444;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* En pantallas pequeñas, solo 1 columna */
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  

  @media (min-width: 1400px) {
    grid-template-columns: repeat(2, 1fr); /* En pantallas grandes, 2 columnas */
  }
`;
const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* En pantallas pequeñas, solo 1 columna */
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
`;



const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    
  }
`;

const HowItWorksSection = styled.section`
  position: relative;
  padding: 6rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #f0f5fa;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  width: 100vw;
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3rem);
  margin-bottom: 1.5rem;
  color: #444;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  color: transparent;
`;

const SectionDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
`;

const CallToAction = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const CTAButton = styled.button`
  background-color: var(--primary);
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary);
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${perfil});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  z-index: -1;
`;


export default HowItWorks;
