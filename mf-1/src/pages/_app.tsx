import type { AppProps } from "next/app";
import "../styles/globals.css";
import StyledComponentsTheme from "@/components/StyledComponentsTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsTheme>
      <Component {...pageProps} />
    </StyledComponentsTheme>
  );
}
