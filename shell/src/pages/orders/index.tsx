import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { mockOrders, getStatusColor, getStatusLabel, Order } from '../../data/orders';
import RemoteHeader from '../../components/RemoteHeader';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Content = styled.main`
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

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: ${props => props.active ? '#2563eb' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#1d4ed8' : '#f3f4f6'};
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const OrderNumber = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: Order['status'] }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: ${props => getStatusColor(props.status)};
  margin-left: auto;
`;

const CustomerInfo = styled.div`
  margin-bottom: 1rem;
`;

const CustomerName = styled.p`
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.25rem 0;
`;

const CustomerEmail = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ItemCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const TotalAmount = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
`;

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | Order['status']>('all');

  const filteredOrders = selectedStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedStatus);

  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  return (
    <Container>
      <RemoteHeader />
      <Content>
        <PageTitle>Order Management System</PageTitle>
        
        <FilterSection>
          <FilterButton
            active={selectedStatus === 'all'}
            onClick={() => setSelectedStatus('all')}
          >
            Todos ({statusCounts.all})
          </FilterButton>
          <FilterButton
            active={selectedStatus === 'pending'}
            onClick={() => setSelectedStatus('pending')}
          >
            Pendientes ({statusCounts.pending})
          </FilterButton>
          <FilterButton
            active={selectedStatus === 'processing'}
            onClick={() => setSelectedStatus('processing')}
          >
            Procesando ({statusCounts.processing})
          </FilterButton>
          <FilterButton
            active={selectedStatus === 'shipped'}
            onClick={() => setSelectedStatus('shipped')}
          >
            Enviados ({statusCounts.shipped})
          </FilterButton>
          <FilterButton
            active={selectedStatus === 'delivered'}
            onClick={() => setSelectedStatus('delivered')}
          >
            Entregados ({statusCounts.delivered})
          </FilterButton>
          <FilterButton
            active={selectedStatus === 'cancelled'}
            onClick={() => setSelectedStatus('cancelled')}
          >
            Cancelados ({statusCounts.cancelled})
          </FilterButton>
        </FilterSection>

        {filteredOrders.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>No hay órdenes</EmptyTitle>
            <EmptyDescription>
              No se encontraron órdenes con el filtro seleccionado.
            </EmptyDescription>
          </EmptyState>
        ) : (
          <OrdersGrid>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderNumber>{order.orderNumber}</OrderNumber>
                  <StatusBadge status={order.status}>
                    {getStatusLabel(order.status)}
                  </StatusBadge>
                </OrderHeader>
                
                <CustomerInfo>
                  <CustomerName>{order.customerName}</CustomerName>
                  <CustomerEmail>{order.customerEmail}</CustomerEmail>
                </CustomerInfo>

                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                  Creado: {formatDate(order.createdAt)}
                </div>

                <OrderSummary>
                  <ItemCount>
                    {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
                  </ItemCount>
                  <TotalAmount>{formatCurrency(order.total)}</TotalAmount>
                </OrderSummary>

                <ViewButton href={`/orders/${order.id}`}>
                  Ver Detalle
                </ViewButton>
              </OrderCard>
            ))}
          </OrdersGrid>
        )}
      </Content>
    </Container>
  );
};

export default OrdersPage;