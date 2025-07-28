export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerId: 'cust-001',
    customerName: 'Juan Pérez',
    customerEmail: 'juan.perez@email.com',
    status: 'shipped',
    items: [
      { id: 'item-1', name: 'Laptop Gaming RGB', quantity: 1, price: 1299.99 },
      { id: 'item-2', name: 'Mouse Inalámbrico', quantity: 2, price: 49.99 }
    ],
    subtotal: 1399.97,
    tax: 111.98,
    shipping: 15.00,
    total: 1526.95,
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-16T14:20:00Z',
    shippingAddress: {
      street: 'Calle Principal 123',
      city: 'Madrid',
      state: 'Madrid',
      zipCode: '28001',
      country: 'España'
    }
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerId: 'cust-002',
    customerName: 'María García',
    customerEmail: 'maria.garcia@email.com',
    status: 'processing',
    items: [
      { id: 'item-3', name: 'Smartphone Pro Max', quantity: 1, price: 999.99 },
      { id: 'item-4', name: 'Funda Protectora', quantity: 1, price: 29.99 },
      { id: 'item-5', name: 'Cargador Rápido', quantity: 1, price: 39.99 }
    ],
    subtotal: 1069.97,
    tax: 85.60,
    shipping: 10.00,
    total: 1165.57,
    createdAt: '2025-01-14T16:45:00Z',
    updatedAt: '2025-01-15T09:15:00Z',
    shippingAddress: {
      street: 'Avenida Libertad 456',
      city: 'Barcelona',
      state: 'Cataluña',
      zipCode: '08001',
      country: 'España'
    }
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    customerId: 'cust-003',
    customerName: 'Carlos López',
    customerEmail: 'carlos.lopez@email.com',
    status: 'delivered',
    items: [
      { id: 'item-6', name: 'Auriculares Bluetooth', quantity: 1, price: 149.99 },
      { id: 'item-7', name: 'Altavoz Portátil', quantity: 1, price: 79.99 }
    ],
    subtotal: 229.98,
    tax: 18.40,
    shipping: 5.00,
    total: 253.38,
    createdAt: '2025-01-12T11:20:00Z',
    updatedAt: '2025-01-14T13:45:00Z',
    shippingAddress: {
      street: 'Plaza Central 789',
      city: 'Valencia',
      state: 'Valencia',
      zipCode: '46001',
      country: 'España'
    }
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-004',
    customerId: 'cust-004',
    customerName: 'Ana Martínez',
    customerEmail: 'ana.martinez@email.com',
    status: 'pending',
    items: [
      { id: 'item-8', name: 'Tablet 10 pulgadas', quantity: 1, price: 299.99 },
      { id: 'item-9', name: 'Teclado Bluetooth', quantity: 1, price: 69.99 }
    ],
    subtotal: 369.98,
    tax: 29.60,
    shipping: 8.00,
    total: 407.58,
    createdAt: '2025-01-16T09:10:00Z',
    updatedAt: '2025-01-16T09:10:00Z',
    shippingAddress: {
      street: 'Calle Nueva 321',
      city: 'Sevilla',
      state: 'Andalucía',
      zipCode: '41001',
      country: 'España'
    }
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-005',
    customerId: 'cust-005',
    customerName: 'David Rodríguez',
    customerEmail: 'david.rodriguez@email.com',
    status: 'cancelled',
    items: [
      { id: 'item-10', name: 'Smartwatch Sport', quantity: 1, price: 199.99 }
    ],
    subtotal: 199.99,
    tax: 16.00,
    shipping: 5.00,
    total: 220.99,
    createdAt: '2025-01-13T14:30:00Z',
    updatedAt: '2025-01-15T16:00:00Z',
    shippingAddress: {
      street: 'Paseo Marítimo 654',
      city: 'Bilbao',
      state: 'País Vasco',
      zipCode: '48001',
      country: 'España'
    }
  }
];

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return mockOrders.filter(order => order.status === status);
};

export const getStatusColor = (status: Order['status']): string => {
  const colors = {
    pending: '#f59e0b',
    processing: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#10b981',
    cancelled: '#ef4444'
  };
  return colors[status];
};

export const getStatusLabel = (status: Order['status']): string => {
  const labels = {
    pending: 'Pendiente',
    processing: 'Procesando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };
  return labels[status];
};