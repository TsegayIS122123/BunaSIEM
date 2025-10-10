const sequelize = require('../config/db');
const User = require('./User');
const Log = require('./Log');
const Alert = require('./Alert');

// Define relationships
Log.hasMany(Alert, { foreignKey: 'log_id', as: 'alerts' });
Alert.belongsTo(Log, { foreignKey: 'log_id', as: 'log' });

Alert.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignedUser' });
User.hasMany(Alert, { foreignKey: 'assigned_to', as: 'assignedAlerts' });

module.exports = {
  sequelize,
  User,
  Log,
  Alert
};