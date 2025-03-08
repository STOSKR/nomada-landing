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
import JoinNow from './sections/JoinNow';

function App() {
  // Efecto para precargar las fuentes de Google
  useEffect(() => {
    // Cargar fuentes de Google
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap';
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
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <JoinNow />
      </main>
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export default App;
