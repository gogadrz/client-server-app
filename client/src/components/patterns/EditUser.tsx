import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ICandidatVid } from "../../types/ICandidatVid";
import candidatVidService from "../../http/CandidatVidApi";
// import { fetchUserById, updateUser } from "../../http/userAPI";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ICandidatVid>({ id: -1, name: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId: ", id);

    const loadUser = async () => {
      if (!id) {
        setError("Не указан идентификатор пользователя.");
        setLoading(false);
        return;
      }

      try {
        const userData = await candidatVidService.getUserById(id);
        console.log("resp: ", userData);
        setUser(userData);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("Не указан идентификатор пользователя.");
      return;
    }
    setError(null);
    try {
      await candidatVidService.updateUser(id, user);
      navigate(`/`, { replace: false });
    } catch (e) {
      setError("Ошибка при обновлении данных пользователя!");
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-3">Изменить данные пользователя</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="mb-3"
          placeholder="Имя"
          required
        />
        <Button variant="outline-primary" type="submit" className="me-2">
          Сохранить изменения
        </Button>
        <Button
          variant="outline-secondary"
          type="submit"
          onClick={() => navigate(`/`, { replace: false })}
        >
          Отмена
        </Button>
      </Form>
    </Container>
  );
};

export default EditUser;
