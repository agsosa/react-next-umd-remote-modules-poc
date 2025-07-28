import React from 'react';
import styled from 'styled-components';
import { useRemoteModule } from '../hooks/useRemoteModule';
import type { FulfilmentDetailsProps } from '../types/mf1-remote-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
  color: #dc2626;
  text-align: center;
`;

const RemoteFulfilmentDetails = ({ orderId, onStatusChange }: FulfilmentDetailsProps) => {
  const { component: FulfilmentDetailsComponent, loading, error } = useRemoteModule<FulfilmentDetailsProps>({
    url: 'http://localhost:3001/remote-modules/bundle.js',
    moduleName: 'MF1_RemoteModules',
    componentName: 'FulfilmentDetails'
  });

  if (loading) {
    return (
      <LoadingContainer>
        Cargando detalles de fulfilment...
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>
          <div>Error cargando detalles de fulfilment</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {error}
          </div>
        </div>
      </ErrorContainer>
    );
  }

  if (!FulfilmentDetailsComponent) {
    return (
      <ErrorContainer>
        Componente FulfilmentDetails no encontrado
      </ErrorContainer>
    );
  }

  return (
    <FulfilmentDetailsComponent 
      orderId={orderId}
      onStatusChange={onStatusChange}
    />
  );
};

export default RemoteFulfilmentDetails;