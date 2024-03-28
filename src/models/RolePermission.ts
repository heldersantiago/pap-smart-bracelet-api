// lib/models/node.model.ts
import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class RolePermission extends Model {
  public id!: number;
  public role_id!: number;
  public permission_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// roles_permissions migrations
RolePermission.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
    permission_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "roles_permissions",
    sequelize: database,
  }
);

RolePermission.sync({ alter: true }).then(() =>
  console.log("roles_permissions table synced")
);
