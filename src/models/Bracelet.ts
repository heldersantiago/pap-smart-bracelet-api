import { Model } from "sequelize";
import { database } from "../config/database";
import { DataType } from "sequelize-typescript";

export class Bracelet extends Model {
  id!: number;
  heart_rate?: number;
  pressure?: number;
  elderly_id?: number;
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
    heart_rate: {
      type: DataType.DOUBLE.UNSIGNED,
      allowNull: true,
    },
    pressure: {
      type: DataType.DOUBLE.UNSIGNED,
      allowNull: true,
    },
    elderly_id: {
      type: DataType.DOUBLE.UNSIGNED,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "bracelets",
    sequelize: database, // this bit is important
  }
);

Bracelet.sync({ force: true }).then(() => {
  console.log("bracelets table created sucessfull");
});
