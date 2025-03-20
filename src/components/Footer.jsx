import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from './logoSVGNomada.svg'; // Importar el logo SVG
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterLogo>
            <LogoContainer
              onClick={() => {
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });  // Desplaza hacia la sección '#home'
              }}
              style={{ cursor: 'pointer' }}  // Cambia el cursor a mano
            >
              <img src={logo} alt='Icono' style={{ width: '9rem', height: 'auto' }} />
            </LogoContainer>
            <LogoTagline>
              Tu comunidad global de viajeros
            </LogoTagline>
          </FooterLogo>

          <FooterLinksContainer>
            <FooterLinksColumn>
              <FooterLinksTitle>Navegación</FooterLinksTitle>
              <FooterLinks>
                <FooterLink href="#features">Características</FooterLink>
                <FooterLink href="#how-it-works">Cómo funciona</FooterLink>
                <FooterLink href="#join">Únete</FooterLink>
                <FooterLink href="#contact">Contacto</FooterLink>
              </FooterLinks>
            </FooterLinksColumn>

            <FooterLinksColumn>
              <FooterLinksTitle>Legal</FooterLinksTitle>
              <FooterLinks>
                <FooterLink href="/privacidad">Privacidad</FooterLink>
                <FooterLink href="/terminos">Términos</FooterLink>
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
              href="https://instagram.com/nomadapp.site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <SocialIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialIcon>
            </SocialLink>

            <SocialLink
              href="https://twitter.com/nomadapp_site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <SocialIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
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
  background: var(--background-secondary);
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.03);
  width: 100%;
  box-sizing: border-box;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 3rem;
  
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
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.5;
`;

const FooterLinksContainer = styled.div`
  display: flex;
  gap: 4rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    justify-content: flex-start;
  }
`;

const FooterLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FooterLinksTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled.a`
  color: var(--text-light);
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const FooterDivider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--text-light),
    transparent
  );
  margin: 2rem 0;
  opacity: 0.2;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--text-light);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer; 