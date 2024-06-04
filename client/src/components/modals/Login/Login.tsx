import React, { useState } from "react";
// import styles from "./login.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import pravaDostupaApi from "../../../http/PravaDostupaApi";
// import { IPravaDostupa } from "../../../types/IPravaDostupa";

interface ILogin {
  setShowModdal: (showModal: boolean) => void;
}

export function Login({ setShowModdal }: ILogin) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [user, setUser] = useState<Omit<IPravaDostupa, "password"> | null>(
  //   null
  // );

  const submitHandle = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Login submitHandle()");
    try {
      const response = await pravaDostupaApi.login({
        user_name: login,
        password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error("Failed to login! Incorrect token!");
      }
      // setUser({
      //   id: response.data.id,
      //   user_name: login,
      //   description: response.data.description,
      // });
      if (response) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            id: response.data.id,
            user_name: login,
            description: response.data.description,
          })
        );
      }
      console.log("User aothorized, and token saved to localStorage: ", token);
    } catch (e) {
      setError("Не залогинился!");
      console.error(e instanceof Error ? e.message : e);
    } finally {
      setLoading(false);
      // setShowModdal(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <Modal show={true} size="lg" centered>
      <Modal.Header closeButton onClick={() => setShowModdal(false)}>
        <Modal.Title id="contained-modal-title-vcenter">Войти</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandle}>
        <Modal.Body>
          <Form.Control
            value={login}
            onInput={(e) => setLogin(e.currentTarget.value)}
            required
            placeholder="Login"
            className="mb-3"
          />
          <Form.Control
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
            type="password"
            placeholder="Password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" type="submit">
            Войти
          </Button>
          <Button variant="outline-danger" onClick={() => setShowModdal(false)}>
            Отмена
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
