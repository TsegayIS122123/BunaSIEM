const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('🔌 Attempting PostgreSQL connection...');
console.log(` Host: ${process.env.DB_HOST}, Database: ${process.env.DB_NAME}`);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'bunasiem',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '123456',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: (msg) => console.log(` SQL: ${msg}`),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connection established successfully.');
    
    // Test a simple query
    const [result] = await sequelize.query('SELECT COUNT(*) as user_count FROM users');
    console.log(`👥 Found ${result[0].user_count} users in database`);
    
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    console.log(' Troubleshooting:');
    console.log('  1. Check if PostgreSQL Docker container is running');
    console.log('  2. Verify DB_HOST is "postgres" (Docker service name)');
    console.log('  3. Check database credentials');
  }
};

testConnection();

module.exports = sequelize;