import { createGlobalStyle } from 'styled-components';

// Archivo de estilos globales para toda la aplicación
const GlobalStyles = createGlobalStyle`
  /* Variables de colores y tipografía */
  :root {
    /* Colores pastel con fondo más suave */
    --background: #F8F9FA;
    --background-secondary: #EDF2F7;
    --primary: #7FB3D5;
    --secondary: #F7CAC9;
    --tertiary: #B3E0F2;
    --accent: #D7BDE2;
    --text: #444444;
    --text-light: #777777;
    --shadow: rgba(0, 0, 0, 0.05);
    
    /* Fuentes */
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
    font-family: var(--font-primary);
    background-color: var(--background);
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(123, 179, 213, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 50%, rgba(247, 202, 201, 0.07) 0%, transparent 25%),
      radial-gradient(circle at 50% 80%, rgba(179, 224, 242, 0.05) 0%, transparent 20%);
    background-attachment: fixed;
    color: var(--text);
    overflow-x: hidden;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    color: var(--text);
    line-height: 1.25;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--secondary);
    }
  }

  button, .button {
    font-family: var(--font-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    border: none;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px var(--shadow);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px var(--shadow);
    }
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
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .content-wrapper {
    width: 100%;
    margin: 0;
    padding: 0 0rem;
    box-sizing: border-box;
  }

  .section {
    padding: 6rem 0;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .flex {
    display: flex;
  }

  .grid {
    display: grid;
  }

  .text-center {
    text-align: center;
  }

  /* Media queries globales */
  @media (max-width: 1200px) {
    html {
      font-size: 15px;
    }
  }
  
  @media (max-width: 992px) {
    html {
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    html {
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }
  }
`;

export default GlobalStyles; 