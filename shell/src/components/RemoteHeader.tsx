import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { useRouter } from "next/router";

const RemoteHeader = () => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const router = useRouter();

  useEffect(() => {
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;

    const script = document.createElement("script");
    script.src = "http://localhost:3001/remote-components/bundle.js";
    script.onload = () => {
      const remoteModule = (window as any).RemoteModule;
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

  if (!Component) return <p>Loading...</p>;

  return (
    <Component 
      appName="Shell App"
      currentPath={router.pathname}
      navigate={router.push}
      query={router.query}
    />
  );
};

export default RemoteHeader;
