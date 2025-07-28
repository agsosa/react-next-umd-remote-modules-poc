import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useRemoteModule } from "../hooks/useRemoteModule";
import type { HeaderProps } from "../types/mf1-remote-components";
import getConfig from "next/config";

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}


const RemoteHeader = () => {
  const {
    publicRuntimeConfig: { MF1_BASE_URL },
  } = getConfig();
  
  const router = useRouter();

  const {
    component: Header,
    loading,
    error,
  } = useRemoteModule<HeaderProps>({
    url: MF1_BASE_URL + "/remote-modules/bundle.js",
    moduleName: "MF1_RemoteModules",
    componentName: "Header",
  });

  useTraceUpdate({Header, loading, error })
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error loading remote header:", error);
    return <p>Error loading header</p>;
  }

  if (!Header) return <p>Header component not found</p>;

  const handleMount = () => {
    console.log("Shell App: El header remoto montó en la app!");
  };
  console.log("renderrender")

  return <Header appName="Shell App" router={router} onMount={handleMount} />;
};

export default RemoteHeader;
