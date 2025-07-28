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
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-006',
    customerId: 'cust-006',
    customerName: 'Elena González',
    customerEmail: 'elena.gonzalez@email.com',
    status: 'processing',
    items: [
      { id: 'item-11', name: 'Cámara Digital 4K', quantity: 1, price: 899.99 },
      { id: 'item-12', name: 'Tarjeta SD 128GB', quantity: 1, price: 45.99 },
      { id: 'item-13', name: 'Trípode Profesional', quantity: 1, price: 89.99 }
    ],
    subtotal: 1035.97,
    tax: 82.88,
    shipping: 12.00,
    total: 1130.85,
    createdAt: '2025-01-17T08:15:00Z',
    updatedAt: '2025-01-17T08:15:00Z',
    shippingAddress: {
      street: 'Avenida de la Constitución 88',
      city: 'Zaragoza',
      state: 'Aragón',
      zipCode: '50001',
      country: 'España'
    }
  },
  {
    id: '7',
    orderNumber: 'ORD-2025-007',
    customerId: 'cust-007',
    customerName: 'Roberto Silva',
    customerEmail: 'roberto.silva@email.com',
    status: 'processing',
    items: [
      { id: 'item-14', name: 'Monitor Gaming 27"', quantity: 1, price: 349.99 },
      { id: 'item-15', name: 'Teclado Mecánico RGB', quantity: 1, price: 129.99 }
    ],
    subtotal: 479.98,
    tax: 38.40,
    shipping: 8.00,
    total: 526.38,
    createdAt: '2025-01-17T12:45:00Z',
    updatedAt: '2025-01-17T12:45:00Z',
    shippingAddress: {
      street: 'Calle de la Paz 45',
      city: 'Málaga',
      state: 'Andalucía',
      zipCode: '29001',
      country: 'España'
    }
  },
  {
    id: '8',
    orderNumber: 'ORD-2025-008',
    customerId: 'cust-008',
    customerName: 'Patricia Moreno',
    customerEmail: 'patricia.moreno@email.com',
    status: 'shipped',
    items: [
      { id: 'item-16', name: 'Impresora Láser Color', quantity: 1, price: 299.99 },
      { id: 'item-17', name: 'Papel Premium A4', quantity: 3, price: 12.99 }
    ],
    subtotal: 338.96,
    tax: 27.12,
    shipping: 15.00,
    total: 381.08,
    createdAt: '2025-01-16T14:20:00Z',
    updatedAt: '2025-01-17T10:30:00Z',
    shippingAddress: {
      street: 'Plaza Mayor 12',
      city: 'Salamanca',
      state: 'Castilla y León',
      zipCode: '37001',
      country: 'España'
    }
  },
  {
    id: '9',
    orderNumber: 'ORD-2025-009',
    customerId: 'cust-009',
    customerName: 'Fernando Jiménez',
    customerEmail: 'fernando.jimenez@email.com',
    status: 'processing',
    items: [
      { id: 'item-18', name: 'SSD 1TB NVMe', quantity: 1, price: 119.99 },
      { id: 'item-19', name: 'RAM 32GB DDR4', quantity: 1, price: 189.99 }
    ],
    subtotal: 309.98,
    tax: 24.80,
    shipping: 5.00,
    total: 339.78,
    createdAt: '2025-01-17T16:00:00Z',
    updatedAt: '2025-01-17T16:00:00Z',
    shippingAddress: {
      street: 'Calle Real 78',
      city: 'Santander',
      state: 'Cantabria',
      zipCode: '39001',
      country: 'España'
    }
  },
  {
    id: '10',
    orderNumber: 'ORD-2025-010',
    customerId: 'cust-010',
    customerName: 'Carmen Ruiz',  
    customerEmail: 'carmen.ruiz@email.com',
    status: 'shipped',
    items: [
      { id: 'item-20', name: 'Tablet Pro 12.9"', quantity: 1, price: 799.99 },
      { id: 'item-21', name: 'Apple Pencil 2', quantity: 1, price: 129.99 },
      { id: 'item-22', name: 'Funda Keyboard', quantity: 1, price: 179.99 }
    ],
    subtotal: 1109.97,
    tax: 88.80,
    shipping: 20.00,
    total: 1218.77,
    createdAt: '2025-01-16T11:30:00Z',
    updatedAt: '2025-01-17T09:45:00Z',
    shippingAddress: {
      street: 'Gran Vía 125',
      city: 'Granada',
      state: 'Andalucía',
      zipCode: '18001',
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