import { useState } from 'react';
import styled from 'styled-components';
import { mockOrders, getStatusColor, getStatusLabel, Order } from '../data/orders';
import type { FulfilmentProps } from '../types/remote-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Section = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
`;

const FulfilmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
  
  th {
    text-align: left;
    padding: 1rem;
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #1f2937;
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

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;
  
  ${props => props.variant === 'primary' ? `
    background-color: #10b981;
    color: white;
    &:hover {
      background-color: #059669;
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

const PriorityTag = styled.span<{ priority: 'high' | 'medium' | 'low' }>`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.priority) {
      case 'high':
        return 'background-color: #fef2f2; color: #dc2626;';
      case 'medium':
        return 'background-color: #fffbeb; color: #d97706;';
      case 'low':
        return 'background-color: #f0fdf4; color: #16a34a;';
    }
  }}
`;


const Fulfilment = ({ onFulfil, onTrack }: FulfilmentProps) => {
  const [selectedStatus, setSelectedStatus] = useState<'processing' | 'shipped'>('processing');
  const [orders, setOrders] = useState(mockOrders);

  const fulfilmentOrders = orders.filter(order => 
    order.status === 'processing' || order.status === 'shipped'
  );

  const processingOrders = fulfilmentOrders.filter(order => order.status === 'processing');
  const shippedOrders = fulfilmentOrders.filter(order => order.status === 'shipped');

  const displayOrders = selectedStatus === 'processing' ? processingOrders : shippedOrders;

  const totalRevenue = fulfilmentOrders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = fulfilmentOrders.length > 0 ? totalRevenue / fulfilmentOrders.length : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriority = (order: Order): 'high' | 'medium' | 'low' => {
    const daysSinceOrder = Math.floor(
      (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceOrder >= 3) return 'high';
    if (daysSinceOrder >= 1) return 'medium';
    return 'low';
  };

  const handleFulfil = (orderId: string) => {
    // Encontrar la orden en el estado local
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'processing') {
      console.log(`🚚 Enviando orden ${order.orderNumber} a ${order.shippingAddress.city}`);
      
      // Simular cambio de estado (en una app real, esto sería una llamada API)
      setTimeout(() => {
        // Actualizar el estado local para cambiar la orden a 'shipped'
        setOrders(prevOrders => 
          prevOrders.map(o => 
            o.id === orderId 
              ? { ...o, status: 'shipped' as const, updatedAt: new Date().toISOString() }
              : o
          )
        );
        
        console.log(`✅ Orden ${order.orderNumber} marcada como enviada`);
        alert(`Orden ${order.orderNumber} enviada exitosamente a ${order.customerName}`);
        
        // Notificar al shell si hay callback
        if (onFulfil) {
          onFulfil(orderId);
        }
      }, 1000);
    }
  };

  const handleTrack = (orderId: string) => {
    // Simular tracking de órdenes enviadas
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'shipped') {
      console.log(`📦 Rastreando orden ${order.orderNumber}`);
      
      // Generar número de tracking simulado
      const trackingNumber = `TRK${Date.now().toString().slice(-6)}`;
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
      
      setTimeout(() => {
        const trackingInfo = {
          trackingNumber,
          status: 'En tránsito',
          location: 'Centro de distribución Madrid',
          estimatedDelivery: estimatedDelivery.toLocaleDateString('es-ES')
        };
        
        console.log('📋 Información de tracking:', trackingInfo);
        alert(`Tracking: ${trackingNumber}\nEstado: ${trackingInfo.status}\nUbicación: ${trackingInfo.location}\nEntrega estimada: ${trackingInfo.estimatedDelivery}`);
        
        // Notificar al shell si hay callback
        if (onTrack) {
          onTrack(orderId);
        }
      }, 800);
    }
  };

  return (
    <Container>
      <PageTitle>Fulfilment Center</PageTitle>
      
      <StatsSection>
        <StatCard>
          <StatNumber>{processingOrders.length}</StatNumber>
          <StatLabel>Órdenes en Procesamiento</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{shippedOrders.length}</StatNumber>
          <StatLabel>Órdenes Enviadas</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{formatCurrency(totalRevenue)}</StatNumber>
          <StatLabel>Ingresos Totales</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{formatCurrency(avgOrderValue)}</StatNumber>
          <StatLabel>Valor Promedio</StatLabel>
        </StatCard>
      </StatsSection>

      <Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <SectionTitle>
            {selectedStatus === 'processing' ? 'Órdenes para Procesar' : 'Órdenes Enviadas'}
          </SectionTitle>
          <div>
            <ActionButton 
              variant={selectedStatus === 'processing' ? 'primary' : 'secondary'}
              onClick={() => setSelectedStatus('processing')}
            >
              Procesamiento ({processingOrders.length})
            </ActionButton>
            <ActionButton 
              variant={selectedStatus === 'shipped' ? 'primary' : 'secondary'}
              onClick={() => setSelectedStatus('shipped')}
            >
              Enviados ({shippedOrders.length})
            </ActionButton>
          </div>
        </div>
        
        <FulfilmentTable>
          <TableHeader>
            <tr>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </TableHeader>
          <tbody>
            {displayOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div style={{ fontWeight: '600' }}>{order.orderNumber}</div>
                </TableCell>
                <TableCell>
                  <div style={{ fontWeight: '500' }}>{order.customerName}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {order.shippingAddress.city}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status}>
                    {getStatusLabel(order.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <PriorityTag priority={getPriority(order)}>
                    {getPriority(order) === 'high' ? 'Alta' : 
                     getPriority(order) === 'medium' ? 'Media' : 'Baja'}
                  </PriorityTag>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <div style={{ fontWeight: '600' }}>{formatCurrency(order.total)}</div>
                </TableCell>
                <TableCell>
                  {order.status === 'processing' ? (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleFulfil(order.id)}
                    >
                      Enviar
                    </ActionButton>
                  ) : (
                    <ActionButton 
                      variant="secondary" 
                      onClick={() => handleTrack(order.id)}
                    >
                      Rastrear
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </FulfilmentTable>
      </Section>
    </Container>
  );
};

export default Fulfilment;