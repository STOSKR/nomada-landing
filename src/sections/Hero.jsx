import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Animaciones para los textos
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      }
    })
  };

  // Configuración de THREE.js para la animación de fondo
  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Configurar cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Configurar renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Crear geometría
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Colores para crear un degradado con los nuevos colores pastel
    const color1 = new THREE.Color(0x7FB3D5); // primary
    const color2 = new THREE.Color(0xF7CAC9); // secondary

    // Posición y color de cada partícula
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Posiciones
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 5;

      // Colores
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.001,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    // Objetos de puntos
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Manejar resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animación de interactividad con el ratón
    const mouseEffect = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(particlesMesh.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 2,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', mouseEffect);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseEffect);

      // Limpiar la escena
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <HeroSection id="home">
      <Canvas ref={canvasRef} />
      <BackgroundOverlay />

      <ContentContainer>
        <HeroContent>
          <LeftColumn>
            <TextContainer>
              <Title
                as={motion.h1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                Descubre el mundo
                <TitleGradient> sin límites</TitleGradient>
              </Title>

              <Subtitle
                as={motion.p}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                La red social para viajeros que te permite conectar con otros aventureros,
                descubrir rutas únicas y compartir experiencias inolvidables.
              </Subtitle>

              <ButtonGroup
                as={motion.div}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <PrimaryButton onClick={() => document.querySelector('#join').scrollIntoView({ behavior: 'smooth' })}>
                  Únete a Nómada
                </PrimaryButton>
                <SecondaryButton onClick={() => document.querySelector('#features').scrollIntoView({ behavior: 'smooth' })}>
                  Descubre más
                </SecondaryButton>
              </ButtonGroup>
            </TextContainer>

            <StatsContainer
              as={motion.div}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <StatItem>
                <StatNumber>+10K</StatNumber>
                <StatText>Aventureros</StatText>
              </StatItem>
              <StatDivider />
              <StatItem>
                <StatNumber>+1.5K</StatNumber>
                <StatText>Rutas</StatText>
              </StatItem>
              <StatDivider />
              <StatItem>
                <StatNumber>+120</StatNumber>
                <StatText>Países</StatText>
              </StatItem>
            </StatsContainer>
          </LeftColumn>

          <RightColumn
            as={motion.div}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ImageContainer>
              <FloatingElement top="10%" left="10%" delay={0.2}>
                <CircleDecoration size="60px" color="var(--primary)" opacity={0.2} />
              </FloatingElement>
              <FloatingElement top="70%" left="80%" delay={0.5}>
                <CircleDecoration size="80px" color="var(--secondary)" opacity={0.2} />
              </FloatingElement>
              <FloatingElement top="40%" left="60%" delay={0.8}>
                <CircleDecoration size="40px" color="var(--tertiary)" opacity={0.3} />
              </FloatingElement>

              <WorldMapSVG>
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M400,100 Q550,150 600,300 Q650,450 500,500 Q350,550 200,450 Q50,350 200,200 Q350,50 400,100"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeDasharray="5,5" />
                  <circle cx="400" cy="100" r="8" fill="var(--primary)" />
                  <circle cx="600" cy="300" r="8" fill="var(--secondary)" />
                  <circle cx="500" cy="500" r="8" fill="var(--tertiary)" />
                  <circle cx="200" cy="450" r="8" fill="var(--accent)" />
                  <circle cx="200" cy="200" r="8" fill="var(--primary)" />
                </svg>
              </WorldMapSVG>
            </ImageContainer>
          </RightColumn>
        </HeroContent>

        <ScrollIndicator
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ScrollText>Desliza hacia abajo</ScrollText>
          <ScrollIcon>
            <span></span>
            <span></span>
            <span></span>
          </ScrollIcon>
        </ScrollIndicator>
      </ContentContainer>
    </HeroSection>
  );
};

// Estilos
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(248, 249, 250, 0.7), rgba(248, 249, 250, 0.5));
  z-index: -1;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 7rem 1rem 2rem;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 5rem 1rem 1.5rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 5vh;
  width: 100%;
  
  @media (max-width: 992px) {
    flex-direction: column;
    margin-top: 2vh;
    gap: 2rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  max-width: 55%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  
  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
    gap: 2rem;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  max-width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
    margin-top: 2rem;
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--text);
  width: 100%;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  color: var(--text-light);
  max-width: 550px;
  line-height: 1.6;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px var(--shadow);
  text-align: center;
  cursor: pointer;
  border: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px var(--shadow);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  color: var(--text);
  font-weight: 600;
  border: 2px solid var(--primary);
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(127, 179, 213, 0.1);
    transform: translateY(-3px);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatNumber = styled.span`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatText = styled.span`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    height: 400px;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    max-width: 350px;
  }
`;

const WorldMapSVG = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingElement = styled.div`
  position: absolute;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const CircleDecoration = styled.div`
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  border-radius: 50%;
  background-color: ${props => props.color || 'var(--primary)'};
  opacity: ${props => props.opacity || 0.2};
`;

const ScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ScrollText = styled.span`
  font-size: 0.85rem;
  color: var(--text-light);
  opacity: 0.7;
`;

const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid var(--text-light);
  border-radius: 20px;
  position: relative;
  
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: var(--text);
    border-radius: 50%;
    
    &:nth-child(1) {
      top: 10px;
      animation: scrollAnim 1.5s ease-out infinite;
    }
    
    &:nth-child(2) {
      top: 20px;
      animation: scrollAnim 1.5s ease-out infinite;
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      top: 30px;
      animation: scrollAnim 1.5s ease-out infinite;
      animation-delay: 0.4s;
    }
  }
  
  @keyframes scrollAnim {
    0% {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
  }
`;

export default Hero; 