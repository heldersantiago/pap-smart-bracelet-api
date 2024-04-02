import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class Role extends Model {
  public id!: number;
  public name!: string;
}

// roles migrations
Role.init(
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
    tableName: "roles",
    sequelize: database,
    timestamps: false,
  }
);

Role.sync({ alter: true }).then(() => console.log("roles table synced"));
