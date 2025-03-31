import { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { Analytics } from '@vercel/analytics/react';
import { trackPageView } from './services/firebaseAnalyticsService';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Secciones
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Team from './sections/Team';
import JoinNow from './sections/JoinNow';
import Contact from './sections/Contact';

function App() {
  // Efecto para precargar las fuentes de Google y registrar evento de analíticas
  useEffect(() => {
    // Cargar fuentes de Google
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    // Registrar visita en Firebase Analytics (solo evento, no contador)
    trackPageView('home');

    // Limpiar al desmontar
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <AppContainer>
      <GlobalStyles />
      <Navbar />
      <MainContent>
        <Hero />
        <Features />
        <HowItWorks />
        <Team />
        <JoinNow />
        <Contact />
      </MainContent>
      <Footer />
      <Analytics />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const MainContent = styled.main`
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
`;

export default App;
