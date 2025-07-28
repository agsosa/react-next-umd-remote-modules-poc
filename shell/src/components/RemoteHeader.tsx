import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

// RECOMMENDED: UMD VERSION (MOST STABLE)
const RemoteHeader = () => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    // Make React available globally for the remote module
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;

    // Load UMD module
    const script = document.createElement("script");
    script.src = "http://localhost:3001/remote-components/bundle.js";
    script.onload = () => {
      const remoteModule = (window as any).RemoteModule;
      console.log("loaded remote module", remoteModule);
      if (remoteModule) {
        setComponent(() => remoteModule.Header);
      }
    };
    script.onerror = (err) => {
      console.error("Error loading remote module", err);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  console.log("Component:", Component);

  if (!Component) return <p>Loading...</p>;

  return <Component appName="Shell App" />;
};

/* EXPERIMENTAL: ES MODULE VERSION WITH IMPORT MAPS - NOT RECOMMENDED FOR PRODUCTION
const RemoteHeader = () => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    // Set up import map for React dependencies
    if (!document.querySelector('script[type="importmap"]')) {
      const importMap = document.createElement('script');
      importMap.type = 'importmap';
      importMap.textContent = JSON.stringify({
        imports: {
          "react": "data:text/javascript;base64," + btoa(`
            window.React = window.React || ${JSON.stringify(React)};
            export default window.React;
            export * from 'data:text/javascript;base64,${btoa('export default ' + JSON.stringify(React))}';
          `),
          "react-dom": "data:text/javascript;base64," + btoa(`
            window.ReactDOM = window.ReactDOM || ${JSON.stringify(ReactDOM)};
            export default window.ReactDOM;
          `)
        }
      });
      document.head.appendChild(importMap);
    }

    // Make React available globally
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;

    // Load ES module with dynamic import
    import('http://localhost:3001/remote-components/bundle.js')
      .then((mod) => {
        console.log("loaded remote ES module", mod);
        setComponent(() => mod.Header || mod.default);
      })
      .catch((err) => {
        console.error("Error loading remote module", err);
      });
  }, []);

  if (!Component) return <p>Loading...</p>;

  return <Component appName="Shell App" />;
};
*/

export default RemoteHeader;
