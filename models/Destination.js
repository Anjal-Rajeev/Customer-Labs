// models/Destination.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Account from './Account.js';

const Destination = sequelize.define('Destination', {
  url: { type: DataTypes.STRING, allowNull: false },
  httpMethod: { type: DataTypes.ENUM('GET', 'POST', 'PUT'), allowNull: false },
  headers: { type: DataTypes.JSON, allowNull: false },
  status: { type: DataTypes.NUMBER, defaultValue: 0 } // 0 - Active, 1 - Deleted
});

Account.hasMany(Destination, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Destination.belongsTo(Account);

export default Destination
