import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import path = require("path");
import { IEnv } from "../types/env";

// Setting up the environment
const envPATH = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPATH });

// Configuring the environment with the default settings for the application
const env: IEnv = {
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT || "0", 10),
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
};

// Create database connection
export const database = new Sequelize({
  dialect: "mysql",
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
});
