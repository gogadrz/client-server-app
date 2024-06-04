import React, { useState } from "react";
// import styles from "./main.module.css";
import { Col, Row } from "react-bootstrap";
import CandidatVidList from "../CandidatVidList/CandidatVidList";
import { CandidatVidDetails } from "../CandidatVidDetails";
import { ICandidatVid } from "../../types/ICandidatVid";
// import { useNavigate } from "react-router-dom";

export function Main() {
  const [clickedUser, setClickedUser] = useState<ICandidatVid | null>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/", { replace: true });
  // }, [navigate]);

  return (
    <>
      <Row className="d-flex align-item-center rightBlock">
        <Col md={4}>
          <CandidatVidList
            clickedUser={clickedUser}
            setClickedUser={setClickedUser}
          />
        </Col>
        <Col className="d-flex">
          {clickedUser && <CandidatVidDetails name={clickedUser.name} />}
        </Col>
      </Row>
    </>
  );
}
