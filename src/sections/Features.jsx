import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Datos de características
const featuresData = [
  {
    id: 1,
    icon: '🌎',
    title: 'Explora el mundo',
    description: 'Descubre miles de destinos y rutas compartidas por otros viajeros desde cualquier parte del mundo.',
  },
  {
    id: 2,
    icon: '🧭',
    title: 'Planifica tu ruta',
    description: 'Crea y personaliza rutas de viaje a tu medida, con recomendaciones y consejos de la comunidad.',
  },
  {
    id: 3,
    icon: '👥',
    title: 'Conecta con viajeros',
    description: 'Forma parte de una comunidad global de nómadas y conoce personas con tus mismos intereses.',
  },
  {
    id: 4,
    icon: '📸',
    title: 'Comparte experiencias',
    description: 'Sube tus fotos, vídeos y aventuras para inspirar a otros y mantener un diario de tus viajes.',
  },
  {
    id: 5,
    icon: '🔍',
    title: 'Descubre lo auténtico',
    description: 'Accede a lugares escondidos y experiencias locales que no encontrarás en guías turísticas convencionales.',
  },
  {
    id: 6,
    icon: '🌟',
    title: 'Colecciona momentos',
    description: 'Guarda tus destinos favoritos, crea listas de deseos y registra todos tus viajes en un solo lugar.',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
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
    <FeaturesSection id="features" ref={ref}>
      <ContentContainer>
        <TextContainer
          as={motion.div}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionTag>Características</SectionTag>
          <SectionTitle>Toda la aventura <TitleGradient>en tus manos</TitleGradient></SectionTitle>
          <SectionDescription>
            Nómada te ofrece todas las herramientas que necesitas para vivir experiencias
            únicas y conectar con otros aventureros alrededor del mundo.
          </SectionDescription>
        </TextContainer>

        <FeaturesGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              as={motion.div}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContentContainer>

      {/* Elemento decorativo */}
      <BackgroundDecoration
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </FeaturesSection>
  );
};

// Estilos
const FeaturesSection = styled.section`
  position: relative;
  padding: 6rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #f8f9fa;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(35, 217, 151, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(
    ellipse at center,
    rgba(35, 217, 151, 0.2) 0%,
    rgba(240, 84, 84, 0.1) 70%,
    transparent 100%
  );
  filter: blur(80px);
  border-radius: 50%;
  z-index: 0;
`;

export default Features; 