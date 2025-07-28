import { useState, useEffect } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface UseRemoteModuleOptions {
  url: string;
  moduleName: string;
  componentName: string;
}

// Cache global para evitar cargas duplicadas
const scriptCache = new Set<string>();
const componentCache = new Map<string, any>();

export const useRemoteModule = <T = any>({ url, moduleName, componentName }: UseRemoteModuleOptions) => {
  const [component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función helper para obtener componente del window global
    const getComponentFromWindow = () => {
      const remoteModule = (window as any)[moduleName];
      return remoteModule?.[componentName] || null;
    };

    // Función helper para guardar componente en cache y estado
    const saveComponent = (comp: any) => {
      const cacheKey = `${moduleName}.${componentName}`;
      componentCache.set(cacheKey, comp);
      setComponent(() => comp);
      setLoading(false);
    };

    // Paso 1: Preparar React globalmente
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;

    // Paso 2: Verificar si ya tenemos el componente
    const existingComponent = getComponentFromWindow();
    if (existingComponent) {
      saveComponent(existingComponent);
      return;
    }

    // Paso 3: Verificar cache
    const cacheKey = `${moduleName}.${componentName}`;
    if (componentCache.has(cacheKey)) {
      setComponent(() => componentCache.get(cacheKey));
      setLoading(false);
      return;
    }

    // Paso 4: Verificar si el script ya existe
    const existingScript = document.head.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      // Script ya existe, solo esperamos a que termine de cargar
      const handleLoad = () => {
        const comp = getComponentFromWindow();
        if (comp) {
          saveComponent(comp);
        } else {
          setError(`Component ${componentName} not found after script load`);
          setLoading(false);
        }
      };

      if (scriptCache.has(url)) {
        // Script ya terminó de cargar
        handleLoad();
      } else {
        // Script aún cargando
        existingScript.addEventListener('load', handleLoad);
      }
      return;
    }

    // Paso 5: Crear y cargar nuevo script
    const script = document.createElement('script');
    script.src = url;
    
    script.onload = () => {
      scriptCache.add(url);
      const comp = getComponentFromWindow();
      
      if (comp) {
        saveComponent(comp);
      } else {
        setError(`Component ${componentName} not found in ${moduleName}`);
        setLoading(false);
      }
    };

    script.onerror = () => {
      setError(`Failed to load script: ${url}`);
      setLoading(false);
    };

    document.head.appendChild(script);

  }, [url, moduleName, componentName]);

  return { component, loading, error };
};