import { createGlobalStyle } from 'styled-components';

// Archivo de estilos globales para toda la aplicación
const GlobalStyles = createGlobalStyle`
  /* Variables de colores y tipografía */
  :root {
    /* Colores principales */
    --background: #080808;
    --primary: #23D997;
    --secondary: #F05454;
    --tertiary: #30475E;
    --text: #F8F8F8;
    --text-secondary: #B1B1B1;
    
    /* Fuentes */
    --font-primary: 'Sora', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    background-color: var(--background);
    color: var(--text);
    overflow-x: hidden;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    letter-spacing: -1px;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 1.1;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.2;
  }

  p {
    font-family: var(--font-secondary);
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: var(--font-primary);
  }

  /* Estilos para animaciones suaves */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.8s forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Estilos para scroll */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
  }

  /* Clases de utilidad */
  .container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section {
    min-height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    scroll-snap-align: start;
    padding: 5rem 0;
  }

  .text-gradient {
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default GlobalStyles; 