import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #2563eb;
  color: white;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
`;

const NavLink = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #93c5fd;
    }
  }
`;

interface HeaderProps {
  appName: string;
  currentPath?: string;
  navigate?: (path: string) => void;
  query?: Record<string, string>;
}

const Header = ({ appName, currentPath, navigate, query }: HeaderProps) => {
  console.log("Current route:", currentPath);
  console.log("Query params:", query);

  return (
    <HeaderContainer>
      <Nav>
        <Logo>{appName}</Logo>
        <NavLinks>
          <NavLink>
            <a
              href="/"
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate("/");
                }
              }}
              style={{ fontWeight: currentPath === "/" || currentPath === "/orders" || currentPath?.startsWith("/orders/") ? "bold" : "normal" }}
            >
              Orders
            </a>
          </NavLink>
          <NavLink>
            <a
              href="/fulfilment"
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate("/fulfilment");
                }
              }}
              style={{
                fontWeight: currentPath === "/fulfilment" ? "bold" : "normal",
              }}
            >
              Fulfilment
            </a>
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
