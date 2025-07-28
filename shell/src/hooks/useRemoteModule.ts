import { useState, useEffect } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface UseRemoteModuleOptions {
  url: string;
  moduleName: string;
  componentName: string;
}

const loadedScripts = new Set<string>();
const moduleCache = new Map<string, any>();

export const useRemoteModule = <T = any>({ url, moduleName, componentName }: UseRemoteModuleOptions) => {
  const [component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRemoteModule = async () => {
      try {
        // Asegurar que React esté disponible globalmente
        (window as any).React = React;
        (window as any).ReactDOM = ReactDOM;

        // Verificar si el módulo ya está cargado
        const existingModule = (window as any)[moduleName];
        if (existingModule?.[componentName]) {
          setComponent(() => existingModule[componentName]);
          setLoading(false);
          return;
        }

        // Verificar si ya existe en cache
        const cacheKey = `${moduleName}.${componentName}`;
        if (moduleCache.has(cacheKey)) {
          setComponent(() => moduleCache.get(cacheKey));
          setLoading(false);
          return;
        }

        // Verificar si el script ya está cargado
        if (loadedScripts.has(url)) {
          // Script ya cargado, verificar módulo
          const module = (window as any)[moduleName];
          if (module?.[componentName]) {
            const comp = module[componentName];
            moduleCache.set(cacheKey, comp);
            setComponent(() => comp);
          } else {
            setError(`Component ${componentName} not found in ${moduleName}`);
          }
          setLoading(false);
          return;
        }

        // Verificar si ya existe un script con la misma URL
        const existingScript = document.head.querySelector(`script[src="${url}"]`);
        if (existingScript) {
          // Script existe pero aún no ha cargado, esperar a que cargue
          existingScript.addEventListener('load', () => {
            const module = (window as any)[moduleName];
            if (module?.[componentName]) {
              const comp = module[componentName];
              moduleCache.set(cacheKey, comp);
              setComponent(() => comp);
            } else {
              setError(`Component ${componentName} not found in ${moduleName}`);
            }
            setLoading(false);
          });
          return;
        }

        // Crear y cargar nuevo script
        const script = document.createElement('script');
        script.src = url;
        
        script.onload = () => {
          loadedScripts.add(url);
          const module = (window as any)[moduleName];
          
          if (module?.[componentName]) {
            const comp = module[componentName];
            moduleCache.set(cacheKey, comp);
            setComponent(() => comp);
          } else {
            setError(`Component ${componentName} not found in ${moduleName}`);
          }
          setLoading(false);
        };

        script.onerror = () => {
          setError(`Failed to load script: ${url}`);
          setLoading(false);
        };

        document.head.appendChild(script);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadRemoteModule();
  }, [url, moduleName, componentName]);

  return { component, loading, error };
};