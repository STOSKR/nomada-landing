import styled from 'styled-components';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <ContactSection id="contact">
      <BackgroundDecoration />
      <ContentContainer>
        <TextContainer
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTag>Contacto</SectionTag>
          <Title>¿Tienes alguna <TitleGradient>pregunta</TitleGradient>?</Title>
          <Description>
            Estamos aquí para ayudarte. Si tienes alguna duda sobre Nómada,
            sugerencias o simplemente quieres saludarnos, no dudes en escribirnos.
            Te responderemos lo antes posible.
          </Description>
        </TextContainer>

        <ContactContainer
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FormWrapper>
            <ContactForm />
          </FormWrapper>

          <ContactInfo>
            <InfoTitle>Otras formas de contacto</InfoTitle>
            <InfoText>
              También puedes encontrarnos en nuestras redes sociales o enviarnos un email directamente.
            </InfoText>

            <ContactMethods>
              <ContactMethod>
                <IconWrapper>
                  <FaEnvelope />
                </IconWrapper>
                <ContactMethodText>
                  <ContactMethodTitle>Email</ContactMethodTitle>
                  <ContactMethodValue href="mailto:info@nomadapp.site">info@nomadapp.site</ContactMethodValue>
                </ContactMethodText>
              </ContactMethod>

              <ContactMethod>
                <IconWrapper>
                  <FaPhoneAlt />
                </IconWrapper>
                <ContactMethodText>
                  <ContactMethodTitle>Teléfono</ContactMethodTitle>
                  <ContactMethodValue href="tel:+34600000000">+34 600 000 000</ContactMethodValue>
                </ContactMethodText>
              </ContactMethod>

              <ContactMethod>
                <IconWrapper>
                  <FaMapMarkerAlt />
                </IconWrapper>
                <ContactMethodText>
                  <ContactMethodTitle>Ubicación</ContactMethodTitle>
                  <ContactMethodValue as="span">Madrid, España</ContactMethodValue>
                </ContactMethodText>
              </ContactMethod>
            </ContactMethods>

            <SocialLinksContainer>
              <SocialLinksTitle>Síguenos</SocialLinksTitle>
              <SocialLinks>
                <SocialLink href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </SocialLink>
                <SocialLink href="https://twitter.com/tu-usuario" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </SocialLink>
              </SocialLinks>
            </SocialLinksContainer>
          </ContactInfo>
        </ContactContainer>
      </ContentContainer>
    </ContactSection>
  );
};

// Estilos
const ContactSection = styled.section`
  padding: 8rem 0;
  background-color: #eff5fb;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(123, 179, 213, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(247, 202, 201, 0.1) 0%, transparent 40%);
  z-index: 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 1;
`;

const TextContainer = styled.div`
  text-align: center;
  max-width: 700px;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(247, 202, 201, 0.2);
  color: #d07f7e;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 10px rgba(247, 202, 201, 0.2);
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
  color: #444;
  font-weight: 700;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, #7FB3D5, #F7CAC9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 3.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
    padding: 2.5rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(247, 202, 201, 0.08), rgba(123, 179, 213, 0.08));
  border-radius: 15px;
  border: 1px solid rgba(123, 179, 213, 0.1);
  backdrop-filter: blur(10px);
`;

const InfoTitle = styled.h3`
  font-size: 1.6rem;
  color: #444;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const InfoText = styled.p`
  font-size: 1.05rem;
  color: #666;
  line-height: 1.6;
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(123, 179, 213, 0.2), rgba(247, 202, 201, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7FB3D5;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ContactMethodText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactMethodTitle = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.2rem;
`;

const ContactMethodValue = styled.a`
  font-size: 1.05rem;
  color: #444;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #7FB3D5;
  }
`;

const SocialLinksContainer = styled.div`
  margin-top: auto;
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
  color: #7FB3D5;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    color: white;
    background: linear-gradient(to right, #7FB3D5, #F7CAC9);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(123, 179, 213, 0.3);
  }
`;

export default Contact;