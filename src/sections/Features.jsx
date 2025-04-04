import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Datos de características
const featuresData = [
  { id: 1, icon: '/features/descubre.png', title: 'Descubrir', description: 'Explora destinos y rutas compartidas por otros viajeros.' },
  { id: 2, icon: '/features/planifica.png', title: 'Planificar', description: 'Crea rutas personalizadas con consejos de la comunidad.' },
  { id: 3, icon: '/features/vive.png', title: 'Vivir', description: 'Vive la experiencia de la planificación realizada.' },
  { id: 4, icon: '/features/comparte.png', title: 'Compartir', description: 'Sube tus fotos y aventuras para inspirar a otros.' }
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <FeaturesSection id="features" ref={ref}>
      <ContentContainer>
        <TextContainer as={motion.div} variants={titleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionTag>Características</SectionTag>
          <SectionTitle>Toda la aventura <TitleGradient>en tus manos</TitleGradient></SectionTitle>
          <SectionDescription>
            Nómada quiere ofrecer una plataforma all-in-one para:
          </SectionDescription>
        </TextContainer>

        <FeaturesGrid as={motion.div} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
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
              <FeatureIcon>
                <FeatureImage src={feature.icon} alt={feature.title} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <MoreFeaturesMessage as={motion.div} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.8, duration: 0.5 }}>
          ...y muchos más esperando a que los descubras en la primera versión
        </MoreFeaturesMessage>
      </ContentContainer>

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
  min-height: 100vh;
  padding: 6rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #f8f9fa;
    justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  min-height: 100vh;
    display: flex;
  flex-direction: column;
  justify-content: center;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  margin-bottom: 1.5rem;
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(35, 217, 151, 0.1);
`;

const FeatureImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
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

const MoreFeaturesMessage = styled.p`
  text-align: center;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-light);
  font-weight: 500;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
  filter: blur(100px);
  opacity: 0.3;
  z-index: 0;
`;

export default React.memo(Features);
