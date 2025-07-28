import Head from "next/head";
import styled from 'styled-components';
import RemoteHeader from "../components/RemoteHeader";
import RemoteFulfilment from "../components/RemoteFulfilment";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

export default function Fulfilment() {
  const handleFulfil = (orderId: string) => {
    console.log('Shell App: Orden procesada para envío:', orderId);
  };

  const handleTrack = (orderId: string) => {
    console.log('Shell App: Solicitud de tracking desde:', orderId);
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
        <RemoteFulfilment 
          onFulfil={handleFulfil}
          onTrack={handleTrack}
        />
      </Container>
    </>
  );
}