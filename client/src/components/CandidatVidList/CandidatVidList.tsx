import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { ICandidatVid } from "../../types/ICandidatVid";
// import { useNavigate } from "react-router-dom";
// import { fetchUsers } from "../../http/userAPI";
import styles from "./candidatvidlist.module.css";
import CandidatVidService from "../../http/CandidatVidApi";

interface IProps {
  clickedUser: ICandidatVid | null;
  setClickedUser: React.Dispatch<React.SetStateAction<ICandidatVid | null>>;
}

function CandidatVidList({ clickedUser, setClickedUser }: IProps) {
  const [data, setData] = useState<ICandidatVid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const [clickedUser, setClickedUser] = useState<ICandidatVid | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await CandidatVidService.getUsers();
        setData(users);
      } catch (error) {
        console.error("Ошибка получения списка пользователей!", error);
        setError("Ошибка получения списка пользователей");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const itemId = Number(
      (event.target as HTMLDivElement).getAttribute("data-id")
    );
    if (itemId) {
      const foundUser = data.find((obj) => obj.id === itemId);
      if (foundUser) {
        setClickedUser(foundUser);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" className="text-primary">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <h1 className="text-center mb-4">Охотники за привидениями</h1>
          <div className={styles.listContainer}>
            <ListGroup onClick={handleItemClick}>
              {data.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  // className="text-center"
                  className={
                    clickedUser && clickedUser.id === item.id ? "active" : ""
                  }
                  action
                  data-id={item.id}
                >
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CandidatVidList;
