const { Pool } = require('pg');

// PostgreSQL connection 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bunasiem',
  password: '123456',  
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
});

// Test connection on startup
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('🎉 BunaSIEM connected to PostgreSQL 18!');
    
    // Test with actual data from your database
    const stats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM security_logs) as logs,
        (SELECT COUNT(*) FROM alerts) as alerts,
        (SELECT COUNT(*) FROM threat_intelligence) as threats
    `);
    
    console.log(`📊 Database Loaded: ${stats.rows[0].users} users, ${stats.rows[0].logs} logs, ${stats.rows[0].alerts} alerts, ${stats.rows[0].threats} threats`);
    
    client.release();
  } catch (err) {
    console.error(' Database connection failed:', err.message);
    console.log(' Make sure PostgreSQL is running and database exists');
  }
};

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool,
};