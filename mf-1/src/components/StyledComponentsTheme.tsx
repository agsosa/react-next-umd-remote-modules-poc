import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "white",
  },
};

export default function StyledComponentsTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
