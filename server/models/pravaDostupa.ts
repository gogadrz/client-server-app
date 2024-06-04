import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

export interface IPravaDostupa {
  id: number;
  user_name: string;
  password: string;
  description: string;
}

interface PravaDostupaCreationAttributes
  extends Optional<IPravaDostupa, "id"> {}

class PravaDostupa
  extends Model<IPravaDostupa, PravaDostupaCreationAttributes>
  implements IPravaDostupa
{
  public id!: number;
  public user_name!: string;
  public password!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PravaDostupa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "prava_dostupa",
    timestamps: false,
  }
);

export default PravaDostupa;
