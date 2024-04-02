import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class UserRelative extends Model {
  public id!: number;
  public user_id!: number;
  public user_relative_id!: number;
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
    timestamps: false,
  }
);

UserRelative.sync({ alter: true }).then(() =>
  console.log("user_relatives table synced")
);
