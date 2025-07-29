import React from "react";
import { useRouter } from "next/router";
import { useRemoteModule } from "../hooks/useRemoteModule";
import type { HeaderProps } from "../types/mf1-remote-components";
import getConfig from "next/config";

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

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error loading remote header:", error);
    return <p>Error loading header</p>;
  }

  if (!Header) return <p>Header component not found</p>;

  const handleMount = () => {
    console.log("Shell App: El header remoto montó en la app!");
  };

  return <Header appName="Shell App" router={router} onMount={handleMount} />;
};

export default RemoteHeader;
