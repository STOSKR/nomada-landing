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

        // Colores para crear un degradado
        const color1 = new THREE.Color(0x23D997); // primary
        const color2 = new THREE.Color(0xF05454); // secondary

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

            <ContentContainer>
                <HeroContent>
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
                            <PrimaryButton>Únete a Nómada</PrimaryButton>
                            <SecondaryButton>Descubre más</SecondaryButton>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 7rem 1rem 0;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 10vh;
  
  @media (max-width: 768px) {
    margin-top: 5vh;
    gap: 2rem;
  }
`;

const TextContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const TitleGradient = styled.span`
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
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
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
  
  &:hover {
    background: rgba(35, 217, 151, 0.1);
    transform: translateY(-3px);
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
  color: var(--text-secondary);
`;

const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  
  @media (max-width: 480px) {
    display: none;
  }
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
  color: var(--text-secondary);
  opacity: 0.7;
`;

const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid var(--text-secondary);
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