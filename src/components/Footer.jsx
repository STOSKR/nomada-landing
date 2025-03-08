import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoSVG from './LogoSVG'; // Importar el logo SVG

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterLogo>
            <LogoContainer>
              <LogoSVG width={40} height={40} /> {/* Usar el componente LogoSVG */}
              <LogoText>Nómada</LogoText>
            </LogoContainer>
            <LogoTagline>
              Tu comunidad global de viajeros
            </LogoTagline>
          </FooterLogo>

          <FooterLinksContainer>
            <FooterLinksColumn>
              <FooterLinksTitle>Sobre nosotros</FooterLinksTitle>
              <FooterLinks>
                <FooterLink href="#">Misión</FooterLink>
                <FooterLink href="#">Equipo</FooterLink>
                <FooterLink href="#">Prensa</FooterLink>
                <FooterLink href="#">Contacto</FooterLink>
              </FooterLinks>
            </FooterLinksColumn>

            <FooterLinksColumn>
              <FooterLinksTitle>Nómada</FooterLinksTitle>
              <FooterLinks>
                <FooterLink href="#features">Características</FooterLink>
                <FooterLink href="#how-it-works">Cómo funciona</FooterLink>
                <FooterLink href="#community">Comunidad</FooterLink>
                <FooterLink href="#join">Únete</FooterLink>
              </FooterLinks>
            </FooterLinksColumn>

            <FooterLinksColumn>
              <FooterLinksTitle>Legal</FooterLinksTitle>
              <FooterLinks>
                <FooterLink href="#">Privacidad</FooterLink>
                <FooterLink href="#">Términos</FooterLink>
                <FooterLink href="#">Cookies</FooterLink>
                <FooterLink href="#">Licencias</FooterLink>
              </FooterLinks>
            </FooterLinksColumn>
          </FooterLinksContainer>
        </FooterTop>

        <FooterDivider />

        <FooterBottom>
          <Copyright>
            &copy; {currentYear} Nómada. Todos los derechos reservados.
          </Copyright>

          <SocialLinks>
            <SocialLink
              as={motion.a}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <SocialIcon>
                {/* Instagram icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialIcon>
            </SocialLink>

            <SocialLink
              as={motion.a}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <SocialIcon>
                {/* Twitter icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </SocialIcon>
            </SocialLink>

            <SocialLink
              as={motion.a}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <SocialIcon>
                {/* Facebook icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </SocialIcon>
            </SocialLink>

            <SocialLink
              as={motion.a}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <SocialIcon>
                {/* YouTube icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </SocialIcon>
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

// Estilos
const FooterContainer = styled.footer`
  background: rgba(8, 8, 8, 0.95);
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--primary),
      var(--secondary),
      transparent
    );
  }
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoTagline = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const FooterLinksContainer = styled.div`
  display: flex;
  gap: 4rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const FooterLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterLinksTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  font-size: 0.95rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
    transform: translateX(5px);
  }
`;

const FooterDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 3rem 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SocialIcon = styled.div`
  color: var(--text);
`;

export default Footer; 