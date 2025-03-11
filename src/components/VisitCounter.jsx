import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getDatabase, ref, onValue, increment, update, serverTimestamp, get } from 'firebase/database';

const VisitCounter = ({ inHero = false }) => {
    const [totalVisits, setTotalVisits] = useState(0);
    const [todayVisits, setTodayVisits] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Referencia a la base de datos de Firebase
        const db = getDatabase();
        const totalVisitsRef = ref(db, 'statistics/visits/total');

        // Obtener la fecha actual en formato YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        const todayVisitsRef = ref(db, `statistics/visits/daily/${today}`);

        // Incrementar contador total
        update(ref(db, 'statistics/visits'), {
            'total': increment(1),
            [`daily/${today}`]: increment(1),
            'lastUpdated': serverTimestamp()
        });

        // Escuchar cambios en los contadores
        const unsubscribeTotal = onValue(totalVisitsRef, (snapshot) => {
            const data = snapshot.val() || 0;
            setTotalVisits(data);
            setIsLoading(false);
        });

        const unsubscribeToday = onValue(todayVisitsRef, (snapshot) => {
            const data = snapshot.val() || 0;
            setTodayVisits(data);
        });

        // Limpiar listeners al desmontar
        return () => {
            unsubscribeTotal();
            unsubscribeToday();
        };
    }, []);

    // Si está en la sección Hero, usar un estilo diferente integrado con el mapa
    if (inHero) {
        return (
            <MapCounterContainer>
                <MapCounterTitle>Visitante</MapCounterTitle>
                <MapCounterContent>
                    <MapCounterItem>
                        <MapCounterNumber>
                            {isLoading ? (
                                <LoadingDots>
                                    <span>.</span><span>.</span><span>.</span>
                                </LoadingDots>
                            ) : (
                                todayVisits.toLocaleString('es-ES')
                            )}
                        </MapCounterNumber>
                        <MapCounterText>Hoy</MapCounterText>
                    </MapCounterItem>
                    <MapCounterDivider />
                    <MapCounterItem>
                        <MapCounterNumber>
                            {isLoading ? (
                                <LoadingDots>
                                    <span>.</span><span>.</span><span>.</span>
                                </LoadingDots>
                            ) : (
                                totalVisits.toLocaleString('es-ES')
                            )}
                        </MapCounterNumber>
                        <MapCounterText>Total</MapCounterText>
                    </MapCounterItem>
                </MapCounterContent>
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
            <CounterTitle>Visitante</CounterTitle>
            <CounterRow>
                <CounterColumn>
                    <CounterSubTitle>Visitas hoy</CounterSubTitle>
                    <CounterValue>
                        {isLoading ? (
                            <LoadingDots>
                                <span>.</span><span>.</span><span>.</span>
                            </LoadingDots>
                        ) : (
                            <AnimatedNumber>{todayVisits.toLocaleString('es-ES')}</AnimatedNumber>
                        )}
                    </CounterValue>
                </CounterColumn>
                <CounterVerticalDivider />
                <CounterColumn>
                    <CounterSubTitle>Visitas totales</CounterSubTitle>
                    <CounterValue>
                        {isLoading ? (
                            <LoadingDots>
                                <span>.</span><span>.</span><span>.</span>
                            </LoadingDots>
                        ) : (
                            <AnimatedNumber>{totalVisits.toLocaleString('es-ES')}</AnimatedNumber>
                        )}
                    </CounterValue>
                </CounterColumn>
            </CounterRow>
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

export default VisitCounter; 