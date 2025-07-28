import { NextRouter } from 'next/router';

export interface HeaderProps {
  appName: string;
  router?: NextRouter;
  onMount?: () => void;
}

export interface FulfilmentProps {
  onFulfil?: (orderId: string) => void;
  onTrack?: (orderId: string) => void;
}

export interface MF1_RemoteComponents {
  Header: React.ComponentType<HeaderProps>;
  Fulfilment: React.ComponentType<FulfilmentProps>;
}

declare global {
  interface Window {
    MF1_RemoteModules: MF1_RemoteComponents;
  }
}