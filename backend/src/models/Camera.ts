import { DataTypes, Model } from 'sequelize';

import { db, DbModel } from '../registry';
import { Camera as CameraType } from '../types/Camera';

export interface Definition extends Model, CameraType {
  readonly id: number;
}

const Camera = db().define('Camera', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  port: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) as DbModel<Definition>;

export default Camera;
