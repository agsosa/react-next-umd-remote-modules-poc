import { useRouter } from 'next/router';
import { useEffect } from 'react';

const OrdersPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <p>Redirigiendo a la página principal...</p>
    </div>
  );
};

export default OrdersPage;