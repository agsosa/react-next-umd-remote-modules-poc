import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getOrderById, getStatusColor, getStatusLabel, Order } from '../data/orders';
import type { FulfilmentDetailsProps } from '../types/remote-components';

const Container = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin: 2rem 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span<{ status: Order['status'] }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background-color: ${props => getStatusColor(props.status)};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
`;

const Timeline = styled.div`
  margin-bottom: 2rem;
`;

const TimelineItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  opacity: ${props => props.active ? 1 : 0.5};
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const TimelineIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  
  ${props => {
    if (props.completed) {
      return `
        background-color: #10b981;
        color: white;
      `;
    }
    if (props.active) {
      return `
        background-color: #3b82f6;
        color: white;
      `;
    }
    return `
      background-color: #e5e7eb;
      color: #6b7280;
    `;
  }}
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.div`
  font-weight: 500;
  color: #1f2937;
  font-size: 0.875rem;
`;

const TimelineTime = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background-color: #10b981;
    color: white;
    &:hover {
      background-color: #059669;
    }
    &:disabled {
      background-color: #d1d5db;
      cursor: not-allowed;
    }
  ` : `
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

const TrackingInfo = styled.div`
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const TrackingNumber = styled.div`
  font-weight: 600;
  color: #0c4a6e;
  margin-bottom: 0.5rem;
`;

const TrackingDetails = styled.div`
  font-size: 0.875rem;
  color: #075985;
  line-height: 1.5;
`;

const FulfilmentDetails = ({ orderId, onStatusChange }: FulfilmentDetailsProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <Container>
        <SectionTitle>📦 Detalles de Fulfilment</SectionTitle>
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
          Orden no encontrada
        </div>
      </Container>
    );
  }

  const getTimelineSteps = () => {
    const steps = [
      { id: 'pending', label: 'Pendiente', icon: '⏳' },
      { id: 'processing', label: 'En Procesamiento', icon: '⚙️' },
      { id: 'shipped', label: 'Enviado', icon: '🚚' },
      { id: 'delivered', label: 'Entregado', icon: '✅' }
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index < currentIndex,
      active: index === currentIndex,
      time: index <= currentIndex ? formatDate(order.updatedAt) : null
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getDaysInStatus = () => {
    const daysSince = Math.floor(
      (Date.now() - new Date(order.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSince;
  };

  const getPriorityLevel = () => {
    const days = getDaysInStatus();
    if (days >= 3) return { level: 'Alta', color: '#ef4444' };
    if (days >= 1) return { level: 'Media', color: '#f59e0b' };
    return { level: 'Baja', color: '#10b981' };
  };

  const handleFulfil = async () => {
    if (order.status !== 'processing') return;
    
    setProcessing(true);
    console.log(`🚚 Iniciando envío de orden ${order.orderNumber}`);
    
    // Simular proceso de envío
    setTimeout(() => {
      const newTrackingInfo = {
        trackingNumber: `TRK${Date.now().toString().slice(-6)}`,
        carrier: 'Express Logistics',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')
      };
      
      setTrackingInfo(newTrackingInfo);
      setProcessing(false);
      
      console.log(`✅ Orden ${order.orderNumber} enviada con tracking: ${newTrackingInfo.trackingNumber}`);
      
      // Notificar al shell del cambio de estado
      if (onStatusChange) {
        onStatusChange(orderId, 'shipped', newTrackingInfo);
      }
    }, 2000);
  };

  const handleGenerateLabel = () => {
    console.log(`🏷️ Generando etiqueta de envío para ${order.orderNumber}`);
    alert(`Etiqueta de envío generada para:\n${order.customerName}\n${order.shippingAddress.street}\n${order.shippingAddress.city}, ${order.shippingAddress.zipCode}`);
  };

  const priority = getPriorityLevel();

  return (
    <Container>
      <SectionTitle>
        📦 Detalles de Fulfilment
        <StatusBadge status={order.status}>
          {getStatusLabel(order.status)}
        </StatusBadge>
      </SectionTitle>

      <InfoGrid>
        <InfoCard>
          <InfoLabel>Prioridad</InfoLabel>
          <InfoValue style={{ color: priority.color }}>
            {priority.level} ({getDaysInStatus()} días en estado)
          </InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Destino</InfoLabel>
          <InfoValue>{order.shippingAddress.city}, {order.shippingAddress.state}</InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Valor Total</InfoLabel>
          <InfoValue>{formatCurrency(order.total)}</InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Artículos</InfoLabel>
          <InfoValue>{order.items.length} productos</InfoValue>
        </InfoCard>
      </InfoGrid>

      <Timeline>
        <InfoLabel style={{ marginBottom: '1rem' }}>Timeline de Procesamiento</InfoLabel>
        {getTimelineSteps().map((step) => (
          <TimelineItem key={step.id} active={step.active || step.completed}>
            <TimelineIcon 
              active={step.active} 
              completed={step.completed}
            >
              {step.completed ? '✓' : step.icon}
            </TimelineIcon>
            <TimelineContent>
              <TimelineTitle>{step.label}</TimelineTitle>
              {step.time && (
                <TimelineTime>{step.time}</TimelineTime>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {trackingInfo && (
        <TrackingInfo>
          <TrackingNumber>
            📋 Número de Tracking: {trackingInfo.trackingNumber}
          </TrackingNumber>
          <TrackingDetails>
            <div>Transportista: {trackingInfo.carrier}</div>
            <div>Entrega estimada: {trackingInfo.estimatedDelivery}</div>
            <div>Estado: En tránsito hacia {order.shippingAddress.city}</div>
          </TrackingDetails>
        </TrackingInfo>
      )}

      <ActionSection>
        {order.status === 'processing' && (
          <>
            <ActionButton 
              variant="primary" 
              onClick={handleFulfil}
              disabled={processing}
            >
              {processing ? '⏳ Enviando...' : '🚚 Marcar como Enviado'}
            </ActionButton>
            <ActionButton 
              variant="secondary" 
              onClick={handleGenerateLabel}
            >
              🏷️ Generar Etiqueta
            </ActionButton>
          </>
        )}
        
        {order.status === 'shipped' && (
          <ActionButton variant="secondary" onClick={() => console.log('Tracking details')}>
            📦 Ver Detalles de Envío
          </ActionButton>
        )}
      </ActionSection>
    </Container>
  );
};

export default FulfilmentDetails;