import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from './LogoSVGNomada.svg'; // Importar el logo SVG
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaDiscord, FaCopy } from 'react-icons/fa';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animaciones para el menú
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const navLinks = [
    { title: 'Inicio', href: '#home' },
    { title: 'Características', href: '#features' },
    { title: 'Cómo funciona', href: '#how-it-works' },
    { title: 'Equipo', href: '#team' },
    { title: 'Únete', href: '#join' },
    { title: 'Contacto', href: '#contact' },
  ];

  return (
    <NavContainer
      as={motion.nav}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      scroll={scroll}
    >
      <NavWrapper>
        <LogoContainer>
          <img src={logo} alt='Icono' style={{ width: "10rem", height: "auto" }}/>
        </LogoContainer>

        <NavItems>
          {navLinks.map((link, index) => (
            <NavItem key={index}>
              <NavLink href={link.href}>
                {link.title}
                <NavLinkLine />
              </NavLink>
            </NavItem>
          ))}
        <ButtonContainer>
          <JoinButton onClick={() => document.querySelector('#join').scrollIntoView({ behavior: 'smooth' })}>
            Únete
          </JoinButton>

          <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon $open={menuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </MenuIcon>
          </MenuButton>
        </ButtonContainer>
        </NavItems>


        <SocialLinksContainer>
        <SocialLinks>
          <SocialLink href="https://www.instagram.com/nomada.svg/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/nomada-app-8b324a356/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="https://discord.gg/43Y4kMbpvy" target="_blank" rel="noopener noreferrer">
            <FaDiscord />
          </SocialLink>
        </SocialLinks>
      </SocialLinksContainer>
      </NavWrapper>


      {/* Menú móvil */}
      <MobileMenu
        as={motion.div}
        variants={menuVariants}
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
      >
        {navLinks.map((link, index) => (
          <MobileNavItem key={index}>
            <MobileNavLink
              href={link.href}
              onClick={() => {
                setMenuOpen(false);
                document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.title}
            </MobileNavLink>
          </MobileNavItem>
        ))}
        <MobileJoinButton onClick={() => {
          setMenuOpen(false);
          document.querySelector('#join').scrollIntoView({ behavior: 'smooth' });
        }}>
          Únete
        </MobileJoinButton>
      </MobileMenu>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {menuOpen && (
        <Overlay
          onClick={() => setMenuOpen(false)}
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </NavContainer>
  );
};
const SocialLinksContainer = styled.div`
`;

const SocialLinksTitle = styled.h4`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const SocialLink = styled.a`
  color: #331b3b;
  font-size: 1.7rem;
  transition: all 0.3s ease;
  width: 50px; /* Ajusta el ancho del óvalo */
  height: 55px; /* Ajusta la altura del óvalo */
  border: 2px solid #7d6d82;
  border-radius: 70% 40% 70% 40%; /* Curvaturas de arriba a abajo (más inclinada en la parte superior derecha y inferior izquierda) */
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-3px) rotate(-15deg); /* Mantiene la inclinación al hacer hover */
  }
`;

// Estilos
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: ${props => props.scroll ? '0.8rem 0' : '1.5rem 0'};
  background: ${props => props.scroll ? 'rgba(248, 249, 250, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scroll ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.scroll ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'};
  box-sizing: border-box;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 5rem;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const NavItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  position: relative;
  font-size: 1.3rem;
  font-weight: 500;
  color: #212832;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const NavLinkLine = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  transition: width 0.3s ease;
  
  ${NavLink}:hover & {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const JoinButton = styled.button`
  padding: 0.7rem 1.5rem;
  color: #212832;
  font-size: 1.3rem;
  border: 1.5px solid #212832;
  background: transparent;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px var(--shadow);
    border: 1.5px solid #212832;
    background-color: #FFFFFFFF;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 30px;
  height: 25px;
  position: relative;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: ${props => props.$open ? 'transparent' : 'var(--text)'};
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      top: 0;
      transform: ${props => props.$open ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
      background: ${props => props.$open ? 'var(--text)' : ''};
    }
    
    &:nth-child(2) {
      top: 10px;
      opacity: ${props => props.$open ? 0 : 1};
    }
    
    &:nth-child(3) {
      top: 20px;
      transform: ${props => props.$open ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
      background: ${props => props.$open ? 'var(--text)' : ''};
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: var(--background);
  backdrop-filter: blur(10px);
  padding: 7rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  z-index: 999;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavItem = styled.div`
  margin-bottom: 1.5rem;
`;

const MobileNavLink = styled.a`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const MobileJoinButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 1.8rem;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  border-radius: 30px;
  align-self: flex-start;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px var(--shadow);
  }
`;

export default Navbar; 