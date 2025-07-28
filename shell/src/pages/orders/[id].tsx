import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getOrderById, getStatusColor, getStatusLabel } from '../../data/orders';
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const OrderHeader = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const OrderHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const OrderNumber = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: ${props => getStatusColor(props.status as any)};
`;

const OrderMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const MetaItem = styled.div`
  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  p {
    font-size: 1rem;
    color: #1f2937;
    margin: 0;
  }
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

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  th {
    text-align: left;
    padding: 0.75rem 0;
    border-bottom: 2px solid #e5e7eb;
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const TableCell = styled.td`
  padding: 1rem 0;
  color: #1f2937;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #1f2937;
`;

const ItemPrice = styled.div`
  font-weight: 600;
`;

const TotalSection = styled.div`
  border-top: 2px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &.total {
    font-size: 1.25rem;
    font-weight: bold;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const Address = styled.div`
  p {
    margin: 0 0 0.25rem 0;
    color: #374151;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  
  p {
    font-size: 1rem;
  }
`;

const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const order = id ? getOrderById(id as string) : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
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

  if (!order) {
    return (
      <Container>
        <RemoteHeader />
        <Content>
          <BackButton onClick={() => router.push('/orders')}>
            ← Volver a Órdenes
          </BackButton>
          <NotFound>
            <h2>Orden no encontrada</h2>
            <p>La orden solicitada no existe o ha sido eliminada.</p>
          </NotFound>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <RemoteHeader />
      <Content>
        <BackButton onClick={() => router.push('/orders')}>
          ← Volver a Órdenes
        </BackButton>
        
        <PageTitle>Detalle de Orden</PageTitle>
        
        <OrderHeader>
          <OrderHeaderTop>
            <OrderNumber>{order.orderNumber}</OrderNumber>
            <StatusBadge status={order.status}>
              {getStatusLabel(order.status)}
            </StatusBadge>
          </OrderHeaderTop>
          
          <OrderMeta>
            <MetaItem>
              <h3>Cliente</h3>
              <p>{order.customerName}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {order.customerEmail}
              </p>
            </MetaItem>
            <MetaItem>
              <h3>Fecha de Creación</h3>
              <p>{formatDate(order.createdAt)}</p>
            </MetaItem>
            <MetaItem>
              <h3>Última Actualización</h3>
              <p>{formatDate(order.updatedAt)}</p>
            </MetaItem>
            <MetaItem>
              <h3>Total</h3>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {formatCurrency(order.total)}
              </p>
            </MetaItem>
          </OrderMeta>
        </OrderHeader>

        <Section>
          <SectionTitle>Artículos Pedidos</SectionTitle>
          <ItemsTable>
            <TableHeader>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </TableHeader>
            <tbody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <ItemName>{item.name}</ItemName>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                  </TableCell>
                  <TableCell style={{ textAlign: 'right' }}>
                    <ItemPrice>{formatCurrency(item.price * item.quantity)}</ItemPrice>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </ItemsTable>
          
          <TotalSection>
            <TotalRow>
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </TotalRow>
            <TotalRow>
              <span>Impuestos:</span>
              <span>{formatCurrency(order.tax)}</span>
            </TotalRow>
            <TotalRow>
              <span>Envío:</span>
              <span>{formatCurrency(order.shipping)}</span>
            </TotalRow>
            <TotalRow className="total">
              <span>Total:</span>
              <span>{formatCurrency(order.total)}</span>
            </TotalRow>
          </TotalSection>
        </Section>

        <Section>
          <SectionTitle>Dirección de Envío</SectionTitle>
          <Address>
            <p><strong>{order.customerName}</strong></p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p>{order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </Address>
        </Section>
      </Content>
    </Container>
  );
};

export default OrderDetailPage;