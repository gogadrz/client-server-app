import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

export interface ICandidatVid {
  id: number;
  name: string;
}

export interface CandidatCreationAttributes
  extends Optional<ICandidatVid, "id"> {}

class CandidatVid
  extends Model<ICandidatVid, CandidatCreationAttributes>
  implements ICandidatVid
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CandidatVid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "kandidatvid",
    timestamps: false,
  }
);

export default CandidatVid;
