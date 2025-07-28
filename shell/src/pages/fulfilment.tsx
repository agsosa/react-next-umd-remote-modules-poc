import { useState, useEffect } from 'react';
import Head from "next/head";
import styled from 'styled-components';
import RemoteHeader from "../components/RemoteHeader";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.125rem;
  color: #6b7280;
`;

export default function Fulfilment() {
  const [FulfilmentComponent, setFulfilmentComponent] = useState<any>(null);

  useEffect(() => {
    const loadFulfilmentComponent = () => {
      if (window.MF1_Remotes?.Fulfilment) {
        setFulfilmentComponent(() => window.MF1_Remotes.Fulfilment);
        return;
      }

      const script = document.createElement('script');
      script.onload = () => {
        const component = window.MF1_Remotes?.Fulfilment;
        if (component) {
          setFulfilmentComponent(() => component);
        }
      };
      script.src = 'http://localhost:3001/remote-components/bundle.js';
      if (!document.head.querySelector(`script[src="${script.src}"]`)) {
        document.head.appendChild(script);
      }
    };

    loadFulfilmentComponent();
  }, []);

  const handleFulfil = (orderId: string) => {
    console.log('Fulfilling order from shell:', orderId);
    // Aquí podrías hacer una llamada API real
  };

  const handleTrack = (orderId: string) => {
    console.log('Tracking order from shell:', orderId);
    // Aquí podrías abrir una ventana de tracking
  };

  return (
    <>
      <Head>
        <title>Fulfilment Center</title>
        <meta name="description" content="Centro de procesamiento y envío" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <RemoteHeader />
        {FulfilmentComponent ? (
          <FulfilmentComponent 
            onFulfil={handleFulfil}
            onTrack={handleTrack}
          />
        ) : (
          <LoadingContainer>
            Cargando Fulfilment Center...
          </LoadingContainer>
        )}
      </Container>
    </>
  );
}