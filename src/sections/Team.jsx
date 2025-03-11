import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Shiyi Cheng',
    role: 'Fundador & Ingeniero',
    bio: 'Desarrollador Full Stack apasionado por los viajes y la tecnología.',
    avatar: '/avatar1.png',
    email: 'shiyicheng13@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shiyi-cheng-08a413251/',
    cv: '/CV_Shiyi.pdf',
    portfolio: 'https://shiyicheng.dev',
    github: 'https://github.com/STOSKR'
  },
  {
    id: 2,
    name: 'Sebastian Vega',
    role: 'Fundador & Ingeniero',
    bio: 'Desarrolladora full-stack con experiencia en crear plataformas sociales. Combina su amor por el código con su pasión por descubrir nuevas culturas.',
    avatar: '?',
    email: 'sebastian@nomada.com',
    linkedin: 'https://www.linkedin.com/in/sebasti%C3%A1n-vega-tafur-4782a7292/',
    cv: '/cv-sebastian-vega.pdf',
    portfolio: 'https://sebastianvega.dev',
    github: 'https://github.com/sebastianvega'
  }
];

// Logo de LinkedIn en SVG
const LinkedInLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Logo de Portfolio en SVG
const PortfolioLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    <path d="M8 10h8v1H8zm0 2h8v1H8zm0 2h5v1H8z" fillRule="evenodd" />
  </svg>
);

// Logo de GitHub en SVG
const GitHubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Logo de Email en SVG
const EmailLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

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
                  <Avatar>
                    {member.avatar.startsWith('/') ?
                      <img src={member.avatar} alt={`${member.name}`} /> :
                      member.avatar}
                  </Avatar>
                </AvatarCircle>
                <AvatarRing />
              </AvatarContainer>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
              </MemberInfo>
              <ContactContainer>
                <SocialButtons>
                  <RoundButton
                    as={motion.a}
                    href={`mailto:${member.email}`}
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Email"
                  >
                    <EmailLogo />
                  </RoundButton>
                  <RoundButton
                    as={motion.a}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    aria-label="LinkedIn"
                  >
                    <LinkedInLogo />
                  </RoundButton>
                  <RoundButton
                    as={motion.a}
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Portfolio"
                    className="portfolio-button"
                  >
                    <PortfolioLogo />
                  </RoundButton>
                  <RoundButton
                    as={motion.a}
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    aria-label="GitHub"
                  >
                    <GitHubLogo />
                  </RoundButton>
                </SocialButtons>
                <DownloadButton
                  as={motion.a}
                  href={member.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <i>📄</i> Descargar CV
                </DownloadButton>
              </ContactContainer>
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
  padding: 4rem 0;
  width: 100vw;
  overflow: hidden;
  background-color: #f8f9fa;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
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
  margin-bottom: 2.5rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.4rem 1.2rem;
  background: rgba(123, 179, 213, 0.1);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1.2rem;
  color: var(--text);
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled.p`
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const TeamMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 2rem 1.5rem 1.5rem;
  width: 300px;
  box-shadow: 0 8px 20px var(--shadow);
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 1.5rem 1rem 1rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const AvatarCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px var(--shadow);
  z-index: 2;
  position: relative;
`;

const Avatar = styled.div`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const AvatarRing = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  opacity: 0.3;
  z-index: 1;
`;

const MemberInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 0.3rem;
`;

const MemberRole = styled.h4`
  font-size: 0.9rem;
  color: var(--primary);
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const MemberBio = styled.p`
  color: var(--text-light);
  font-size: 0.85rem;
  line-height: 1.5;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
`;

const RoundButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &.portfolio-button {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 90%;
  padding: 0.6rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  i {
    font-size: 1.1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
  }
`;

// Eliminamos los estilos que ya no usamos
const ContactButtons = styled.div`
  display: none;
`;

const ContactButton = styled.a`
  display: none;
`;

const SocialLinks = styled.div`
  display: none;
`;

const SocialLink = styled.a`
  display: none;
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