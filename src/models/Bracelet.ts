import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class Bracelet extends Model {
  id!: number;
  device_id!: string;
  heart_rate?: number;
  blood_pressure?: number;
  blood_oxygen?: number;
  body_temperature?: number;
  latitude?: number;
  longitude?: number;
  altitude?: string;
  user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bracelet.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    device_id: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    heart_rate: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    blood_pressure: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    blood_oxygen: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    body_temperature: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    altitude: {
      type: DataType.DOUBLE,
      allowNull: true,
    },
    user_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "bracelets",
    sequelize: database,
  }
);

Bracelet.sync({ alter: true }).then(() => {
  console.log("bracelets table synced");
});
