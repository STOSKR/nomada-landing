import { motion } from 'framer-motion';
import styled from 'styled-components';
import useVisitCounter from '../hooks/useVisitCounter';

const VisitCounter = ({ inHero = false }) => {
  const { weeklyVisits, monthlyVisits, loading, dataSource } = useVisitCounter();

  // Si está en la sección Hero, usar un estilo diferente integrado con el mapa
  if (inHero) {
    return (
      <MapCounterContainer>
        <MapCounterTitle>USUARIOS ACTIVOS</MapCounterTitle>
        <MapCounterContent>
          <MapCounterItem>
            <MapCounterNumber>
              {loading ? <LoadingDots><span>.</span><span>.</span><span>.</span></LoadingDots> : weeklyVisits}
            </MapCounterNumber>
            <MapCounterText>ÚLTIMOS 7<br />DÍAS</MapCounterText>
          </MapCounterItem>
          <MapCounterDivider />
          <MapCounterItem>
            <MapCounterNumber>
              {loading ? <LoadingDots><span>.</span><span>.</span><span>.</span></LoadingDots> : monthlyVisits}
            </MapCounterNumber>
            <MapCounterText>ESTE<br />MES</MapCounterText>
          </MapCounterItem>
        </MapCounterContent>
        {import.meta.env.DEV && (
          <DataSourceIndicator source={dataSource}>
            {dataSource === 'firebase' ? 'Datos de Firebase' :
              dataSource === 'fallback' ? 'Valores predeterminados' :
                dataSource === 'error' ? 'Error al cargar datos' : 'Cargando...'}
          </DataSourceIndicator>
        )}
      </MapCounterContainer>
    );
  }

  // Estilo normal para usar en otras secciones
  return (
    <CounterContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CounterTitle>Usuarios Activos</CounterTitle>
      <CounterRow>
        <CounterColumn>
          <CounterSubTitle>Últimos 7 días</CounterSubTitle>
          <CounterValue>
            {loading ? (
              <LoadingDots><span>.</span><span>.</span><span>.</span></LoadingDots>
            ) : (
              <AnimatedNumber>{weeklyVisits}</AnimatedNumber>
            )}
          </CounterValue>
        </CounterColumn>
        <CounterVerticalDivider />
        <CounterColumn>
          <CounterSubTitle>Últimos 30 días</CounterSubTitle>
          <CounterValue>
            {loading ? (
              <LoadingDots><span>.</span><span>.</span><span>.</span></LoadingDots>
            ) : (
              <AnimatedNumber>{monthlyVisits}</AnimatedNumber>
            )}
          </CounterValue>
        </CounterColumn>
      </CounterRow>
      {import.meta.env.DEV && (
        <DataSourceIndicator source={dataSource}>
          {dataSource === 'firebase' ? 'Datos de Firebase' :
            dataSource === 'fallback' ? 'Valores predeterminados' :
              dataSource === 'error' ? 'Error al cargar datos' : 'Cargando...'}
        </DataSourceIndicator>
      )}
    </CounterContainer>
  );
};

// Estilos para el contador en el mapa
const MapCounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MapCounterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MapCounterContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const MapCounterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapCounterDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 0.5rem;
`;

const MapCounterNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  line-height: 1;
`;

const MapCounterText = styled.div`
  font-size: 0.8rem;
  color: var(--text);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Estilos para Hero (mantenemos por compatibilidad)
const HeroStatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.2rem;
`;

const HeroStatText = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 500;
`;

// Estilos para el contador estándar
const CounterContainer = styled.div`
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  color: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  width: 100%;
  max-width: 400px;
`;

const CounterRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CounterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const CounterVerticalDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 1rem;
`;

const CounterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CounterSubTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
`;

const CounterValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  min-height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedNumber = styled.span`
  display: inline-block;
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  
  span {
    animation: dotAnimation 1.4s infinite;
    margin: 0 2px;
    font-size: 1.5rem;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes dotAnimation {
    0% { opacity: 0.2; transform: translateY(0); }
    20% { opacity: 1; transform: translateY(-5px); }
    40% { opacity: 0.2; transform: translateY(0); }
    100% { opacity: 0.2; transform: translateY(0); }
  }
`;

// Nuevo componente para indicar la fuente de datos (solo en desarrollo)
const DataSourceIndicator = styled.div`
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 0.5rem;
  text-align: center;
  background-color: ${({ source }) =>
    source === 'firebase' ? 'rgba(0, 128, 0, 0.1)' :
      source === 'fallback' ? 'rgba(255, 165, 0, 0.1)' :
        source === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ source }) =>
    source === 'firebase' ? 'green' :
      source === 'fallback' ? 'orange' :
        source === 'error' ? 'red' : 'gray'};
`;

export default VisitCounter; 