import { Container } from "react-bootstrap";
import styles from "./candidatviddetails.module.css";
import { ICandidatVid } from "../../types/ICandidatVid";

export function CandidatVidDetails({ name }: Omit<ICandidatVid, "id">) {
  return (
    <Container className={styles.infoContainer}>
      <h2>
        Информация о кандидате <span style={{ color: "blue" }}>{name}</span>
      </h2>
      <p>
        <span style={{ color: "blue" }}>{name}</span> is Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Commodi enim veniam accusaxpedita,
        iusto aliquid perferendis ad tempora. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Commodi enim veniam accusamus delectus
        magnam veritatis quo nostrum quis eius earum qui asperiores esse dolor
        expedita, iusto aliquid perferendis ad tempora.
      </p>
    </Container>
  );
}
