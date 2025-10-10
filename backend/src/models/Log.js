const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  source: {
    type: DataTypes.ENUM('aws_cloudtrail', 'azure_monitor', 'ethio_telecom', 'firewall', 'ids_ips'),
    allowNull: false
  },
  event_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'low'
  },
  username: {
    type: DataTypes.STRING(255)
  },
  user_agent: {
    type: DataTypes.TEXT
  },
  source_ip: {
    type: DataTypes.STRING // Using STRING instead of INET for simplicity
  },
  destination_ip: {
    type: DataTypes.STRING
  },
  source_port: {
    type: DataTypes.INTEGER
  },
  destination_port: {
    type: DataTypes.INTEGER
  },
  country_code: {
    type: DataTypes.STRING(5),
    defaultValue: 'ET'
  },
  city: {
    type: DataTypes.STRING(100)
  },
  region: {
    type: DataTypes.STRING(100)
  },
  event_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  received_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT
  },
  aws_region: {
    type: DataTypes.STRING(50)
  },
  azure_tenant_id: {
    type: DataTypes.STRING(100)
  },
  ethio_telecom_office: {
    type: DataTypes.STRING(100)
  },
  raw_log: {
    type: DataTypes.JSONB
  },
  is_processed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  has_alert: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'security_logs',
  timestamps: false,
  underscored: true
});

module.exports = Log;