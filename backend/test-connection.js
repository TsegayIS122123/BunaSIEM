const db = require('./src/config/db'); // Adjust path to your file

async function testAll() {
  try {
    console.log(' Testing PostgreSQL connection...');
    
    // Test basic connection
    const version = await db.query('SELECT version()');
    console.log(' PostgreSQL Version:', version.rows[0].version.split(',')[0]);
    
    // Test your actual data
    const users = await db.query('SELECT username, email, role FROM users');
    console.log(' Users:', users.rows);
    
    const logs = await db.query('SELECT event_type, severity, source_ip FROM security_logs LIMIT 3');
    console.log(' Recent Logs:', logs.rows);
    
    const alerts = await db.query('SELECT title, severity, status FROM alerts');
    console.log(' Alerts:', alerts.rows);
    
    console.log(' All database tests passed! Your backend is ready!');
    
  } catch (error) {
    console.error(' Database error:', error.message);
  }
}

testAll();