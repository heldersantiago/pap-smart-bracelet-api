import { Error } from "sequelize";

export interface ErrorResponde extends Error {
  errors: string;
}
