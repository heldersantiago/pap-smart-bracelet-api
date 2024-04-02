import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public role_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// user migrations
User.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(128),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    phone: {
      type: DataType.STRING(128),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: database, // this bit is important
  }
);

User.sync({ alter: true }).then(() => console.log("User table synced"));
