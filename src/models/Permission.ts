// lib/models/node.model.ts
import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class Permission extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// permissions migrations
Permission.init(
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
  },
  {
    tableName: "permissions",
    sequelize: database,
  }
);

Permission.sync({ alter: true }).then(() =>
  console.log("permissions table synced")
);
