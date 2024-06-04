import { Nav, Accordion, Image, Container } from "react-bootstrap";
import styles from "./sidebar.module.css";
import logo from "../../assets/img/ghost.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.sidebar}>
      <Container>
        <Image src={logo} alt="Логотип" rounded />
      </Container>
      <Nav className={"flex-column"}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Справочники</Accordion.Header>
            <Accordion.Body>
              <Nav className="flex-column">
                <Nav.Link href="/">CandidatVid</Nav.Link>
                {/* navigate('/', { replace: true }); */}
                <Nav.Link href="/some">Еще какой то кандидат</Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Автодома</Accordion.Header>
            <Accordion.Body>
              <Nav className="flex-column">
                <Nav.Link href="#">Солнечные панели</Nav.Link>
                <Nav.Link href="#">Химия для биотуалета</Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Nav.Link href="#">Контакты</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
