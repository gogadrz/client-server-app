// import styles from "./header.module.css";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { Login } from "../modals/Login";

export function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="d-flex flex-column">
      {showModal && <Login setShowModdal={setShowModal} />}
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-success"
        className="m-2 ms-auto"
      >
        Войти
      </Button>
      <h1>Заголовок</h1>
      <p>
        какой то текст ur adipisicing elit. Repellat expedita dolore vel
        dignissimos, recusandae quidem eaque! Id sit molestias, pariatur
        deleniti corporis cum. Ullam quidem, aliquid molestiae provident
        cupiditate veritatis!
      </p>
    </div>
  );
}
