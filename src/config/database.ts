import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "todos",
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "hps",
  password: "heldersantigo273@",
});