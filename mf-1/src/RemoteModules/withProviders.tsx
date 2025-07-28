import StyledComponentsTheme from "@/components/StyledComponentsTheme";

const withProviders = (Component: React.ComponentType<any>) => {
  return function WrappedComponent(props: any) {
    return (
      <StyledComponentsTheme>
        <Component {...props} />
      </StyledComponentsTheme>
    );
  };
};

export default withProviders;
