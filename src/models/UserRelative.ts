// lib/models/node.model.ts
import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class UserRelative extends Model {
  public id!: number;
  public user_id!: number;
  public user_relative_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// user_relatives migrations
UserRelative.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_relative_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "user_relatives",
    sequelize: database,
  }
);

UserRelative.sync({ alter: true }).then(() =>
  console.log("user_relatives table synced")
);
