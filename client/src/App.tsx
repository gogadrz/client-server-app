import "./App.css";
import { Header } from "./components/Header";
import Sidebar from "./components/SideBar/SideBar";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Row className="heigthRow">
              <Col>
                <Header />
              </Col>
            </Row>
            <AppRouter />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
