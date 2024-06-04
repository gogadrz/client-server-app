import { useCallback, useEffect, useState } from "react";
import { Container, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ICandidatVid } from "../../types/ICandidatVid";
import candidatVidService from "../../http/CandidatVidApi";
// import { deleteUser, fetchUsers } from "../../http/userAPI";

const Users = () => {
  const [data, setData] = useState<ICandidatVid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await candidatVidService.getUsers();
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

  const handleClick = useCallback(async (userId: number) => {
    try {
      await candidatVidService.deleteUser(userId);
      setData((prevData) => prevData.filter((user) => user.id !== userId));
    } catch (err) {
      console.log(err);
      setError("Ошибка удаления пользователя");
    }
  }, []);

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
    <Container>
      <h1 className="mb-3">Список пользователей</h1>
      <ListGroup>
        {data.map((item) => (
          <UserListItem
            key={item.id}
            user={item}
            onDelete={handleClick}
            onEdit={navigate}
          />
        ))}
      </ListGroup>
    </Container>
  );
};

type UserListItemProps = {
  user: ICandidatVid;
  onDelete: (userId: number) => void;
  onEdit: (path: string, options?: any) => void;
};

const UserListItem = ({ user, onDelete, onEdit }: UserListItemProps) => {
  const handleDelete = () => {
    // if (user.id !== undefined) {
    onDelete(user.id);
    // }
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}{" "}
      <div>
        <Button
          onClick={() => onEdit(`/edituser/${user.id}`, { replace: false })}
          className="me-2"
          variant="outline-success"
          aria-label={`Изменить ${user.name}`}
        >
          изменить
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          aria-label={`Удалить ${user.name}`}
        >
          удалить
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default Users;
