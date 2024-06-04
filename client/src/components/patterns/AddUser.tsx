import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ICandidatVid } from "../../types/ICandidatVid";
import candidatVidService from "../../http/CandidatVidApi";
// import { addUser } from "../../http/userAPI";

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [surname, setSurmame] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: Omit<ICandidatVid, "id"> = {
      name: name,
    };

    try {
      const response = await candidatVidService.addUser(newUser);
      console.log(response);
      navigate("/", { replace: false });
    } catch (e) {
      console.error("Ошибка добавления пользователя", e);
    }
  };

  return (
    <Container>
      <h1 className="mb-3">Добавить пользователя</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
          placeholder="Имя"
          required
        />
        <Form.Control
          name="surname"
          value={surname}
          onChange={(e) => setSurmame(e.target.value)}
          className="mb-3"
          placeholder="Фамилия"
          required
        />
        <Button variant="primary" type="submit">
          Добавить пользователя
        </Button>
      </Form>
    </Container>
  );
};

export default AddUser;
