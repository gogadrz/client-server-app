import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeaderNavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="mb-4" bg="primary" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link active onClick={() => navigate("/", { replace: false })}>
            Список
          </Nav.Link>
          <Nav.Link
            active
            onClick={() => navigate("/adduser", { replace: false })}
          >
            Добавить пользователя
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderNavBar;
