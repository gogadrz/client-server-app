import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
  throw new Error(
    "Environment variables DB_NAME, DB_USER, DB_PASSWORD, DB_HOST must be defined"
  );
}

// Initialize Sequelize with the specified parameters
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
});

export default sequelize;
