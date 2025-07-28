import React from 'react';
import styled from 'styled-components';
import { useRemoteModule } from '../hooks/useRemoteModule';
import type { FulfilmentProps } from '../types/mf1-remote-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.125rem;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.125rem;
  color: #dc2626;
  text-align: center;
`;

const RemoteFulfilment = ({ onFulfil, onTrack }: FulfilmentProps) => {
  const { component: Fulfilment, loading, error } = useRemoteModule<FulfilmentProps>({
    url: 'http://localhost:3001/remote-modules/bundle.js',
    moduleName: 'MF1_RemoteModules',
    componentName: 'Fulfilment'
  });

  if (loading) {
    return (
      <LoadingContainer>
        Cargando Fulfilment Center...
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>
          <div>Error cargando Fulfilment Center</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {error}
          </div>
        </div>
      </ErrorContainer>
    );
  }

  if (!Fulfilment) {
    return (
      <ErrorContainer>
        Componente Fulfilment no encontrado
      </ErrorContainer>
    );
  }

  return (
    <Fulfilment 
      onFulfil={onFulfil}
      onTrack={onTrack}
    />
  );
};

export default RemoteFulfilment;