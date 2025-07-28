import Head from "next/head";
import styled from 'styled-components';
import Header from "../RemoteModules/Header";
import Fulfilment from "../RemoteModules/Fulfilment";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

export default function FulfilmentPage() {
  const handleFulfil = (orderId: string) => {
    console.log('🏭 MF1 Fulfilment Page: Orden procesada:', orderId);
    alert(`MF1 Fulfilment: Orden ${orderId} enviada desde página dedicada`);
  };

  const handleTrack = (orderId: string) => {
    console.log('🔍 MF1 Fulfilment Page: Tracking solicitado:', orderId);
    alert(`MF1 Fulfilment: Tracking para orden ${orderId} desde página dedicada`);
  };

  return (
    <>
      <Head>
        <title>MF1 - Fulfilment Center</title>
        <meta name="description" content="Centro de procesamiento y envío" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header appName="MF1 - Fulfilment Center" />
        <Fulfilment 
          onFulfil={handleFulfil}
          onTrack={handleTrack}
        />
      </Container>
    </>
  );
}