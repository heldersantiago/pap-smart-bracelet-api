import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class Alert extends Model {
  public id?: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public braceletId!: number;
  public isActive!: boolean;
}

// alerts migrations
Alert.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataType.TEXT,
      allowNull: false,
    },
    type: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    isActive: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    braceletId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "alerts",
    sequelize: database,
    timestamps: true,
  }
);

Alert.sync({ alter: true }).then(() => console.log("alerts table synced"));
