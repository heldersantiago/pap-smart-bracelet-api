// lib/models/node.model.ts
import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public bracelet_id!: string;
  public relative_tie!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// user migrations
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    bracelet_id: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    relative_tie: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: database, // this bit is important
  }
);

User.sync({ alter: true }).then(() => console.log("User table synced"));
