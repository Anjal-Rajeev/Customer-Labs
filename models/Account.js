import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import crypto from "crypto"

const Account = sequelize.define('Account', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  accountId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: false },
  appSecretToken: { type: DataTypes.STRING, defaultValue: () => crypto.randomBytes(32).toString('hex') },
  website: { type: DataTypes.STRING },
  status: { type: DataTypes.NUMBER, defaultValue: 0 } // 0 - Active, 1 - Deleted
});

export default Account