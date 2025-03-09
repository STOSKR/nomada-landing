import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Alex Rodríguez',
    role: 'Co-fundador & CEO',
    bio: 'Apasionado por los viajes y la tecnología. Ha visitado más de 30 países y quiere hacer que viajar sea una experiencia más conectada y auténtica.',
    avatar: '👨‍💻', // Emoji como avatar temporal
  },
  {
    id: 2,
    name: 'Laura González',
    role: 'Co-fundadora & CTO',
    bio: 'Desarrolladora full-stack con experiencia en crear plataformas sociales. Combina su amor por el código con su pasión por descubrir nuevas culturas.',
    avatar: '👩‍💻', // Emoji como avatar temporal
  }
];

const Team = () => {
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
    <TeamSection id="team" ref={ref}>
      <ContentContainer>
        <TextContainer
          as={motion.div}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionTag>Nuestro Equipo</SectionTag>
          <SectionTitle>Mentes creativas <TitleGradient>detrás de Nómada</TitleGradient></SectionTitle>
          <SectionDescription>
            Conoce a las personas apasionadas que están trabajando para revolucionar
            la forma en que experimentamos el mundo a través de los viajes.
          </SectionDescription>
        </TextContainer>

        <TeamContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              as={motion.div}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 }
              }}
            >
              <AvatarContainer>
                <AvatarCircle>
                  <Avatar>{member.avatar}</Avatar>
                </AvatarCircle>
                <AvatarRing />
              </AvatarContainer>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
              </MemberInfo>
              <SocialLinks>
                <SocialLink
                  as={motion.a}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <i>🔗</i>
                </SocialLink>
                <SocialLink
                  as={motion.a}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <i>📱</i>
                </SocialLink>
                <SocialLink
                  as={motion.a}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <i>📧</i>
                </SocialLink>
              </SocialLinks>
            </TeamMemberCard>
          ))}
        </TeamContainer>
      </ContentContainer>

      {/* Elementos decorativos */}
      <BackgroundCircle1
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <BackgroundCircle2
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <BackgroundBlur
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </TeamSection>
  );
};

// Estilos
const TeamSection = styled.section`
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
  background: rgba(123, 179, 213, 0.1);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
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
  max-width: 600px;
  margin: 0 auto;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const TeamMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 3rem 2rem 2rem;
  width: 350px;
  box-shadow: 0 10px 30px var(--shadow);
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 2rem 1.5rem 1.5rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const AvatarCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px var(--shadow);
  z-index: 2;
  position: relative;
`;

const Avatar = styled.div`
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AvatarRing = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  opacity: 0.3;
  z-index: 1;
`;

const MemberInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.h4`
  font-size: 1rem;
  color: var(--primary);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const MemberBio = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(123, 179, 213, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
  
  i {
    font-style: normal;
  }
`;

// Elementos decorativos
const BackgroundCircle1 = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  top: 10%;
  right: -100px;
  background: radial-gradient(circle, var(--tertiary) 0%, transparent 70%);
  opacity: 0.2;
  z-index: 0;
`;

const BackgroundCircle2 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  bottom: 10%;
  left: -100px;
  background: radial-gradient(circle, var(--secondary) 0%, transparent 70%);
  opacity: 0.2;
  z-index: 0;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  filter: blur(100px);
  z-index: 0;
  opacity: 0.1;
`;

export default Team; 