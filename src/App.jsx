import { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Secciones
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Team from './sections/Team';
import JoinNow from './sections/JoinNow';

function App() {
  // Efecto para precargar las fuentes de Google
  useEffect(() => {
    // Cargar fuentes de Google
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

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
      </MainContent>
      <Footer />
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
