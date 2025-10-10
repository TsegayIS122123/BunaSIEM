const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  log_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'security_logs',
      key: 'id'
    }
  },
  rule_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rule_description: {
    type: DataTypes.TEXT
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'investigating', 'resolved', 'false_positive'),
    defaultValue: 'open'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recommendation: {
    type: DataTypes.TEXT
  },
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  assigned_at: {
    type: DataTypes.DATE
  },
  location: {
    type: DataTypes.STRING(100)
  },
  organization: {
    type: DataTypes.STRING(100)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  resolved_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'alerts',
  timestamps: false,
  underscored: true
});

module.exports = Alert;