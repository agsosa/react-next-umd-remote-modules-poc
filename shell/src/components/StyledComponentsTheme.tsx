import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "red",
  },
};

export default function StyledComponentsTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
