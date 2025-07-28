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

export interface FulfilmentDetailsProps {
  orderId: string;
  onStatusChange?: (orderId: string, newStatus: string, trackingInfo?: any) => void;
}

export interface MF1_RemoteComponents {
  Header: React.ComponentType<HeaderProps>;
  Fulfilment: React.ComponentType<FulfilmentProps>;
  FulfilmentDetails: React.ComponentType<FulfilmentDetailsProps>;
}

declare global {
  interface Window {
    MF1_RemoteModules: MF1_RemoteComponents;
  }
}