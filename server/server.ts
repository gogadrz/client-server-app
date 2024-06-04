import express from "express";
import sequelize from "./database";
import cors from "cors";
import router from "./routes/index";
// const errorHandler = require("./middleware/ErrorHandlingMiddleware");
import errorHandler from "./middleware/ErrorHandlingMiddleware";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

// Подключение к базе данных и запуск сервера
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

start();
